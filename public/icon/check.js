"use client";
import React from "react";
import { easeInOut, motion } from "framer-motion";

const Check1 = () => {
  return (
    <div className=" cursor-pointer ">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="#205FFF" />
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="5.5"
          stroke="#5F8BFF"
        />
        <motion.path
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 0.3,
            ease: easeInOut,
          }}
          d="M5 10L8.32941 13L15 7"
          stroke="white"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Check1;
