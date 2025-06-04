"use client";
import { useCurrentLocale, useI18n } from "@/locales/client";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Quoteidreq = ({
  id,
  itemno,
  express,
  quoteid,
  date,
  accept,
  index,
  totaldata,
}) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [show, setshow] = useState(false);
  const [message, setmessage] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    //console.log(show, "immmmmm");
  }, [show]);

  useEffect(() => {
    if (accept == "Accepted") {
      setmessage(t("p210"));
    } else if (accept == "Rejected") {
      setmessage(t("p211"));
    } else {
      setmessage(t("p338"));
    }
  }, []);

  useEffect(() => {
    //console.log(data, "dataaaaaaa");
  }, [data]);

  return (
    <Link href={`/dashboard/singlerequestquote?id=${id}`}>
      <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] font-Polysans  px-[8px] pb-[8px]  w-full lg:w-[335px]  xl:w-[290px] 1xl:w-[350px]  ">
        <div className=" font-semibold text-[1rem] py-4 px-4">{t("p35")}</div>
        <div className="bg-[#ffffff] border border-[#E5EAEF] rounded-[32px] pt-4 pb-6 px-4">
          <div className="text-[#76828D] text-[0.9rem] ">{t("p220")}</div>
          <div className=" font-Matter  text-[#2F3133]  text-[1.1rem]">
            {express ? t("p336") : t("p337")}
          </div>
          <div className="flex justify-between text-[#ADAEAE] text-[1.0625rem] py-7 pt-16 ">
            <div>
              <div className=" font-normal text-[#76828D] text-[0.9rem] ">
                {t("p21")}
              </div>
              <div className=" font-medium  text-[#2F3133] text-[1.1rem] ">
                {itemno}
              </div>
            </div>
            <div>
              <div className=" font-normal text-[#76828D] text-[0.9rem] ">
                {t("p221")}
              </div>
              <div className=" font-medium  text-[#2F3133] text-[1.1rem] font-Matter">
                {date}
              </div>
            </div>
          </div>
          <div className="  pt-8 flex items-end justify-between">
            <div>
              <div className=" text-[#76828D] font-normal text-[0.9rem]">
                {t("p209")}
              </div>
              <div
                className={`text-[1rem] font-medium ${
                  accept == "Accepted"
                    ? "text-[#37BD8D]"
                    : accept == "Rejected"
                    ? "text-[#F75A5A]"
                    : "text-[#2F3133]"
                } font-Matter  `}
              >
                {message}
              </div>
            </div>
            {accept == "Accepted" && (
              <div
                className={clsx(
                  "bg-[#205FFF] rounded-[42px] px-4 py-2 h-max text-[#FFFFFF] text-[0.9rem] cursor-pointer "
                )}
                onClick={(e) => {
                  setshow(true);
                  setData(totaldata[index]);
                  e.preventDefault();
                }}
              >
                {t("p25")}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Quoteidreq;
