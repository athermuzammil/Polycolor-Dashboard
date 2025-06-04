"use client";
import VerifyOtp from "@/api/verifyOtp";
import { toast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import src from "@/public/image/Frame.png";
import Image from "next/image";
import { useUser } from "@/redux/userContext";

import Resendotp from "@/api/resendOtp";
import Spinner from "@/app/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Otp = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const router = useRouter();
  const { state } = useUser();
  const user = state.user;
  const [pageload, setpageload] = useState(true);
  const otpInputs = useRef([]);
  const [isRunning, setisrunning] = useState(false);
  const [loading, setloading] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const timerRef = useRef(null);

  const handleKeyPress = (e, index) => {
    const otpString = otpDigits.join("");
    if (e.key === "Enter" && otpString.length === 6) {
      validateotp();
    } else if (
      e.key === "Enter" &&
      index < otpDigits.length - 1 &&
      otpDigits[index] !== ""
    ) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    const newOtpDigits = [...otpDigits];
    for (
      let i = 0;
      i < pastedData.length && index + i < otpDigits.length;
      i++
    ) {
      newOtpDigits[index + i] = pastedData[i];
    }
    setOtpDigits(newOtpDigits);
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newOtpDigits = [...otpDigits];
      if (otpDigits[index] === "" && index > 0) {
        otpInputs.current[index - 1].focus();
      } else {
        newOtpDigits[index] = "";
        setOtpDigits(newOtpDigits);
      }
    }
  };

  const handleInput = (e, index) => {
    const digit = e.target.value;
    if (digit.match(/^\d$/) || digit === "") {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = digit;
      setOtpDigits(newOtpDigits);
      if (index < otpDigits.length - 1 && digit) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const validateotp = async () => {
    setloading(true);
    const otpString = otpDigits.join("");
    //console.log(otpString);
    if (otpString.length === 6) {
      const res = await VerifyOtp(otpString);
      if (res.error) {
        toast({
          variant: "destructive",
          title: <div className=" text-[1.1rem] ">{res.error}</div>,
        });
        setloading(false);
        return;
      }
      if (res.isverified) {
        toast({
          title: t("p175"),
        });
        // navigate to dashboard
        router.push(`/dashboard`);
      }
    } else {
      toast({
        title: t("p174"),
      });
      setloading(false);
    }
  };

  const startResendTimer = () => {
    setisrunning(true);
    setResendTimer(60);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          setisrunning(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user?.isverified) {
      router.push("/dashboard");
    } else if (token && user && !user?.isverified) {
      setpageload(false);
    } else if (!token && !user) {
      router.push("/");
    }
  }, [user]);

  //   useEffect(() => {
  //     if (!isRunning) {
  //       startResendTimer();
  //     }
  //     return () => {
  //       clearInterval(timerRef.current); // Clean up interval on component unmount
  //     };
  //   }, []);

  const resendOtp = async () => {
    startResendTimer();
    const res = await Resendotp();
  };

  if (pageload) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" h-max xl:max-h-[100vh] w-full flex items-center 2xl:h-[100vh] ">
      <div className=" flex flex-col items-center p-10 rounded-3xl relative  w-[30%] h-max transition-transform   duration-1000  z-10">
        <div className=" absolute top-11 left-6  hover:cursor-pointer">
          {/* <Arrowleft /> */}
        </div>
        <div className="text-center pb-2 text-[2rem] text-[#252525]   font-Circular font-[700]">
          {t("p173")}
        </div>
        <div className="text-[#6C6F72] w-[100%] text-[0.95rem]  font-Circular font-medium text-center">
          <div>
            {t("p172")} {user?.email}
          </div>
          <div
            className=" cursor-pointer "
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <span className=" text-[#205FFF]">{t("p171")}</span>
          </div>
        </div>
        <div className="flex justify-center w-full gap-3 md:gap-5 py-10 pb-20">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(input) => (otpInputs.current[index] = input)}
              className="font-medium text-[1.2rem] duration-300 bg-[#FBFBFB] h-12 w-10 md:h-12 md:w-12 outline-[#205FFF]  border-[#EAEBEF] border-[1px] text-center rounded-lg"
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => {
                handleBackspace(e, index);
                handleKeyPress(e, index);
              }}
              onPaste={(e) => handlePaste(e, index)}
            />
          ))}
        </div>
        <div className="text-[0.9rem] text-[#6C6F72]  font-Circular  py-6 pb-10  text-center gap-2">
          {t("p170")}
          <div
            className={clsx(
              "font-medium text-[#1E2124]",
              isRunning ? "" : "hidden"
            )}
          >
            {t("p168")} {resendTimer} {t("p169")}
          </div>
          <div
            onClick={() => {
              resendOtp();
            }}
            className={clsx(
              "font-medium cursor-pointer text-[#205FFF]",
              isRunning ? "hidden" : ""
            )}
          >
            {t("p167")}
          </div>
        </div>
        <div
          onClick={() => {
            if (!loading) {
              validateotp();
            }
          }}
          className="text-[0.9rem] bg-[#205FFF] w-full md:w-[90%] cursor-pointer justify-center text-white    font-Circular font-medium py-4 rounded-full min-h-[60px] flex gap-3 items-center"
        >
          <div className={clsx("", loading ? "hidden" : "")}>{t("p79")}</div>
          <div className={clsx("", loading ? "" : "hidden")}>
            <div>
              {" "}
              <Spinner size={"20px"} border={"2px"} />{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] bg-black pt-44 h-full overflow-hidden  relative">
        <div className=" flex flex-col items-center justify-center w-full">
          <div
            className="text-[#7E8086] font-Matter text-[1.1rem] leading-8 font-medium relative
             z-50 text-center w-[420px]"
          >
            {t("p166")}
          </div>
          <div className=" overflow-hidden  bottom-0 ">
            <Image
              className=" max-h-[calc(100vh-270px)] w-full object-contain "
              src={src}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
