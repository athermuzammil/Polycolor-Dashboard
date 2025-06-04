"use client";
import Circle from "@/public/icon/circle";
import Dashboard from "@/public/icon/dashboard";
import Logo from "@/public/icon/logo";
import Message from "@/public/icon/message";
import Orders from "@/public/icon/orders";
import Quotes from "@/public/icon/quotes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import No from "./no";
import Getuserunreadmessage from "@/api/getuserunreadmessage";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { easeInOut, motion } from "framer-motion";
import Arrowright from "@/public/icon/arrowright";
import Logo2 from "@/public/icon/logo2";

const Sidebar2 = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const pathname = usePathname();
  const [num, setnum] = useState();
  //console.log(pathname, "aaaaa");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      const token = localStorage.getItem("token");
      const res = await Getuserunreadmessage(token);
      //console.log(res, "rrrrrrrrrrrr");
      setnum(res?.userunreadmessages);
    };
    getdata();
  }, []);

  return (
    <div className=" w-full h-full relative z-[100] ">
      <motion.div
        className={` overflow-hidden duration-300 relative z-[40]    h-full  w-full`}
        initial={{
          width: "7.7rem",
        }}
        animate={{
          width: open ? "17rem" : "7.7rem",
        }}
        transition={{
          duration: 0.1,
          ease: easeInOut,
        }}
      >
        <div className=" flex flex-col w-full justify-between px-6 py-8 font-Matter bg-[#F7F8F9] h-full border border-[#DFDFDF] ">
          <div className=" w-full space-y-8 text-[1.3rem] text-[#737A82] font-normal ">
            <div className="pb-12 w-max mx-auto">
              <Link href={"/"}>
                <Logo2 />
              </Link>
            </div>
            <div
              className=" w-full "
              onClick={() => {
                setOpen(false);
              }}
            >
              <Link className=" w-full" href={"/dashboard"}>
                <div
                  className={clsx(
                    " px-5 py-3 border-[1.5px] min-w-full rounded-[13px] flex gap-4 pr-3 items-center ",
                    pathname == "/en/dashboard" || pathname == "/de/dashboard"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div>
                    <Dashboard size={"28"} />
                  </div>
                  <div
                    className={`${open ? " block " : "hidden"} text-[1.3rem]`}
                  >
                    {t("p1")}
                  </div>
                </div>{" "}
              </Link>{" "}
            </div>
            <div
              className=" w-full "
              onClick={() => {
                setOpen(false);
              }}
            >
              {" "}
              <Link className=" w-full" href={"/dashboard/quotes"}>
                <div
                  className={clsx(
                    " px-5 py-3 border-[1.5px] w-full rounded-[13px] flex gap-4 items-center ",
                    pathname == "/en/dashboard/quotes" ||
                      pathname == "/de/dashboard/quotes" ||
                      pathname == "/en/dashboard/createquote" ||
                      pathname == "/de/dashboard/createquote"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : pathname == "/en/dashboard/quotedetails" ||
                        pathname == "/de/dashboard/quotedetails"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div>
                    <Quotes size={"28"} />
                  </div>
                  <div className={`${open ? " block " : "hidden"}`}>
                    {t("p13")}
                  </div>
                </div>
              </Link>{" "}
            </div>
            <div
              className=" w-full "
              onClick={() => {
                setOpen(false);
              }}
            >
              {" "}
              <Link className=" w-full" href={"/dashboard/orders"}>
                <div
                  className={clsx(
                    " px-5 py-3 border-[1.5px] w-full rounded-[13px] flex pr-3 gap-4 items-center ",
                    pathname == "/en/dashboard/orders" ||
                      pathname == "/de/dashboard/orders"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : pathname == "/en/dashboard/orderdetails" ||
                        pathname == "/de/dashboard/orderdetails"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div>
                    <Orders size={"28"} />
                  </div>
                  <div className={`${open ? " block " : "hidden"}`}>
                    {t("p50")}
                  </div>
                </div>
              </Link>
            </div>
            <div
              onClick={() => {
                setnum(0);
                setOpen(false);
              }}
              className=" w-full "
            >
              {" "}
              <Link className=" w-full" href={"/dashboard/messages"}>
                <div
                  className={clsx(
                    " px-5 py-3 border-[1.5px] w-full rounded-[13px] flex justify-between items-center ",
                    pathname == "/en/dashboard/messages" ||
                      pathname == "/de/dashboard/messages"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : pathname == "/en/dashboard/messages" ||
                        pathname == "/de/dashboard/messages"
                      ? "bg-white text-[#16191D] border-[#E2E4E8] "
                      : " border-transparent "
                  )}
                >
                  <div className="flex gap-4 items-center">
                    <div>
                      <Message size={"28"} />
                    </div>
                    <div className={`${open ? " block " : "hidden"}`}>
                      {t("p15")}
                    </div>
                  </div>
                  {num > 0 && (
                    <div>
                      <No num={num} />
                    </div>
                  )}
                </div>
              </Link>
            </div>
            <div className=" flex gap-6  items-center absolute bottom-[10%] right-[1.5rem] ">
              <div
                className={` ${
                  open ? "block" : "hidden"
                } font-Matter font-medium text-[1.5rem] leading-none text-black  `}
              >
                Close
              </div>
              <div
                className={` flex  px-2 py-2 bg-white border-[#E2E4E8] rounded-full border  ${
                  open ? "rotate-180" : "rotate-0"
                } duration-200 `}
                onClick={(e) => {
                  setOpen(!open);
                  //   e.preventDefault();
                }}
              >
                <Arrowright color={"#000000"} size={"30"} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div
        className={` fixed z-10 h-screen w-[calc(100vw)] top-0 right-0 bg-black opacity-40 ${
          open ? " block xl:hidden " : "hidden"
        } `}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
    </div>
  );
};

export default Sidebar2;
