import axiosInstance from "./axiosinstance";

const Userlogin = async (email, password) => {
  const requestdata = {
    email: email,
    password: password,
  };
  try {
    const response = await axiosInstance.post("/user/login", requestdata);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error };
  }
};
export default Userlogin;
