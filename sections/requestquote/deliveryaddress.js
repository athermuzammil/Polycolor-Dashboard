"use client";
import React, { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import Halfarrow from "@/public/icon/halfarrow";

const Deliveryaddress = ({
  name,
  setName,
  streetName,
  setStreetName,
  streetNumber,
  setStreetNumber,
  post,
  setPost,
  town,
  setTown,
  canton,
  setCanton,
}) => {
  const [open, setOpen] = useState();
  const [open1, setOpen1] = useState();
  return (
    <div className=" w-full flex flex-col gap-16 pb-28 ">
      <div className=" flex flex-col gap-3 w-full ">
        <div className=" font-Polysans font-semibold text-[2rem] tracking-tight text-[#141415] leading-none   ">
          Delivery Address
        </div>
        <div className=" font-Polysans font-medium text-[1rem] tracking-tight text-[#929292] leading-[1.5] w-[300px]   ">
          Enter the address of the coated object you want to get delivered to
        </div>
      </div>
      <div className=" flex flex-col w-full gap-16 ">
        <div className=" flex w-full gap-16 justify-between items-center ">
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Name Of Addressee
            </div>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
              placeholder="Enter name"
            />
          </div>
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Street Name
            </div>
            <input
              value={streetName}
              onChange={(e) => {
                setStreetName(e.target.value);
              }}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
              placeholder="Enter Street name"
            />
          </div>
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Street Number
            </div>
            <input
              value={streetNumber}
              onChange={(e) => {
                setStreetNumber(e.target.value);
              }}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
              placeholder="Enter Street Number"
            />
          </div>
        </div>
        <div className=" flex w-full gap-16 justify-between items-center ">
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Post Code
            </div>
            <input
              type="number"
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
              placeholder="0000"
            />
          </div>
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Town
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {town ? (
                      <div className=" text-[#464646] ">{town}</div>
                    ) : (
                      "Specify Town"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open ? "180deg" : "0deg",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: easeInOut,
                    }}
                  >
                    <Halfarrow />
                  </motion.div>
                </div>
              </div>
              <motion.div
                className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                  open ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open ? "fit-content" : 0,
                  // paddingTop: open ? "12px" : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: easeInOut,
                }}
              >
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setTown("yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setTown("no");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Canton Abbreviation
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen1(!open1);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open1 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {canton ? (
                      <div className=" text-[#464646] ">{canton}</div>
                    ) : (
                      "  Canton Abbreviation"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open1 ? "180deg" : "0deg",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: easeInOut,
                    }}
                  >
                    <Halfarrow />
                  </motion.div>
                </div>
              </div>
              <motion.div
                className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                  open1 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open1 ? "fit-content" : 0,
                  // paddingTop: open ? "12px" : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: easeInOut,
                }}
              >
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setCanton("yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setCanton("no");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveryaddress;
