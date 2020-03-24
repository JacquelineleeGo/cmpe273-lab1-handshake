import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";

import JobList from "./components/JobList";

import { effects } from "../model/job";

const Job = () => {
  const { id, job } = useSelector(state => ({
    id: state.user.id,
    job: state.job
  }));
  const dispatch = useDispatch();

  useEffect(() => {

    if (id && job.list.length === 0) {
      dispatch(effects.queryJob(id));
    }
  }, [dispatch, id, job.list.length]);

  if (job.loading) {
    return <div>loading...</div>;
  }

  if (job.error) {
    return <div>error</div>;
  }

  if (job.length === 0) {
    return (
      <div>
        <h3> You don't have any job, please create it!</h3>
        <Button type="primary">
          <Link to="/company/job/create">Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* job list*/}
      <JobList list={job.list} />
    </div>
  );
};

export default Job;