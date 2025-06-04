import axiosInstance from "./axiosinstance";
const getUserQuotes = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/user/getallquotes", {
      headers,
    });
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default getUserQuotes;
