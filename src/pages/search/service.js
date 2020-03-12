import request from "../../utils/request";
import qs from 'qs';

export const queryJobs = (params) => {
  return request.get(`/search?${qs.stringify(params)}`);
};

export const applyJob = (uid,jid) => {
  return request.post(`/student/${uid}/job/${jid}/apply`, {
    resume: "TBD"
  });
};
