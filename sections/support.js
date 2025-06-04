"use client";
import Add from "@/app/components/add";
import Bluetext from "@/app/components/bluetext";
import Greytext from "@/app/components/greytext";
import Navbar from "@/app/components/navbar";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Pluse from "@/public/icon/pluse";
import Profile from "@/public/icon/profile";
import Send from "@/public/icon/send";
import React, { useState } from "react";

const Support = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [hide, setHide] = useState(false);
  const click = () => {
    setHide(!hide);
  };
  const click2 = click;
  return (
    <div className=" w-full relative h-[100vh] overflow-y-scroll flex flex-col justify-between ">
      <div onClick={() => setHide(false)} className="px-10 w-full ">
        <div className="flex justify-between pt-4 pb-16 items-center">
          <div className=" text-[1.5rem] font-semibold font-Polysans">
            {t("p164")}
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className=" sticky top-0 z-[100]">
          <div className=" pt-4 bg-white ">
            <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[26px] flex gap-4 items-center px-6 py-4">
              <div>
                <Profile />
              </div>
              <div className="  ">
                <div className="text-[1rem] font-Polysans font-semibold   ">
                  Polycolor
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-1 w-1 bg-[#2AAA84] rounded-full"></div>
                  <div className="text-[#838486]  text-[0.95rem] font-normal font-Matter">
                    {t("p72")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  flex justify-center items-center py-4">
            <div className="bg-[#F4F4F4] border border-[#E5EAEF] rounded-[15px] font-Matter text-[0.9375rem] py-0.5 pb-1 font-medium  text-[#565656]  w-max px-4 ">
              {t("p165")}
            </div>
          </div>
        </div>
        <div className="pb-24 px-2">
          <Bluetext />
          <Greytext />
          <Bluetext />
          <Greytext />
          <Bluetext />
          <Greytext />
          <Bluetext />
          <Greytext />
        </div>
      </div>

      <div className="  flex justify-center w-full ">
        <div
          style={{ width: `calc(100vw - 22rem)` }}
          className=" fixed bottom-0 bg-white pb-5 px-10   "
        >
          <div className="bg-[#F7F8F9] border border-[#E5EAEF] flex  justify-between items-center rounded-[57px] pl-6 px-4 py-4 w-full ">
            <div className="w-full">
              <input
                type="text"
                placeholder={t("p75")}
                className="bg-[#F7F8F9] text-[0.80rem] font-normal text-[#737A82] w-full outline-none"
                id=""
              />
            </div>
            <div className="flex gap-3 items-center">
              <div onClick={click} className=" hover:cursor-pointer ">
                <Pluse />
              </div>
              <div>
                <Send />
              </div>
            </div>
          </div>
          <div
            className={` absolute bottom-[55px] right-24 z-[1000] ${
              hide ? "block" : "hidden"
            } ${click2 ? "hideen" : ""}`}
          >
            <Add />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
