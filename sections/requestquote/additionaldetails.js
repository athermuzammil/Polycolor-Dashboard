"use client";
import React, { useRef, useState, useEffect } from "react";
import { easeInOut, motion } from "framer-motion";
import Halfarrow from "@/public/icon/halfarrow";
import clsx from "clsx";
import Uploadlogo from "@/public/icon/uploadlogo";
import Image from "next/image";
import Cross from "@/public/icon/cross";
import Alert from "@/app/components/alert";
import { getToken } from "@/api/getToken";
import getaddress from "@/api/getaddress";

const Additionaldetails = ({
  transport,
  setTransport,
  date,
  setDate,
  needDelivery,
  setNeedDelivery,
  location,
  setLocation,
  application,
  setApplication,
  express,
  setExpress,
  notes,
  setNotes,
  removal,
  setRemoval,
  newT,
  setNewTransport,
}) => {
  const token = getToken();

  const [open71, setOpen71] = useState(false);
  const [open11, setOpen11] = useState(false);
  const [open21, setOpen21] = useState(false);
  const [open31, setOpen31] = useState(false);
  const [open41, setOpen41] = useState(false);
  const [open51, setOpen51] = useState(false);
  const [open61, setOpen61] = useState(false);
  const [locations, setLocations] = useState();
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleChange3 = (e) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    const getalladdress = async () => {
      const addresses = await getaddress(token);
      setLocation(addresses);
      //console.log(addresses, "addddddddddddddd");
    };
    getalladdress();
  }, []);

  return (
    <div className="w-full flex flex-col gap-16 pb-28 ">
      <div className=" flex flex-col gap-3 w-full ">
        <div className=" font-Polysans font-semibold text-[2rem] tracking-tight text-[#141415] leading-none   ">
          Additional Details
        </div>
        <div className=" font-Polysans font-medium text-[1rem] tracking-tight text-[#929292] leading-[1.5] w-[300px]   ">
          Enter the specific details of the object you want to get powder
          coated.
        </div>
      </div>
      <div className=" w-full flex gap-28 px-2 ">
        <div className=" flex flex-col w-full gap-12  ">
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Transport Required ?
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen71(!open71);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open71 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {transport ? (
                      <div className=" text-[#464646] ">{transport}</div>
                    ) : (
                      "Tranport Required"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open71 ? "180deg" : "0deg",
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
                  open71 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open71 ? "fit-content" : 0,
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
                    setTransport("yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setTransport("no");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Delivery ?
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen11(!open11);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open11 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {needDelivery ? (
                      <div className=" text-[#464646] ">{needDelivery}</div>
                    ) : (
                      "Need Delivery?"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open11 ? "180deg" : "0deg",
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
                  open11 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open11 ? "fit-content" : 0,
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
                    setNeedDelivery("yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setNeedDelivery("no");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>

          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
              <div> Flim Application</div>
              <Alert text={"An surcharge of 25.90 CHF applies."} />
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen31(!open31);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open31 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {application ? (
                      <div className=" text-[#464646] ">{application}</div>
                    ) : (
                      "Flim Application?"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open31 ? "180deg" : "0deg",
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
                  open31 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open31 ? "fit-content" : 0,
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
                    setApplication("yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setApplication("no");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>
          {needDelivery == "yes" && (
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                <div> Express Service Required ?</div>
                <Alert
                  text={
                    "Do you need the items within 24 hours, this excludes holidays. An surcharge of 299 CHF applies."
                  }
                />
              </div>
              <div
                className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                onClick={() => {
                  setOpen51(!open51);
                }}
              >
                <div className="  flex items-center justify-between w-full   ">
                  <div
                    className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                      open51 ? "" : ""
                    } leading-none transition-all duration-300 `}
                  >
                    <div>
                      {" "}
                      {express ? (
                        <div className=" text-[#464646] ">{express}</div>
                      ) : (
                        "Express delivery?"
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: open51 ? "180deg" : "0deg",
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
                    open51 ? "border" : ""
                  } border-[#DFDFDF]  `}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: open51 ? "fit-content" : 0,
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
                      setExpress("yes");
                    }}
                  >
                    Yes
                  </div>
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setExpress("no");
                    }}
                  >
                    No
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        <div id="two" className=" flex flex-col w-full gap-12  ">
          {transport == "yes" && (
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                Pick-Up Date
              </div>
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                onChange={handleDateChange}
                className="border font-Matter placeholder:uppercase text-[1rem] text-[#AFB2B6] font-medium border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-3 outline-none "
              />
            </div>
          )}
          {transport == "yes" && (
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                Transport Location
              </div>
              <div
                className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                onClick={() => {
                  setOpen61(!open61);
                }}
              >
                <div className="  flex items-center justify-between w-full   ">
                  <div
                    className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                      open61 ? "" : ""
                    } leading-none transition-all duration-300 `}
                  >
                    1
                    <div>
                      {" "}
                      {location ? (
                        <div className=" text-[#464646] ">{location}</div>
                      ) : (
                        "Delivery Location"
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: open61 ? "180deg" : "0deg",
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
                    open61 ? "border" : ""
                  } border-[#DFDFDF]  `}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: open61 ? "fit-content" : 0,
                    // paddingTop: open ? "12px" : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeInOut,
                  }}
                >
                  {locations?.billingAddress?.map((item) => (
                    <div
                      className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                      onClick={() => {
                        setLocation("billing");
                      }}
                    >
                      {item.location?.name}, {item.location?.streetName},{" "}
                      {item.location?.streetNumber}
                    </div>
                  ))}
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setLocation("other");
                    }}
                  >
                    Other Address
                  </div>
                </motion.div>
              </div>
            </div>
          )}
          {needDelivery == "yes" && (
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                Delivery Location
              </div>
              <div
                className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                onClick={() => {
                  setOpen21(!open21);
                }}
              >
                <div className="  flex items-center justify-between w-full   ">
                  <div
                    className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                      open21 ? "" : ""
                    } leading-none transition-all duration-300 `}
                  >
                    <div>
                      {" "}
                      {location ? (
                        <div className=" text-[#464646] ">{location}</div>
                      ) : (
                        "Delivery Location"
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: open21 ? "180deg" : "0deg",
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
                    open2 ? "border" : ""
                  } border-[#DFDFDF]  `}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: open21 ? "fit-content" : 0,
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
                      setLocation("billing");
                    }}
                  >
                    Billing Address
                  </div>
                  <div
                    className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setLocation("other");
                    }}
                  >
                    Other Address
                  </div>
                </motion.div>
              </div>
            </div>
          )}
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
              <div> Flim Removal</div>
              <Alert text={"An surcharge of 25.90 CHF applies."} />
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen41(!open41);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open41 ? "" : ""
                  } leading-none transition-all duration-300 `}
                >
                  <div>
                    {" "}
                    {removal ? (
                      <div className=" text-[#464646] ">{removal}</div>
                    ) : (
                      "Flim Removal?"
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: open41 ? "180deg" : "0deg",
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
                  open41 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open41 ? "fit-content" : 0,
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
                    setRemoval("yes");
                  }}
                >
                  Yes
                </div>
                <div
                  className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setRemoval("no");
                  }}
                >
                  No
                </div>
              </motion.div>
            </div>
          </div>
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Additional Notes
              <span className=" text-[#BDBDBD] "> (Optional) </span>
            </div>
            <textarea
              value={notes}
              onChange={handleChange3}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full h-32"
              placeholder="Write description here"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additionaldetails;
