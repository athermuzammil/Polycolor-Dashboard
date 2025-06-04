"use client";
import { getToken } from "@/api/getToken";
import getuser from "@/api/getuser";
import Navbar from "@/app/components/navbar";
import Delete from "@/public/icon/delete";
import Email from "@/public/icon/email";
import Location from "@/public/icon/location";
import Msgicon from "@/public/icon/msgicon";
import Phone from "@/public/icon/phone";
import Profile1 from "@/public/icon/profile1";
import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import Halfarrow from "@/public/icon/halfarrow";
import Cross from "@/public/icon/cross";
import Addbillingaddress from "@/api/addbillingaddress";
import { useToast } from "@/components/ui/use-toast";
import AddDeliveryAddress from "@/api/adddeliveryaddress";
import deletedelivery from "@/api/deletedelivery";
import deletebilling from "@/api/deletebilling";
import Spinner from "@/app/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput1,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Email2 from "@/public/icon/email2";

const Profile = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const { toast, handleToastClick } = useToast();
  const [uid, setuid] = useState();
  const [popUp, openPopup] = useState(false);
  const [popUp1, openPopup1] = useState(false);
  const [transportLoad, settransportLoad] = useState(false);
  const [deliveryLoad, setdeliveryLoad] = useState(false);
  const [newT, setNewTransport] = useState({
    billingAddress: {
      userName: null,
      email: null,
      phone: null,
      location: {
        streetName: null,
        streetNumber: null,
        postalCode: null,
        town: null,
        canton: null,
      },
    },
  });

  const [newD, setNewDelivery] = useState({
    deliveryAddress: {
      userName: null,
      email: null,
      phone: null,
      location: {
        streetName: null,
        streetNumber: null,
        postalCode: null,
        town: null,
        canton: null,
      },
    },
  });
  const token = getToken();

  const deleteDelivery1 = async (id) => {
    const res = await deletedelivery(token, id);
    if (res?.error) {
      toast({
        title: res.error,
        variant: "desctructive",
      });
      return;
    }
    //console.log(res, "ress2 delivery");
    location.reload();
  };

  const deleteBilling1 = async (id) => {
    const res = await deletebilling(token, id);
    if (res?.error) {
      toast({
        title: res.error,
        variant: "desctructive",
      });
      return;
    }
    //console.log(res, "ress2 billing");
    location.reload();
  };

  useEffect(() => {
    const getuid = async () => {
      const id = await getuser(token);
      //console.log(id, "iddddddd");
      setuid(id);
      setLoading(false);
    };
    getuid();
  }, []);

  function calculateTimeAgo(dateString) {
    const joinDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `Joined ${diffMonths} months ago`;
    } else {
      return `Joined ${diffDays} days ago`;
    }
  }
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    if (popUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      // Clean up: restore original overflow when component unmounts
      document.body.style.overflow = originalOverflow;
    };
  }, [popUp]);

  const checkForNullValues = (obj) => {
    // Get all values of the object including nested objects
    const values = Object.values(obj);

    // Iterate over the values
    for (const value of values) {
      if (value === null) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        // Recursively check nested objects
        if (checkForNullValues(value)) {
          return true;
        }
      }
    }

    return false;
  };

  const TransportPost = async () => {
    const hasNullValue = checkForNullValues(newT);

    if (hasNullValue) {
      toast({
        title: t("p142"),
      });
      //console.log(newT, "newwwwwwww");
    } else {
      settransportLoad(true);
      const res = await Addbillingaddress(token, newT);
      if (res?.error) {
        toast({
          title: res.error,
          variant: "desctructive",
        });
        //console.log(res.error, "error");
        settransportLoad(false);
        return;
      }
      openPopup(false);
      //console.log(res, "ress2255555555");
      location.reload();
      setNewTransport({
        billingAddress: {
          userName: null,
          email: null,
          phone: null,
          location: {
            streetName: null,
            streetNumber: null,
            postalCode: null,
            town: null,
            canton: null,
          },
        },
      });
    }
  };

  const DeliveryPost = async () => {
    const hasNullValue = checkForNullValues(newD);

    if (hasNullValue) {
      toast({
        title: t("p142"),
      });
      //console.log(newT, "newwwwwwww");
    } else {
      setdeliveryLoad(true);
      const res = await AddDeliveryAddress(token, newD);
      if (res?.error) {
        toast({
          title: res.error,
          variant: "desctructive",
        });
        //console.log(res.error, "error");
        setdeliveryLoad(false);
        return;
      }
      openPopup1(false);
      //console.log(res, "ress22ddd");
      location.reload();

      setNewDelivery({
        deliveryAddress: {
          userName: null,
          email: null,
          phone: null,
          location: {
            streetName: null,
            streetNumber: null,
            postalCode: null,
            town: null,
            canton: null,
          },
        },
      });
    }
  };

  const cantons = [
    { value: "AG-Aargau", label: "AG-Aargau" },
    { value: "AR-Appenzell AusserRhoden", label: "AR-Appenzell AusserRhoden" },
    { value: "AI-Appenzell Inner-Rhoden", label: "AI-Appenzell Inner-Rhoden" },
    { value: "BL-Basel-Landschaft", label: "BL-Basel-Landschaft" },
    { value: "BS-Basel-Stadt", label: "BS-Basel-Stadt" },
    { value: "BE-Bern", label: "BE-Bern" },
    { value: "FR-Fribourg", label: "FR-Fribourg" },
    { value: "GE-Geneva", label: "GE-Geneva" },
    { value: "GL-Glarus", label: "GL-Glarus" },
    { value: "GR-Graubunden", label: "GR-Graubunden" },
    { value: "JU-Jura", label: "JU-Jura" },
    { value: "LU-Luzern", label: "LU-Luzern" },
    { value: "NE-Neuchâtel", label: "NE-Neuchâtel" },
    { value: "NW-Nidwalden", label: "NW-Nidwalden" },
    { value: "OW-Obwalden", label: "OW-Obwalden" },
    { value: "SG-Sankt Gallen", label: "SG-Sankt Gallen" },
    { value: "SH-Schaffhausen", label: "SH-Schaffhausen" },
    { value: "SZ-Schwyz", label: "SZ-Schwyz" },
    { value: "SO-Solothurn", label: "SO-Solothurn" },
    { value: "TG-Thurgau", label: "TG-Thurgau" },
    { value: "TI-Ticino", label: "TI-Ticino" },
    { value: "UR-Uri", label: "UR-Uri" },
    { value: "VS-Valais", label: "VS-Valais" },
    { value: "VD-Vaud", label: "VD-Vaud" },
    { value: "ZG-Zug", label: "ZG-Zug" },
    { value: "ZH-Zürich", label: "ZH-Zürich" },
  ];

  const townss = [
    { value: "Aarau", label: "Aarau" },
    { value: "Allschwil", label: "Allschwil" },
    { value: "Baden", label: "Baden" },
    { value: "Basel", label: "Basel" },
    { value: "Bern", label: "Bern" },
    { value: "Biel", label: "Biel" },
    { value: "La Chaux-de-Fonds", label: "La Chaux-de-Fonds" },
    { value: "Chur", label: "Chur" },
    { value: "Davos", label: "Davos" },
    { value: "Ebikon", label: "Ebikon" },
    { value: "Emmen", label: "Emmen" },
    { value: "Frauenfeld", label: "Frauenfeld" },
    { value: "Fribourg", label: "Fribourg" },
    { value: "Geneva", label: "Geneva" },
    { value: "Grindelwald", label: "Grindelwald" },
    { value: "Interlaken", label: "Interlaken" },
    { value: "Kloten", label: "Kloten" },
    { value: "Lausanne", label: "Lausanne" },
    { value: "Lauterbrunnen", label: "Lauterbrunnen" },
    { value: "Littau", label: "Littau" },
    { value: "Locarno", label: "Locarno" },
    { value: "Lucerne", label: "Lucerne" },
    { value: "Lugano", label: "Lugano" },
    { value: "Montreux-Vevey", label: "Montreux-Vevey" },
    { value: "Muttenz", label: "Muttenz" },
    { value: "Neuchâtel", label: "Neuchâtel" },
    { value: "Neuhausen", label: "Neuhausen" },
    { value: "Olten", label: "Olten" },
    { value: "Reinach", label: "Reinach" },
    { value: "Rhine Falls", label: "Rhine Falls" },
    { value: "Riehen", label: "Riehen" },
    { value: "St. Gallen", label: "St. Gallen" },
    { value: "St. Moritz", label: "St. Moritz" },
    { value: "Schaffhausen", label: "Schaffhausen" },
    { value: "Sion", label: "Sion" },
    { value: "Solothurn", label: "Solothurn" },
    { value: "Thun", label: "Thun" },
    { value: "Vitznau", label: "Vitznau" },
    { value: "Wettingen", label: "Wettingen" },
    { value: "Winterthur", label: "Winterthur" },
    { value: "Zermatt", label: "Zermatt" },
    { value: "Zug", label: "Zug" },
    { value: "Zurich", label: "Zurich" },
    { value: "Zurich Airport", label: "Zurich Airport" },
  ];

  return loading ? (
    <div className=" h-screen w-full flex items-center justify-center ">
      <Spinner />
    </div>
  ) : (
    <div className=" flex flex-col px-10 relative h-full pb-24 lg:pb-10 w-full  ">
      <div className=" flex flex-col w-full sticky top-0 left-0 bg-white z-[10]  ">
        <div className="flex justify-between items-center sticky top-5 left-0 bg-white pb-2 z-[10] ">
          <div className=" font-Polysans font-semibold text-[#141415] text-[1.6rem]  ">
            {t("p153")}
          </div>
          <div className=" pt-4  w[25%]">
            <Navbar />
          </div>
        </div>
      </div>
      <div className=" flex flex-col w-full gap-5 pt-6  ">
        <div className=" w-full bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl px-8 py-6 flex gap-4 items-center ">
          <div className=" h-20 w-20 rounded-full bg-[#205FFF] flex items-center justify-center uppercase text-[2.3rem] text-white  ">
            {uid?.name.slice(0, 1)}
          </div>
          <div className=" flex flex-col  ">
            <div className=" font-Polysans text-[1.4rem] capitalize font-semibold text-[#2C2D2D] ">
              {uid?.name}
            </div>
            <div className=" font-Matter text-[1rem] capitalize text-[#7C8186] ">
              {calculateTimeAgo(uid?.createdAt)}
            </div>
          </div>
        </div>
        <div className=" w-full  border-[1px] border-[#E5EAEF] rounded-3xl px-8 pt-4 pb-5 flex flex-col gap-6  ">
          <div className=" font-Polysans font-semibold text-[#141415] text-[1.3rem]  ">
            {t("p154")}
          </div>
          <div className=" flex items-center gap-3 ">
            <div className=" flex flex-col gap- ">
              <div className=" flex items-center gap-2">
                <Email2 />
                <div className=" font-Matter text-[1rem] capitalize text-[#737A82]">
                  {t("p155")}
                </div>
              </div>
              <div className=" font-Matter text-[1.2rem] font-medium text-[#2E303A]">
                {uid?.email}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full  border-[1px] border-[#E5EAEF] rounded-3xl px-8 py-6 flex flex-col gap-6  ">
          <div className=" flex w-full items-center justify-between ">
            <div className=" font-Polysans font-semibold text-[#141415] text-[1.3rem]  ">
              {t("p156")}
            </div>
            <div
              className=" border-[1px] border-[#E5EAEF] py-4 cursor-pointer px-8 leading-none font-Matter font-medium text-[0.9rem] text-[#000000] rounded-full  "
              onClick={() => {
                openPopup(true);
              }}
            >
              {t("p157")}
            </div>
          </div>

          {uid?.billingAddress.map((item, index) => (
            <div className=" bg-[#F7F8F9] rounded-3xl border-[1px] border-[#E5EAEF] py-4 px-8 flex flex-col gap-8  ">
              <div className=" w-full flex items-start py-3 justify-between ">
                <div className=" flex flex-col gap-6 ">
                  {index == 0 && (
                    <div className=" font-Polysans font-semibold text-[#141415] text-[1.1rem]  ">
                      {t("p158")}
                    </div>
                  )}
                  <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                    <Profile1 />
                    {item.userName}
                  </div>
                  <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                    <Phone />
                    {item.phone}
                  </div>
                  <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                    <Email />
                    {item.email}
                  </div>
                  <div className=" flex gap-4 leading-[1.3] font-Matter font-medium text-[1rem] text-[#737A82] w-[10rem] xl:w-[18rem]  ">
                    <Location />
                    {item.location.streetNumber},{item.location.streetName},
                    {item.location.town},{item.location.postalCode}
                  </div>
                </div>
                {uid.billingAddress.length > 1 && (
                  <div
                    onClick={() => {
                      deleteBilling1(item._id);
                    }}
                  >
                    <Delete />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className=" w-full  border-[1px] border-[#E5EAEF] rounded-3xl px-8 py-6 flex flex-col gap-6  ">
          <div className=" flex w-full items-center justify-between ">
            <div className=" font-Polysans font-semibold text-[#141415] text-[1.3rem]  ">
              {t("p246")}
            </div>
            <div
              className=" border-[1px] border-[#E5EAEF] py-4 cursor-pointer px-8 leading-none font-Matter font-medium text-[0.9rem] text-[#000000] rounded-full  "
              onClick={() => {
                openPopup1(true);
              }}
            >
              {t("p157")}
            </div>
          </div>

          {uid?.deliveryAddress.map((item, index) => (
            <div className=" bg-[#F7F8F9] rounded-3xl border-[1px] border-[#E5EAEF] py-4 px-8 flex flex-col gap-8  ">
              <div className=" w-full flex items-start py-3 justify-between ">
                {/* <div className=" font-Polysans font-semibold text-[#141415] text-[1.1rem]  "></div> */}

                <div className=" flex flex-col gap-6 ">
                  {index == 0 && (
                    <div className=" font-Polysans font-semibold text-[#141415] text-[1.1rem]  ">
                      {t("p158")}
                    </div>
                  )}
                  <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                    <Profile1 />
                    {item.userName}
                  </div>
                  <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                    <Phone />
                    {item.phone}
                  </div>
                  <div className=" flex gap-4 leading-none font-Matter font-medium text-[1rem] text-[#737A82]  ">
                    <Email />
                    {item.email}
                  </div>
                  <div className=" flex gap-4 leading-[1.3] font-Matter font-medium text-[1rem] text-[#737A82] w-[10rem]  ">
                    <Location />
                    {item.location.streetNumber},{item.location.streetName},
                    {item.location.town},{item.location.postalCode}
                  </div>
                </div>
                {uid.deliveryAddress.length > 1 && (
                  <div
                    onClick={() => {
                      deleteDelivery1(item._id);
                    }}
                  >
                    <Delete />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`h-[100vh] w-[100vw] bg-black/15 backdrop-blur-sm bg-opacity-50 fixed left-0 top-0 z-[100]  flex justify-center items-center duration-1000  ${
          popUp ? "block " : "hidden"
        }  `}
      >
        <div className=" flex flex-col w-[50rem] gap-16 bg-white border-[1px] p-6 rounded-3xl border-gray-300 shadow-lg ">
          <div className=" w-full flex items-center justify-between ">
            <div className=" font-Polysans font-semibold text-[1.5rem] tracking-tight text-[#444444] leading-none   ">
              {t("p323")}
            </div>
            <div
              className=" scale-125 cursor-pointer "
              onClick={() => {
                openPopup(false);
              }}
            >
              <Cross />
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p316")}
              </div>
              <input
                value={newT.billingAddress.userName}
                onChange={(e) => {
                  setNewTransport((prevTransport) => ({
                    ...prevTransport,
                    billingAddress: {
                      ...prevTransport.billingAddress,
                      userName: e.target.value,
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p289")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p248")}
              </div>
              <input
                value={newT.billingAddress.location.streetName}
                onChange={(e) => {
                  setNewTransport((prevTransport) => ({
                    ...prevTransport,
                    billingAddress: {
                      ...prevTransport.billingAddress,
                      location: {
                        ...prevTransport.billingAddress.location,
                        streetName: e.target.value,
                      },
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p290")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p249")}
              </div>
              <input
                value={newT.billingAddress.location.streetNumber}
                onChange={(e) => {
                  setNewTransport((prevTransport) => ({
                    ...prevTransport,
                    billingAddress: {
                      ...prevTransport.billingAddress,
                      location: {
                        ...prevTransport.billingAddress.location,
                        streetNumber: e.target.value,
                      },
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p291")}
              />
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p324")}
              </div>
              <input
                type="number"
                value={newT.billingAddress.location.postalCode}
                onChange={(e) => {
                  setNewTransport((prevTransport) => ({
                    ...prevTransport,
                    billingAddress: {
                      ...prevTransport.billingAddress,
                      location: {
                        ...prevTransport.billingAddress.location,
                        postalCode: e.target.value,
                      },
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="0000"
              />
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p251")}
              </div>

              <Popover
                open={open}
                onOpenChange={setOpen}
                className="relative z-[10000]"
              >
                <PopoverTrigger asChild>
                  <div
                    className={` flex flex-col  cursor-pointer relative  border 
                        border-[#DFDFDF]
                     bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                  >
                    {" "}
                    {newT.billingAddress.location.town
                      ? newT.billingAddress.location.town
                      : t("p317")}
                  </div>
                  {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput1 placeholder={t("p296")} />
                    <CommandEmpty>{t("p318")}</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {townss.map((framework) => (
                          <div
                            className="hover:bg-gray-300 cursor-pointer font-Matter "
                            onClick={() => {
                              setOpen(false);
                              setNewTransport((prevTransport) => ({
                                ...prevTransport,
                                billingAddress: {
                                  ...prevTransport.billingAddress,
                                  location: {
                                    ...prevTransport.billingAddress.location,
                                    town: framework.value,
                                  },
                                },
                              }));
                            }}
                          >
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setNewTransport((prevTransport) => ({
                                  ...prevTransport,
                                  billingAddress: {
                                    ...prevTransport.billingAddress,
                                    location: {
                                      ...prevTransport.billingAddress.location,
                                      town:
                                        currentValue ===
                                        newT.billingAddress.location.town
                                          ? ""
                                          : currentValue,
                                    },
                                  },
                                }));

                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  newT.billingAddress.location.town ===
                                    framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          </div>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p252")}
              </div>

              <Popover
                open={open1}
                onOpenChange={setOpen1}
                className="relative z-[10000]"
              >
                <PopoverTrigger asChild>
                  <div
                    className={` flex flex-col  cursor-pointer relative  border 
                        border-[#DFDFDF]
                     bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                  >
                    {" "}
                    {newT.billingAddress.location.canton
                      ? newT.billingAddress.location.canton
                      : t("p319")}
                  </div>
                  {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput1 placeholder={t("p296")} />
                    <CommandEmpty>{t("p318")}</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {cantons.map((framework) => (
                          <div
                            className="hover:bg-gray-300 cursor-pointer font-Matter "
                            onClick={() => {
                              setOpen1(false);
                              setNewTransport((prevTransport) => ({
                                ...prevTransport,
                                billingAddress: {
                                  ...prevTransport.billingAddress,
                                  location: {
                                    ...prevTransport.billingAddress.location,
                                    canton: framework.value,
                                  },
                                },
                              }));
                            }}
                          >
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setNewTransport((prevTransport) => ({
                                  ...prevTransport,
                                  billingAddress: {
                                    ...prevTransport.billingAddress,
                                    location: {
                                      ...prevTransport.billingAddress.location,
                                      canton:
                                        currentValue ===
                                        newT.billingAddress.location.canton
                                          ? ""
                                          : currentValue,
                                    },
                                  },
                                }));

                                setOpen1(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  newT.billingAddress.location.canton ===
                                    framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          </div>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p84")}
              </div>
              <input
                type="email"
                value={newT.billingAddress.email}
                onChange={(e) => {
                  setNewTransport((prevTransport) => ({
                    ...prevTransport,
                    billingAddress: {
                      ...prevTransport.billingAddress,
                      email: e.target.value,
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p292")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p321")}
              </div>
              <input
                type="number"
                value={newT.billingAddress.phone}
                onChange={(e) => {
                  setNewTransport((prevTransport) => ({
                    ...prevTransport,
                    billingAddress: {
                      ...prevTransport.billingAddress,
                      phone: e.target.value,
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p294")}
              />
            </div>
          </div>
          <div className=" w-full flex items-end justify-end  ">
            <div
              className=" font-Matter text-[1rem] tracking-tight  w-[130px] flex justify-center text-[white] leading-none h-[40px] items-center  cursor-pointer rounded-3xl bg-[#1053FF]   "
              onClick={() => {
                !transportLoad && TransportPost();
              }}
            >
              {transportLoad ? <div className=" loadersm " /> : t("p161")}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`h-[100vh] w-[100vw] bg-black/15 backdrop-blur-sm  fixed left-0 top-0 z-[100]  flex justify-center items-center duration-1000  ${
          popUp1 ? "block " : "hidden"
        }  `}
      >
        <div className=" flex flex-col w-[50rem] gap-16 bg-white border-[1px] p-6 rounded-3xl border-gray-300 shadow-lg ">
          <div className=" w-full flex items-center justify-between ">
            <div className=" font-Polysans font-semibold text-[1.5rem] tracking-tight text-[#444444] leading-none   ">
              {t("p160")}
            </div>
            <div
              className=" scale-125 cursor-pointer "
              onClick={() => {
                openPopup1(false);
              }}
            >
              <Cross />
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p316")}
              </div>
              <input
                value={newD.deliveryAddress.userName}
                onChange={(e) => {
                  setNewDelivery((prevTransport) => ({
                    ...prevTransport,
                    deliveryAddress: {
                      ...prevTransport.deliveryAddress,
                      userName: e.target.value,
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p289")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p248")}
              </div>
              <input
                value={newD.deliveryAddress.location.streetName}
                onChange={(e) => {
                  setNewDelivery((prevTransport) => ({
                    ...prevTransport,
                    deliveryAddress: {
                      ...prevTransport.deliveryAddress,
                      location: {
                        ...prevTransport.deliveryAddress.location,
                        streetName: e.target.value,
                      },
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p290")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p249")}
              </div>
              <input
                value={newD.deliveryAddress.location.streetNumber}
                onChange={(e) => {
                  setNewDelivery((prevTransport) => ({
                    ...prevTransport,
                    deliveryAddress: {
                      ...prevTransport.deliveryAddress,
                      location: {
                        ...prevTransport.deliveryAddress.location,
                        streetNumber: e.target.value,
                      },
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p291")}
              />
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p324")}
              </div>
              <input
                type="number"
                value={newD.deliveryAddress.location.postalCode}
                onChange={(e) => {
                  setNewDelivery((prevTransport) => ({
                    ...prevTransport,
                    deliveryAddress: {
                      ...prevTransport.deliveryAddress,
                      location: {
                        ...prevTransport.deliveryAddress.location,
                        postalCode: e.target.value,
                      },
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder="0000"
              />
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p251")}
              </div>
              <Popover
                open={open3}
                onOpenChange={setOpen3}
                className="relative z-[10000]"
              >
                <PopoverTrigger asChild>
                  <div
                    className={` flex flex-col  cursor-pointer relative  border 
                        border-[#DFDFDF]
                     bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                  >
                    {" "}
                    {newD.deliveryAddress.location.town
                      ? newD.deliveryAddress.location.town
                      : t("p317")}
                  </div>
                  {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput1 placeholder={t("p296")} />
                    <CommandEmpty>{t("p318")}</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {townss.map((framework) => (
                          <div
                            className="hover:bg-gray-300 cursor-pointer font-Matter "
                            onClick={() => {
                              setOpen3(false);
                              setNewDelivery((prevTransport) => ({
                                ...prevTransport,
                                deliveryAddress: {
                                  ...prevTransport.deliveryAddress,
                                  location: {
                                    ...prevTransport.deliveryAddress.location,
                                    town: framework.value,
                                  },
                                },
                              }));
                            }}
                          >
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setNewDelivery((prevTransport) => ({
                                  ...prevTransport,
                                  deliveryAddress: {
                                    ...prevTransport.deliveryAddress,
                                    location: {
                                      ...prevTransportdeliveryAddresss.location,
                                      town:
                                        currentValue ===
                                        newD.deliveryAddress.location.town
                                          ? ""
                                          : currentValue,
                                    },
                                  },
                                }));

                                setOpen3(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  newD.deliveryAddress.location.town ===
                                    framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          </div>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p252")}
              </div>
              <Popover
                open={open4}
                onOpenChange={setOpen4}
                className="relative z-[10000]"
              >
                <PopoverTrigger asChild>
                  <div
                    className={` flex flex-col  cursor-pointer relative  border 
                        border-[#DFDFDF]
                     bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                  >
                    {" "}
                    {newD.deliveryAddress.location.canton
                      ? newD.deliveryAddress.location.canton
                      : t("p319")}
                  </div>
                  {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput1 placeholder={t("p296")} />
                    <CommandEmpty>{t("p318")}</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {cantons.map((framework) => (
                          <div
                            className="hover:bg-gray-300 cursor-pointer font-Matter "
                            onClick={() => {
                              setOpen4(false);
                              setNewDelivery((prevTransport) => ({
                                ...prevTransport,
                                deliveryAddress: {
                                  ...prevTransport.deliveryAddress,
                                  location: {
                                    ...prevTransport.deliveryAddress.location,
                                    canton: framework.value,
                                  },
                                },
                              }));
                            }}
                          >
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setNewDelivery((prevTransport) => ({
                                  ...prevTransport,
                                  deliveryAddress: {
                                    ...prevTransport.deliveryAddress,
                                    location: {
                                      ...prevTransport.deliveryAddress.location,
                                      canton:
                                        currentValue ===
                                        newD.deliveryAddress.location.canton
                                          ? ""
                                          : currentValue,
                                    },
                                  },
                                }));

                                setOpen4(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  newD.deliveryAddress.location.canton ===
                                    framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          </div>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p84")}
              </div>
              <input
                type="email"
                value={newD.deliveryAddress.email}
                onChange={(e) => {
                  setNewDelivery((prevTransport) => ({
                    ...prevTransport,
                    deliveryAddress: {
                      ...prevTransport.deliveryAddress,
                      email: e.target.value,
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p293")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p321")}
              </div>
              <input
                type="number"
                value={newD.deliveryAddress.phone}
                onChange={(e) => {
                  setNewDelivery((prevTransport) => ({
                    ...prevTransport,
                    deliveryAddress: {
                      ...prevTransport.deliveryAddress,
                      phone: e.target.value,
                    },
                  }));
                }}
                className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full"
                placeholder={t("p294")}
              />
            </div>
          </div>
          <div className=" w-full flex items-end justify-end  ">
            <div
              className=" font-Matter text-[1rem] tracking-tight  w-[130px] flex justify-center text-[white] leading-none h-[40px] items-center  cursor-pointer rounded-3xl bg-[#1053FF]   "
              onClick={() => {
                !deliveryLoad && DeliveryPost();
              }}
            >
              {deliveryLoad ? <div className=" loadersm " /> : t("p161")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
