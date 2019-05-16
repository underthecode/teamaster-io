// SurveyFormReview renders a view for users to reivew SurveyForm inputs
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = props => {
  const reivewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{props.formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your filled out information</h5>
      {reivewFields}
      <button className="yellow darken-3 btn-flat" onClick={props.onBack}>
        Back
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
