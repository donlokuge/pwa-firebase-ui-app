import React from 'react';
import '../css/mt-spinner.css';

function MaterialSpinner(props) {
  const { text, x, y, fontSize } = props;

  return (
    <div className="material_loader">
      <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
      <svg>
        <text x={x} y={y} fontFamily="Monaco" fontSize={fontSize} style={{ 'letterSpacing': 0.6 }} fill="grey">{text}
          <animate
            attributeName="opacity"
            values="0;1;0" dur="1.8s"
            repeatCount="indefinite" />
        </text>
      </svg>
    </div>
  );
}

export default MaterialSpinner;

MaterialSpinner.defaultProps = {
  text: "LOADING",
  x: "16",
  y: "90",
  fontSize:"14px"
}