import React from 'react';

// SurveyField has logic to render single label && text input
export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
