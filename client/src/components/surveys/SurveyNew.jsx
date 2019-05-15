import React from 'react';
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
      return <SurveyFormReview />;
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

export default SurveyNew;
