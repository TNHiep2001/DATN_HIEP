import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import API from '../../services/api'
import { STATUS } from '../../constants'
import { sleep } from '../../utils'
import { httpRequest } from 'src/services/http.service'
import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { initValuesRegister } from 'src/constants/register'
import { registerSchema } from 'src/schemas/register'

const errorMessageRegister = 'Email already exists. Please try again.'

const Register = ({ history }) => {
  const isUnmounted = useRef(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const formik = useFormik({
    initialValues: initValuesRegister,
    validationSchema: registerSchema(), // validate
  })

  const { handleChange, values, errors, handleBlur, touched } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const isDisabled = useMemo(() => {
    const { email, password, confirm_password } = values
    return !email || !password || !confirm_password
  }, [values])

  const goToLogin = () => {
    history.push('/login')
  }

  const handleRegisterSuccess = async (data) => {
    goToLogin()
  }

  const handleRegisterFailed = () => {
    setErrorMessage(errorMessageRegister)
  }

  const dataTransformed = () => {
    const { email, password, confirm_password } = values
    const formData = new FormData()
    formData.append('employee[email]', email)
    formData.append('employee[password]', password)
    formData.append('employee[confirm_password]', confirm_password)

    return formData
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    setIsRegister(true)
    try {
      await sleep(600)

      const formDataRegister = dataTransformed()

      const { data, statusCode } = await httpRequest().post(API.LOGIN, formDataRegister)

      if (statusCode === STATUS.SUCCESS_NUM) {
        handleRegisterSuccess(data.data)
      } else {
        handleRegisterFailed()
      }
    } catch (e) {
      handleRegisterFailed()
    }
    if (isUnmounted.current) return
    setIsRegister(false)
  }

  useEffect(() => {
    return () => {
      isUnmounted.current = true
    }
  }, [])

  const renderTitle = () => {
    return (
      <>
        <h1>Sign Up</h1>
        <p className="text-medium-emphasis">Sign Up your account</p>
      </>
    )
  }

  const renderFormInput = () => {
    const { email, password, confirm_password } = values
    return (
      <>
        <Box className="mb-3">
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="Email"
              autoComplete="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </CInputGroup>
          <p className="text-danger mb-0">{validateInputField('email')}</p>
        </Box>

        <Box className="mb-3">
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Password"
              autoComplete="password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </CInputGroup>
          <p className="text-danger mb-0">{validateInputField('password')}</p>
        </Box>

        <Box className="mb-2">
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Confirm password"
              autoComplete="confirm_password"
              name="confirm_password"
              value={confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </CInputGroup>
          <p className="text-danger mb-0">{validateInputField('confirm_password')}</p>
        </Box>
      </>
    )
  }

  const renderButtonSubmit = () => {
    return (
      <CRow>
        <CCol xs={12}>
          {isRegister ? (
            <CButton disabled>
              <CSpinner component="span" size="sm" aria-hidden="true" />
              <span className="ms-1">Loading...</span>
            </CButton>
          ) : (
            <Box className="d-flex justify-content-between">
              <CButton type="submit" disabled={isDisabled} color="primary" className="px-4">
                Register
              </CButton>
              <Typography className="d-flex">
                Đã có tài khoản?{' '}
                <Typography
                  onClick={() => {
                    history.push('/login')
                  }}
                  className="mx-1"
                  style={{ fontWeight: 600, color: '#321fdb', cursor: 'pointer' }}
                >
                  Đăng nhập
                </Typography>
              </Typography>
            </Box>
          )}
        </CCol>
      </CRow>
    )
  }

  const renderErrorMessage = () => {
    return <p className="text-danger">{errorMessage}</p>
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmitRegister}>
                    {renderTitle()}
                    {renderFormInput()}
                    {renderErrorMessage()}
                    {renderButtonSubmit()}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Register.propTypes = {
  history: PropTypes.object,
}

export default Register
