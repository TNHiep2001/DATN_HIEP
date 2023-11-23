import React from 'react'
import PropTypes from 'prop-types'

const ButtonCreate = ({ onClick, isAuthorized }) => {
  if (!isAuthorized) return null
  return (
    <button onClick={onClick} className="btn btn-primary ">
      Create
    </button>
  )
}

ButtonCreate.propTypes = {
  onClick: PropTypes.func,
  isAuthorized: PropTypes.bool,
}
export default React.memo(ButtonCreate)
