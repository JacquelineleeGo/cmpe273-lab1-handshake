import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from 'antd';

import { effects } from "../../model";
import ProfileForm from "../components/ProfileForm";

export default function() {
  const { id, student } = useSelector(state => ({
    id: state.user.id,
    student: state.student
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !student.id) {
      dispatch(effects.queryProfile(id));
    }
  }, [dispatch, id, student.id]);

  const handleUpdate = async values => {
    try {
      // TODO: TBC
      await dispatch(
        effects.updateProfile(id, {
          basic: {
            ...values.profileBasic,
            birth_date: "2020-3-6"
          },
          education: {
            ...student.profileEducation,
            year_of_passing: "2020-06-19",
            created_at: "2020-03-11",
            update_at: "2020-03-11"
          },
          experience: []
        })
      );
      message.success("Successfully updated.");
    } catch (e) {}
  }

  if (student.loading) {
    return <div>loading...</div>;
  }

  if (student.error) {
    return <div>error</div>;
  }

  return (
    <div>
      <ProfileForm initialValues={student} onSubmit={handleUpdate} />
    </div>
  );
}
