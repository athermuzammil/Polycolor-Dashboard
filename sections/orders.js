"use client";
import Getallorders from "@/api/getallorders";
import Navbar from "@/app/components/navbar";
import Orderlist from "@/app/components/orderlist";
import Orderslistskeleton from "@/app/components/orderslistskeleton";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Noorders from "@/public/icon/noorders";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [orders, setorders] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const orders = async () => {
      const token = localStorage.getItem("token");
      const data = await Getallorders(token);
      //console.log(data, "orders");
      setorders(data);
      setloading(false);
    };
    orders();
  }, []);

  function formatPrice(price) {
    if (price < 1000) {
      return price.toString();
    } else {
      // Convert the price to 'k' format if greater than or equal to 1000
      return (price / 1000).toFixed(1) + "k";
    }
  }
  return (
    <div className="px-10 py-[1rem]">
      <div>
        <Navbar
          heading={t("p50")}
          arrow={false}
          className={"text-[1.575rem] "}
        />
        <div className="pt-12">
          <div
            className={clsx(
              "  rounded-[42px]  flex flex-col gap-6 p-6 ",
              orders?.length === 0
                ? " bg-white "
                : "bg-[#F7F8F9] border-[#E5EAEF] border-[1px]"
            )}
          >
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
            ) : orders?.length === 0 ? (
              <div className=" w-[500px] py-20 mx-auto ">
                <Noorders />
              </div>
            ) : (
              orders?.map((order) => (
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
    </div>
  );
};

export default Orders;
