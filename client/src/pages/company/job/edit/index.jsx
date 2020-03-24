import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { useParams } from "react-router-dom";

import { effects } from "../../model/job";
import JobForm from "../components/JobForm";

export default function() {
  const { jid } = useParams();

  const { job } = useSelector(state => ({
    job: state.job
  }));
  // Filter job
  const currentJob = job.list.find(el => el.id === Number(jid));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentJob) {
      dispatch(effects.queryJobById(jid));
    }
  }, [currentJob, dispatch, jid]);

  const handleUpdate = async values => {
    try {
      await dispatch(
        effects.updateJob(jid, {
          ...values,
          "application_deadline": "2020-6-20"
        })
      );
      message.success("Update successfully!");
    } catch (e) {}
  };

  if (job.loading) {
    return <div>loading...</div>;
  }

  if (job.error) {
    return <div>error</div>;
  }

  return (
    <div>
      <JobForm initialValues={currentJob} onSubmit={handleUpdate} />
    </div>
  );
}