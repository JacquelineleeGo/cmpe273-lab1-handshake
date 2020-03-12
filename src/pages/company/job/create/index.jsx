import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { effects } from "../../model/job";
import JobForm from "../components/JobForm";

export default function() {
  const { id } = useSelector(state => ({
    id: state.user.id
  }));
  const dispatch = useDispatch();

  const handleCreate = values => {
    dispatch(
      effects.createJob(id, {
        ...values,
        application_deadline: "2020-6-20"
      })
    );
  };

  return (
    <div>
      <JobForm onSubmit={handleCreate} />
    </div>
  );
}