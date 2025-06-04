import axiosInstance from "./axiosinstance";

const addItemImages = async (token, index, id, files) => {
  //console.log(token);
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Needed for file uploads
  };

  const requestData = new FormData();

  files.forEach((file) => requestData.append("reqimages", file));

  try {
    const response = await axiosInstance.post(
      `/user/additemimages?index=${index}&requestedQuoteId=${id}`,
      requestData,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};

export default addItemImages;
