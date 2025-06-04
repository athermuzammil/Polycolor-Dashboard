import instance from "./axiosinstance";
const sendMessage = async (token, content, file) => {
  //console.log(token, "inspect");
  try {
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const formdata = new FormData();
    formdata.append("chat", file);
    const response = await instance.post(
      `/user/sendmessage?message=${content ? content : " "}`,
      formdata,
      {
        headers,
      }
    );
    //console.log("Message REsponse", response.data); // Corrected //console.log usage]
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    console.error("Error fetching chats", error);
    return { error: error.response.data.error };
  }
};
export default sendMessage;
