import instance from "./axiosinstance";
import { BACK_KEY } from "./variables";

const UserRegister = async (name, email, password) => {
  const requestData = {
    name: name,
    email: email,
    password: password,
  };
  //console.log(requestData);
  try {
    const response = await instance.post("/user/createuser", requestData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error };
  }
};

export default UserRegister;
