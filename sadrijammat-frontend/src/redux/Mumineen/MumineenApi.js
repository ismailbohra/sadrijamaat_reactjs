import axiosInstance from "../../network/apis";


export const applyRaza = async (payload) => {
  return await axiosInstance.post("/raza/applyraza", payload);
};
export const getRazaType = async (payload) => {
  return await axiosInstance.get(`/raza/manageRaza/getAll?${payload}`);
};
export const getAllRaza = async (payload) => {
  let url=''
  if(payload){
    url+='?approver='+payload
  }
  return await axiosInstance.get("/raza/getAllRaza"+url);
};
export const getRazaById = async (payload) => {
  return await axiosInstance.get(`/raza/getraza/${payload.data}`);
};
export const updateRaza = async (payload) => {
  return await axiosInstance.put(`/raza/updateRaza`,payload);
};
export const deleteRaza = async (payload) => {
  return await axiosInstance.delete(`/raza/deleteRaza/${payload}`,);
};



