"use client";
import { useCurrentLocale, useI18n } from "@/locales/client";
import formatDateAndTime from "@/utils/formatDateAndTime";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Quotesid = ({
  itemno,
  cost,
  quoteid,
  date,
  month,
  year,
  accept,
  orderId,
}) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [message, setmessage] = useState();

  return (
    <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] font-Polysans px-[8px] pb-[8px]  w-full lg:w-[335px]  xl:w-[290px] 1xl:w-[350px] ">
      <div className=" font-semibold  py-4 px-4">
        {t("p28")} - #{quoteid}
      </div>
      <div className="bg-[#ffffff] border border-[#E5EAEF] rounded-[32px] pt-4 pb-6 px-4">
        <div className="text-[#76828D] text-[0.9rem] ">{t("p28")}</div>
        <div className=" font-Matter pt-1 text-[#2F3133] font-medium  text-[1.1rem]">
          CHF {cost}
        </div>
        <div className="flex justify-between text-[#ADAEAE] text-[1.0625rem] py-7 pt-16 ">
          <div>
            <div className="text-[#76828D] text-[0.9rem] font-normal">
              {t("p21")}
            </div>
            <div className=" text-[#2F3133]  font-medium text-[1.1rem] font-Matter  ">
              {itemno}
            </div>
          </div>
          <div>
            <div className=" font-normal text-[#76828D] text-[0.9rem] ">
              {t("p22")}
            </div>
            <div className="text-[1.1rem]  font-Matter font-medium text-[#2F3133] ">
              {formatDateAndTime(date).date}
            </div>
          </div>
        </div>
        <div className=" pt-4 flex items-end justify-between">
          <div className="  pt-4">
            <div className=" text-[#76828D]  font-normal text-[0.9rem]">
              {t("p209")}
            </div>
            {!accept && (
              <span className=" font-Matter font-medium text-[1rem] ">
                {t("p23")}
              </span>
            )}
            {accept && orderId && (
              <span className=" text-black  font-Matter font-medium text-[1rem] ">
                {" "}
                {t("p24")}{" "}
              </span>
            )}
            {accept && !orderId && (
              <div
                className={`text-[1rem] ${
                  accept == "Accepted" ? "text-[#37BD8D]" : " text-red-400 "
                } font-Matter font-medium`}
              >
                {accept}
              </div>
            )}
          </div>
          {orderId && (
            <Link href={`/dashboard/orderdetails?id=${orderId}`}>
              <div className=" px-4 py-2 rounded-full text-[0.9rem] font-Matter border-[#E5EAEF] border ">
                {t("p26")}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quotesid;
