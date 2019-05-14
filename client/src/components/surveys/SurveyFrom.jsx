import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

  if (!values.title) {
    errors.title = 'You must provide a title';
  }

  return errors;
};

export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm);
