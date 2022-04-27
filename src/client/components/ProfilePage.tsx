/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

// const ProfilePage = () => {
//   return(
//     <div>ProfilePage Rendering!</div>
//   )
// };

// export default ProfilePage;

import React, { useContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "./UserContext";
import RSVPS from "./RSVPS";

const Profile = (): React.ReactElement => {
  const { user, setUser } = useContext(UserContext);

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        // console.log(data);
        setUser(data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="page-wrap">
      <h1>My Profile</h1>
      <div className="profileDiv">
        <img className="profilePic" src={user.picture} />
      </div>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Address: {user.address}</h3>
      <RSVPS />
    </div>
  );
};

export default Profile;
