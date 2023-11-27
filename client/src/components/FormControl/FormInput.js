import React from 'react'
import { CCol, CFormInput, CFormTextarea, CRow } from '@coreui/react'
import PropTypes, { number, string } from 'prop-types'

/**
 * Custom Component tái sử dụng lại Input Control,
 * Bao gồm cả multiple language
 */
function FormInput({
  label,
  id,
  name,
  value,
  isRequired,
  errorMessage,
  fullWidthLabel,
  onChange,
  onBlur,
  onSelectLanguage,
  idLanguage,
  isLanguageDefault,
  isTextArea,
  disabled,
  type,
  defaultValue,
  ...restProps
}) {
  const renderLabel = () => {
    return (
      <CCol xs={12} md={fullWidthLabel ? 12 : 3}>
        {label} {isRequired && <span className="text-danger">*</span>}
      </CCol>
    )
  }

  const renderInput = () => {
    let md = 9
    if (fullWidthLabel) md = 12

    const errorBorder = errorMessage && 'error-border'

    let Component = CFormInput

    if (isTextArea) Component = CFormTextarea

    return (
      <CCol xs={12} md={md}>
        <Component
          disabled={disabled}
          name={name}
          className={errorBorder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          id={id}
          type={type}
          defaultValue={defaultValue}
          {...restProps}
        />
        <p className="text-danger mb-0">{errorMessage}</p>
      </CCol>
    )
  }

  return (
    <CRow className="mb-3 align-items-start">
      {renderLabel()}
      {renderInput()}
    </CRow>
  )
}

FormInput.propTypes = {
  id: PropTypes.oneOfType([string, number]),
  label: PropTypes.string,
  fullWidthLabel: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.oneOfType([number, string]),
  name: PropTypes.oneOfType([number, string]),
  isRequired: PropTypes.bool,
  isLanguageDefault: PropTypes.bool,
  idLanguage: PropTypes.oneOfType([number, string]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSelectLanguage: PropTypes.func,
  restProps: PropTypes.object,
  isTextArea: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  defaultValue: PropTypes.object,
}

export default React.memo(FormInput)
