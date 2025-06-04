import axiosInstance from "./axiosinstance";
const getuser = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/user/getuser", {
      headers,
    });
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href = "/";
    //console.log(error);
    localStorage.removeItem("token");
    window.location.href = "/signin";
    return null;
  }
};
export default getuser;
