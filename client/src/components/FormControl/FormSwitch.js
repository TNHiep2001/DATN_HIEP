import React from 'react'
import { CFormSwitch } from '@coreui/react'
import PropTypes from 'prop-types'

const FormSwitch = ({ active, onChange, isEdit, isRead }) => {
  if (!isEdit && !isRead) return null

  return (
    <div className="vertical-center clearfix transformY-25">
      <CFormSwitch
        className="fs-5 m-0 active-switch-btn p-0"
        onChange={onChange}
        checked={active}
        name="active"
        disabled={isRead && !isEdit}
      />
    </div>
  )
}

FormSwitch.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func,
  isEdit: PropTypes.bool,
  isRead: PropTypes.bool,
}

export default React.memo(FormSwitch)
