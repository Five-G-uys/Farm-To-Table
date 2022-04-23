import React from 'react';

const Login = () => {
  return (
    <div className='profile-card'>
      <h1>Login To Bumpkin Box</h1>
      <form action="/api/login/google" method="GET">
        <button type="submit">Sign In With Google</button>
      </form>
    </div>
  );
};

export default Login;