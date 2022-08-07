import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (user.isLoggedIn) {
          return <Component {...rest} {...props} />
        } else {
          return <Navigate to={'/login'} state={{from: props.location}}/>
        }
      }
    } />
  )
}

export default ProtectedRoute;