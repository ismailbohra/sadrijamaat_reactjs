import axiosInstance from "../../network/apis";


export const loginUserITS = async (payload) => {
  return await axiosInstance.post("/user/login", payload);
};
export const verifyTokenReq = async () => {
  return await axiosInstance.get("/user/verifyToken");
};



