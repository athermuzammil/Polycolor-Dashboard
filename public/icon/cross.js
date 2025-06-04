import React from "react";

const Cross = () => {
  return (
    <div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="16" rx="8" fill="#D8D8D8" />
        <path
          d="M5.17188 10.8284L10.8287 5.17158"
          stroke="#292D32"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.8287 10.8284L5.17188 5.17157"
          stroke="#292D32"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Cross;
