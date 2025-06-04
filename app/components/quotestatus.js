import { useCurrentLocale, useI18n } from "@/locales/client";
import formatDateAndTime from "@/utils/formatDateAndTime";
import React from "react";

const Quotestatus = ({ valid, create, status }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <div>
      <div>
        <div className="bg-[#F7F8F9]  text-[#ADAEAE] text-[1rem] font-Polysans font-normal">
          <div>{t("p106")}</div>
          <div className=" font-Matter font-medium text-[#393B3E] pt-1">
            {status || "Pending from you"}
          </div>
          <div className="pt-4">{t("p107")}</div>
          <div className=" font-Matter font-medium text-[#393B3E] pt-1">
            {formatDateAndTime(create).date}
          </div>
          <div className=" pt-4">{t("p108")}</div>
          <div className=" font-Matter font-medium text-[#393B3E] pt-1">
            {formatDateAndTime(valid).date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotestatus;
