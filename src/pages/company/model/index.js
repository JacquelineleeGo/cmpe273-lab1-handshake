import { createSlice } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

import * as api from "./service";

const initialState = {
  loading: false,
  error: null
};

const profileSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    asyncStart: state => ({
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
    updateProfile: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

const { actions, reducer } = profileSlice;

const { asyncStart, asyncFinish, asyncError, updateProfile } = actions;

const effects = {
  queryProfile: id => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.queryProfile(id);
      dispatch(updateProfile(result));
      dispatch(asyncFinish());
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  createProfile: (id, data) => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.createProfile(id, data);
      dispatch(updateProfile(result));
      dispatch(asyncFinish());
      dispatch(push("/company/profile"));
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  updateProfile: (id, data) => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.updateProfile(id, data);
      console.log("result:", result);
      dispatch(updateProfile(result));
      dispatch(asyncFinish());
      dispatch(push("/company/profile"));
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  }
};

export { actions, reducer, effects };