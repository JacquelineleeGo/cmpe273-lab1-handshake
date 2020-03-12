import axios from "axios";
import { message } from "antd";

import { history } from './history';

import { getToken } from ".";

const fetchInstance = axios.create({
  baseURL: "/api/",
  withCredentials: true
});

fetchInstance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

fetchInstance.interceptors.response.use(
  response => {
    const { data } = response;
    if (data.token) {
      localStorage.setItem("handSharkToken", data.token);
    }
    if (data.error) {
      throw data.data;
    }

    return data.data;
  },
  error => {
    message.error("network error::" + error.message);
    const { response } = error;
    if (response.status === 401) {
      history.push(`/user/login?redirect=${window.location}`);
    }
    throw error;
  }
);

export default fetchInstance;
