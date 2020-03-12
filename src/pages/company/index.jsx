import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";

import ProfilePage from "./profile";
import JobPage from "./job";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <BasicLayout>
      <Switch>
        <Route path={`${path}/profile`}>
          <ProfilePage />
        </Route>
        <Route path={`${path}/job`}>
          <JobPage />
        </Route>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </BasicLayout>
  );
}
