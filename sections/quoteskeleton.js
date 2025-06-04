import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Quoteskeleton = () => {
  return (
    <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[40px] font-Polysans text-[1.25rem] font-semibold px-[8px] pb-[8px] w-[43vw] lg:w-[335px]  xl:w-[290px] 1xl:w-[350px]  ">
      <Skeleton className=" font-semibold text-[1.1875rem] rounded-full m-4 h-[1.7rem] "></Skeleton>
      <div className="bg-[#ffffff] border border-[#E5EAEF] rounded-[32px] pt-4 pb-6 px-4">
        <Skeleton className="text-[#76828D] rounded-full h-[1.5rem] w-[10rem]"></Skeleton>
        <Skeleton className=" font-Matter font-medium text-[1.875rem] rounded-full mt-2 h-[2.3rem] w-[12rem]"></Skeleton>
        <div className="flex justify-between text-[#ADAEAE] text-[1.0625rem] py-7 pt-16 ">
          <div>
            <Skeleton className=" font-normal rounded-full  h-[1rem] w-[5rem]"></Skeleton>
            <Skeleton className=" font-medium text-[#696E75] rounded-full mt-2  h-[1rem] w-[5rem]"></Skeleton>
          </div>
          <div>
            <Skeleton className=" font-normal rounded-full  h-[1rem] w-[5rem]"></Skeleton>
            <Skeleton className=" font-medium text-[#696E75] rounded-full mt-2  h-[1rem] w-[5rem]"></Skeleton>
          </div>
        </div>
        <div className="pb-3 pt-4">
          <Skeleton className=" font-normal rounded-full  h-[1rem] w-[5rem]"></Skeleton>
          <Skeleton className=" font-medium text-[#696E75] rounded-full mt-2  h-[1rem] w-[5rem]"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default Quoteskeleton;
