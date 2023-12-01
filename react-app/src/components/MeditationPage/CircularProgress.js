import React from 'react';
import './CircularProgress.css';

const CircularProgressBar = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - score / 100) * circumference;

  return (
    <div className="circular-progress-bar">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#eee" strokeWidth="10"/>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#4caf50"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="25"
          transform="rotate(90 60 60)"
        >
          {`${score}%`}</text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
