import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationWrapper = styled.nav`
  display: flex;
  width: 70%;
  margin: 24px auto 16px;
  justify-content: space-between;  
`

const NavBar = () => (
  <NavigationWrapper>
    <Link href="/">Homepage</Link>
    <Link href="/profile-page">ProfilePage</Link>
    <Link href="/subscriptions-page">Subscriptions</Link>
  </NavigationWrapper>
)

export default NavBar;