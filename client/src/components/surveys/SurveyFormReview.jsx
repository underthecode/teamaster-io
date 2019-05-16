// SurveyFormReview renders a view for users to reivew SurveyForm inputs
import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = props => {
  return (
    <div>
      <h5>Please confirm your filled out information</h5>

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
