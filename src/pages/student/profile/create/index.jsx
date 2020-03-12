import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { effects } from "../../model";
import ProfileForm from "../components/ProfileForm";

export default function() {
  const { id  } = useSelector(state => ({
    id: state.user.id,
  }));
  const dispatch = useDispatch();


  const handleCreate = values => {
    dispatch(
        effects.createProfile(id, {
            basic: {
              ...values.profileBasic
            },
            education: {
              college_name: "SJSU",
              location: "San Jose",
              degree: "Master",
              major: "MSSE",
              year_of_passing: "2020-6-20"
            },
            experience: [
              {
                company_name: "LinkedIn",
                title: "sde intern",
                location: "sunnyvale",
                start_date: "2020-3-6",
                end_date: "2020-12-12"
              }
            ]
          })
    );
  };

  return (
    <div>
      <ProfileForm onSubmit={handleCreate} />
    </div>
  );
}
