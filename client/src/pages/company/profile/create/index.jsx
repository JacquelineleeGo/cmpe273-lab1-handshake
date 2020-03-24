import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { effects } from "../../model";
import ProfileForm from "../components/ProfileForm";

export default function() {
  const { id } = useSelector(state => ({
    id: state.user.id
  }));
  const dispatch = useDispatch();

  const handleCreate = values => {
    dispatch(
      effects.createProfile(id, {
        ...values
      })
    );
  };

  return (
    <div>
      <ProfileForm onSubmit={handleCreate} />
    </div>
  );
}