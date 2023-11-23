import { CCol, CRow } from '@coreui/react'
import React from 'react'
import Select from 'react-select'
import PropTypes, { number, string } from 'prop-types'

// Component dùng chung có thể tái sử dụng
function FormSelect(props) {
  const {
    options,
    label,
    placeholder,
    name,
    value,
    isMulti,
    hideSelectedOptions,
    fullWidthLabel,
    require,
    showFlag = false,
    onChange,
    onBlur,
    idLanguage,
    isLanguageDefault,
    onSelectLanguage,
    error,
    isClearable = false,

    ...restProps
  } = props

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a4c6fc' : null,
    }),
    valueContainer: (base) => ({
      ...base,
      fontSize: '16px',
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: '16px',
    }),
  }

  const renderLabel = () => {
    return (
      <CCol xs={12} md={fullWidthLabel ? 12 : 3}>
        {label} {require && <span className="text-danger">*</span>}
      </CCol>
    )
  }

  const renderErrorMessage = () => {
    return error && <p className="text-danger mb-0">{error}</p>
  }

  const renderSelect = () => {
    let md = 9
    if (fullWidthLabel) md = 12
    if (showFlag) md = 8

    return (
      <CCol xs={12} md={md}>
        <Select
          isClearable={isClearable}
          isMulti={isMulti}
          options={options}
          placeholder={placeholder}
          name={name}
          value={value}
          hideSelectedOptions={hideSelectedOptions}
          styles={customStyles}
          onChange={onChange}
          onBlur={onBlur}
          {...restProps}
        />
        {renderErrorMessage()}
      </CCol>
    )
  }

  return (
    <CRow className="align-items-start mb-3">
      {renderLabel()}
      {renderSelect()}
    </CRow>
  )
}

FormSelect.propTypes = {
  isLanguageDefault: PropTypes.bool,
  showFlag: PropTypes.bool,
  require: PropTypes.bool,
  fullWidthLabel: PropTypes.bool,
  hideSelectedOptions: PropTypes.bool,
  idLanguage: PropTypes.oneOfType([number, string]),
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMulti: PropTypes.bool,
  error: PropTypes.string,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSelectLanguage: PropTypes.func,
  restProps: PropTypes.object,
}

export default React.memo(FormSelect)
