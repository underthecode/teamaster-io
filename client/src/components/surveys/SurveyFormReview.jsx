// SurveyFormReview renders a view for users to reivew SurveyForm inputs
import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = props => {
  return (
    <div>
      <h5>Please confirm your filled out information</h5>
      <div>
        <div>
          <label>Survey Title</label>
          <div>{props.formValues.title}</div>
        </div>
        <div>
          <label>Subject Line</label>
          <div>{props.formValues.subject}</div>
        </div>
        <div>
          <label>Email Body</label>
          <div>{props.formValues.body}</div>
        </div>
        <div>
          <label>Recipient List</label>
          <div>{props.formValues.emails}</div>
        </div>
      </div>
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
