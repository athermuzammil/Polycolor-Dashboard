import instance from "./axiosinstance";

const VerifyOtp = async (otp) => {
  const requestData = {
    otp: otp,
  };
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  //console.log(requestData);
  try {
    const response = await instance.post("/user/verifyotp", requestData, {
      headers,
    });
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error };
  }
};

export default VerifyOtp;
