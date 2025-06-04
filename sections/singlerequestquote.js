"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

import { getToken } from "@/api/getToken";

import Image from "next/image";
import Getsinglerequestquote from "@/api/getsinglerequestquote";
import Alert from "@/app/components/alert";
import Panic from "@/public/icon/panic";
import Halfarrow from "@/public/icon/halfarrow";
import src from "@/public/image/Frame.png";
import Navbar from "@/app/components/navbar";
import Spinner from "@/app/components/spinner";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Singlerequestquote = () => {
  const t = useI18n();
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState(false);
  const search = useSearchParams();
  const id = search.get("id");
  const [details, setDetails] = useState();
  const [visibleItem, setVisibleItem] = useState("");
  const [newDetails, setNewDetails] = useState();
  const itemRefs = useRef([]);
  const [error, seterror] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const quotes = async () => {
      const token = localStorage.getItem("token");
      const data = await Getsinglerequestquote(token, id);
      if (data?.error) {
        seterror(true);
        return;
      }
      //console.log(data, "quotes");
      setDetails(data);
      setNewDetails(data);
      setLoading(false);
      //console.log(data.items, "itemsss");
    };
    quotes();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItem(entry.target.getAttribute("data-name"));
          }
        });
      },
      { threshold: 0.5 } // Adjust this value to detect as per requirement
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [newDetails]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  if (error) {
    return (
      <div className="  items-center justify-center h-screen w-full px-10 ">
        <div className="">
          <Navbar heading={"Quote Requested"} className={"text-[1.5rem]"} />
        </div>
        <div>{t("p163")}</div>
      </div>
    );
  }

  return loading ? (
    <div className=" h-screen w-full flex items-center justify-center  ">
      <Spinner />
    </div>
  ) : (
    <div className=" px-8 w-full pb-32 relative ">
      <div className="">
        <Navbar heading={"Quote Requested"} className={"text-[1.5rem]"} />
      </div>

      <div className=" flex w-full gap-16 ">
        <div className=" w-[23%] ">
          <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-4 flex flex-col gap-2 ">
            <div className=" flex flex-col gap-2 w-48 ">
              <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
                {t("p222")}
              </div>
              <div className=" font-Matter font-medium text-[1.3rem] text-[#000000]   ">
                {newDetails?.items?.length}
              </div>
            </div>
            <div className=" flex flex-col gap-2 w-full">
              <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
                {t("p21")}
              </div>
              <div className=" font-Matter flex flex-col gap-2   font-medium text-[1.3rem] text-[#000000]   ">
                {newDetails?.items?.map((item, index) => (
                  <div className=" hover:bg-[white] cursor-pointer border-1 border-transparent duration-300  hover:border-[#E5EAEF] rounded-[9px] ">
                    {index + 1}. {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-16 ">
          {newDetails?.items.map((item, index) => (
            <div
              className=" flex flex-col gap-8  "
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-name={item.name}
            >
              <div className=" font-Matter text-[3rem] text-[#242425] font-medium leading-none    ">
                {t("p223")} #{index + 1}
              </div>

              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p224")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.name}
                  </div>
                </div>
                <div className=" w-full "></div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p225")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.materialType}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p226")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.quantity}
                  </div>
                </div>
              </div>
              <div className=" flex flex-col w-full gap-6  ">
                <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                  <div> {t("p227")}</div>
                  <Alert text={t("p297")} children={<Panic />} />
                </div>
                <div className=" flex w-full gap-12  ">
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.dimensions.length}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.dimensions.width}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.dimensions.height}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12 ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none">
                    {t("p228")}{" "}
                    <span className=" text-[#BDBDBD] "> (Optional)</span>
                  </div>
                  <div className="rounded-2xl p-3 border text-[#AFB2B6]  font-medium outline-none border-[#DFDFDF] h-32 w-full ">
                    {item?.description}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none">
                    {t("p229")}{" "}
                    <span className=" text-[#BDBDBD] "> (Optional)</span>
                  </div>
                  <div className="rounded-2xl p-[6px] border font-medium outline-none border-[#DFDFDF] h-32 w-full ">
                    <div
                      className=" h-full w-full rounded-2xl flex flex-col items-center justify-center bg-[#F7F8F9] border border-[#F1F1F1] cursor-pointer "
                      onClick={() => {
                        if (item?.referenceImage?.length > 0) {
                          setSide(true);
                        }
                        setImages(item?.referenceImage);
                      }}
                    >
                      <div className=" font-Polysans text-[0.85rem] font-semibold text-[#4B5563]     ">
                        {item?.referenceImage?.length || 0} {t("p116")}
                      </div>
                      {item?.referenceImage?.length > 0 && (
                        <div className="  font-Matter text-[0.85rem] text-[#9CA3AF] ">
                          {t("p230")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p231")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.applicationEnvironment}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p232")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.color ? "Yes" : "No suggest me"}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p233")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.sandBlastingRequires ? "Yes" : "No"}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p234")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {item.surfaceProtectionRequired ? "Yes" : "No"}
                  </div>
                </div>
              </div>
              {item.color && (
                <div className=" flex w-full gap-12  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p235")}{" "}
                      <span className=" text-[#BDBDBD] "> (Hex Code)</span>
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {item.color}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3 w-full "></div>
                </div>
              )}
            </div>
          ))}
          <div className=" flex flex-col gap-6 w-full ">
            <div className=" font-Polysans text-[2.3rem] text-[#141415] font-semibold    ">
              {t("p236")}
            </div>
            <div className=" flex w-full flex-col gap-8 ">
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p237")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.pickupLocation?.userName
                      ? "Yes"
                      : "No"}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p238")}
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.pickupLocation?.userName
                      ? formatDate(newDetails?.additionalDetails?.pickupDate)
                      : "-"}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p239")}?
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.deliveryLocation?.streetName
                      ? t("p273")
                      : t("p276")}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                    {t("p240")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.pickupLocation?.userName
                      ? `
                   ${newDetails?.additionalDetails?.pickupLocation?.userName},
                  ${newDetails?.additionalDetails?.pickupLocation?.streetNumber}
                  ,${newDetails?.additionalDetails?.pickupLocation?.streetName}
                `
                      : "-"}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2   ">
                    {t("p241")}
                    <Alert children={<Panic />} text={t("p299")} />
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.filmApplication
                      ? t("p273")
                      : t("p276")}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2    ">
                    {t("p242")}
                    <Alert children={<Panic />} text={t("p299")} />
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.filmRemoval ? "Yes" : "No"}
                  </div>
                </div>
              </div>
              <div className=" flex w-full gap-12  ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2   ">
                    {t("p243")}
                    <Alert children={<Panic />} text={t("p300")} />
                  </div>

                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                    {newDetails?.additionalDetails?.expressDelivery
                      ? t("p273")
                      : t("p276")}
                  </div>
                </div>
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2    ">
                    {t("p244")}
                  </div>
                  <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full h-36  ">
                    {t("p245")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {newDetails?.additionalDetails?.deliveryLocation?.userName && (
            <div className=" flex flex-col gap-6 w-full ">
              <div className=" font-Polysans text-[2.3rem] text-[#141415] font-semibold    ">
                {t("p246")}
              </div>
              <div className=" flex flex-col gap-8 ">
                <div className=" flex w-full gap-10  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p247")}
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {
                        newDetails?.additionalDetails?.deliveryLocation
                          ?.userName
                      }
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p248")}
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {
                        newDetails?.additionalDetails?.deliveryLocation
                          ?.streetName
                      }
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p249")}
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {
                        newDetails?.additionalDetails?.deliveryLocation
                          ?.streetNumber
                      }
                    </div>
                  </div>
                </div>
                <div className=" flex w-full gap-10  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p250")}
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.deliveryLocation
                        ?.postalCode
                        ? newDetails?.additionalDetails?.deliveryLocation
                            ?.postalCode
                        : "0000"}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p251")}
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.deliveryLocation?.town}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p252")}
                    </div>

                    <div className=" capitalize border font-medium outline-none border-[#DFDFDF] font-Matter text-[#AFB2B6]  text-[1rem] rounded-2xl p-3 w-full  ">
                      {newDetails?.additionalDetails?.deliveryLocation?.canton}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" w-[calc(100vw-21rem)] bg-[#FFFFFF] border-[1px] border-[#F0F0F0] rounded-full pl-12 pr-2 py-3 flex items-center justify-between fixed bottom-8 right-8 ">
        <div className=" font-Matter font-medium text-[#989898] text-[1rem]  ">
          {t("p253")} <span className=" text-[#242425] "> : {visibleItem}</span>
        </div>
      </div>
      {side && (
        <div
          onClick={() => {
            setSide(false);
          }}
          className=" overflow-hidden w-[100vw] left-0 bg-black/30 flex justify-center  items-center z-[100000] h-[100vh] fixed top-0 "
        >
          <AnimatePresence>
            <motion.div
              className=" h-full  overflow-hidden overflow-y-scroll w-[40%] bg-[#FFFFFF] absolute top-0 right-0 flex flex-col gap-12 shadow-lg p-6  "
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <div className=" w-full text-[#242425] font-Matter text-[1.7rem] font-medium  ">
                {t("p254")}
              </div>
              <div className=" grid-cols-2 lg:grid-cols-3  grid gap-4 ">
                {images.map((img) => (
                  <div className=" md:h-36 lg:h-44 rounded-3xl overflow-hidden ">
                    <img
                      src={`https://media.polycolor.ch/polycolor-media/${img}`}
                      className=" object-cover w-full h-full "
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Singlerequestquote;
