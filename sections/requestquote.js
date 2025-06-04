"use client";
import Navbar from "@/app/components/navbar";
import Leftclick from "@/public/icon/leftclick";
import Rightclick from "@/public/icon/rightclick";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { easeInOut, easeOut, motion } from "framer-motion";
import Halfarrow from "@/public/icon/halfarrow";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/api/getToken";
import Requestquoteapi from "@/api/requestquote";
import Blueplus from "@/public/icon/blueplus";
import Alert from "@/app/components/alert";
import clsx from "clsx";
import getuser from "@/api/getuser";
import getaddress from "@/api/getaddress";
import Addbillingaddress from "@/api/addbillingaddress";
import Notcheck from "@/public/icon/notcheck";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddDeliveryAddress from "@/api/adddeliveryaddress";
import Cross from "@/public/icon/cross";
import Documentupload from "@/app/components/Documentupload";
import addItemImages from "@/api/additemimages";
import Delete from "@/public/icon/delete";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/app/components/spinner";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput1,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input1 } from "@/components/ui/input1";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Check1 from "@/public/icon/check";
import { useCurrentLocale, useI18n } from "@/locales/client";

const Requestquote = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
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

  const [topen, setTopen] = useState(false);
  const [t2open, setT2open] = useState(false);
  const [t3open, setT3open] = useState(false);
  const [t4open, setT4open] = useState(false);
  const params = usePathname();
  const token = getToken();
  const [isRed, setIsRed] = useState(false);
  const [isRed1, setIsRed1] = useState(false);
  const [isRed2, setIsRed2] = useState(false);
  const [tab, setTab] = useState(1);
  const [image, setImage] = useState([]);
  const { toast, handleToastClick } = useToast();
  const [transform, settransform] = useState(0);
  const [wantcolor, setWantColor] = useState([]);
  const [sand, setSand] = useState();
  const [surface, setSurface] = useState();
  const [hex, setHex] = useState();
  const [red, setRed] = useState(false);
  const [red1, setRed1] = useState(false);
  const [date, setDate] = useState();
  const [transport, setTransport] = useState();
  const [delivery, setDelivery] = useState(false);
  const [needDelivery, setNeedDelivery] = useState();
  const [location, setLocation] = useState();
  const [application, setApplication] = useState();
  const [removal, setRemoval] = useState();
  const [express, setExpress] = useState();
  const [notes, setNotes] = useState();
  const [name, setName] = useState();
  const [streetName, setStreetName] = useState();
  const [streetNumber, setStreetNumber] = useState();
  const [post, setPost] = useState();
  const [town, setTown] = useState();
  const [canton, setCanton] = useState();
  const [submit, setSubmit] = useState(false);
  const [unit, setUnit] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open71, setOpen71] = useState(false);
  const [open11, setOpen11] = useState(false);
  const [open21, setOpen21] = useState(false);
  const [open31, setOpen31] = useState(false);
  const [open41, setOpen41] = useState(false);
  const [open51, setOpen51] = useState(false);
  const [open61, setOpen61] = useState(false);
  const [email, setEmail] = useState();
  const router = useRouter();
  const [phone, setPhone] = useState();
  const [save, setSave] = useState(false);
  const [locations, setLocations] = useState();
  const [popUp, openPopup] = useState(false);
  const [popUp1, openPopup1] = useState(false);
  const [itemArray, setItemArray] = useState([]);
  const [ArrIndex, setArrIndex1] = useState(0);
  const [imagesArray, setImagesArray] = useState([]);
  const [loading, setloading] = useState(false);
  const [deliveryLoad, setdeliveryLoad] = useState(false);

  const [itemsArray, setItemsArray] = useState([
    {
      name: "",
      materialType: null,
      quantity: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
        unit: "",
      },
      description: "",
      referenceImage: null,
      applicationEnvironment: null,
      sandBlastingRequires: null,
      surfaceProtectionRequired: null,
      color: "",
    },
  ]);
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

  const [transportAddress, setTransportAddress] = useState({
    userName: null,
    email: null,
    phone: null,
    streetName: null,
    streetNumber: null,
    postalCode: null,
    town: null,
    canton: null,
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    userName: null,
    email: null,
    phone: null,
    streetName: null,
    streetNumber: null,
    postalCode: null,
    town: null,
    canton: null,
  });
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
  const newDelivery = {
    deliveryAddress: {
      userName: name,
      email: email,
      phone: phone,
      location: {
        streetName: streetName,
        streetNumber: streetNumber,
        postalCode: post,
        town: town,
        canton: canton,
      },
    },
  };
  const divRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRed(false);
      setIsRed1(false);
      setIsRed2(false); // Set isActive to false every 2 seconds
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, [isRed]);

  const addDelivery = async (data) => {
    const res = await AddDeliveryAddress(token, data);
    if (res?.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
      //console.log(res.error, "error");
      return;
    }
    //console.log(data);
    //console.log(res, "ressponseeeeeee");
  };

  function handleDelete(index) {
    if (itemsArray.length == 1 && index == 0) {
      setItemsArray([
        {
          name: "",
          materialType: null,
          quantity: null,
          dimensions: {
            length: "",
            width: "",
            height: "",
            unit: "",
          },
          description: "",
          referenceImage: null,
          applicationEnvironment: null,
          sandBlastingRequires: null,
          surfaceProtectionRequired: null,
          color: "",
        },
      ]);
    } else {
      //console.log("setting", index);
      setItemsArray((prevItems) => {
        return prevItems.filter((_, idx) => idx !== index);
      });
      setArrIndex1(index - 1);
      //console.log("setting after", index);
    }
    //console.log(ArrIndex, " ", index, "itemsArray");
  }

  useEffect(() => {
    //console.log(ArrIndex, "settingArrIndex1");
  }, [ArrIndex]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleChange3 = (e) => {
    setNotes(e.target.value);
  };

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

  useEffect(() => {
    const getalladdress = async () => {
      const addresses = await getaddress(token);
      setLocations(addresses);
      //console.log(addresses, "addddddddddddddd");
    };
    getalladdress();
  }, []);

  const handleChange = (e) => {
    setItemsArray((prevItemsArray) => {
      const updatedArray = [...prevItemsArray];
      updatedArray[ArrIndex] = {
        ...updatedArray[ArrIndex],
        description: e.target.value,
      };
      return updatedArray;
    });
  };

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
        variant: "destructive",
      });
      //console.log(newT, "newwwwwwww");
    } else {
      const res = await Addbillingaddress(token, newT);
      if (res?.error) {
        toast({
          title: res.error,
          variant: "destructive",
        });
        //console.log(res.error, "error");
        return;
      }
      toast({ title: "Address added successfully" });
      openPopup(false);
      //console.log(res, "ress22222222222");
      setLocations(res?.user);
      setTransportAddress({
        userName: newT.billingAddress?.userName,
        email: newT.billingAddress?.email,
        phone: newT.billingAddress?.phone,
        postalCode: newT.billingAddress?.postalCode,
        streetName: newT.billingAddress.location?.streetName,
        streetNumber: newT.billingAddress.location?.streetNumber,
        canton: newT.billingAddress?.location?.canton,
        town: newT.billingAddress?.location?.town,
      });
      setDelivery(true);

      setNewTransport({
        billingAddress: {
          userName: "",
          email: "",
          phone: "",
          location: {
            streetName: "",
            streetNumber: "",
            postalCode: "",
            town: null,
            canton: null,
          },
        },
      });
    }
  };
  const materials = [
    { type: "steel", label: t("p264") },
    { type: "stainless steel", label: t("p265") },
    { type: "aluminium", label: t("p266") },
    { type: "galvanized steel", label: t("p340") },
    { type: "brass", label: t("p268") },
  ];
  const handleMaterialChange = (newMaterialType) => {
    const updatedItemsArray = [...itemsArray];
    updatedItemsArray[ArrIndex].materialType = newMaterialType;
    setItemsArray(updatedItemsArray);
  };
  const [uid, setuid] = useState();

  useEffect(() => {
    const getuid = async () => {
      const id = await getuser(token);

      setuid(id);
    };
    getuid();
  }, []);
  const previewFile = (image) => {
    if (image) {
      const fileURL = URL.createObjectURL(image);
      //console.log(fileURL, "url");
      return fileURL;
    }
  };

  const handleChange2 = (e) => {
    setHex(e.target.value);
    setItemsArray((prevItemsArray) => {
      const updatedArray = [...prevItemsArray];
      updatedArray[ArrIndex] = {
        ...updatedArray[ArrIndex],
        color: e.target.value,
      };
      return updatedArray;
    });
  };

  const data = {
    items: itemsArray,
    additionalDetails: {
      pickupDate: date,
      deliveryLocation: deliveryAddress,
      pickupLocation: transportAddress,
      filmApplication: application == "yes" ? true : false,
      expressDelivery: express == "yes" ? true : express == "no" ? false : null,
      notes: notes,
    },
  };

  const handleAddItem = () => {
    //console.log(itemsArray, "add Item");
    setItemsArray((prevItemsArray) => [
      ...prevItemsArray,
      {
        name: "",
        materialType: null,
        quantity: "",
        dimensions: {
          length: "",
          width: "",
          height: "",
          unit: "",
        },
        description: "",
        referenceImage: null,
        applicationEnvironment: null,
        sandBlastingRequires: null,
        surfaceProtectionRequired: null,
        color: "",
      },
    ]);
    setArrIndex1(itemsArray.length);
  };

  const [isVisible, setIsVisible] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRed(false);
      setRed1(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [red1, red]);

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
      setLocations(res?.user);
      openPopup1(false);
      //console.log(res, "ress22ddd");
      // location.reload();

      setDeliveryAddress({
        userName: newD.deliveryAddress?.userName,
        email: newD.deliveryAddress?.email,
        phone: newD.deliveryAddress?.phone,
        postalCode: newD.deliveryAddress?.postalCode,
        streetName: newD.deliveryAddress.location?.streetName,
        streetNumber: newD.deliveryAddress.location?.streetNumber,
        canton: newD.deliveryAddress?.location?.canton,
        town: newD.deliveryAddress?.location?.town,
      });

      setNewDelivery({
        deliveryAddress: {
          userName: "",
          email: "",
          phone: "",
          location: {
            streetName: "",
            streetNumber: "",
            postalCode: "",
            town: "",
            canton: "",
          },
        },
      });

      setLocation("one");
      setdeliveryLoad(false);
    }
  };

  const handleNext = () => {
    //console.log(itemsArray, "iiiiiiiiiii", "kkkkkkkkkkkkk");

    if (tab == 1) {
      let isVerified = true;
      for (let index = 0; index < itemsArray.length; index++) {
        const item = itemsArray[index];
        if (!item.name) {
          toast({
            title: t("p330"),
            variant: "destructive",
          });
          setArrIndex1(index);
          isVerified = false;
          break;
        } else if (!item.materialType) {
          toast({
            title: t("p118"),
            variant: "destructive",
          });
          setArrIndex1(index);
          isVerified = false;
          break;
        } else if (!item.quantity) {
          toast({
            title: t("p119"),
            variant: "destructive",
          });
          setArrIndex1(index);
          isVerified = false;
          break;
        } else if (
          !item.dimensions.height ||
          !item.dimensions.width ||
          !item.dimensions.height ||
          !item.dimensions.unit
        ) {
          toast({
            title: t("p120"),
          });
          setArrIndex1(index);
          isVerified = false;
          break;
        } else if (!item.applicationEnvironment) {
          toast({
            title: t("p121"),
            variant: "destructive",
          });
          setArrIndex1(index);
          isVerified = false;
          break;
        } else if (!wantcolor) {
          toast({
            title: t("p122"),
            variant: "destructive",
          });
        } else if (
          item.sandBlastingRequires == null ||
          item.surfaceProtectionRequired == null
        ) {
          toast({
            title: t("p123"),
            variant: "destructive",
          });
          setArrIndex1(index);
          isVerified = false;
          break;
          return;
        } else if (wantcolor == "Yes") {
          if (!item.color) {
            toast({
              title: t("p124"),
              variant: "destructive",
            });
            setArrIndex1(index);
            isVerified = false;
            break;
          }
        }
      }
      if (isVerified) {
        setTab(2);
        handleScrollToTop();
      }
    } else if (tab == 2) {
      setIsRed1(true);
      if (!transport) {
        toast({
          title: t("p125"),
          variant: "destructive",
        });
      } else if (transport == "yes" && !date) {
        toast({
          title: t("p126"),
          variant: "destructive",
        });
      } else if (transport == "yes" && !transportAddress) {
        toast({
          title: t("p127"),
          variant: "destructive",
        });
      } else if (!removal) {
        toast({
          title: t("p128"),
          variant: "destructive",
        });
      } else if (!needDelivery) {
        toast({
          title: t("p129"),
          variant: "destructive",
        });
      } else if (needDelivery == "yes" && !location) {
        toast({
          title: t("p130"),
          variant: "destructive",
        });
      } else if (!application) {
        toast({
          title: t("p131"),
          variant: "destructive",
        });
      } else if (needDelivery == "yes" && !express) {
        toast({
          title: t("p132"),
          variant: "destructive",
        });
      } else if (needDelivery == "no" || location == "billing") {
        setSubmit(true);
      } else if (location == "other") {
        setTab(3);
        handleScrollToTop();
      } else if (deliveryAddress) {
        setSubmit(true);
      }
    } else if (tab == 3) {
      setIsRed2(true);
      if (!name) {
        toast({
          title: t("p133"),
          variant: "destructive",

          // 282
        });
      } else if (!streetName) {
        toast({
          title: t("p134"),
          variant: "destructive",
        });
      } else if (!streetNumber) {
        toast({
          title: t("p135"),
          variant: "destructive",
        });
      } else if (!post) {
        toast({
          title: t("p136"),

          variant: "destructive",
        });
      } else if (!town) {
        toast({
          title: t("p137"),
          variant: "destructive",
        });
      } else if (!canton) {
        toast({
          title: t("p138"),
          variant: "destructive",
        });
      } else if (!email) {
        toast({
          title: t("p139"),
          variant: "destructive",
        });
      } else if (!phone) {
        toast({
          title: t("p140"),
          variant: "destructive",
        });
      } else if (
        name &&
        post &&
        streetName &&
        post &&
        town &&
        canton &&
        phone &&
        email
      ) {
        setDeliveryAddress({
          userName: name,
          email: email,
          phone: phone,
          postalCode: post,
          streetName: streetName,
          streetNumber: streetNumber,
          canton: canton,
          town: town,
        });
        setSubmit(true);
      }
    }
  };

  const handlePrevious = () => {
    if (tab <= 4 && tab != 1) {
      setTab(tab - 1);
      handleScrollToTop();
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleSubmit = async () => {
    if (location == "other") {
      setDeliveryAddress({
        userName: name,
        email: email,
        phone: phone,
        streetName: streetName,
        streetNumber: streetNumber,
        postalCode: post,
        canton: canton,
        town: town,
      });
    }
    if (save) {
      addDelivery(newDelivery);
    }
    //console.log(data, "dataaaaaaaa");
    setloading(true);
    const res = await Requestquoteapi(token, data);

    if (res?.error) {
      toast({
        title: res?.error,
        variant: "destructive",
      });
      setloading(false);
      return;
    }

    if (res?._id) {
      imagesArray.map(async (images, i) => {
        if (images) {
          const addimages = await addItemImages(token, i, res._id, images);
          return addimages; // assuming you want to collect the results
        }
      });
    }
    toast({
      title: t("p141"),
    });
    router.push("/dashboard/quotes");
    //console.log(res, "ress");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (tab == 2) {
      settransform(-100);
    }
    if (tab == 1) {
      settransform(0);
    }
    if (tab == 3) {
      settransform(-200);
    }
    if (tab == 4) {
      settransform(-300);
    }
    // if (tab == 5) {
    //   settransform(-400);
    // }
    // if (tab == 6) {
    //   settransform(-500);
    // }
  }, [tab]);

  useEffect(() => {
    //console.log(imagesArray, "iiiiiiiiii");
  }, [imagesArray]);

  const removeImage = useCallback((index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  }, []);
  const unitOptions = ["mm", "cm", "m", "inch"]; // Example units
  const handleUnitChange = (newUnit) => {
    const updatedItemsArray = [...itemsArray];
    updatedItemsArray[ArrIndex].dimensions.unit = newUnit;
    setItemsArray(updatedItemsArray);
  };

  const applicationEnvironments = [
    { value: "indoor", label: t("p270") },
    { value: "outdoor", label: t("p271") },
  ];

  const handleEnvironmentChange = (newEnvironment) => {
    const updatedArray = [...itemsArray];
    updatedArray[ArrIndex].applicationEnvironment = newEnvironment;
    setItemsArray(updatedArray);
  };

  const colorOptions = [
    { value: "Yes", label: t("p273") },
    { value: "No", label: t("p274") },
  ];
  const handleColorChange = (newColor) => {
    const updatedArray = [...wantcolor];
    updatedArray[ArrIndex] = newColor;
    setWantColor(updatedArray);
  };
  const sandBlastingOptions = [
    { value: "Yes", label: t("p273") },
    { value: "No", label: t("p276") },
    { value: "Notsure", label: t("p277") },
  ];
  const handleSandBlastingChange = (newSandBlasting) => {
    const updatedArray = [...itemsArray];
    updatedArray[ArrIndex] = {
      ...updatedArray[ArrIndex],
      sandBlastingRequires: newSandBlasting === "Yes",
    };
    setItemsArray(updatedArray);
    setSand(newSandBlasting);
  };
  const surfaceProtectionOptions = [
    { value: "Yes", label: t("p273") },
    { value: "No, Suggest me", label: t("p276") },
  ];
  const handleSurfaceProtectionChange = (newSurfaceProtection) => {
    const updatedArray = [...itemsArray];
    updatedArray[ArrIndex] = {
      ...updatedArray[ArrIndex],
      surfaceProtectionRequired: newSurfaceProtection === "Yes",
    };
    setItemsArray(updatedArray);
    setSurface(newSurfaceProtection);
  };
  const transportOptions = [
    { value: "yes", label: t("p273") },
    { value: "no", label: t("p276") },
  ];
  const handleTransportChange = (value) => {
    setTransport(value);
    setOpen71(false);
  };
  const deliveryOptions = [
    { value: "yes", label: t("p273") },
    { value: "no", label: t("p276") },
  ];
  const handleDeliveryChange = (value) => {
    setNeedDelivery(value);
    setOpen11(false);
  };
  const applicationOptions = [
    { value: "yes", label: t("p273") },
    { value: "no", label: t("p276") },
  ];
  const handleApplicationChange = (value) => {
    setApplication(value);
    setOpen31(false);
  };
  const expressOptions = [
    { value: "yes", label: t("p273") },
    { value: "no", label: t("p276") },
  ];
  const handleExpressChange = (value) => {
    setExpress(value);
    setOpen51(false);
  };
  return (
    <div className=" flex flex-col px-10 relative h-full  w-full ">
      <div className=" flex flex-col w-full sticky top-0 left-0 bg-white z-[10]  ">
        <div className="flex justify-between items-center sticky top-5 left-0 bg-white pb-2 z-[100] ">
          <div className=" font-Polysans font-semibold text-[#141415] text-[1.6rem]  ">
            {t("p260")}
          </div>
          <div className=" pt-4  w[25%]">
            <Navbar />
          </div>
        </div>
      </div>

      <div className=" flex max-w-[100%] min-w-[100%] overflow-hidden overflow-y-scroll pt-5 pb-44 relative  ">
        <div
          style={{ transform: `translateX(${transform}%)` }}
          className=" flex flex-row transition-all h-full   duration-1000 max-w-[100%] min-w-[100%]"
        >
          <div
            id="one"
            className=" h-full flex flex-col gap-12  min-w-[100%] max-w-[100%] relative z-[100] "
          >
            <div className=" w-full flex flex-col xl:flex-row gap-24 md:gap-12 1xl:gap-24   ">
              <div className=" flex xl:flex-col gap-8 w-full xl:w-[23%] ">
                <div className=" flex flex-col gap-3 w-full ">
                  <div className=" font-Polysans font-semibold text-[1.9rem] tracking-tight text-[#141415] leading-none   ">
                    {t("p261")}
                  </div>
                  <div className=" font-Polysans font-medium text-[0.9rem] tracking-tight text-[#929292] leading-[1.5] w-[79%] lg:w-[50%] xl:w-[90%]   ">
                    {t("p262")}
                  </div>
                </div>
                <div className=" bg-[#F7F8F9] border-[1px] border-[#E5EAEF] rounded-3xl p-4 flex flex-col gap-2 ">
                  <div className=" flex flex-col gap-2 w-48 ">
                    <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
                      {t("p222")}
                    </div>
                    <div className=" font-Matter font-medium text-[1.3rem] text-[#000000]   ">
                      {itemsArray.length}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-2 w-full">
                    <div className=" font-Matter font-medium text-[1rem] text-[#929292]   ">
                      {t("p21")}
                    </div>
                    <div className=" font-Matter flex flex-col gap-x-6   font-medium text-[1.3rem] text-[#000000]   ">
                      {itemsArray.map((item, index) => (
                        <div
                          className={` flex items-center justify-between   hover:bg-[white] cursor-pointer pl-   border-1 text-[0.99rem] border-transparent duration-300  hover:border-[#E5EAEF] rounded-[9px] ${
                            ArrIndex == index ? "text-black" : "text-[#929292]"
                          } `}
                          onClick={() => {
                            setArrIndex1(index);
                          }}
                          ref={divRef}
                        >
                          <div>
                            {" "}
                            {index + 1}. {item?.name}{" "}
                          </div>

                          <div
                            className={`${index == 0 ? "hidden" : "block"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(index);
                              //console.log(itemsArray, "Array re re");
                            }}
                          >
                            {" "}
                            <Delete height={20} />{" "}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full flex flex-col gap-12 ">
                <div className=" flex w-full gap-28  ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p224")}
                    </div>
                    <Input1
                      type="text"
                      value={itemsArray[ArrIndex]?.name}
                      onChange={(e) => {
                        setItemsArray((prevItemsArray) => {
                          const updatedArray = [...prevItemsArray];
                          updatedArray[ArrIndex] = {
                            ...updatedArray[ArrIndex],
                            name: e.target.value,
                          };
                          return updatedArray;
                        });
                        //console.log(itemsArray, "arraypush");
                        setItemArray((prevArray) => {
                          const newArray = [...prevArray];
                          newArray[ArrIndex] = e.target.value;
                          return newArray;
                        });

                        //console.log(itemArray, "arrayrere");
                      }}
                      className={`border outline-none ${
                        !itemsArray[ArrIndex]?.name && isRed
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full overflow-x-scroll outline-none  `}
                      placeholder={t("p283")}
                    />
                  </div>
                  <div className=" w-full "></div>
                </div>
                <div className=" flex w-full gap-28  ">
                  <div className="flex flex-col w-full gap-3">
                    <div className="font-Matter text-[1rem] text-[#444444] font-medium leading-none">
                      {t("p263")}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            !itemsArray[ArrIndex]?.materialType && isRed
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                          onClick={() => setOpen(!open)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300">
                              <div>
                                {itemsArray[ArrIndex]?.materialType ? (
                                  <div className="text-[#464646]">
                                    {materials.find(
                                      (material) =>
                                        material.type ===
                                        itemsArray[ArrIndex]?.materialType
                                    )?.label ||
                                      itemsArray[ArrIndex]?.materialType}
                                  </div>
                                ) : (
                                  t("p301")
                                )}
                              </div>
                              <Halfarrow
                                className={open ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full border font-Matter border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {materials.map((material) => (
                          <DropdownMenuItem
                            variant="outline"
                            color=""
                            className=" hover:bg-black"
                            key={material.type}
                            onClick={() => handleMaterialChange(material.type)} // Function to handle material change
                          >
                            {material.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p226")}
                    </div>
                    <Input1
                      type="number"
                      value={itemsArray[ArrIndex]?.quantity}
                      onChange={(e) => {
                        setItemsArray((prevItemsArray) => {
                          const updatedArray = [...prevItemsArray];
                          updatedArray[ArrIndex] = {
                            ...updatedArray[ArrIndex],
                            quantity: e.target.value,
                          };
                          return updatedArray;
                        });
                      }}
                      className={`border outline-none ${
                        !itemsArray[ArrIndex]?.quantity && isRed
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full outline-none`}
                      placeholder={t("p284")}
                    />
                  </div>
                </div>
                <div className=" w-full flex flex-col gap-3 ">
                  <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                    <div> {t("p227")}</div>
                    <Alert text={t("p267")} />
                  </div>
                  <div
                    className={` flex w-full ${
                      currentLocale == "en"
                        ? "gap-6 xl:gap-12"
                        : " gap-6 lg:gap-12"
                    } `}
                  >
                    <div className=" flex flex-col gap-3 w-full ">
                      <Input1
                        type="number"
                        value={itemsArray[ArrIndex]?.dimensions?.length}
                        onChange={(e) => {
                          setItemsArray((prevItemsArray) => {
                            const updatedArray = [...prevItemsArray];
                            updatedArray[ArrIndex] = {
                              ...updatedArray[ArrIndex],
                              dimensions: {
                                ...updatedArray[ArrIndex].dimensions,
                                length: e.target.value,
                              },
                            };
                            return updatedArray;
                          });
                        }}
                        className={`border outline-none ${
                          !itemsArray[ArrIndex]?.dimensions?.length && isRed
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                        placeholder={t("p285")}
                      />
                    </div>
                    <div className=" flex flex-col gap-3 w-full ">
                      <Input1
                        type="number"
                        value={itemsArray[ArrIndex]?.dimensions?.height}
                        onChange={(e) => {
                          setItemsArray((prevItemsArray) => {
                            const updatedArray = [...prevItemsArray];
                            updatedArray[ArrIndex] = {
                              ...updatedArray[ArrIndex],
                              dimensions: {
                                ...updatedArray[ArrIndex].dimensions,
                                height: e.target.value,
                              },
                            };
                            return updatedArray;
                          });
                        }}
                        className={`border outline-none ${
                          !itemsArray[ArrIndex]?.dimensions?.height && isRed
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                        placeholder={t("p286")}
                      />
                    </div>
                    <div className=" flex flex-col gap-3 w-full ">
                      <Input1
                        type="number"
                        value={itemsArray[ArrIndex]?.dimensions?.width}
                        onChange={(e) => {
                          setItemsArray((prevItemsArray) => {
                            const updatedArray = [...prevItemsArray];
                            updatedArray[ArrIndex] = {
                              ...updatedArray[ArrIndex],
                              dimensions: {
                                ...updatedArray[ArrIndex].dimensions,
                                width: e.target.value,
                              },
                            };
                            return updatedArray;
                          });
                        }}
                        className={`border outline-none ${
                          !itemsArray[ArrIndex]?.dimensions?.width && isRed
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                        placeholder={t("p287")}
                      />
                    </div>
                    <div
                      className={` flex flex-col gap-3 ${
                        currentLocale == "en"
                          ? " min-w-[10rem] "
                          : "lg:min-w-[10rem] min-w-[11rem]"
                      }  `}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger className="" asChild>
                          <div
                            className={`font-Matter capitalize text-[1rem] px-3 pr-2 p-3.5 rounded-2xl text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300 cursor-pointer border ${
                              itemsArray[ArrIndex]?.dimensions?.unit
                                ? "text-[#464646]"
                                : "text-[#AFB2B6]"
                            }`}
                            onClick={() => setOpen1(!open1)}
                          >
                            <div>
                              {itemsArray[ArrIndex]?.dimensions?.unit ? (
                                <div className="text-[#464646] font-Matter">
                                  {itemsArray[ArrIndex]?.dimensions?.unit}
                                </div>
                              ) : (
                                t("p195")
                              )}
                            </div>
                            <Halfarrow
                              className={open1 ? "rotate-180" : "rotate-0"}
                            />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[9rem] font-Matter border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                          {unitOptions.map((unit) => (
                            <DropdownMenuItem
                              key={unit}
                              onClick={() => handleUnitChange(unit)}
                            >
                              {unit}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <div
                  className={` flex w-full ${
                    currentLocale == "en"
                      ? " gap-12 lg:gap-24"
                      : " gap-8 lg:gap-24"
                  } `}
                >
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p228")}
                      <span className=" text-[#BDBDBD] "> {t("p302")} </span>
                    </div>
                    <textarea
                      value={itemsArray[ArrIndex]?.description}
                      onChange={handleChange}
                      className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] focus:border-black placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full h-32"
                      placeholder={t("p288")}
                    />
                  </div>
                  <div
                    className={` flex flex-col gap-3  ${
                      currentLocale == "en" ? "w-full" : "w-full"
                    } `}
                  >
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p229")}
                      <span className=" text-[#BDBDBD] "> (Optional) </span>
                    </div>
                    <div
                      className={clsx(
                        " bg-[#FFFFFF] border-[1px] overflow-y-scroll border-[#DFDFDF] rounded-2xl h-32 p-3  ",
                        image ? "" : ""
                      )}
                    >
                      <Documentupload
                        imagesArray={imagesArray}
                        setImagesArray={setImagesArray}
                        index={ArrIndex}
                      />
                      {/* {!image.length && (
                        <div
                          className="cursor-pointer bg-[#F7F8F9] rounded-2xl border-[1px] flex flex-col items-center justify-center border-[#F1F1F1] h-full"
                          onClick={() => fileInput1Ref.current.click()}
                        >
                          <Input1
                            type="file"
                            accept=".webp,.jpg,.jpeg,.png"
                            multiple
                            id="fileInput1"
                            ref={fileInput1Ref}
                            onChange={handleChange1}
                            style={{ display: "none" }}
                          />
                          <div className="font-Circular text-[#4B5563] mx-auto w-[250px] font-medium">
                            <div className="flex items-center justify-center gap-2">
                              <Uploadlogo />
                              <div className="font-Polysans font-semibold text-[0.9rem] text-[#4B5563]">
                                Upload Image
                              </div>
                            </div>
                            <div className="text-center text-[#9CA3AF] font-normal pt-2 text-[0.9rem]">
                              Drag and drop or click here to upload
                            </div>
                          </div>
                        </div>
                      )} */}
                      {image?.length > 0 && (
                        <div className=" flex gap-2 ">
                          {image.map((item, index) => (
                            <div
                              key={index}
                              className="w-full h-full flex flex-wrap relative rounded-2xl"
                            >
                              <img
                                className="w-full h-full object-contain bg-[#F7F8F9]"
                                height={200}
                                width={200}
                                src={previewFile(item)}
                                alt={`Selected ${index}`}
                              />
                              <div
                                className="absolute top-0 right-0 cursor-pointer"
                                onClick={() => removeImage(index)}
                              >
                                <Cross />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={` flex w-full  ${
                    currentLocale == "en"
                      ? "gap-12 lg:gap-28"
                      : "gap-6 lg:gap-28"
                  }  `}
                >
                  <div
                    className={` flex flex-col  gap-3 ${
                      currentLocale == "en" ? "w-full" : "w-[80%] lg:w-full"
                    } `}
                  >
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none  ">
                      {t("p269")}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            !itemsArray[ArrIndex]?.applicationEnvironment &&
                            isRed
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                          onClick={() => setOpen4(!open4)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300`}
                            >
                              <div>
                                {itemsArray[ArrIndex]
                                  ?.applicationEnvironment ? (
                                  <div className="text-[#464646]">
                                    {applicationEnvironments.find(
                                      (env) =>
                                        env.value ===
                                        itemsArray[ArrIndex]
                                          ?.applicationEnvironment
                                    )?.label ||
                                      itemsArray[ArrIndex]
                                        ?.applicationEnvironment}
                                  </div>
                                ) : (
                                  t("p303")
                                )}
                              </div>
                              <Halfarrow
                                className={open4 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] font-Matter  border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {applicationEnvironments.map((env) => (
                          <DropdownMenuItem
                            key={env.value}
                            onClick={() => handleEnvironmentChange(env.value)}
                          >
                            {env.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className=" flex flex-col w-[80%] lg:w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p272")}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            !wantcolor[ArrIndex] && isRed
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                          onClick={() => setOpen5(!open5)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300`}
                            >
                              <div>
                                {wantcolor[ArrIndex] ? (
                                  <div className="text-[#464646]">
                                    {colorOptions.find(
                                      (option) =>
                                        option.value === wantcolor[ArrIndex]
                                    )?.label || wantcolor[ArrIndex]}
                                  </div>
                                ) : (
                                  t("p272")
                                )}
                              </div>
                              <Halfarrow
                                className={open5 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {colorOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleColorChange(option.value)}
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className=" flex w-full gap-16 lg:gap-28  ">
                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p275")}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            itemsArray[ArrIndex]?.sandBlastingRequires ==
                              null && isRed
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                          onClick={() => setOpen2(!open2)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300`}
                            >
                              <div>
                                {itemsArray[ArrIndex]?.sandBlastingRequires &&
                                sand ? (
                                  <div className="text-[#464646]">
                                    {sandBlastingOptions.find(
                                      (option) => option.value === sand
                                    )?.label || sand}
                                  </div>
                                ) : sand ? (
                                  <div className="text-[#464646]">
                                    {t("p276")}
                                  </div>
                                ) : (
                                  t("p233")
                                )}
                              </div>
                              <Halfarrow
                                className={open2 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {sandBlastingOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() =>
                              handleSandBlastingChange(option.value)
                            }
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                      <div> {t("p234")}</div>
                      <Alert
                        right={true}
                        text={t("p298")}
                        // (t("p278"))
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            itemsArray[ArrIndex]?.surfaceProtectionRequired ==
                              null && isRed
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                          onClick={() => setOpen3(!open3)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300`}
                            >
                              <div>
                                {itemsArray[ArrIndex]
                                  ?.surfaceProtectionRequired && surface ? (
                                  <div className="text-[#464646]">
                                    {surfaceProtectionOptions.find(
                                      (option) => option.value === surface
                                    )?.label || surface}
                                  </div>
                                ) : surface ? (
                                  <div className="text-[#464646]">
                                    {t("p276")}
                                  </div>
                                ) : (
                                  t("p304")
                                )}
                              </div>
                              <Halfarrow
                                className={open3 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {surfaceProtectionOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() =>
                              handleSurfaceProtectionChange(option.value)
                            }
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {wantcolor[ArrIndex] == "Yes" && (
                  <div className=" flex w-full gap-24 ">
                    <div className=" flex flex-col gap-3 w-full ">
                      <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                        {t("p235")}
                        <span className=" text-[#BDBDBD] "> (Hex Code) </span>
                      </div>
                      <Input1
                        value={itemsArray[ArrIndex]?.color}
                        type="text"
                        onChange={handleChange2}
                        className={`border outline-none ${
                          !hex && isRed
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        }  rounded-2xl p-3 h-12 w-full`}
                        placeholder="#FFFFFF"
                      />
                      {/* <Input1
                        value={itemsArray[ArrIndex]?.color}
                        type="color"
                        onChange={handleChange2}
                        className={`border outline-none ${
                          !hex && isRed
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        }  rounded-2xl p-3 h-24 w-full`}
                        placeholder="#FFFFFF"
                      /> */}
                    </div>
                    <div className=" w-full "></div>
                  </div>
                )}
                <div className=" flex w-full ">
                  <div
                    className={` flex items-center gap-2 cursor-pointer justify-center ${
                      currentLocale == "en"
                        ? "lg:w-[12rem] w-[15rem]"
                        : "lg:w-[22rem] w-[30rem]"
                    } py-4 border-[1px] border-[#205FFF] rounded-xl text-[0.9rem] leading-none text-[#205FFF] font-medium  `}
                    onClick={() => {
                      handleAddItem();
                      handleScrollToTop();
                    }}
                  >
                    <Blueplus />
                    {t("p279")}
                  </div>
                  <div className=" w-full "></div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="two"
            className=" h-full min-w-[100%] max-w-[100%] relative z-[100] "
          >
            <div className="w-full flex flex-col xl:flex-row gap-16 pb-28 ">
              <div className=" flex flex-col gap-3 xl:w-[23%] ">
                <div className=" font-Polysans font-semibold text-[1.9rem] tracking-tight text-[#141415] leading-none   ">
                  {t("p236")}
                </div>
                <div className=" font-Polysans font-medium text-[0.9rem] tracking-tight text-[#929292] leading-[1.5] w-[270px] lg:w-[300px]   ">
                  {t("p280")}
                </div>
              </div>
              <div className=" w-full flex gap-12 lg:gap-28 px-2 ">
                <div className=" flex flex-col w-full gap-8 lg:gap-12  ">
                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p237")}
                    </div>
                    <DropdownMenu open={open71} onOpenChange={setOpen71}>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            !transport && isRed1
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300">
                              <div>
                                {transport ? (
                                  <div className="text-[#444444] ">
                                    {transport}
                                  </div>
                                ) : (
                                  t("p306")
                                )}
                              </div>
                              <Halfarrow
                                className={open71 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {transportOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleTransportChange(option.value)}
                            className="hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D] my-1 py-2 px-2 rounded-xl"
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p239")}
                    </div>
                    <DropdownMenu open={open11} onOpenChange={setOpen11}>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            !needDelivery && isRed1
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300">
                              <div>
                                {needDelivery ? (
                                  <div className="text-[#444444]">
                                    {needDelivery}
                                  </div>
                                ) : (
                                  t("p307")
                                )}
                              </div>
                              <Halfarrow
                                className={open11 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {deliveryOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleDeliveryChange(option.value)}
                            className="hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D] my-1 py-2 px-2 rounded-xl"
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                      <div> {t("p281")}</div>
                      <Alert text={t("p299")} />
                    </div>
                    <DropdownMenu open={open31} onOpenChange={setOpen31}>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`flex flex-col cursor-pointer relative border ${
                            !application && isRed1
                              ? "border-red-500"
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300">
                              <div>
                                {application ? (
                                  <div className="text-[#444444]">
                                    {application}
                                  </div>
                                ) : (
                                  t("p308")
                                )}
                              </div>
                              <Halfarrow
                                className={open31 ? "rotate-180" : "rotate-0"}
                              />
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                        {applicationOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() =>
                              handleApplicationChange(option.value)
                            }
                            className="hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D] my-1 py-2 px-2 rounded-xl"
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {needDelivery == "yes" && (
                    <div className=" flex flex-col w-full gap-3 ">
                      <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[40] ">
                        <div> {t("p243")}</div>
                        <Alert text={t("p300")} />
                      </div>
                      <DropdownMenu open={open51} onOpenChange={setOpen51}>
                        <DropdownMenuTrigger asChild>
                          <div
                            className={`flex flex-col cursor-pointer relative border ${
                              !express && isRed1
                                ? "border-red-500"
                                : "border-[#DFDFDF]"
                            } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300">
                                <div>
                                  {express ? (
                                    <div className="text-[#464646]">
                                      {express}
                                    </div>
                                  ) : (
                                    t("p309")
                                  )}
                                </div>
                                <Halfarrow
                                  className={open51 ? "rotate-180" : "rotate-0"}
                                />
                              </div>
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                          {expressOptions.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={() => handleExpressChange(option.value)}
                              className="hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D] my-1 py-2 px-2 rounded-xl"
                            >
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>

                <div
                  id="two"
                  className=" flex flex-col w-[87%] lg:w-full gap-8 lg:gap-12  "
                >
                  {transport == "yes" && (
                    <div className=" flex flex-col w-full gap-3 ">
                      <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                        {t("p238")}
                      </div>
                      <Input1
                        type="date"
                        placeholder="DD/MM/YYYY"
                        onChange={handleDateChange}
                        className={`border font-Matter placeholder:uppercase cursor-pointer text-[1rem] text-[#AFB2B6] font-medium ${
                          !date && isRed1
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        } bg-[#FFFFFF] w-full  rounded-xl px-2 py-3 outline-none `}
                      />
                    </div>
                  )}
                  {transport == "yes" && (
                    <div className=" flex flex-col w-full gap-3 ">
                      <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                        {t("p310")}
                      </div>
                      <div
                        className={` flex flex-col cursor-pointer relative  border ${
                          !transport && isRed1
                            ? " border-red-500 "
                            : "border-[#DFDFDF]"
                        } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] `}
                        onClick={() => {
                          setOpen61(!open61);
                        }}
                      >
                        <div className="  flex items-center justify-between w-full   ">
                          <div
                            className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                              open61 ? "" : ""
                            } leading-none transition-all duration-300 `}
                          >
                            <div>
                              {" "}
                              {delivery ? (
                                <div className=" text-[#464646] ">
                                  {transportAddress.userName},{" "}
                                  {transportAddress.streetName},{" "}
                                  {transportAddress.streetNumber}
                                </div>
                              ) : (
                                t("p310")
                              )}
                            </div>
                            <motion.div
                              animate={{
                                rotate: open61 ? "180deg" : "0deg",
                              }}
                              transition={{
                                duration: 0.3,
                                ease: easeInOut,
                              }}
                            >
                              <Halfarrow />
                            </motion.div>
                          </div>
                        </div>
                        <motion.div
                          className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                            open61 ? "border" : ""
                          } border-[#DFDFDF]  `}
                          initial={{
                            height: 0,
                          }}
                          animate={{
                            height: open61 ? "fit-content" : 0,
                            // paddingTop: open ? "12px" : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: easeInOut,
                          }}
                        >
                          {locations?.billingAddress?.map((item) => (
                            <div
                              className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                              onClick={() => {
                                setTransportAddress({
                                  userName: item?.userName,
                                  email: item?.email,
                                  phone: item?.phone,
                                  streetName: item.location?.streetName,
                                  streetNumber: item.location?.streetNumber,
                                  canton: item?.location?.canton,
                                  town: item?.location?.town,
                                });
                                setDelivery(true);
                              }}
                            >
                              {item?.userName}, {item?.location?.streetName},{" "}
                              {item?.location?.streetNumber}
                            </div>
                          ))}
                          <div
                            className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                            onClick={() => {
                              openPopup(true);
                            }}
                          >
                            {t("p311")}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                  {needDelivery == "yes" && (
                    <div className=" flex flex-col w-full gap-3 ">
                      <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                        {t("p312")}
                      </div>
                      <div
                        className=" flex flex-col cursor-pointer relative  border border-[#DFDFDF] bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem] "
                        onClick={() => {
                          setOpen21(!open21);
                        }}
                      >
                        <div className="  flex items-center justify-between w-full   ">
                          <div
                            className={`  font-Matter text-[1rem] px-2 pr-2 text-[#AFB2B6] font-medium  w-full flex justify-between items-center ${
                              open21 ? "" : ""
                            } leading-none transition-all duration-300 `}
                          >
                            <div>
                              {" "}
                              {location == "one" ? (
                                <div className=" text-[#464646] ">
                                  {deliveryAddress.userName},{" "}
                                  {deliveryAddress.streetName},{" "}
                                  {deliveryAddress.streetNumber}
                                </div>
                              ) : location == "other" ? (
                                "Other"
                              ) : (
                                t("p312")
                              )}
                            </div>
                            <motion.div
                              animate={{
                                rotate: open21 ? "180deg" : "0deg",
                              }}
                              transition={{
                                duration: 0.3,
                                ease: easeInOut,
                              }}
                            >
                              <Halfarrow />
                            </motion.div>
                          </div>
                        </div>
                        <motion.div
                          className={` font-medium  font-Matter text-[1rem] w-full flex flex-col  leading-[1.5] overflow-hidden absolute z-30 px-2 top-14 left-0 bg-[#FFFFFF] rounded-2xl ${
                            open21 ? "border" : ""
                          } border-[#DFDFDF]  `}
                          initial={{
                            height: 0,
                          }}
                          animate={{
                            height: open21 ? "fit-content" : 0,
                            // paddingTop: open ? "12px" : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: easeInOut,
                          }}
                        >
                          {locations?.deliveryAddress?.map((item) => (
                            <div
                              className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                              onClick={() => {
                                setDeliveryAddress({
                                  userName: item?.userName,
                                  email: item?.email,
                                  phone: item?.phone,
                                  postalCode: item?.postalCode,
                                  streetName: item.location?.streetName,
                                  streetNumber: item.location?.streetNumber,
                                  canton: item?.location?.canton,
                                  town: item?.location?.town,
                                });
                                setLocation("one");
                              }}
                            >
                              {item?.userName}, {item?.location?.streetName},{" "}
                              {item?.location?.streetNumber}
                            </div>
                          ))}
                          <div
                            className=" my-1 py-2 px-2 rounded-2xl hover:bg-[#F4F4F4] hover:text-[#464646] text-[#7D7D7D]  "
                            onClick={() => {
                              openPopup1(true);
                            }}
                          >
                            {t("p311")}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none flex items-center gap-2 relative z-[20] ">
                      <div>{t("p313")}</div>
                      <Alert right={true} text={t("p299")} />
                    </div>
                    <div
                      className={`flex flex-col cursor-pointer relative border ${
                        !removal && isRed1
                          ? "border-red-500"
                          : "border-[#DFDFDF]"
                      } bg-[#FFFFFF] w-full rounded-xl px-2 py-4 pb-[0.95rem]`}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`font-Matter text-[1rem] px-2  pr-2 text-[#AFB2B6] font-medium w-full flex justify-between items-center leading-none transition-all duration-300`}
                            >
                              <div>
                                {removal ? (
                                  <div className="text-[#464646]">
                                    {removal}
                                  </div>
                                ) : (
                                  t("p314")
                                )}
                              </div>
                              <Halfarrow />
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[40rem] border border-[#DFDFDF] bg-[#FFFFFF] rounded-2xl">
                          <DropdownMenuItem onClick={() => setRemoval("yes")}>
                            {t("p273")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRemoval("no")}>
                            {t("p276")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p244")}
                      <span className=" text-[#BDBDBD] "> (Optional) </span>
                    </div>
                    <textarea
                      value={notes}
                      onChange={handleChange3}
                      className="border outline-none border-[#DFDFDF] font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] focus:border-[#000000] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full h-32"
                      placeholder={t("p288")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="three"
            className={` h-full min-w-[100%] max-w-[100%] relative z-[100] ${
              tab == 3 ? "" : "hidden"
            } `}
          >
            <div className=" w-full flex flex-col xl:flex-row gap-16 pb-28 ">
              <div className=" flex flex-col gap-3 w-[50%] xl:w-[23%] ">
                <div className=" font-Polysans font-semibold text-[2rem] tracking-tight text-[#141415] leading-none   ">
                  {t("p246")}
                </div>
                <div className=" font-Polysans font-medium text-[1rem] tracking-tight text-[#929292] leading-[1.5] w-[300px]   ">
                  {t("p315")}
                </div>
              </div>
              <div className=" flex flex-col w-full gap-10 lg:gap-16 pl-4 ">
                <div className=" flex w-full gap-8 lg:gap-16 justify-between items-center ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p316")}
                    </div>
                    <Input1
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className={`border outline-none ${
                        !name && isRed2
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                      placeholder={t("p289")}
                    />
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p248")}
                    </div>
                    <Input1
                      value={streetName}
                      onChange={(e) => {
                        setStreetName(e.target.value);
                      }}
                      className={`border outline-none ${
                        !streetName && isRed2
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                      placeholder={t("p290")}
                    />
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p249")}
                    </div>
                    <Input1
                      value={streetNumber}
                      onChange={(e) => {
                        setStreetNumber(e.target.value);
                      }}
                      className={`border outline-none ${
                        !streetNumber && isRed2
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                      placeholder={t("p291")}
                    />
                  </div>
                </div>
                <div className=" flex w-full gap-8 lg:gap-16 justify-between items-center ">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p250")}
                    </div>
                    <Input1
                      type="number"
                      value={post}
                      onChange={(e) => {
                        setPost(e.target.value);
                      }}
                      className={`border outline-none ${
                        !post && isRed2
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                      placeholder="0000"
                    />
                  </div>
                  <div className=" flex flex-col w-full gap-3 ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p251")}
                    </div>
                    <Popover
                      open={t4open}
                      onOpenChange={setT4open}
                      className="relative z-[10000]"
                    >
                      <PopoverTrigger asChild>
                        <div
                          className={` flex flex-col text-black cursor-pointer relative  border ${
                            !town && isRed2
                              ? " border-red-500 "
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                        >
                          {" "}
                          {town ? town : t("p317")}
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
                                    setT4open(false);
                                    setTown(framework.value);
                                  }}
                                >
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setTown(
                                        currentValue === canton
                                          ? ""
                                          : currentValue
                                      );
                                      setT4open(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        town === framework.value
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
                      open={topen}
                      onOpenChange={setTopen}
                      className="relative z-[10000]"
                    >
                      <PopoverTrigger asChild>
                        <div
                          className={` flex flex-col text-black cursor-pointer relative  border ${
                            !canton && isRed2
                              ? " border-red-500 "
                              : "border-[#DFDFDF]"
                          } bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                        >
                          {" "}
                          {canton ? canton : t("p319")}
                        </div>
                        {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput1 placeholder={t("p295")} />
                          <CommandEmpty>{t("p320")}</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {cantons.map((framework) => (
                                <div
                                  className="hover:bg-gray-300 cursor-pointer font-Matter "
                                  onClick={() => {
                                    setTopen(false);
                                    setCanton(framework.value);
                                  }}
                                >
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setCanton(
                                        currentValue === canton
                                          ? ""
                                          : currentValue
                                      );
                                      setTopen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        canton === framework.value
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
                <div className=" flex w-full gap-16 justify-between items-center">
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p84")}
                    </div>
                    <Input1
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className={`border outline-none ${
                        !email && isRed2
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                      placeholder={t("p292")}
                    />
                  </div>
                  <div className=" flex flex-col gap-3 w-full ">
                    <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                      {t("p321")}
                    </div>
                    <Input1
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      className={`border outline-none ${
                        !phone && isRed2
                          ? " border-red-500 "
                          : "border-[#DFDFDF]"
                      } font-Matter placeholder:font-Matter text-[1rem] placeholder:text-[1rem] placeholder:text-[#AFB2B6] rounded-2xl p-3 w-full`}
                      placeholder={t("p294")}
                    />
                  </div>
                </div>
                <div id="check" className=" flex items-center gap-2 ">
                  {save ? (
                    <div
                      onClick={() => {
                        setSave(false);
                      }}
                    >
                      {" "}
                      <Check1 />{" "}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setSave(true);
                      }}
                    >
                      <Notcheck />
                    </div>
                  )}
                  <div className=" font-Matter text-[#554F4F] text-[0.9rem] leading-none  ">
                    {t("p322")}
                  </div>
                </div>
              </div>
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
                <PopoverContent className="w-full relative z-[10000] p-0">
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
                <PopoverContent className="w-full relative z-[10000] p-0">
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

      <div
        className={`h-[100vh] w-[100vw] bg-white bg-opacity-50 fixed left-0 top-0 z-[100]  flex justify-center items-center duration-1000  ${
          popUp ? "block " : "hidden"
        }  `}
      >
        <div className=" flex flex-col w-[50rem] gap-16 bg-white border-[1px] p-6 rounded-3xl border-gray-300 shadow-lg ">
          <div className=" w-full flex items-center justify-between ">
            <div className=" font-Polysans font-semibold text-[1.5rem] tracking-tight text-[#444444] leading-none    ">
              {t("p323")}
            </div>
            <div
              onClick={() => {
                openPopup(false);
              }}
              className=" scale-150 cursor-pointer"
            >
              <Cross />
            </div>
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p316")}
              </div>
              <Input1
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
              <Input1
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
              <Input1
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
              <Input1
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
                Town
              </div>

              <div className=" ">
                <Popover open={t2open} onOpenChange={setT2open}>
                  <PopoverTrigger asChild>
                    <div
                      className={` flex flex-col  cursor-pointer relative  border border-[#DFDFDF] 
                           bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                      onClick={() => setT2open(!t2open)}
                    >
                      {" "}
                      {newT.billingAddress.location.town
                        ? newT.billingAddress.location.town
                        : "Select Town"}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="  relative z-[1000000]  h-full w-full p-0">
                    <Command>
                      <CommandInput1 placeholder={t("p296")} />
                      <CommandEmpty>{t("318")}</CommandEmpty>
                      <CommandList className="max-h-[12rem]">
                        <CommandGroup>
                          {townss.map((framework) => (
                            <div
                              className="hover:bg-gray-300 cursor-pointer font-Matter "
                              onClick={() => {
                                setT2open(false);
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
                                        ...prevTransport.billingAddress
                                          .location,
                                        town: currentValue,
                                      },
                                    },
                                  }));
                                  setT2open(false);
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
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p252")}
              </div>
              <div className="  ">
                <Popover open={t3open} onOpenChange={setT3open}>
                  <PopoverTrigger asChild>
                    <div
                      className={` flex flex-col  cursor-pointer relative  border 
                            
                               "border-[#DFDFDF]"
                           bg-[#FFFFFF] w-full text-ellipsis rounded-xl px-3 py-3 text-[#a4a5a5] font-medium font-Matter `}
                      onClick={() => {
                        setT3open(!t3open);
                      }}
                    >
                      {" "}
                      {newT.billingAddress.location.canton
                        ? newT.billingAddress.location.canton
                        : "Select Canton"}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className=" relative z-[1000000] h-full w-full p-0">
                    <Command>
                      <CommandInput1 placeholder={t("p295")} />
                      <CommandEmpty>{t("p320")}</CommandEmpty>
                      <CommandList className="max-h-[12rem]">
                        <CommandGroup>
                          {cantons.map((framework) => (
                            <div
                              className="hover:bg-gray-300 cursor-pointer font-Matter "
                              onClick={() => {
                                setT3open(false);
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
                                        ...prevTransport.billingAddress
                                          .location,
                                        canton: currentValue,
                                      },
                                    },
                                  }));
                                  setT3open(false);
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
          </div>
          <div className=" flex w-full gap-16 justify-between items-center ">
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p84")}
              </div>
              <Input1
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
                placeholder={t("p293")}
              />
            </div>
            <div className=" flex flex-col gap-3 w-full ">
              <div className=" font-Matter text-[1rem] text-[#444444] font-medium leading-none ">
                {t("p321")}
              </div>
              <Input1
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
              className=" font-Matter text-[1rem] tracking-tight text-[white] leading-none py-3 px-4 cursor-pointer rounded-3xl bg-[#1053FF]   "
              onClick={() => {
                TransportPost();
              }}
            >
              {t("p325")}
            </div>
          </div>
        </div>
      </div>

      <div className="  w-[calc(100vw-5.5rem)]  lg:w-[calc(100vw-15rem)] xl:w-[calc(100vw-18rem)] 1xl:w-[calc(100vw-19rem)] z-[40] fixed lg:right-0  lg:bottom-10 bottom-28 flex items-center bg-[#FFFFFF] border-[1px] border-[#F0F0F0] rounded-full py-1 pr-1 pl-6 justify-between mr-3 ">
        <div className=" flex items-center h-full gap-3 ">
          <div className=" font-Matter text-[1rem] text-[#262626] font-medium leading-none   ">
            {t("p331")}
          </div>
          <div className=" flex items-center relative top-[2px] gap-2 ">
            <div className=" h-[3px] w-[3rem] rounded-full bg-[#EAEAEA] ">
              <motion.div
                className=" h-full rounded-full bg-[#1053FF] "
                initial={{
                  width: 0,
                }}
                animate={{
                  width: tab >= 1 ? "100%" : 0,
                }}
                transition={{
                  duration: 0.66,
                  easing: easeInOut,
                }}
              ></motion.div>
            </div>
            <div className=" h-[3px] w-[3rem] rounded-full bg-[#EAEAEA] ">
              <motion.div
                className=" h-full rounded-full bg-[#1053FF] "
                initial={{
                  width: 0,
                }}
                animate={{
                  width: tab >= 2 ? "100%" : 0,
                }}
                transition={{
                  duration: 0.66,
                  easing: easeOut,
                }}
              ></motion.div>
            </div>
            <div className=" h-[3px] w-[3rem] rounded-full bg-[#EAEAEA] ">
              <motion.div
                className=" h-full rounded-full bg-[#1053FF] "
                initial={{
                  width: 0,
                }}
                animate={{
                  width: tab >= 3 ? "100%" : 0,
                }}
                transition={{
                  duration: 0.66,
                  easing: easeOut,
                }}
              ></motion.div>
            </div>
          </div>
        </div>
        <div className=" absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2  font-Polysans font-semibold lg:text-[1.4rem] text-[1.2rem] tracking-tight text-[#313131] leading-none   ">
          {tab == 1
            ? t("p332")
            : tab == 2
            ? t("p333")
            : tab == 3
            ? t("p334")
            : tab == 4
            ? t("p335")
            : t("p332")}
        </div>
        {!submit ? (
          <div className=" flex items-center   ">
            <div
              className=" cursor-pointer flex items-center gap-1 font-Matter text-[1rem] px-4 py-3 text-[#26272A] font-medium leading-none "
              onClick={() => {
                handlePrevious();
              }}
            >
              <div>
                <Leftclick />
              </div>
              <div>{t("p326")}</div>
            </div>

            <div
              className=" cursor-pointer w-fit flex items-center gap-1 font-Matter text-[1rem] text-[#FFFFFF] bg-[#1053FF] rounded-3xl py-3 pl-4 pr-2 font-medium leading-none "
              onClick={() => {
                handleNext();
                setIsRed(true);
              }}
            >
              <div>{t("p327")}</div>
              <div>
                <Rightclick />
              </div>
            </div>
          </div>
        ) : (
          <div className=" flex items-center   ">
            <div
              className=" cursor-pointer flex items-center gap-1 font-Matter text-[1rem] px-4 py-3 text-[#26272A] font-medium leading-none "
              onClick={() => {
                setSubmit(false);
              }}
            >
              <div>
                <Leftclick />
              </div>
              <div>{t("p328")}</div>
            </div>

            <div
              className=" cursor-pointer flex items-center gap-1 font-Matter text-[1rem] text-[#FFFFFF] bg-[#1053FF] rounded-3xl py-3  leading-none w-[82px] h-[44px] "
              onClick={() => {
                !loading && handleSubmit();
              }}
            >
              <div className=" mx-auto ">
                {loading ? <div className=" loadersm " /> : t("p329")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requestquote;
