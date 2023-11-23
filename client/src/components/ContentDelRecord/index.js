import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilX } from '@coreui/icons'
/**
 * Content used popup
 * @returns jsx
 */
const ContentDelRecord = ({ onConfirm, onCancel }) => {
  return (
    <div className="bg-white text-dark">
      <p className="mb-2">Are you sure to delete this record ? </p>
      <CIcon
        onMouseDown={onConfirm}
        className="cursor-pointer text-success mx-2"
        icon={cilCheckAlt}
      />
      <CIcon onKeyDown={onCancel} className="cursor-pointer text-danger mx-2" icon={cilX} />
    </div>
  )
}

ContentDelRecord.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}
export default ContentDelRecord
