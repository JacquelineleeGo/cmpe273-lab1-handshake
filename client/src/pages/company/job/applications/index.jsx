/**
 * @file List of applicatoins for one job
 * @description
 */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";

import JobApplications from "../components/JobApplications";

import { effects } from "../../model/job";

const Job = () => {
    const { uid, jid } = useParams();
  
    const { job, application } = useSelector(state => ({
      job: state.job,
      application: state.job.application
    }));

    const dispatch = useDispatch();

    console.log("Hi");
    useEffect(() => {
    dispatch(effects.queryApplication(uid, jid));
    }, [dispatch, uid, jid]);

    if (job.loading) {
    return <div>loading...</div>;
    }

    if (job.error) {
    return <div>error</div>;
    }

    if (application.length === 0) {
    return (
        <div>
        <h3> This job has no application!</h3>
        <Button type="primary">
            <Link to="/company/job">Go Back</Link>
        </Button>
        </div>
    );
    }

    return (
    <div>
        {/* application list*/}
        <JobApplications list={application} uid={uid} jid={jid} />
    </div>
    );
};

export default Job;