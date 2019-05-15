import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
    noValueError: 'Please provide a Survey Title'
  },
  {
    label: 'Subject Line',
    name: 'subject',
    noValueError: 'Please provide a Subject Title'
  },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'Please provide an Email Body'
  },
  {
    label: 'Recipient List',
    name: 'emails',
    noValueError: 'Please provide a Recipient List'
  }
];

// SurveyForm renders a form for user to add input
class SurveyForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, field => {
      return (
        <Field
          key={field.name}
          label={field.label}
          name={field.name}
          type="text"
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm);
