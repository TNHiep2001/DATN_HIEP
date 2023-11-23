import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import { CButton, CCol } from '@coreui/react'
import { ButtonLoading } from '..'

const ButtonSubmit = ({ isLoading, disabled, id }) => {
  const disabledCss = disabled ? 'disabled' : ''

  return (
    <CCol xs={12} className="text-center">
      {isLoading ? (
        <ButtonLoading />
      ) : (
        <CButton
          disabled={disabled}
          type="submit"
          className={`px-4 py-2 ${disabledCss}`}
          color="primary"
        >
          {id ? 'Update' : 'Create'}
        </CButton>
      )}
    </CCol>
  )
}

ButtonSubmit.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([string, number]),
}

export default React.memo(ButtonSubmit)
