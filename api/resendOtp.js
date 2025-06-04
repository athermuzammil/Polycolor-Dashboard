import instance from "./axiosinstance";

const Resendotp = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  //console.log(token, headers);
  try {
    const response = await instance.post("/user/resendotp", {}, { headers });
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error };
  }
};

export default Resendotp;
