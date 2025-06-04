import axiosInstance from "./axiosinstance";

const Addbillingaddress = async (token, requestdata) => {
  //console.log(token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    const response = await axiosInstance.post(
      "/user/addbillingaddress",
      requestdata,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected Error Occured" };
  }
};
export default Addbillingaddress;
