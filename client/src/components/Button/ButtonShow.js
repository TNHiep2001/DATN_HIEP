import React from 'react'
import PropTypes from 'prop-types'

const ButtonShow = ({ isAuthorized, value, onShow }) => {
  if (!isAuthorized) return value

  return (
    <div onClick={onShow} className="mr-1 btn text-primary text-normal">
      {value}
    </div>
  )
}

ButtonShow.propTypes = {
  isAuthorized: PropTypes.bool,
  value: PropTypes.string,
  onShow: PropTypes.func,
}

export default ButtonShow
