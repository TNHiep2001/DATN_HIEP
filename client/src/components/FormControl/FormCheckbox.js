import { CCol, CFormCheck, CRow } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

function FormCheckbox({ value, label, name, ...restProps }) {
  return (
    <CRow>
      <CCol xs={1}>
        <CFormCheck
          id={label}
          className="fs-6 pt-2"
          name={name}
          checked={value}
          size="large"
          {...restProps}
        />
      </CCol>
      <CCol>
        <label htmlFor={label}>{label}</label>
      </CCol>
    </CRow>
  )
}

FormCheckbox.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  restProps: PropTypes.object,
}
export default FormCheckbox
