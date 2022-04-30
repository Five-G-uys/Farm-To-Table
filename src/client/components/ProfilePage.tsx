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
import RSVPS from "./RSVPS";
import { UserContext } from "./App";

const Profile = (): React.ReactElement => {
  const user: any = useContext(UserContext);
  // console.log('THIS IS WORKING', user);

  const handleLogout = () => {
    axios.delete<AxiosResponse>('/auth/api/logout')
      .then(({ response }: AxiosResponse) => {
        console.log('Logout Button', response);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="page-wrap">
      <h1>My Profile</h1>
      <div className="profileDiv">
        <img className="profilePic" src={user.picture} />
      </div>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Address: {user.address}</h3>
      <button onClick={handleLogout}>Logout</button>
      <RSVPS />
    </div>
  );
};

export default Profile;
