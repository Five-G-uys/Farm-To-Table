/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className='profile-card'>
      <h1>Login To Bumpkin Box</h1>
      <form action="/auth/google" method="GET">
        <button type="submit">Sign In With Google</button>
      </form>
    </div>
  );
};

export default Login;