import { createSlice } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

import * as api from "./service";

const initialState = {
  loading: false,
  error: null,
  list: [],
  application: []
};

const jobSlice = createSlice({
  name: "job",
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
    updateOne: (state, action) => {
      const index = state.list.findIndex(el => el.id === action.payload.id);
      state.list.splice(index, 1, action.payload);
    },
    updateList: (state, action) => ({
      ...state,
      list: [...action.payload]
    }),
    updateApplication: (state, action) => ({
      ...state,
      application: action.payload
    }),
    updateApplicationOne: (state, action) => {
      const index = state.application.findIndex(
        el => el.id === action.payload.id
      );
      state.application.splice(index, 1, action.payload);
    }
  }
});

const { actions, reducer } = jobSlice;

const {
  asyncStart,
  asyncFinish,
  asyncError,
  updateList,
  updateOne,
  updateApplication,
  updateApplicationOne
} = actions;

const effects = {
  queryJob: id => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.queryJob(id);
      dispatch(updateList(result));
      dispatch(asyncFinish());
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  queryJobById: id => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.queryJobById(id);
      dispatch(updateOne(result));
      dispatch(asyncFinish());
      return result;
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  createJob: (id, data) => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.createJob(id, data);
      dispatch(updateOne(result));
      dispatch(asyncFinish());

      dispatch(push("/company/job"));
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  updateJob: (jid, data) => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.updateJob(jid, data);
      dispatch(updateOne(result));
      dispatch(asyncFinish());
      dispatch(push("/company/job"));
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  queryApplication: (uid, jid) => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.queryJobApplications(uid, jid);
      dispatch(updateApplication(result));
      dispatch(asyncFinish());
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  },
  changeApplicationStatus: (uid, jid, aid, data) => async dispatch => {
    dispatch(asyncStart());
    try {
      const result = await api.updateJobApplicationStatus(uid, jid, aid, data);
      dispatch(updateApplicationOne(result));
      dispatch(asyncFinish());
    } catch (e) {
      dispatch(asyncError(e));
      throw e;
    }
  }
};

export { actions, reducer, effects };