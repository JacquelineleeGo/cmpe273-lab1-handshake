import request from "../../../utils/request";

// profile related
export const queryProfile = id => {
  return request.get(`/company/${id}`);
};

export const createProfile = (id, data) => {
  return request.post(`/company/${id}`, data);
};

export const updateProfile = (id, data) => {
  return request.put(`/company/${id}`, data);
};

export const queryJob = uid => {
    return request.get(`/company/${uid}/job`);
  };
  
  export const queryJobById = jid => {
    return request.get(`/job/${jid}`);
  };
  
  export const createJob = (uid, data) => {
    // TODO: not id in url
    return request.post(`/job/${uid}`, data);
  };
  
  export const updateJob = (jid, data) => {
    return request.put(`/job/${jid}`, data);
  };

  export const queryJobApplications = (uid, jid) => {
    return request.get(`/company/${uid}/job/${jid}/application`);
  };
  
  export const updateJobApplicationStatus = (uid, jid, aid, data) => {
    return request.put(`/company/${uid}/job/${jid}/application/${aid}`, data);
  };