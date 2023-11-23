import React from 'react'
import PropTypes from 'prop-types'

function ButtonAuthen({
  onClick,
  isAuthorized,
  children,
  isEdit = false,
  isCreate = false,
  isDelete = false,
  isDetail = false,
}) {
  if (!isAuthorized) return null

  let className = 'btn '
  if (isEdit) className += 'bg-warning'
  if (isCreate) className += 'btn-primary'
  if (isDelete) className += 'bg-danger'
  if (isDetail) className += 'btn-primary'

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

ButtonAuthen.propTypes = {
  onClick: PropTypes.func,
  isAuthorized: PropTypes.bool,
  children: PropTypes.node,
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool,
  isDelete: PropTypes.bool,
  isDetail: PropTypes.bool,
}

export default React.memo(ButtonAuthen)
