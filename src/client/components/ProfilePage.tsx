// import React from 'react';

// const ProfilePage = () => {
//   return(
//     <div>ProfilePage Rendering!</div>
//   )
// };

// export default ProfilePage;


import React from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const Profile = (): React.ReactElement => {
  const [ name, setName ] = useState('');
  const [ picture, setPicture ] = useState('');

  useEffect((): void => {
    axios.get<AxiosResponse>('/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        const { name, picture }: { name: string, picture: string} = data;
        setName(name);
        setPicture(picture);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className='page-wrap'>
      <h1>My Profile</h1>
      <div className='profileDiv'>
        <img className='profilePic' src={picture} />
      </div>
      <h3>Name: {name}</h3>
    </div>
  );
};

export default Profile;
