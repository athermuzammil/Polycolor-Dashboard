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
import Blueplus from "@/public/icon/blueplus";

const Basicdetails = ({
  length,
  setLength,
  material,
  setMaterial,
  quantity,
  setQuantity,
  breath,
  setBreath,
  height,
  setHeight,
  description,
  setDescription,
  logo,
  setLogo,
  unit,
  setUnit,
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
  itemName,
  setItemName,
  allItems,
  setAllItems,
  handleAddItem,
}) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [logoURL, setLogoURL] = useState(null);
  // const [allItems, setAllItems] = useState(["dabc", "defg", "dchi", "djkl"]);

  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  const handleChange1 = (event) => {
    const selectedFile = event.target.files[0];
    setLogo(selectedFile);
    //console.log(selectedFile, "select");
  };

  const previewFile = () => {
    if (logo) {
      const fileURL = URL.createObjectURL(logo);
      //console.log(fileURL, "url");
      return fileURL;
    }
  };
  //   useEffect(() => {
  //     const fileURL = URL.createObjectURL(logo);
  //     setLogoURL(fileURL);
  //     //console.log(fileURL, "url");
  //     return () => {
  //       if (logoURL) URL.revokeObjectURL(logoURL);
  //     };
  //   }, [logo]);

  const handleChange2 = (e) => {
    setHex(e.target.value);
  };

  return (
    <div className=" w-full flex flex-col   ">
      <div className=" flex w-full ">
        <div className=" flex flex-col gap-3 w-full ">
          <div className=" font-Polysans font-semibold text-[2rem] tracking-tight text-[#141415] leading-none   ">
            Add Item Details
          </div>
          <div className=" font-Polysans font-medium text-[1rem] tracking-tight text-[#929292] leading-[1.5] w-[300px]   ">
            Enter the basic details of the object you want to get powder coated.
          </div>
        </div>
        <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-4 flex gap-2 ">
          <div className=" flex flex-col gap-2 w-48 ">
            <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
              Total Items
            </div>
            <div className=" font-Matter font-medium text-[1.3rem] text-[#000000]   ">
              {allItems.length}
            </div>
          </div>
          <div className=" flex flex-col gap-2 w-full">
            <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
              Items
            </div>
            <div className=" font-Matter flex flex-col gap-x-6  h-28  flex-wrap font-medium text-[1.3rem] text-[#000000]   ">
              {allItems.map((item, index) => (
                <div>
                  {index + 1}. {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-12 ">
        <div className=" flex w-full gap-28  ">
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Item Name
            </div>
            <input
              type="text"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
              placeholder="Enter the item Name"
            />
          </div>
          <div className=" w-full "></div>
        </div>
        <div className=" flex w-full gap-28  ">
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Material Type.
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
                    {material ? (
                      <div className=" text-[#464646] ">{material}</div>
                    ) : (
                      "Select material type"
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
                className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 pl-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
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
                  className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setMaterial("Steel");
                  }}
                >
                  Steel
                </div>
                <div
                  className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setMaterial("Stainless Steel");
                  }}
                >
                  Stainless Steel
                </div>
                <div
                  className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setMaterial("Aluminium");
                  }}
                >
                  Aluminium
                </div>
                <div
                  className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setMaterial("Galvanized Steel");
                  }}
                >
                  Galvanized Steel
                </div>
                <div
                  className=" py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                  onClick={() => {
                    setMaterial("Brass");
                  }}
                >
                  Brass
                </div>
              </motion.div>
            </div>
          </div>
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Quantity
            </div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
              placeholder="Enter quantity"
            />
          </div>
        </div>
        <div className=" w-full flex flex-col gap-3 ">
          <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
            <div> Dimensions</div>
            <Alert
              text={
                " The limitations for the dimentions are as follows Length (6 Meters), Height (2.5 Meters), Width (2.5 Meters) "
              }
            />
          </div>
          <div className=" flex w-full gap-12 ">
            <div className=" flex flex-col gap-3 w-full ">
              <input
                type="number"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="Length"
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="Height"
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <input
                type="number"
                value={breath}
                onChange={(e) => {
                  setBreath(e.target.value);
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="Width"
              />
            </div>
            <div className=" flex flex-col min-w-[10rem] gap-3 ">
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
                      {unit ? (
                        <div className=" text-[#464646] ">{unit}</div>
                      ) : (
                        "Select unit?"
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
                      setUnit("meter");
                    }}
                  >
                    Meters
                  </div>
                  <div
                    className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setUnit("centimeter");
                    }}
                  >
                    Centimeters
                  </div>
                  <div
                    className="  my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                    onClick={() => {
                      setUnit("inches");
                    }}
                  >
                    Inches
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex w-full gap-24 ">
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Item Description
              <span className=" text-[#BDBDBD] "> (Optional) </span>
            </div>
            <textarea
              value={description}
              onChange={handleChange}
              className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full h-32"
              placeholder="Write description here"
            />
          </div>
          <div className=" flex flex-col gap-3 w-full ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Visual Referance of Item
              <span className=" text-[#BDBDBD] "> (Optional) </span>
            </div>
            <div
              onClick={() => {
                if (!logo) {
                  fileInputRef.current.click();
                }
              }}
              className={clsx(
                " bg-[#FFFFFF] border-[1px] border-[#DFDFDF] rounded-2xl h-32 p-3  ",
                logo ? "" : ""
              )}
            >
              {!logo && (
                <div className=" cursor-pointer bg-[#F7F8F9] rounded-2xl border-[1px] flex flex-col items-center justify-center border-[#F1F1F1] h-full ">
                  <input
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .svg, .png"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={handleChange1}
                    style={{ display: "none" }}
                  />
                  <div className="  font-Circular text-[#4B5563]  mx-auto w-[250px] font-medium">
                    <div className=" flex items-center justify-center gap-2">
                      <Uploadlogo />
                      <div className=" font-Polysans font-semibold text-[0.9rem] text-[#4B5563]  ">
                        Upload Image
                      </div>
                    </div>

                    <div className=" text-center text-[#9CA3AF] font-normal pt-2 text-[0.9rem]">
                      Drag and drop or click here to upload
                    </div>
                  </div>
                </div>
              )}
              {logo && (
                <div className=" w-full h-full relative rounded-2xl  ">
                  <Image
                    className=" w-full h-full object-contain bg-[#F7F8F9] "
                    height={200}
                    width={200}
                    src={previewFile()}
                  />
                  <div
                    className=" absolute top-0 right-0 cursor-pointer "
                    onClick={() => {
                      setLogo();
                    }}
                  >
                    <Cross />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" flex w-full gap-28  ">
          <div className=" flex flex-col w-full gap-3 ">
            <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
              Application Environment
            </div>
            <div
              className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
              onClick={() => {
                setOpen4(!open4);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open4 ? "" : ""
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
                      rotate: open4 ? "180deg" : "0deg",
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
                  open4 ? "border " : ""
                } border-[#DFDFDF]   `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open4 ? "fit-content" : 0,

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
                setOpen5(!open5);
              }}
            >
              <div className="  flex items-center justify-between w-full   ">
                <div
                  className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                    open5 ? "" : ""
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
                      rotate: open5 ? "180deg" : "0deg",
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
                  open5 ? "border" : ""
                } border-[#DFDFDF]  `}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: open5 ? "fit-content" : 0,
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
                onChange={handleChange2}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="#FFFFFF"
              />
            </div>
            <div className=" w-full "></div>
          </div>
        )}
        <div className=" flex w-full ">
          <div
            className=" flex items-center gap-2 cursor-pointer justify-center w-[12rem] py-4 border-[1px] border-[#205FFF] rounded-xl text-[0.9rem] leading-none text-[#205FFF] font-medium  "
            onClick={() => {
              handleAddItem();
            }}
          >
            <Blueplus />
            Add another item
          </div>
          <div className=" w-full "></div>
        </div>
      </div>
    </div>
  );
};

export default Basicdetails;
