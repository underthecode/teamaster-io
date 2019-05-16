import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

// SurveyNew renders SurveyForm && SurveyFormReview
class SurveyNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showFormReview: false };
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onBack={() => this.setState({ showFormReview: false })}
        />
      );
    } else {
      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// navigating away from SurveyNew our input values are dumped by default
export default reduxForm({ form: 'surveyForm' })(SurveyNew);
