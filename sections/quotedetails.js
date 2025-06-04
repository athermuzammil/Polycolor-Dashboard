"use client";
import getquotebyid from "@/api/getquotebyid";
import Navbar from "@/app/components/navbar";
import Quotestatus from "@/app/components/quotestatus";
import Arrowleft from "@/public/icon/arrowleft";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import UpdateQuote from "@/api/updatequote";
import clsx from "clsx";
import { BACKEND_URL } from "@/api/variables";

import Download from "@/public/icon/download";
import Spinner from "@/app/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Download1 from "@/public/icon/download1";

const Quotedetails = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [data, setData] = useState();
  const [day, setDay] = useState(12);
  const [year, setYear] = useState(12);
  const [month, setMonth] = useState(12);
  const [token, setToken] = useState();
  const [pageload, setpageload] = useState(true);
  const search = useSearchParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const id = search.get("id");
  useEffect(() => {
    const at = localStorage.getItem("token");
    setToken(at);
    const getDetails = async () => {
      const res = await getquotebyid(id, at);
      if (res?.error) {
        setError(true);
        return;
      }
      //console.log(res, "iiiiii");
      //console.log(res?.file, "iiiiii");
      setData(res);
      const dateString = res?.createdAt;

      // Create a Date object from the date string
      const dateObject = new Date(dateString);

      // Extract the year, month, and date
      setYear(dateObject.getFullYear());
      setMonth(dateObject.getMonth() + 1);
      setDay(dateObject.getDate());
      setpageload(false);
    };
    getDetails();
  }, []);

  const [src, setsrc] = useState();
  useEffect(() => {
    if (data?.file) {
      setsrc(`https://media.polycolor.ch/polycolor-media/${data?.file}`);
    }
  }, [data]);

  function checkDate(dateStr) {
    const inputDate = new Date(dateStr);
    const currentDate = new Date();
    return inputDate >= currentDate;
  }

  const updatequotestatus = async (status) => {
    if (status == "Accepted") {
      setLoading(true);
    } else {
      setLoading1(true);
    }
    const res = await UpdateQuote(id, status, token);
    setData(res);
    //console.log(res, "statussss");
    setLoading(false);
    setLoading1(false);
    // window.location.reload();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full px-10 ">
        <div className="flex justify-between  w-full pt-10 items-center">
          <div className="flex gap-4">
            <div>
              <Arrowleft />
            </div>
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p28")}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="text-[2rem] font-Polysans font-semibold text-center text-[#FF0000]">
          {t("p162")}
        </div>
      </div>
    );
  }

  if (pageload) {
    return (
      <div className=" w-full h-[100vh] flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-10 h-[100vh]">
      <div className="h-full ">
        <div className="flex justify-between pt-5 items-center">
          <div className="flex gap-4">
            <div>
              <Arrowleft />
            </div>
            <div className="font-Polysans font-semibold text-[1.5rem] ">
              {t("p28")} - #{data?.quotenumber}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="flex gap-8 w-full pb-20 pt-6 h-full">
          <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[41px] px-16 pt-16 w-[70%] h-full ">
            <div className="bg-[#FFFFFF] rounded-t-[23px] h-full">
              {src && (
                <Worker
                  className="px-0"
                  workerUrl={`https://unpkg.com/pdfjs-dist@${process.env.NEXT_PUBLIC_PDFJS_VERSION}/build/pdf.worker.min.js`}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    <Viewer
                      className="h-full w-full object-cover"
                      fileUrl={src}
                    />
                  </div>
                </Worker>
              )}
            </div>
          </div>
          <div className=" w-[30%] ">
            <div className=" bg-[#F7F8F9] border border-[#E5EAEF] rounded-[32px]  px-4 py-4">
              <Quotestatus
                valid={data?.validTill}
                status={data?.Status}
                create={data?.createdAt}
              />
              {checkDate(data?.validTill)
                ? !data?.Status && (
                    <div className="flex gap-4 pt-8">
                      <div
                        onClick={() => updatequotestatus("Accepted")}
                        className="cursor-pointer bg-[#1053FF] flex justify-center items-center text-center w-[60%] py-3 px-3 rounded-full font-Matter font-medium text-white"
                      >
                        {loading ? <div className="loadersm" /> : t("p258")}
                      </div>
                      <div
                        onClick={() => updatequotestatus("Rejected")}
                        className="cursor-pointer w-[40%] bg-[#FFFFFF] text-center flex justify-center items-center border border-[#E5EAEF] py-3 px-3 rounded-full font-Matter font-medium text-black"
                      >
                        {loading1 ? (
                          <div className="loadersmblue" />
                        ) : (
                          t("p257")
                        )}
                      </div>
                    </div>
                  )
                : !data.Status && (
                    <div className=" w-full mt-4 bg-[#FFFFFF] text-center flex justify-center items-center border border-[#E5EAEF] py-3 px-3 rounded-full font-Matter text-black">
                      Expired
                    </div>
                  )}
              {data?.Status && (
                <div className=" pt-8 ">
                  <div className="   text-center w-[100%] py-3 px-3 rounded-full bg-white font-Matter font-medium  border border-[#E5EAEF]  ">
                    {data.Status == "Accepted" ? t("p210") : t("p211")}
                  </div>
                </div>
              )}
            </div>
            <div className=" flex flex-col xl:flex-row gap-4 items-center  pt-4 xl:pt-6">
              <Link className="  w-full" href={"/dashboard/messages"}>
                <div className=" font-Matter text-[1rem]   font-medium border border-[#D9DEE3]  rounded-[42px] w-full py-4 text-center  ">
                  {t("p256")} polycolor
                </div>
              </Link>
              <Link className="  w-max " href={src ? src : ""} target="#">
                <div className=" hidden xl:block">
                  <Download />
                </div>
                <div
                  className={`xl:hidden py-4 border-[#205FFF] border rounded-[42px] w-full flex justify-center items-center gap-4 px-12 lg:px-12 ${
                    currentLocale == "en" ? "px-12" : "px-7"
                  } `}
                >
                  <Download1 />
                  <div className=" font-Matter font-medium text-[1rem] text-[#205FFF] ">
                    {t("p196")}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotedetails;
