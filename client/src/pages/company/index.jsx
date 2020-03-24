import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";

import ProfilePage from "./profile";
import CreateProfilePage from "./profile/create";
import EditProfilePage from "./profile/edit";
import JobPage from "./job";
import CreateJobPage from "./job/create";
import EditJobPage from "./job/edit";
import JobApplicationsPage from "./job/applications";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <BasicLayout>
      <Switch>
        {/* company profile */}
        <Route exact path={`${path}/profile`}>
          <ProfilePage />
        </Route>
        <Route path={`${path}/profile/create`}>
          <CreateProfilePage />
        </Route>
        <Route path={`${path}/profile/edit`}>
          <EditProfilePage />
        </Route>
        {/* all jobs */}
        <Route exact path={`${path}/job`}>
          <JobPage />
        </Route>
        <Route path={`${path}/job/create`}>
          <CreateJobPage />
        </Route>
        <Route path={`${path}/job/:jid`}>
          <EditJobPage />
        </Route>
        {/* one job relared */}
        <Route path={`${path}/:uid/job/:jid/applications`}>
          <JobApplicationsPage />
        </Route>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </BasicLayout>
  );
}
