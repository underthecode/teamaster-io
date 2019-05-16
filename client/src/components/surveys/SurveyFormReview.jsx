// SurveyFormReview renders a view for users to reivew SurveyForm inputs
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

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
      <button
        className="yellow darken-2 white-text btn-flat"
        onClick={props.onBack}
      >
        Back
      </button>

      <button
        onClick={() => props.submitSurvey(props.formValues, props.history)}
        className="teal lighten-2 white-text btn-flat right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
