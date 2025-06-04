"use client";
import Navbar from "@/app/components/navbar";
import Leftclick from "@/public/icon/leftclick";
import Rightclick from "@/public/icon/rightclick";
import React, { useRef, useState, useEffect } from "react";
import { easeInOut, motion } from "framer-motion";
import Halfarrow from "@/public/icon/halfarrow";
import clsx from "clsx";
import Uploadlogo from "@/public/icon/uploadlogo";
import Image from "next/image";
import Cross from "@/public/icon/cross";
import Alert from "@/app/components/alert";

const Specificdetails = ({
  environment,
  setEnvironment,
  wantcolor,
  setWantColor,
  sand,
  setSand,
  surface,
  setSurface,
  hex,
  setHex,
  red,
  red1,
}) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div className=" w-full flex flex-col gap-16 ">
      <div className=" flex flex-col gap-3 w-full ">
        <div className=" font-Polysans font-semibold text-[2rem] tracking-tight text-[#141415] leading-none   ">
          Specific Details
        </div>
        <div className=" font-Polysans font-medium text-[1rem] tracking-tight text-[#929292] leading-[1.5] w-[300px]   ">
          Enter the specific details of the object you want to get powder
          coated.
        </div>
      </div>
      <div className=" w-full flex flex-col gap-12 ">
        <div className=" flex w-full gap-28  ">
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Application Environment
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
                    {environment ? (
                      <div className=" text-[#464646] ">{environment}</div>
                    ) : (
                      "Select Application Environment"
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
                  open ? "border " : ""
                } border-[#DFDFDF]   `}
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
                    setEnvironment("Indoor");
                  }}
                >
                  Indoor
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setEnvironment("Outdoor");
                  }}
                >
                  Outdoor
                </div>
              </motion.div>
            </div>
          </div>
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Have a Color in Mind ?
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
                    {wantcolor ? (
                      <div className=" text-[#464646] ">{wantcolor}</div>
                    ) : (
                      "Have a color in mind?"
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
                    setWantColor("Yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setWantColor("No, Suggest me");
                  }}
                >
                  No, Suggest me
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className=" flex w-full gap-28  ">
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Sandblasting required?
            </div>
            <div
              className={` flex flex-col cursor-pointer relative  border ${
                red ? " border-[#E89A9A] " : "border-[#DFDFDF]"
              }  bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
              onClick={() => {
                setOpen2(!open2);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open2 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {sand ? (
                      <div className=" text-[#464646] ">{sand}</div>
                    ) : (
                      "Sandblasting required?"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open2 ? "180deg" : "0deg",
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
                  open2 ? "border " : ""
                } border-[#DFDFDF]   `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open2 ? "fit-content" : 0,

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
                    setSand("Yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setSand("No");
                  }}
                >
                  No
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setSand("Notsure");
                  }}
                >
                  Not sure, need advice
                </div>
              </motion.div>
            </div>
          </div>
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
              <div> Surface Protection</div>
              <Alert
                text={
                  "This must be done for certain items as the coating may otherwise affect the fit of screws or other components."
                }
              />
            </div>
            <div
              className={` flex flex-col cursor-pointer relative  border ${
                red1 ? " border-[#E89A9A] " : "border-[#DFDFDF]"
              }  bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
              onClick={() => {
                setOpen3(!open3);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open3 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {surface ? (
                      <div className=" text-[#464646] ">{surface}</div>
                    ) : (
                      "Surface Protection?"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open3 ? "180deg" : "0deg",
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
                  open3 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open3 ? "fit-content" : 0,
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
                    setSurface("Yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setSurface("No, Suggest me");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {wantcolor == "Yes" && (
          <div className=" flex w-full gap-24 ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                Color Specification
                <span className=" text-[#BDBDBD] "> (Hex Code) </span>
              </div>
              <input
                value={hex}
                onChange={handleChange}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="#FFFFFF"
              />
            </div>
            <div className=" w-full "></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Specificdetails;
