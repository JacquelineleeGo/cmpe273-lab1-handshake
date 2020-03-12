import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";

import ProfilePage from "./profile";
import CreateProfilePage from "./profile/create";
import EditProfilePage from "./profile/edit";
import ApplicationPage from "./application";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <BasicLayout>
      <Switch>
        <Route exact path={`${path}/profile`}>
          <ProfilePage />
        </Route>
        <Route path={`${path}/profile/create`}>
          <CreateProfilePage />
        </Route>
        <Route path={`${path}/profile/edit`}>
          <EditProfilePage />
        </Route>
        <Route path={`${path}/application`}>
          <ApplicationPage />
        </Route>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </BasicLayout>
  );
}
