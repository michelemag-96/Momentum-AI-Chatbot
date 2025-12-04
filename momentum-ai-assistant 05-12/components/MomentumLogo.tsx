
import React from 'react';

export const MomentumLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g>
      <path
        d="M95.5 50C95.5 75.1416 75.1416 95.5 50 95.5C24.8584 95.5 4.5 75.1416 4.5 50C4.5 24.8584 24.8584 4.5 50 4.5C75.1416 4.5 95.5 24.8584 95.5 50Z"
        stroke="white"
        strokeWidth="3"
      />
      <path
        d="M90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50C10 27.9086 27.9086 10 50 10C72.0914 10 90 27.9086 90 50Z"
        stroke="white"
        strokeWidth="4"
      />
      <path
        d="M98.5 50C98.5 76.8421 76.8421 98.5 50 98.5C23.1579 98.5 1.5 76.8421 1.5 50C1.5 23.1579 23.1579 1.5 50 1.5C76.8421 1.5 98.5 23.1579 98.5 50Z"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M33 68V32L50 50L67 32V68"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
