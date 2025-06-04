"use client";
import { getToken } from "@/api/getToken";
// UserContext.js
import getuser from "@/api/getuser";
import Spinner from "@/app/components/spinner";

import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);
const initialState = {
  user: null,
};
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      //////////console.log("Setting user:", action.payload);
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setloading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = localStorage.getItem("token");
    //console.log(token);
    // Define an async function inside useEffect
    const fetchUserData = async () => {
      if (token) {
        try {
          const data = await getuser(token); // Use await with getuser
          //console.log("User Data:", data);
          if (data) {
            dispatch({ type: "SET_USER", payload: data });
          }
          if (data.isverified == false) {
            router.push("/otp");
            return;
          }
          setloading(false);
        } catch (error) {
          //console.error("Error fetching user data:", error);
          // Handle error, e.g., by dispatching an error action
        }
      } else {
        if (
          (pathname != "/en/signin" || pathname != "/de/signin") &&
          (pathname != "/en" || pathname != "/de") &&
          (pathname != "/en/otp" || pathname != "/de/otp")
        ) {
          router.push("/signin");
        }
        setloading(false);
      }
    };
    // Call the async function
    fetchUserData();
  }, []);
  useEffect(() => {
    if (pathname == "/en/otp" || pathname == "/de/otp") {
      setloading(false);
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
