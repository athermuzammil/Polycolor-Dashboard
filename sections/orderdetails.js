"use client";
import getBillingsOfOrder from "@/api/getbillingsoforder";
import Getsingleorder from "@/api/getsingleorder";
import Alert from "@/app/components/alert";
import Navbar from "@/app/components/navbar";
import Orderdetailsskeleton from "@/app/components/orderdetailsskeleton";
import Spinner from "@/app/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Arrowleft from "@/public/icon/arrowleft";
import BillingInfo from "@/public/icon/billinginfo";
import Danger from "@/public/icon/danger";
import Info from "@/public/icon/info";
import Note from "@/public/icon/note";
import Order from "@/public/icon/order";
import Orders from "@/public/icon/orders";
import formatDateAndTime from "@/utils/formatDateAndTime";

import { clsx } from "clsx";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Orderdetails = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [orders, setorders] = useState();
  const [msg, setMsg] = useState(false);
  const [loading, setloading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [billings, setBillings] = useState();
  const [timelines, settimelines] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const orders = async () => {
      const token = localStorage.getItem("token");
      const data = await Getsingleorder(token, id);

      if (data?.error) {
        seterror(true);
        return;
      }

      //console.log(data, "orders");
      setorders(data);
      setSelectedStatus(data?.status);
      const billingsdata = await getBillingsOfOrder(token, id);
      //console.log(billingsdata, "billings");
      setBillings(billingsdata);
      settimelines(data?.timeline);
      if (data?.message) {
        setMsg(true);
      }
      setloading(false);
    };

    if (id) {
      orders();
    }
  }, [id]);

  if (error) {
    return (
      <div className="   w-full h-[100vh]">
        <div className="flex justify-between pt-4 px-10  pb-16 items-center">
          {/* <div className="flex gap-4 items-center">
            <div>
              {" "}
              <Arrowleft />
            </div>
            <div className="text-[1.5rem] font-semibold font-Polysans">
              {t("p9")}
            </div>
          </div> */}

          <div>
            <Navbar
              heading={t("p9")}
              arrow={true}
              className={"text-[1.5rem]"}
            />
          </div>
        </div>
        <div className="text-center text-[1.5rem] font-semibold font-Polysans text-red-500">
          {t("p152")}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className=" w-full h-[100vh] flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-9 py-[0rem]">
      <div className="px-10 font-Polysans">
        <div className="flex justify-between pt-4 pb-16 items-center">
          <div className="flex gap-4">
            <div>
              {" "}
              <Arrowleft />
            </div>
            <div className="text-[1.5rem] font-semibold font-Polysans">
              {t("p9")} #{orders?.ordernumber}
            </div>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="flex bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] justify-between font-Polysans font-semibold px-6 py-6 items-center ">
          <div className="flex items-center gap-4">
            <div>
              <Order />
            </div>
            <div>
              <div className="text-[0.95rem]">
                {t("p28")} #{orders?.quote?.quotenumber}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#838486] font-normal font-Matter text-[0.875rem]">
                  {t("p60")}
                </div>
                <div class="text-[#000000] text-[0.95rem] font-Polysans font-semibold">
                  {t("p9")} #{orders?.ordernumber}
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/dashboard/quotedetails?id=${orders?.quote?._id}`}
            target="#"
          >
            <div className="text-[0.875rem] cursor-pointer  font-medium  font-Matter  bg-[#FFFFFF] rounded-[42px] border border-[#E5EAEF] px-4 py-2 flex items-center">
              {t("p30")}
            </div>
          </Link>
        </div>
        <div className="py-8 w-full ">
          <div className="bg-[#FEFEFF] border w-full border-[#E5EAEF]  rounded-[40px] px-8 py-4 pb-12 relative">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="text-[1.5rem] font-semibold ">{t("p10")}</div>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={clsx(
                    " relative rounded-[42px] cursor-pointer w-[95px] flex items-center text-[0.875rem] justify-center text-center font-medium font-Matter leading-none h-[40px]  px-5 py-1",
                    selectedStatus === "On time" ||
                      selectedStatus === "completed"
                      ? " text-[#0F763E] bg-[#DFF7EA] "
                      : "  bg-[#f8f8d8]  text-[#a8a835]"
                  )}
                >
                  {selectedStatus}
                </div>
              </div>
            </div>
            <div className="flex w-full overflow-x-auto lg:max-w-[calc(100vw-30rem)] max-w-[calc(100vw-10rem)] pt-16">
              <div className="  flex  w-max ">
                {loading ? (
                  <>
                    <div className="w-full">
                      <Orderdetailsskeleton />
                    </div>
                  </>
                ) : (
                  orders &&
                  timelines?.map((order, index, array) => (
                    <div key={index} className=" w-[15rem] ">
                      <div className="flex items-center">
                        <div
                          className={clsx(
                            "w-2 h-2 rounded-full  ",
                            order?.completed ? " bg-black " : " bg-gray-300 "
                          )}
                        ></div>
                        <div className=" relative bg-gray-200 h-[2px] w-full">
                          {order?.completed && (
                            <div className="h-[2px] w-full bg-black  absolute "></div>
                          )}
                        </div>
                      </div>
                      <div className="text-[0.9375rem] font-semibold font-Matter text-[#1D1D1F] pt-4 ">
                        {order?.title}
                      </div>
                      <div className="text-[#909099] font-normal text-[0.9375rem] font-Matter">
                        {order?.dueDate
                          ? formatDateAndTime(order?.dueDate).date
                          : "-"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {msg && (
              <div className=" pt-12 w-full  ">
                <div
                  className={` w-full ${
                    orders?.message?.type == "issue"
                      ? "bg-[#FFF7F7] border border-[#EACFCF]"
                      : " bg-[#FEFEFF] border border-[#E5EAEF]"
                  }  rounded-xl flex gap-4 items-center px-4 py-4 `}
                >
                  {orders?.message?.type == "issue" ? <Danger /> : <Info />}
                  <div
                    className={` flex font-Matter text-[1rem] ${
                      orders?.message?.type == "issue"
                        ? "text-[#FF4D40]"
                        : " text-gray-500"
                    }  `}
                  >
                    {orders?.message?.message}
                  </div>
                </div>
              </div>
            )}
            <div className="  h-[80px] w-[120px] absolute z-10 top-[45%] right-7 lg:right-8 flex">
              <div className="bg-white w-[12.5%] h-full opacity-5 "></div>
              <div className="bg-white w-[12.5%] h-full opacity-20  "></div>
              <div className="bg-white w-[12.5%] h-full opacity-35 "></div>
              <div className="bg-white w-[12.5%] h-full opacity-50 "></div>
              <div className="bg-white w-[12.5%] h-full opacity-65"></div>
              <div className="bg-white w-[12.5%] h-full opacity-80 "></div>
              <div className="bg-white w-[12.5%] h-full opacity-95 "></div>
              <div className="bg-white w-[12.5%] h-full opacity-100 "></div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-[#FEFEFF] border border-[#E5EAEF]  rounded-[40px] px-8 py-4 ">
            <div className="  flex justify-between w-full items-center">
              <div className="text-[1.5rem] font-semibold ">{t("p64")}</div>
              <div className=" text-[#8F8F8F] font-Matter font-medium text-[1.1rem] ">
                Order Total :{" "}
                <span className=" text-black ">
                  CHF{" "}
                  {orders?.quote?.discountAdded
                    ? orders?.quote?.discountedTotal
                    : orders?.quote?.total}
                </span>
              </div>
            </div>
            {billings?.map((billing) => (
              <div className="flex  rounded-[40px] justify-between font-Polysans font-semibold px-1 py-6 pt-8 items-center ">
                <div className="flex items-center gap-4">
                  <div>
                    <Note />
                  </div>
                  <div>
                    <div className="text-[1.0675rem] flex items-center gap-4">
                      {t("p66")} #{billing?._id.slice(19, 24)}
                      {billing?.remark && (
                        <Alert text={`Remark: ${billing?.remark}`}>
                          <BillingInfo />
                        </Alert>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[#838486] font-normal font-Matter text-[0.9375rem]">
                        {formatDateAndTime(billing?.createdAt).date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   ">
                  <div className="text-[#595959] font-normal text-[0.9375rem] ">
                    {t("p67")}
                  </div>
                  <div className=" font-medium font-Matter text-[1.195rem]">
                    CHF {billing?.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4  right-[40px] justify-end pt-20 pb-10 ">
          <div className="text-[#909099] text-[1rem]  font-Matter font-normal ">
            {t("p68")}
          </div>
          <Link href={"/dashboard/messages"}>
            <div className="bg-[#FFFFFF] border-[#000000] border text-[0.95rem] font-medium font-Matter px-8 py-4 pb-[18px] rounded-[42px]">
              {t("p256")} polycolor
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;
