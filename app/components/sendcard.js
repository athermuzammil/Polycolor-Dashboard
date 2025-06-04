import { useCurrentLocale, useI18n } from "@/locales/client";
import Tick from "@/public/icon/tick";
import Link from "next/link";
import React from "react";

const Sendcard = ({
  type,
  quoteNum,
  orderNum,
  items,
  date,
  time,
  service,
  amount,
  status,
  id,
  allitems,
}) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <div className=" py-3 mt-3.5 ">
      <div className=" bg-[#F7F8F9] border-[#E5EAEF] border-[1px] rounded-3xl flex flex-col gap-3 p-3 w-[390px] font-Matter font-medium ">
        <div className=" flex items-center justify-between text-[#3F3F3F] text-[1rem] font-Matter font-medium leading-none px-3 ">
          {type == 1 && <div>{t("p35")}</div>}
          {type == 2 && (
            <div>
              {t("p28")} #{quoteNum} {t("p143")}
            </div>
          )}
          {type == 3 && (
            <div className=" flex items-center gap-1 ">
              <Tick />
              {t("p28")} #{quoteNum} {t("p210")}
            </div>
          )}
          {type == 4 && (
            <div className=" flex items-center gap-1 ">
              <Tick />
              {t("p144")} #{orderNum}
            </div>
          )}
          <Link
            href={
              type == 1
                ? `/dashboard/singlerequestquote?id=${id}`
                : type == 2 || type == 3
                ? `/dashboard/quotedetails?id=${id}`
                : `/dashboard/orderdetails?id=${id}`
            }
          >
            <div className=" bg-[#FFFFFF] rounded-full py-2.5 px-4 text-[0.9rem] font-medium leading-none text-[#363B40] cursor-pointer border border-[#E5EAEF]   ">
              {t("p145")}
            </div>
          </Link>
        </div>
        <div className=" bg-[#FFFFFF] rounded-3xl p-4 border-[#E5EAEF] border-[1px] w-full flex flex-col gap-16   ">
          <div className=" w-full flex items-start justify-between ">
            <div className=" flex flex-col gap-2 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">{t("p146")}</div>
              <div className=" text-[#363B40] text-[0.9rem] flex items-center  ">
                {allitems?.map((item, index) => (
                  <div>
                    {item.name}
                    {index == 0 || index == allitems.length ? "," : ""}{" "}
                    {index > 2 && "..."}
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex flex-col items-end gap-2 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">
                {type == 3 && <div>{t("p147")}</div>}
                {type == 4 && <div>{t("p148")}</div>}
                {type == 1 && <div>{t("p149")}</div>}
                {type == 2 && <div>{t("p150")}</div>}
              </div>
              <div className=" text-[#363B40] text-[0.9rem]   ">
                {type == 2 ? (
                  <div>{date}</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div>{date}</div>
                    <div>{time}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" w-full flex items-start justify-between  ">
            <div className=" flex flex-col gap-2 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">
                {type == 2 || type == 3 || type == 4 ? (
                  <div>{t("p151")}</div>
                ) : (
                  <div>{t("p220")}</div>
                )}
              </div>
              <div className=" text-[#363B40] text-[1.5rem] leading-none
                ">
                {type == 2 || type == 3 || type == 4 ? (
                  <div>CHF {amount}</div>
                ) : (
                  <div>{service}</div>
                )}
              </div>
            </div>

            <div className=" flex flex-col items-end gap-2 ">
              <div className=" text-[#737A82] text-[0.9rem]  ">{t("p222")}</div>
              <div className=" text-[#363B40] text-[1.4rem] leading-none  ">
                {items}
              </div>
            </div>
          </div>
        </div>
        {type == 4 && (
          <div className=" flex justify-start pl-4 items-center gap-2 ">
            <div className=" text-[#737A82] text-[0.9rem]  ">Status</div>
            <div className=" text-[#363B40] text-[0.9rem]  ">{status}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sendcard;
