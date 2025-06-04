"use client";
import Panic from "@/public/icon/panic";
import React, { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

const Alert = ({ text, right, children }) => {
  const [enter, setEnter] = useState(false);
  return (
    <div className=" flex relative ">
      <div
        onMouseEnter={() => setEnter(true)}
        onMouseLeave={() => setEnter(false)}
        className=" cursor-pointer "
      >
        {children || <Panic />}
      </div>
      <AnimatePresence>
        {enter && (
          <motion.div
            className={` flex gap-[0px] absolute top-0 pt-2 ${
              enter ? "block" : "hidden"
            } 
            ${right ? "right-5" : "left-5"} `}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: easeInOut,
            }}
          >
            {/* <div className="  w-0 h-0 border-l-[17px] border-l-transparent border-t-[10px] border-t-[#6a6767] border-r-[0px] border-r-transparent "></div> */}
            <div className="">
              <div className="text-[#B5B5B5] shadow-md border border-[#DFDFDF] bg-[#FFFFFF] font-medium font-Matter w-[300px] px-6 rounded-[14px] py-4 text-[0.8rem] ">
                <div className="px-2 leading-[1.5] ">{text}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alert;
