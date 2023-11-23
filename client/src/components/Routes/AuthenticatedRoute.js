import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { STORAGE_KEYS } from '../../constants'

// eslint-disable-next-line react/prop-types
function AuthenticatedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated =
    localStorage.getItem(STORAGE_KEYS.TOKEN) && localStorage.getItem(STORAGE_KEYS.USER_INFO)

  return (
    <Route
      {...restOfProps}
      render={(props) => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export default AuthenticatedRoute
