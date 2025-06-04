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

const Sidebar = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const pathname = usePathname();
  const [num, setnum] = useState();
  //console.log(pathname, "aaaaa");

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
    <div className=" h-full w-full">
      <div className=" flex flex-col w-full justify-between px-6 py-8 font-Matter bg-[#F7F8F9] h-full border border-[#DFDFDF] ">
        <div className=" w-full space-y-4 text-[1rem] text-[#737A82] font-normal ">
          <div className="pb-12 w-max px-4">
            <Link href={"/dashboard"}>
              <Logo />
            </Link>
          </div>
          <div className=" w-full ">
            <Link className=" w-full" href={"/dashboard"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] min-w-full rounded-[13px] flex gap-4 items-center ",
                  pathname == "/en/dashboard" || pathname == "/de/dashboard"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div>
                  <Dashboard />
                </div>
                <div className=" text-[0.94rem] 2xl:text-[1rem]">{t("p1")}</div>
              </div>{" "}
            </Link>{" "}
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/quotes"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex gap-4 items-center ",
                  pathname == "/en/dashboard/quotes" ||
                    pathname == "/de/dashboard/quotes" ||
                    pathname == "/en/dashboard/createquote" ||
                    pathname == "/de/dashboard/createquote"
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : pathname == "/en/dashboard/quotedetails" ||
                      pathname == "/de/dashboard/quotedetails" ||
                      pathname.includes("singlerequestquote")
                    ? "bg-white text-[#16191D] border-[#E2E4E8] "
                    : " border-transparent "
                )}
              >
                <div>
                  <Quotes />
                </div>
                <div className=" text-[0.94rem] 2xl:text-[1rem]">
                  {t("p13")}
                </div>
              </div>
            </Link>{" "}
          </div>
          <div className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/orders"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex gap-4 items-center ",
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
                  <Orders />
                </div>
                <div className=" text-[0.94rem] 2xl:text-[1rem]">
                  {t("p50")}
                </div>
              </div>
            </Link>
          </div>
          <div onClick={() => setnum(0)} className=" w-full ">
            {" "}
            <Link className=" w-full" href={"/dashboard/messages"}>
              <div
                className={clsx(
                  " px-4 py-3 border-[1.5px] w-full rounded-[13px] flex justify-between items-center ",
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
                    <Message />
                  </div>
                  <div className=" text-[0.94rem] 2xl:text-[1rem]">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
