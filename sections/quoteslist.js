import Quotesid from "@/app/components/quotesid";
import Noquotes from "@/public/icon/noquotes";
import Link from "next/link";
import React from "react";

const QuotesList = ({ data }) => {
  return (
    <div className=" lg:flex grid grid-cols-2 flex-col w-full lg:flex-row flex-wrap gap-8 pb-[6.8rem] lg:pb-0 ">
      {data?.length == 0 ? (
        <div className=" w-[360px]  mx-auto py-10 ">
          <Noquotes />
        </div>
      ) : (
        data?.map((item) => {
          // Assuming the date string is in item.date
          const dateString = item.createdAt;

          // Create a Date object from the date string
          const dateObject = new Date(dateString);

          // Extract the year, month, and date
          const year = dateObject.getFullYear();
          const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
          const day = dateObject.getDate();

          return (
            <Link
              href={{
                pathname: "/dashboard/quotedetails",
                query: { id: item._id },
              }}
            >
              <Quotesid
                key={item._id} // Ensure a unique key for each item, assuming item.id is unique
                quoteid={item.quotenumber}
                cost={item.total}
                itemno={item.totalItems}
                date={item.createdAt}
                accept={item.Status}
                orderId={item.order}
              />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default QuotesList;
