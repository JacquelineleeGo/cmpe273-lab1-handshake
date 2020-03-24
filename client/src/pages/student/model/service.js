import request from "../../../utils/request";

export const queryProfile = id => {
  return request.get(`/student/${id}`);
};

export const createProfile = (id, data) => {
  return request.post(`/student/${id}`, data);
};

export const updateProfile = (id, data) => {
  return request.put(`/student/${id}`, data);
};

export const queryApplications = uid => {
  return request.get(`/student/${uid}/applications`);
};
