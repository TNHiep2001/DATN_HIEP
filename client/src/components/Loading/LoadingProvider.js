import React from 'react'
import PropTypes, { array, object } from 'prop-types'
import { Loading } from '..'

const LoadingProvider = ({ children }) => {
  return (
    <div className="position-relative">
      <Loading />
      {children}
    </div>
  )
}

LoadingProvider.propTypes = {
  children: PropTypes.oneOfType([object, array]),
}

export default LoadingProvider
