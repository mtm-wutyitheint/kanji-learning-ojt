import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuth() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const isAuth = () => {
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));

  if(loginUser === 'guest') {
    return true;
  }

  if (!loginUser || loginUser.status !== 'success' ||
    !('name' in loginUser) || !('id' in loginUser) ||
    !loginUser.name || !loginUser.id) {
    return false;
  }
  return true;
}

export default GuardedRoute;