const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    // assign var && chain map, compact, uniqBy, value
    const events = _.chain(req.body)
      // iterates over each record to parse out pathname
      .map(event => {
        const match = p.test(new URL(event.url).pathname);
        // if surveyId && choice prop exists
        if (match) {
          // return a new object with both of those props + email prop
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // removes duplicate records from array aka undefined records
      .compact()
      // removes records with duplicate emails and surveyId props
      .uniqBy('email', 'surveyId')
      // iterates through event object
      // event object has three props: surveyId, email, choice
      // and runs query to post / update database
      .each(event => {
        Survey.updateOne(
          {
            _id: event.surveyId,
            recipients: {
              $elemMatch: { email: event.email, responded: false }
            }
          },
          {
            $inc: { [event.choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      // returns final array value after executing through chain
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
