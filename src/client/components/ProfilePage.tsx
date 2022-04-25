// import React from 'react';

// const ProfilePage = () => {
//   return(
//     <div>ProfilePage Rendering!</div>
//   )
// };

// export default ProfilePage;

import React from "react";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const Profile = (): React.ReactElement => {
  const [ name, setName ] = useState('');
  const [ picture, setPicture ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ email, setEmail] = useState('');
  const [ subscribed, setSubscribed ] = useState(false);



  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        console.log(data);
        const { name, picture, email, subscribed, address }: { name: string, picture: string, email: string, subscribed: boolean, address: string} = data;
        setName(name);
        setPicture(picture);
        setAddress(address);
        setEmail(email);
        setSubscribed(subscribed);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="page-wrap">
      <h1>My Profile</h1>
      <div className="profileDiv">
        <img className="profilePic" src={picture} />
      </div>
      <h3>Name: {name}</h3>
      <h3>Address: {address}</h3>
      <h3>Email: {email}</h3>
      <h3>Subscribed: { subscribed}</h3>
    </div>
  );
};

export default Profile;
