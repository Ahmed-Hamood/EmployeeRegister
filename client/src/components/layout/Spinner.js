import React from 'react';
import './Spinner.css'

const Spinner = props => {
  return (
    <div className="spinner-content">
      <div className="spinner-wheel"></div>
       <p className="spinner-message">{props.message}</p>
    </div>
  );
};

Spinner.defaultProps = {
  message: 'Loading.....'
};

export default Spinner;
