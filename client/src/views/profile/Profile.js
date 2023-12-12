import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { FormInput } from 'src/components'
import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { profileSchema } from 'src/schemas/profile'
import { initValuesProfile } from 'src/constants/profile'
import { STATUS, STORAGE_KEYS } from 'src/constants'
import { getInfoUser } from 'src/services/user'
import { openNotifyErrorServer, showToastSuccess } from 'src/utils'
import { httpRequest } from 'src/services/http.service'
import API from 'src/services/api'

const Profile = (props) => {
  const [showBtnSave, setShowBtnSave] = useState(false)
  const [showBtnChangePassword, setShowBtnChangePassword] = useState(true)
  const [visible, setVisible] = useState(false)

  const id = localStorage.getItem(STORAGE_KEYS.ID)

  const formik = useFormik({
    initialValues: initValuesProfile,
    validationSchema: profileSchema(), // validate
  })

  const { handleChange, values, errors, handleBlur, touched, setValues } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const isDisabled = useMemo(() => {
    const { new_password, confirm_password } = values
    return !new_password || !confirm_password
  }, [values])

  const getUserProfile = useCallback(async () => {
    if (!id) return

    try {
      const { statusCode, data } = await getInfoUser({ id })
      if (statusCode === STATUS.SUCCESS_NUM) {
        setValues(data.data)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setValues])

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  const renderName = () => {
    const { first_name, last_name } = values
    return <FormInput disabled label="Họ & tên" value={`${first_name} ${last_name}`} />
  }

  const renderEmail = () => {
    const { email } = values
    return <FormInput disabled label="Email" value={`${email}`} />
  }

  const renderPassword = () => {
    const { password, confirm_password, new_password } = values
    const dataTransformed = () => {
      const formData = new FormData()
      formData.append('profile[new_password]', new_password)
      formData.append('profile[confirm_password]', confirm_password)
      formData.append('profile[_id]', id)

      return formData
    }

    const renderBtnSave = () => {
      const handleClickBtnSave = async (event) => {
        event.preventDefault()
        if (errors.confirm_password || errors.new_password) {
          return null
        }

        try {
          const formDataChangePassword = dataTransformed()

          const data = await httpRequest().put(API.CHANGE_PASSWORD, formDataChangePassword)

          console.log(data)

          if (data?.statusCode === STATUS.SUCCESS_NUM) {
            showToastSuccess('Thay đổi', 'mật khẩu')
            setVisible(true)
          } else {
            openNotifyErrorServer('Thay đổi mật khẩu thất bại')
          }
        } catch (e) {
          openNotifyErrorServer('Thay đổi mật khẩu thất bại')
        }
      }

      if (!showBtnSave) return
      return (
        <CButton
          type="submit"
          disabled={isDisabled}
          onClick={handleClickBtnSave}
          className="px-4 py-2 text-white mb-3"
        >
          Lưu
        </CButton>
      )
    }

    const renderBtnChangePassword = () => {
      const handleClickBtnChangePass = () => {
        setShowBtnSave(true)
        setShowBtnChangePassword(false)
      }

      if (!showBtnChangePassword) return
      return (
        <CButton
          type="submit"
          onClick={handleClickBtnChangePass}
          className="px-4 py-2 text-white mb-3"
        >
          Thay đổi mật khẩu
        </CButton>
      )
    }

    const renderInputNewPassword = () => {
      const { new_password } = values

      if (!showBtnSave) return
      return (
        <FormInput
          label="Mật khẩu mới"
          name="new_password"
          type="password"
          value={new_password}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={validateInputField('new_password')}
        />
      )
    }

    const renderInputConfirmPassword = () => {
      const { confirm_password } = values

      if (!showBtnSave) return
      return (
        <FormInput
          label="Xác nhận mật khẩu"
          name="confirm_password"
          type="password"
          value={confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={validateInputField('confirm_password')}
        />
      )
    }

    return (
      <Box>
        <FormInput disabled type="password" value={`${password}`} label="Mật khẩu" />
        {renderInputNewPassword()}
        {renderInputConfirmPassword()}
        <CRow>
          <CFormLabel className="col-form-label" />
          <CCol className="flex-1">
            {renderBtnSave()}
            {renderBtnChangePassword()}
          </CCol>
        </CRow>
      </Box>
    )
  }

  const renderRole = () => {
    const { role } = values
    return <FormInput disabled label="Chức vụ" value={`${role}`} />
  }

  const handleLogoutAfterChangePass = async () => {
    await localStorage.clear()
    window.location.href = '/login'
  }

  const renderPopupNoti = () => {
    return (
      <CModal size="m" visible={visible} backdrop="static" keyboard={false}>
        <CModalHeader closeButton={false}>
          <CModalTitle className="fs-5 fw-medium">Thông báo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Typography>Bạn đã thay đổi mật khẩu, vui lòng đăng nhập lại!</Typography>
          <CButton className="mt-3" onClick={handleLogoutAfterChangePass}>
            Đồng ý
          </CButton>
        </CModalBody>
      </CModal>
    )
  }

  return (
    <div>
      <h3 className="title-content">Thông tin cá nhân</h3>
      <CForm className="mt-3 p-3 w-80-percent">
        {renderPopupNoti()}
        {renderName()}
        {renderEmail()}
        {renderPassword()}
        {renderRole()}
      </CForm>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
