"use client";
import Message from "@/public/icon/message";
import Orders from "@/public/icon/orders";
import Quotes from "@/public/icon/quotes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Arrowright from "@/public/icon/arrowright";
import Logo2 from "@/public/icon/logo2";
import Getuserunreadmessage from "@/api/getuserunreadmessage";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Dashboard from "@/public/icon/dashboard";

import { motion } from "framer-motion";
import No from "./no";

const Ipadsidebar = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const router = useRouter();
  const tabRefs = useRef([]);
  const pathname = usePathname();
  const [num, setnum] = useState();
  //console.log(pathname, "aaaaa");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  //   const [activeTab, setActiveTabState] = useState(0); // Initial tab is 0

  useEffect(() => {
    // Remove the language prefix from the pathname
    const cleanedPath = pathname.replace(/^\/(en|de)\//, "/");

    // Determine active tab based on the cleaned pathname
    let newActiveTab = activeTab; // Default to current active tab if no match is found

    if (cleanedPath.includes("quote")) {
      newActiveTab = 2;
    } else if (cleanedPath.includes("order")) {
      newActiveTab = 3;
    } else if (cleanedPath.includes("messages")) {
      newActiveTab = 4;
    } else if (cleanedPath.startsWith("/dashboard")) {
      newActiveTab = 1; // Default to 1 if no match is found
    }

    // Update the state and call the setActiveTab function
    setActiveTab(newActiveTab);
    setActiveTab(newActiveTab);
  }, [pathname, activeTab, setActiveTab]);

  //   // Return the current active tab if needed
  //   return activeTab;
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
    <div className="px-[2.3rem] ">
      <div className="border border-[#DFDFDF] bg-[#F7F8F9]   rounded-full p-[0.5rem]">
        <div className=" ">
          <div className=" flex justify-between  ">
            <Link className="w-full" href={"/dashboard"}>
              <div
                //   ref={(el) => (tabRefs.current[1] = el)}
                onClick={() => setActiveTab(1)}
                className={clsx(
                  "px-5 py-3  w-max  relative flex gap-3 items-center",
                  activeTab == 1 ? "text-black" : "",
                  pathname === "/en/dashboard" || pathname === "/de/dashboard"
                    ? ""
                    : ""
                )}
              >
                {activeTab == 1 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] py-2 border-[1px] border-[#E2E4E8]  text-[#000000]"
                  />
                )}
                <div className="z-20">
                  <Dashboard size={24} />
                </div>
                <div className="text-[1rem] z-20 font-Matter">{t("p1")}</div>
              </div>
            </Link>
            <Link className=" w-full" href={"/dashboard/quotes"}>
              <div
                //   ref={(el) => (tabRefs.current[2] = el)}
                onClick={() => setActiveTab(2)}
                className={clsx(
                  " px-8 py-3  w-max  relative flex gap-3 items-center ",
                  pathname == "/en/dashboard/quotes" ||
                    pathname == "/de/dashboard/quotes" ||
                    pathname == "/en/dashboard/createquote" ||
                    pathname == "/de/dashboard/createquote"
                    ? " "
                    : pathname == "/en/dashboard/quotedetails" ||
                      pathname == "/de/dashboard/quotedetails"
                    ? " "
                    : "  "
                )}
              >
                {activeTab == 2 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8] px-3  text-[#000000]"
                  />
                )}
                <div className="z-20">
                  <Quotes size={"24"} />
                </div>
                <div className="z-20 font-Matter">{t("p13")}</div>
              </div>
            </Link>{" "}
            <Link className=" w-full" href={"/dashboard/orders"}>
              <div
                //   ref={(el) => (tabRefs.current[3] = el)}
                className={clsx(
                  " px-8 py-3  w-max relative flex pr-26  gap-3 items-center ",
                  pathname == "/en/dashboard/orders" ||
                    pathname == "/de/dashboard/orders"
                    ? " "
                    : pathname == "/en/dashboard/orderdetails" ||
                      pathname == "/de/dashboard/orderdetails"
                    ? " "
                    : "  "
                )}
                onClick={() => setActiveTab(3)}
              >
                {activeTab == 3 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8] px-3  text-[#000000]"
                  />
                )}
                <div className="z-20">
                  <Orders size={"24"} />
                </div>
                <div className="z-20 font-Matter">{t("p50")}</div>
              </div>
            </Link>
            <Link className=" w-full" href={"/dashboard/messages"}>
              <div
                //   ref={(el) => (tabRefs.current[4] = el}
                className={clsx(
                  " px-8 py-3 pr-5 w-full  relative flex gap-3   items-center ",
                  pathname == "/en/dashboard/messages" ||
                    pathname == "/de/dashboard/messages"
                    ? " "
                    : pathname == "/en/dashboard/messages" ||
                      pathname == "/de/dashboard/messages"
                    ? " "
                    : "  "
                )}
                onClick={() => setActiveTab(4)}
              >
                {activeTab == 4 && (
                  <motion.span
                    layoutId="tabs1"
                    className="bg-[#FFFFFF] absolute  rounded-full left-0 w-full h-[100%] border-[1px] border-[#E2E4E8]  text-[#000000]"
                  />
                )}
                <div className="flex gap-4 items- z-20">
                  <div>
                    <Message size={"24"} />
                  </div>
                  <div className=" font-Matter">{t("p15")}</div>
                </div>
                {num > 0 && (
                  <div>
                    <No num={num} />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ipadsidebar;
