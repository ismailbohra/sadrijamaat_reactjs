import axiosInstance from "../../network/apis";


export const approveRaza = async (payload) => {
  return await axiosInstance.post("/raza/approveRaza", payload);
};
export const getRazaType = async (payload) => {
  return await axiosInstance.get(`/raza/manageRaza/getAll?${payload}`);
};
export const getAllRaza = async () => {
  return await axiosInstance.get("/raza/getAllRaza");
};
export const getRazaById = async (payload) => {
  return await axiosInstance.get(`/raza/getraza/${payload.data}`);
};
export const deleteRaza = async (payload) => {
  return await axiosInstance.delete(`/raza/deleteRaza/${payload}`,);
};



