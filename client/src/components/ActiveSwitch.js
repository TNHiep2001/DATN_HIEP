import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormSwitch, CRow } from '@coreui/react'

const ActiveSwitch = ({
  onChange,
  active,
  name = 'active',
  fullWidthLabel,
  label = 'Active',
  ...restProps
}) => {
  const renderLabel = () => {
    return (
      <CCol xs={12} md={fullWidthLabel ? 12 : 3}>
        {label}
      </CCol>
    )
  }

  const renderSwitch = () => {
    let md = 9
    if (fullWidthLabel) md = 12

    return (
      <CCol xs={12} md={md} className="align-items-center mb-3">
        <CFormSwitch
          id={name}
          className="fs-5 switch"
          onChange={onChange}
          checked={active}
          name={name}
          {...restProps}
        />
      </CCol>
    )
  }

  return (
    <CRow className="align-items-start">
      {renderLabel()}
      {renderSwitch()}
    </CRow>
  )
}

ActiveSwitch.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
  name: PropTypes.string,
  fullWidthLabel: PropTypes.bool,
  label: PropTypes.string,
  restProps: PropTypes.object,
}

export default React.memo(ActiveSwitch)
