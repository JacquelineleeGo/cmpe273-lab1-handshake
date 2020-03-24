import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { actions } from "../model";
import { delToken } from "../../../utils";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    delToken();
    dispatch(actions.clearUserInfo());
    dispatch(push("/user/login"));
  }, [dispatch]);

  return <div>logout...</div>;
};

export default Logout;
