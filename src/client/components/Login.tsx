/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const Login = () => {
  return (
    <div className='profile-card'>
      <h1>Login To Knock, Knock</h1>
      <form action='/auth/google' method='GET'>
        <button type='submit'>Sign In With Google</button>
      </form>
    </div>
  );
};

export default Login;
