import Msgfile from "@/public/icon/msgfile";
import Link from "next/link";
import React from "react";

const Bluetext = ({ text, time, file }) => {
  function getFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) return ""; // No extension found
    return filename.substring(lastDotIndex + 1);
  }
  return (
    <div>
      {file && (
        <Link
          target="#"
          href={`https://media.polycolor.ch/polycolor-media/${file}`}
        >
          <div className=" w-[380px] mt-3.5  bg-[#FFFFFF] flex items-start gap-2 h-[68px] rounded-2xl p-2 border border-[#E5EAEF]   ">
            <div className=" h-full bg-[#EBF1F8] border border-[#BBD4F0] rounded-2xl flex items-center justify-center px-3  ">
              <Msgfile />
            </div>
            <div className=" text-[#363B40] min-w-max text-[20px] font-Matter font-medium leading-none  ">
              . {getFileExtension(file)}
            </div>
            <div className="text-[#BCCDF9] text-[0.85rem]  font-Matter font-medium place-self-end w-full pr-4 text-right">
              {time}
            </div>
          </div>
        </Link>
      )}
      {text && (
        <div className=" flex gap-[0px] pt-3.5">
          <div className="">
            <div className="text-[#ffffff] bg-[#205FFF] font-normal font-Matter min-w-[96px] max-w-[250px] px-4 rounded-[14px]   py-3 text-[0.9rem] relative">
              <div className="px-2 break-words pr-11">{text}</div>
              <div className="text-[#BCCDF9] text-[0.85rem]  font-Matter pr-3 font-medium w-full text-right absolute bottom-1 right-0">
                {time}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bluetext;
