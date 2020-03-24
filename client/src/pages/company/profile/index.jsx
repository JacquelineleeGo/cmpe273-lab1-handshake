import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";

import ProfileBasic from "./components/ProfileBasic";

import { effects } from "../model";

const Profile = () => {
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

  if (company.loading) {
    return <div>loading...</div>;
  }

  if (company.error) {
    return <div>error</div>;
  }

  // 没有简历 id
  if (!company.id) {
    return (
      <div>
        <h3> You don't have any profile, please create it!</h3>
        <Button type="primary">
          <Link to="/company/profile/create">Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ProfileBasic {...company} />
      <Button type="primary">
        <Link to="/company/profile/edit">Edit</Link>
      </Button>
    </div>
  );
};

export default Profile;