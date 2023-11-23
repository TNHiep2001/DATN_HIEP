import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { STORAGE_KEYS } from '../../constants'

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.TOKEN)
  const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO)

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && userInfo ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
