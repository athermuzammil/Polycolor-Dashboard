"use client";
import { getToken } from "@/api/getToken";
import getuserchat from "@/api/getuserchat";
import sendMessage from "@/api/sendmessage";
import { BACKEND_URL } from "@/api/variables";
import Add from "@/app/components/add";
import Bluetext from "@/app/components/bluetext";
import Greytext from "@/app/components/greytext";
import Navbar from "@/app/components/navbar";
import Sendcard from "@/app/components/sendcard";
import Spinner from "@/app/components/spinner";
import { Input } from "@/components/ui/input1";
import { useCurrentLocale, useI18n } from "@/locales/client";
import Cross from "@/public/icon/cross";
import Delfile from "@/public/icon/delfile";
import Pluse from "@/public/icon/pluse";
import Profile from "@/public/icon/profile";
import Send from "@/public/icon/send";
import Startmessage from "@/public/icon/startmessage";
import { useUser } from "@/redux/userContext";
import Link from "next/link";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Message = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const fileInputRef = useRef();
  const token = getToken();
  const [message, setMessage] = useState();
  const [hide, setHide] = useState(false);
  const [logo, setLogo] = useState();
  const [messagearr, setMessageArr] = useState([]);
  const [pageload, setpageload] = useState(true);
  const [first, setFirst] = useState();
  const { state } = useUser();
  const user = state.user;
  const [referenceMessageDate, setReferenceMessageDate] = useState("Today");
  const messageRefs = useRef([]);

  const click = () => {
    setHide(!hide);
  };
  const click2 = click;

  useEffect(() => {
    const getMessages = async () => {
      const data = await getuserchat(token);
      setMessageArr(data);
      //console.log(data, "dddddddd");
      setpageload(false);
    };
    getMessages();
  }, []);

  useEffect(() => {
    if (messagearr?.length > 0) {
      scrollToEnd();
    }
  }, [messagearr]);

  const handleChange1 = (event) => {
    const selectedFile = event.target.files[0];
    setLogo(selectedFile);
    //console.log(selectedFile, "select");
  };

  const addMessage = (newMessage) => {
    setMessageArr((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSend = async () => {
    const newMessage = {
      sender: "user",
      message: message ? message : "",
      filepath: logo ? URL?.createObjectURL(logo) : null,
      updatedAt: Date(),
      custom: true,
      ext: logo ? logo.name.split(".").pop() : null,
    };
    addMessage(newMessage);
    setMessage("");
    setLogo("");
    const res = await sendMessage(token, message, logo);
    //console.log(res, "resss2");
  };

  function convertToTimeString(isoString) {
    const date = new Date(isoString);

    // Get the time in the Europe/Berlin time zone
    const options = {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const germanTimeString = date.toLocaleTimeString("de-DE", options);

    return germanTimeString;
  }

  function convertToDateString(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  const divRef = useRef(null);

  const scrollToEnd = () => {
    if (divRef.current) {
      if (first) {
        divRef.current.scrollTo({
          top: divRef.current.scrollHeight + 30,
          behavior: "smooth",
        });
      } else if (!first) {
        divRef.current.scrollTo({
          top: divRef.current.scrollHeight + 30,
        });
        setFirst(true);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageIndex = Array.from(
              entry.target.parentNode.children
            ).indexOf(entry.target);
            const message = messagearr[messageIndex];
            const refMessageDate = convertToDateString(message.updatedAt);
            setReferenceMessageDate(refMessageDate);
          }
        });
      },
      {
        root: divRef.current,
        threshold: 0.1,
      }
    );

    const messageElements = messageRefs.current.filter((ref) => ref.current); // Ensure we only observe valid refs

    messageElements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      messageElements.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [messagearr]);

  const parseJsonString = (jsonString) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      console.error("Failed to parse JSON string:", error);
      return null;
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (user) {
      //console.log(11111111111111);
      const socket = io(BACKEND_URL); // Ensure this URL matches your backend server

      socket.emit("create_room", user?.chatId);

      socket.on("foruser", (message) => {
        //console.log("New message from admin:", message);
        if (message.chatId === user?.chatId) {
          setMessageArr((prevMessages) => [...prevMessages, message]);
          socket.emit("markread", { id: message.chatId, type: "user" });
        }
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  if (pageload) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className=" w-full overflow-x-hidden relative h-[100vh] overflow-y-scroll flex flex-col justify-between"
      ref={divRef}
    >
      <div onClick={() => setHide(false)} className="px-10 w-full">
        <div className="flex w-full justify-between pt-4 items-center">
          <div className="text-[1.5rem] font-semibold font-Polysans">
            {t("p256")} polycolor
          </div>
          <div>
            <Navbar />
          </div>
        </div>
        <div className="sticky top-0 w-full z-[100]">
          <div className="pt-4 bg-white">
            <div className="bg-[#F7F8F9] border border-[#E5EAEF] rounded-[26px] flex gap-4 items-center px-6 py-4">
              <div>
                <Profile />
              </div>
              <div className="">
                <div className="text-[1rem] font-Polysans font-semibold">
                  Polycolor
                </div>
                {/* <div className="flex gap-2 items-center">
                  <div className="h-1 w-1 bg-[#2AAA84] rounded-full"></div>
                  <div className="text-[#838486] text-[0.95rem] font-normal font-Matter">
                    {t("p72")}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center py-4">
            <div className="bg-[#F4F4F4] border border-[#E5EAEF] rounded-[15px] font-Matter text-[0.9375rem] flex items-center leading-none pt-[5px] pb-[3px] font-medium text-[#565656] w-max px-4">
              {referenceMessageDate}
            </div>
          </div>
        </div>
        <div className="lg:pb-24 pb-[120px] w-full px-2">
          {messagearr?.length === 0 ? (
            <div className=" w-full flex justify-center h-[calc(100vh-25rem)] items-center ">
              <div className=" w-[400px] ">
                <Startmessage />
              </div>
            </div>
          ) : (
            messagearr?.map((item, index) => {
              if (!messageRefs.current[index]) {
                messageRefs.current[index] = React.createRef();
              }

              const updatedAtFormatted = formatDate(item?.updatedAt); // Format the date here

              if (item?.type === 1) {
                const parsedMessage = parseJsonString(item?.message);
                //console.log(parsedMessage, "parseeee");
                if (item?.sender === "admin") {
                  return (
                    <div ref={messageRefs?.current[index]}>
                      <Sendcard
                        allitems={parsedMessage?.itemnames}
                        type={parsedMessage?.type}
                        date={
                          parsedMessage?.type === 2
                            ? formatDate(parsedMessage.validTill)
                            : updatedAtFormatted // Use the formatted date
                        }
                        quoteNum={parsedMessage?.quotenumber}
                        items={parsedMessage?.items}
                        amount={parsedMessage?.total}
                        service={parsedMessage?.servicetype}
                        id={parsedMessage?._id}
                        time={convertToTimeString(item?.updatedAt)}
                        orderNum={parsedMessage?.ordernumber}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      ref={messageRefs?.current[index]}
                      className="w-full flex items-end justify-end"
                    >
                      <Sendcard
                        allitems={parsedMessage?.itemnames}
                        type={parsedMessage?.type}
                        date={
                          parsedMessage.type === 2
                            ? formatDate(parsedMessage.validTill)
                            : updatedAtFormatted // Use the formatted date
                        }
                        quoteNum={parsedMessage?.quotenumber}
                        items={parsedMessage?.items}
                        amount={parsedMessage?.total}
                        service={parsedMessage?.servicetype}
                        id={parsedMessage?._id}
                        time={convertToTimeString(item?.updatedAt)}
                        orderNum={parsedMessage?.ordernumber}
                      />
                    </div>
                  );
                }
              } else if (item?.sender === "user") {
                return (
                  <div ref={messageRefs.current[index]}>
                    <Greytext
                      file={
                        item?.custom
                          ? item?.filepath
                          : item?.filepath
                          ? `https://media.polycolor.ch/polycolor-media/${item?.filepath}`
                          : ""
                      }
                      text={
                        item?.message?.trim()?.length > 0 ? item.message : ""
                      }
                      time={convertToTimeString(item?.updatedAt)}
                      ext={item?.ext}
                    />
                  </div>
                );
              } else {
                return (
                  <div ref={messageRefs.current[index]}>
                    <Bluetext
                      file={item?.filepath}
                      text={
                        item?.message?.trim()?.length > 0 ? item?.message : ""
                      }
                      time={convertToTimeString(item?.updatedAt)}
                    />
                  </div>
                );
              }
            })
          )}
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div
          className={`fixed lg:bottom-0 bottom-20  bg-white  pb-5 px-0 w-[calc(100vw-5.5rem)] lg:w-[calc(100vw-17rem)] xl:w-[calc(100vw-22rem)] `}
        >
          <div className="bg-[#F7F8F9] border border-[#E5EAEF] flex justify-between items-center rounded-[57px] pl-6 px-4  w-full">
            <div className="w-full">
              <input
                type="text"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (message || logo)) {
                    handleSend();
                    //console.log("lolllll");
                  }
                }}
                value={message}
                placeholder={t("p75")}
                className="bg-[#F7F8F9] text-[0.80rem] font-normal py-4 text-[#737A82] w-full outline-none"
                id=""
              />
            </div>
            <div className="flex gap-3 items-center">
              {logo ? (
                <div
                  onClick={() => {
                    setLogo("");
                  }}
                >
                  <Delfile />
                </div>
              ) : (
                <div onClick={click} className="hover:cursor-pointer">
                  <Pluse />
                </div>
              )}
              <div
                className=" cursor-pointer"
                onClick={() => {
                  if (message || logo) {
                    handleSend();
                  }
                }}
              >
                <Send />
              </div>
            </div>
          </div>
          <div
            className={`absolute bottom-[75px] right-[60px] z-[1000] ${
              hide ? "block" : "hidden"
            } ${click2 ? "hideen" : ""}`}
          >
            <div>
              <div className="border border-[#EAEAEA] bg-[#FFFFFF] rounded-[12px] text-[0.95rem] font-medium font-Matter py-2.5 w-max">
                <Link href={"/dashboard/createquote"}>
                  <div
                    onClick={() => setHide(false)}
                    className="hover:bg-[#F7F8F9] hover:cursor-pointer py-2.5 px-6"
                  >
                    {t("p259")}
                  </div>
                </Link>

                <div
                  className="hover:bg-[#F7F8F9] hover:cursor-pointer py-2.5 px-6"
                  onClick={() => {
                    if (!logo) {
                      fileInputRef.current.click();
                      setHide(false);
                    }
                  }}
                >
                  {t("p74")}
                </div>

                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleChange1}
                  style={{ display: "none" }}
                  placeholder="hello"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
