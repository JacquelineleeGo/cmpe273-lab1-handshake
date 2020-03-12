import { createSlice } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import qs from "qs";

import { history } from "../../../utils/history";

import * as api from "./service";

const initialState = {
  loading: false,
  error: null,
  id: 0,
  username: "",
  email: ""
};

const userSlice = createSlice({ // dispatch(asyncStart())
  name: "user",
  initialState,
  reducers: {
    asyncStart: state => ({ // action creator
      ...state,
      loading: true,
      error: null
    }),
    asyncFinish: state => ({
      ...state,
      loading: false,
      error: null
    }),
    asyncError: state => ({
      ...state,
      loading: false,
      error: null
    }),
    registerSuccess: (state, action) => ({
      ...state,
      ...action.payload
    }),
    loginSuccess: (state, action) => ({
      ...state,
      ...action.payload
    }),
    initSuccess: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

const { actions, reducer } = userSlice;

const {
  asyncStart,
  asyncFinish,
  asyncError,
  registerSuccess,
  loginSuccess,
  initSuccess
} = actions;

const effects = {
  
  init: _ => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.init();
      dispatch(asyncFinish());
      dispatch(initSuccess(result));
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  register: data => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.register(data);
      dispatch(asyncFinish());
      dispatch(registerSuccess(result));
      dispatch(push("/user/login"));
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  login: data => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.login(data);
      dispatch(asyncFinish());
      dispatch(loginSuccess(result));
      const { location } = history;
      const { redirect } = qs.parse(location.search.slice(1));
      console.log("redirect:", redirect);

      if (redirect) {
        window.location.href = redirect;
      } else {
        dispatch(push("/home"));
      }
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  }
};
export { actions, reducer, effects };
