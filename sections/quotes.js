"use client";
import { getToken } from "@/api/getToken";
import getUserQuotes from "@/api/getquotes";
import Navbar from "@/app/components/navbar";
import Quotesid from "@/app/components/quotesid";
import Filter from "@/public/icon/filter";
import Sort from "@/public/icon/sort";
import React, { useEffect, useState } from "react";
import QuotesList from "./quoteslist";
import Quoteskeleton from "./quoteskeleton";
import Quoteidreq from "@/app/components/quoteidreq";
import Getrequestedquotes from "@/api/getrequestedquotes";
import { useUser } from "@/redux/userContext";
import formatDateAndTime from "@/utils/formatDateAndTime";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Norequestedquotes from "@/public/icon/norequestedquotes";
import { easeInOut, motion } from "framer-motion";
import Plus2 from "@/public/icon/plus2";

const Quotes = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const token1 = getToken();
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const [quotes, setquotes] = useState();
  const [tab, setTab] = useState(1);
  const [fdata, setFdata] = useState();
  const [loading, setLoading] = useState(true);
  const { state } = useUser();
  const user = state.user;

  useEffect(() => {
    const at = localStorage.getItem("token");
    setToken(at);
    const getallquotes = async () => {
      const res1 = await getUserQuotes(at);
      console.log(res1, "qqqqqqq");
      setData(res1);
      setFdata(res1);
      setLoading(false);
    };
    getallquotes();
  }, []);

  useEffect(() => {
    const quotes = async () => {
      const data = await Getrequestedquotes(token1, user._id);
      console.log(data, "quotes");
      setquotes(data);
    };
    quotes();
  }, []);

  const hightolow = () => {
    const sortedQuotes = [...data].sort((a, b) => b.total - a.total);
    setData(sortedQuotes);
  };

  const lowtohigh = () => {
    const sortedQuotes = [...data].sort((a, b) => a.total - b.total);
    setData(sortedQuotes);
  };

  const earliest = () => {
    const sortedQuotes = [...data].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData(sortedQuotes);
  };

  const latest = () => {
    const sortedQuotes = [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(sortedQuotes);
  };

  const quotelowtohigh = () => {
    const sortedQuotes = [...data].sort(
      (a, b) => a.quotenumber - b.quotenumber
    );
    setData(sortedQuotes);
  };

  const quotehightolow = () => {
    const sortedQuotes = [...data].sort(
      (a, b) => b.quotenumber - a.quotenumber
    );
    setData(sortedQuotes);
  };

  return (
    <div className="px-10 pt-4">
      <div>
        <div className=" flex justify-between items-center">
          <div className="text-[#141415] font-semibold font-Polysans text-[1.5rem]">
            {t("p205")} polycolor
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div
          className={`py-4 flex  items-center justify-between w-full  text-[#16191D]  font-medium text-[0.90rem] font-Matter pb-10 ${
            currentLocale == "en" ? "gap-4 lg:gap-6" : "gap-2 lg:gap-6"
          }`}
        >
          <div className=" flex items-center border bg-[#F5F5F5] border-[#FFFFFF] rounded-[53px] p-1 ">
            <div
              className={`px-6 py-3 cursor-pointer border  rounded-3xl ${
                tab == 1
                  ? "bg-white text-black  border-[#ECECEC] "
                  : "text-[#565656] border-transparent "
              } duration-300 cursor-pointer  `}
              onClick={() => {
                setTab(1);
              }}
            >
              {t("p206")}
              <span
                className={` ${
                  currentLocale == "en"
                    ? " hidden xl:inline"
                    : " hidden 1xl:inline"
                } `}
              >
                {" "}
                {t("p339")}
              </span>
            </div>
            <div
              className={`px-6 py-3 cursor-pointer border  rounded-3xl ${
                tab == 2
                  ? "bg-white text-black  border-[#ECECEC] "
                  : "text-[#565656] border-transparent "
              } duration-300 cursor-pointer  `}
              onClick={() => {
                setTab(2);
              }}
            >
              {t("p207")}

              <span
                className={` ${
                  currentLocale == "en"
                    ? " hidden xl:inline"
                    : " hidden 1xl:inline"
                } `}
              >
                {" "}
                {t("p339")}
              </span>
            </div>
          </div>
          <div className=" flex items-center gap-2 lg:gap-6 ">
            {tab === 1 && (
              <>
                <Select
                  onValueChange={(e) => {
                    if (e == "one") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.Status === "Accepted"
                      );
                      setData(filteredQuotes);
                    } else if (e == "two") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.Status === "Rejected"
                      );
                      setData(filteredQuotes);
                    } else if (e == "three") {
                      const filteredQuotes = fdata.filter(
                        (quote) => quote.Status === null
                      );
                      setData(filteredQuotes);
                    } else if (e == "four") {
                      setData(fdata);
                    }
                  }}
                >
                  <SelectTrigger
                    className={`flex   items-center border border-[#E5EAEF] rounded-[53px]  py-4 h-[50px] relative ${
                      currentLocale == "en"
                        ? "w-[120px] gap-4 px-6"
                        : " px-5 lg:px-6 lg:gap-4 gap-3  w-[110px] lg:w-[120px]"
                    }  `}
                  >
                    <div>
                      <Filter />
                    </div>
                    <div>{t("p208")}</div>
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-xl font-Matter text-[1rem] font-medium 
                  w-[150px]"
                  >
                    <div className="  text-black pl-4 py-4 w-max   ">
                      {t("p209")}
                    </div>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D] flex items-center "
                      value="one"
                    >
                      {t("p210")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                      value="two"
                    >
                      {t("p211")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]"
                      value="three"
                    >
                      {t("p42")}
                    </SelectItem>
                    <SelectItem
                      className="rounded-xl cursor-pointer py-2 text-[#76828D]"
                      value="four"
                    >
                      {t("p212")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  className=""
                  onValueChange={(e) => {
                    if (e == "one") {
                      lowtohigh();
                    } else if (e == "two") {
                      hightolow();
                    } else if (e == "three") {
                      latest();
                    } else if (e == "four") {
                      earliest();
                    } else if (e == "five") {
                      quotehightolow();
                    } else if (e == "six") {
                      quotelowtohigh();
                    }
                  }}
                >
                  <SelectTrigger
                    className={`flex  items-center border border-[#E5EAEF] rounded-[53px]  py-4 h-[50px] relative ${
                      currentLocale == "en"
                        ? "w-[110px] gap-4 px-6"
                        : "w-[120px] lg:w-[140px] gap-3 lg:gap-4 pl-3 lg:px-6"
                    } `}
                  >
                    <div>
                      <Sort />
                    </div>
                    <div>{t("p16")}</div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl w-[250px] font-Matter text-[1rem] font-medium relative z-[100000000000] ">
                    <div className="  text-black pl-4 py-4    ">
                      {t("p213")}
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D] flex items-center  "
                        value="one"
                      >
                        {t("p214")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D] flex items-center  "
                        value="two"
                      >
                        {t("p215")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="three"
                      >
                        {t("p216")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="four"
                      >
                        {t("p217")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="five"
                      >
                        {t("p218")}
                      </SelectItem>
                    </div>
                    <div>
                      <SelectItem
                        className="rounded-xl cursor-pointer py-2 text-[#76828D]  "
                        value="six"
                      >
                        {t("p219")}
                      </SelectItem>
                    </div>
                  </SelectContent>
                </Select>
              </>
            )}
            <Link href={"/dashboard/createquote"}>
              <div className=" leading-none bg-[#1053FF] rounded-full font-Matter hidden lg:flex  text-[1rem] font-medium text-white px-8 h-[50px] cursor-pointer items-center justify-center   ">
                {t("p202")}
              </div>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-wrap gap-8 pb-10 ">
            <Quoteskeleton />
            <Quoteskeleton />
            <Quoteskeleton />
            <Quoteskeleton />
            <Quoteskeleton />
            <Quoteskeleton />
          </div>
        ) : tab == 1 ? (
          <div className="  ">
            <QuotesList data={data} />
          </div>
        ) : (
          <div className=" flex w-full flex-col lg:flex-row flex-wrap gap-8 ">
            {" "}
            {quotes.length == 0 ? (
              <div className=" w-[500px] mx-auto py-10 ">
                <Norequestedquotes />
              </div>
            ) : (
              quotes?.map((quote, index) => (
                <Quoteidreq
                  totaldata={quotes}
                  index={index}
                  id={quote._id}
                  quoteid={quote.quotenumber}
                  cost={quote.total}
                  itemno={quote.items?.length}
                  date={formatDateAndTime(quote.createdAt).date}
                  accept={quote.Status}
                  express={quote?.additionalDetails?.expressDelivery}
                />
              ))
            )}
          </div>
        )}
      </div>
      <motion.div
        className={` fixed h-[54px] rounded-[54px] flex lg:hidden ${
          popUp ? " pl-2 gap-1 pr-4 justify-between " : "justify-center"
        }   items-center overflow-hidden bottom-32 right-10 bg-[#1053FF] `}
        initial={{
          width: "54px",
        }}
        animate={{
          width: popUp ? (currentLocale == "en" ? "175px " : "215px") : "54px",
        }}
        transition={{
          duration: 0.2,
          ease: easeInOut,
        }}
      >
        <motion.div
          initial={{
            rotate: "0deg",
          }}
          animate={{
            rotate: popUp ? "135deg" : "0deg",
          }}
          transition={{
            duration: 0.2,
            ease: easeInOut,
          }}
          onClick={() => {
            setPopUp(!popUp);
          }}
        >
          <Plus2 />
        </motion.div>
        <Link href={"/dashboard/createquote"}>
          <motion.div
            className={`${
              popUp ? " flex  " : " hidden  "
            } font-Matter  text-white text-[0.9rem] font-medium leading-none duration-200 delay-300 `}
          >
            <div className=" min-w-[150px]  "> {t("p202")}</div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Quotes;
