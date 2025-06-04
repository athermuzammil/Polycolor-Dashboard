"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Arrow from "@/public/icon/arrow";
import { useUser } from "@/redux/userContext";
import Profile from "@/public/icon/profile";
import Logout from "@/public/icon/logout";
import Link from "next/link";
import World from "@/public/icon/world";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";

// import Profile from "@/public/icons/profile";
// import Subscribe from "@/public/icons/subscribe";
// import Logout from "@/public/icons/logout";

const Profilebar = () => {
  const [open, setOpen] = useState(false);
  const easing = [0, 0.99, 1, 1];
  const { state } = useUser();
  const user = state.user;
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const [toggle, settoggle] = useState(false);
  useEffect(() => {
    if (currentLocale == "de") {
      settoggle(false);
    } else {
      settoggle(true);
    }
  }, []);
  const ChangeLang = () => {
    if (toggle) {
      changeLocale("de");
    } else {
      changeLocale("en");
    }
    settoggle(!toggle);
  };
  const t = useI18n();
  return (
    <div className="  relative z-[2000] hidden md:flex items-center  justify-between border-[1px] border-[#E2E4E8] rounded-full  w-[16rem]  ">
      <div
        className="  w-full  flex items-center justify-between gap-2 cursor-pointer pl-2 pr-4 py-2  "
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className=" flex items-center gap-3 ">
          <div className=" h-[2.4rem] w-[2.4rem] rounded-full overflow-hidden bg-black ">
            {/* <Image src={img} className=" object-cover h-full w-full " /> */}
          </div>
          <div className=" font-normal font-Matter text-[1rem] flex flex-col  col-span-4 pr-2  ">
            <div className="text-left max-w-[120px] truncate ">{user.name}</div>
            <div className=" text-[#868C92] max-w-[10rem] truncate text-[0.95rem] text-left ">
              {user.email}
            </div>
          </div>
        </div>
        <motion.div
          className=" "
          initial={{
            rotate: "0deg",
          }}
          animate={{
            rotate: open ? "0deg" : "180deg",
            // paddingTop: open ? "12px" : 0,
          }}
          transition={{
            ease: easing,
          }}
        >
          <Arrow />
        </motion.div>
      </div>

      <motion.div
        className=" absolute top-[4.5rem] left-0   w-full overflow-hidden  "
        initial={{
          height: 0,
        }}
        animate={{
          height: open ? "fit-content" : 0,
          // paddingTop: open ? "12px" : 0,
        }}
      >
        <div className=" bg-[#FFFFFF] border-[1px] border-[#E2E4E8] rounded-2xl  pl-5 flex flex-col gap-5 w-full py-6   ">
          <Link href={"/dashboard/profile"}>
            <div className=" flex items-center gap-3 ">
              <Profile size={20} />
              <div className=" font-Matter text-[#2F3B50] text-[0.85rem] leading-none ">
                Profile
              </div>
            </div>
          </Link>

          <div
            onClick={() => {
              ChangeLang();
            }}
            className=" flex items-center gap-3 cursor-pointer "
          >
            <World />
            <div className=" font-Matter text-[#2F3B50] text-[0.85rem] leading-none ">
              {t("p113")}
            </div>
          </div>

          <div
            className=" flex items-center gap-3 cursor-pointer  "
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <Logout />
            <div className=" font-Matter text-[#EE5454] text-[0.85rem] leading-none ">
              Log out
            </div>
          </div>
        </div>
      </motion.div>
      {/* {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed left-0 top-0 bg-[#0000000b] h-screen w-screen z-10"
        ></div>
      )} */}
    </div>
  );
};

export default Profilebar;
