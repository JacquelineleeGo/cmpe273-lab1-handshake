import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import BlankLayout from "../../layouts/BlankLayout";

import LoginPage from "./login";
import RegisterPage from "./register";
import LogoutPage from "./logout";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <BlankLayout>
      <Switch>
        <Route path={`${path}/register`}>
          <RegisterPage />
        </Route>
        <Route path={`${path}/login`}>
          <LoginPage />
        </Route>
        <Route path={`${path}/logout`}>
          <LogoutPage />
        </Route>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </BlankLayout>
  );
}
