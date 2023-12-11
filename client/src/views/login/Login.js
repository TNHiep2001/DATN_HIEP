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
import { STATUS, STORAGE_KEYS } from '../../constants'
import { openNotifyErrorServer, showToastSuccess, sleep } from '../../utils'
import { httpRequest } from 'src/services/http.service'
import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { initValuesLogin } from 'src/constants/login'
import { loginSchema } from 'src/schemas/login'

const inCorrectMessage = 'Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại!'

const Login = ({ history }) => {
  const isUnmounted = useRef(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const saveInfoUserToLocalStorage = ({ token, user, role, id }) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.ROLE, role)
    localStorage.setItem(STORAGE_KEYS.ID, id)
  }

  const formik = useFormik({
    initialValues: initValuesLogin,
    validationSchema: loginSchema(), // validate
  })

  const { handleChange, values, errors, handleBlur, touched } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const isDisabled = useMemo(() => {
    const { email, password } = values
    return !email || !password
  }, [values])

  const goToFirstRoute = () => {
    history.push('/')
  }

  const handleLoginSuccess = async (data) => {
    const { token, name, email, role, id } = data
    const user = { name, email }

    saveInfoUserToLocalStorage({ token, user, role, id })

    showToastSuccess('Đăng nhập', 'hệ thống')

    goToFirstRoute()
  }

  const handleLoginFailed = () => {
    setErrorMessage(inCorrectMessage)
    openNotifyErrorServer('Đăng nhập tài khoản thất bại')
  }

  const dataTransformed = () => {
    const { email, password } = values
    const formData = new FormData()
    formData.append('employee[email]', email)
    formData.append('employee[password]', password)

    return formData
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    setIsLogin(true)
    try {
      await sleep(600)

      const formDataSignIn = dataTransformed()

      const { data, statusCode } = await httpRequest().post(API.LOGIN, formDataSignIn)

      if (statusCode === STATUS.SUCCESS_NUM) {
        handleLoginSuccess(data)
      } else {
        handleLoginFailed()
      }
    } catch (e) {
      handleLoginFailed()
    }
    if (isUnmounted.current) return
    setIsLogin(false)
  }

  useEffect(() => {
    return () => {
      isUnmounted.current = true
    }
  }, [])

  const renderTitle = () => {
    return (
      <>
        <h1>Đăng nhập</h1>
        <p className="text-medium-emphasis">Đăng nhập vào tài khoản của bạn</p>
      </>
    )
  }

  const renderFormInput = () => {
    const { email, password } = values
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
        <Box className="mb-2">
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Mật khẩu"
              autoComplete="password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </CInputGroup>
          <p className="text-danger mb-0">{validateInputField('password')}</p>
        </Box>
      </>
    )
  }

  const renderButtonSubmit = () => {
    return (
      <CRow>
        <CCol xs={12}>
          {isLogin ? (
            <CButton disabled>
              <CSpinner component="span" size="sm" aria-hidden="true" />
              <span className="ms-1">Loading...</span>
            </CButton>
          ) : (
            <Box className="d-flex justify-content-between">
              <CButton type="submit" disabled={isDisabled} color="primary" className="px-4">
                Đăng nhập
              </CButton>
              <Typography className="d-flex">
                Chưa có tài khoản?{' '}
                <Typography
                  onClick={() => {
                    history.push('/register')
                  }}
                  className="mx-1"
                  style={{ fontWeight: 600, color: '#321fdb', cursor: 'pointer' }}
                >
                  Đăng ký
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
                  <CForm onSubmit={handleSubmitLogin}>
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

Login.propTypes = {
  history: PropTypes.object,
}

export default Login
