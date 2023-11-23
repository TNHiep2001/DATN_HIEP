import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilColorBorder } from '@coreui/icons'

const ButtonEdit = ({ onClick, isAuthorized, children }) => {
  const renderContent = () => {
    if (children) return children

    return <CIcon className="text-white" icon={cilColorBorder} />
  }

  if (!isAuthorized) return null
  return (
    <button onClick={onClick} className="btn bg-warning px-2 py-1">
      {renderContent()}
    </button>
  )
}

ButtonEdit.propTypes = {
  onClick: PropTypes.func,
  isAuthorized: PropTypes.bool,
  children: PropTypes.node,
}

export default React.memo(ButtonEdit)
