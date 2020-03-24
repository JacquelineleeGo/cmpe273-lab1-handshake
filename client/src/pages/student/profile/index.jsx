/**
 * @file student user profile page
 * @description
 * Display if user has created a profile otherwise 
 * allow user to add one by clicking "create" button
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";

import ProfileBasic from "./components/ProfileBasic";
import ProfileEducation from "./components/ProfileEducation";
import ProfileExperience from "./components/ProfileExperience";

import { effects } from "../model";

const Profile = () => {
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

  if (student.loading) {
    return <div>loading...</div>;
  }

  if (student.error) {
    return <div>error</div>;
  }

  // create if no
  if (!student.id) {
    return (
      <div>
        <h3> You don't have a profile yet, please create one!</h3>
        <Button type="primary">
          <Link to="/student/profile/create">Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ProfileBasic {...student.profileBasic} />
      <ProfileEducation {...student.profileEducation} />
      <ProfileExperience items={student.profileExperience} />
      <Button type="primary">
        <Link to="/student/profile/edit">Edit</Link>
      </Button>
    </div>
  );
};

export default Profile;
