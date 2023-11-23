import React from 'react'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CTooltip } from '@coreui/react'
import ContentDelRecord from '../ContentDelRecord'
import PropTypes from 'prop-types'

const ButtonDelete = ({ onDelete, isAuthorized, children, type }) => {
  if (!isAuthorized) return null

  const renderContent = () => {
    if (children) return children

    return <CIcon className="text-white" icon={cilTrash} />
  }
  return (
    <CTooltip trigger="focus" content={<ContentDelRecord onConfirm={onDelete} />} placement="top">
      <button type={type} className="btn bg-danger ms-4 px-2 py-1">
        {renderContent()}
      </button>
    </CTooltip>
  )
}

ButtonDelete.propTypes = {
  onDelete: PropTypes.func,
  isAuthorized: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string,
}

export default React.memo(ButtonDelete)
