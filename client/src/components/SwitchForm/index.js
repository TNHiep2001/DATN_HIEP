import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormLabel, CFormSwitch, CRow } from '@coreui/react'

const SwitchForm = ({ onChange, active, className, label, id, name, disabled }) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CFormLabel className={`col-form-label ${className}`}>{label}</CFormLabel>
      <CCol className="flex-1">
        <CFormSwitch
          id={id}
          className="fs-5 switch"
          onChange={onChange}
          checked={active}
          name={name}
          disabled={disabled}
        />
      </CCol>
    </CRow>
  )
}

SwitchForm.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
}

export default React.memo(SwitchForm)
