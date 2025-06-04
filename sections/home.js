"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import src from "@/public/image/Group.png";
import Orderlist from "@/app/components/orderlist";
import Navbar from "@/app/components/navbar";
import { progress } from "framer-motion";
import Link from "next/link";
import Orderslistskeleton from "@/app/components/orderslistskeleton";
import Getallorders from "@/api/getallorders";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Noorders from "@/public/icon/noorders";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";

const Home = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [orders, setorders] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const orders = async () => {
      const token = localStorage.getItem("token");
      const data = await Getallorders(token);
      if (data.error) {
        toast({
          title: res.error,
          variant: "desctructive",
        });
        return;
      }
      //console.log(data, "orders");
      setorders(data);
      setloading(false);
    };
    orders();
  }, []);

  const params = usePathname();

  function formatPrice(price) {
    if (price < 1000) {
      return price.toString();
    } else {
      // Convert the price to 'k' format if greater than or equal to 1000
      return (price / 1000).toFixed(1) + "k";
    }
  }
  return (
    <div className="w-full px-10">
      <div className="flex justify-end  w-full ">
        <div className=" pt-4  w[25%]">
          <Navbar />
        </div>
      </div>
      <div className="pt-2 xl:pt-5 2xl:pt-10">
        <div
          className={`bg-[#205FFF] flex justify-between rounded-[39px] px-4 gap-[1rem]  ${
            currentLocale == "en"
              ? "h-[290px] xl:h-[290px] 2xl:h-[320px]"
              : "h-[300px] xl:h-[318px] 2xl:h-[345px]"
          } `}
        >
          <div className="2xl:w-[40%]">
            <div
              className={clsx(
                "",
                params.includes("/en")
                  ? "text-[#FFFFFF] 2xl:text-[2.5rem] 2xl:leading-[2.8rem] text-[1.7rem] lg:text-[2rem] leading-[2.2rem] xl:leading-[2rem] xl:w-[300px]  font-semibold font-Polysans w-[250px] lg:w-[300px] 2xl:w-[360px] pt-6 px-4"
                  : "text-[#FFFFFF] 2xl:text-[2.5rem] 2xl:leading-[2.8rem] text-[1.7rem] lg:text-[2rem] leading-[2.2rem] xl:leading-[2rem] xl:w-[350px]  font-semibold font-Polysans w-[300px] lg:w-[350px] 2xl:w-[430px] pt-6 px-4"
              )}
            >
              {t("p200")}
            </div>
            <div
              className={clsx(
                " ",
                params.includes("/en")
                  ? "text-[#E0E9FF] text-[0.8rem] lg:text-[0.85rem] xl:text-[0.95rem] font-normal font-Matter 2xl:w-[410px] lg:w-[370px] xl:w-[400px] w-[250px] pt-4 pb-8 px-4 "
                  : "text-[#E0E9FF] text-[0.8rem] lg:text-[0.85rem] xl:text-[0.95rem] font-normal font-Matter 2xl:w-[410px] lg:w-[370px] xl:w-[400px] w-[325px] pt-4 pb-8 px-4 "
              )}
            >
              {t("p201")}
            </div>
            <div className="px-4">
              <Link href={"/dashboard/createquote"}>
                <div
                  className={`${
                    currentLocale == "en"
                      ? " w-[140px] lg:w-[150px] xl:w-[200px]"
                      : "w-[230px]"
                  } bg-[#FFFFFF] px-2 py-3 xl:px-6 xl:py-[15px] text-[#205FFF] text-[0.9rem] lg:text-[1rem] font-Matter font-medium rounded-full text-center `}
                >
                  {t("p202")}
                </div>
              </Link>
            </div>
          </div>
          <div className="2xl:w-[60%] scale-[1] flex justify-end 2xl:pr-10  ">
            <Image
              className="h-[370px] xl:h-[270px] 2xl:h-[340px] w-max object-contain -translate-y-9 xl:translate-y-2 2xl:-translate-y-3"
              src={src}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className=" py-8 xl:py-6">
        <div className="bg-[#F7F8F9] border-[1px] rounded-[42px] border-[#E5EAEF] flex flex-col gap-4 p-6">
          <div className=" text-[1.375rem] font-semibold text-[#141415] font-Polysans pl-2 pt-2 pb-4">
            {t("p5")}
          </div>
          {loading ? (
            <>
              <div>
                <Orderslistskeleton />
              </div>
              <div>
                <Orderslistskeleton />
              </div>
              <div>
                <Orderslistskeleton />
              </div>
            </>
          ) : orders.length === 0 ? (
            <div className=" text-[#4d4848] mx-auto pl-2 pb-10 text-[1.2rem] w-[300px] font-medium font-Matter">
              <Noorders />
            </div>
          ) : (
            orders
              ?.slice(0, 3)
              .map((order) => (
                <Orderlist
                  item={order.name}
                  order={order.ordernumber}
                  status={order.status}
                  date={order.expectedcompletion}
                  cost={formatPrice(order.total)}
                  id={order._id}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
