import request from "../../../utils/request";

export const queryProfile = id => {
  return request.get(`/company/${id}`);
};

export const createProfile = (id, data) => {
  return request.post(`/company/${id}`, data);
};

export const updateProfile = (id, data) => {
  return request.put(`/company/${id}`, data);
};