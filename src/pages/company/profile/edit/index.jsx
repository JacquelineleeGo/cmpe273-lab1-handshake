import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

import { effects } from "../../model";
import ProfileForm from "../components/ProfileForm";

export default function() {
  const { id, company } = useSelector(state => ({
    id: state.user.id,
    company: state.company
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !company.id) {
      dispatch(effects.queryProfile(id));
    }
  }, [dispatch, id, company.id]);

  const handleUpdate = async values => {
    try {
      await dispatch(
        effects.updateProfile(id, {
          ...values
        })
      );
      message.success("更新成功");
    } catch (e) {}
  };

  if (company.loading) {
    return <div>loading...</div>;
  }

  if (company.error) {
    return <div>error</div>;
  }

  return (
    <div>
      <ProfileForm initialValues={company} onSubmit={handleUpdate} />
    </div>
  );
}