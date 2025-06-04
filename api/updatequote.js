import instance from "./axiosinstance";

const UpdateQuote = async (id, status, token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const requestData = {
    quoteId: id,
    status: status,
  };
  //console.log(requestData);
  try {
    const response = await instance.post(
      "/user/updatequotestatus",
      requestData,
      { headers }
    );

    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error };
  }
};

export default UpdateQuote;
