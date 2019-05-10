import React from 'react';
import { reduxForm } from 'redux-form';

// SurveyForm renders a form for user to add input
class SurveyForm extends React.Component {
  render() {
    return (
      <div>
        <h2>SurveyForm</h2>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
