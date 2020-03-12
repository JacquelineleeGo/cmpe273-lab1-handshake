import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

  const handleUpdate = values => {
    dispatch(
      effects.updateProfile(id, {
        basic: {
          ...values.profileBasic
        },
        // TODO: 
        education: student.profileEducation,
        experience: student.profileExperience
      })
    );
  };

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
