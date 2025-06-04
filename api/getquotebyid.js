import axiosInstance from "./axiosinstance";
const getquotebyid = async (id, token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(`/user/getquote/${id}`, {
      headers,
    });
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default getquotebyid;
