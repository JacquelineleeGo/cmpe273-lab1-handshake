import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";

import ProfilePage from "./profile";
import CreateProfilePage from "./profile/create";
import EditProfilePage from "./profile/edit";
import JobPage from "./job";
import EditJobPage from "./job/edit";
import JobApplicationsPage from "./job/applications";

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
        <Route path={`${path}/job`}>
          <JobPage />
        </Route>
        <Route path={`${path}/job/:jid`}>
        <EditJobPage />

        <Route path={`${path}/:uid/job/:jid/applications`}>
          <JobApplicationsPage />
        </Route>
      </Route>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </BasicLayout>
  );
}
