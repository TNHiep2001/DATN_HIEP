import React, { useCallback, useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormLabel, CRow } from '@coreui/react'
import { FormInput } from 'src/components'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import { profileSchema } from 'src/schemas/profile'
import { initValuesProfile } from 'src/constants/profile'
import { STATUS, STORAGE_KEYS } from 'src/constants'
import { getInfoUser } from 'src/services/user'
import { openNotifyErrorServer, showToastSuccess, sleep } from 'src/utils'
import { httpRequest } from 'src/services/http.service'
import API from 'src/services/api'

const Profile = (props) => {
  const [showBtnSave, setShowBtnSave] = useState(false)
  const [showBtnChangePassword, setShowBtnChangePassword] = useState(true)

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
    return <FormInput disabled label="Full name" value={`${first_name} ${last_name}`} />
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
        if (errors.confirm_password || errors.new_password) {
          event.preventDefault()
          return null
        }

        try {
          const formDataChangePassword = dataTransformed()

          const { statusCode } = await httpRequest().put(
            API.CHANGE_PASSWORD,
            formDataChangePassword,
          )

          if (statusCode === STATUS.SUCCESS_NUM) {
            showToastSuccess('Thay đổi', 'mật khẩu')
          } else {
            openNotifyErrorServer('Thay đổi mật khẩu thất bại')
          }
        } catch (e) {
          openNotifyErrorServer('Thay đổi mật khẩu thất bại')
        }

        await sleep(10000)
        setShowBtnSave(false)
        setShowBtnChangePassword(true)
      }
      if (!showBtnSave) return
      return (
        <CButton type="submit" onSubmit={handleClickBtnSave} className="px-4 py-2 text-white mb-3">
          Save
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
          Change password
        </CButton>
      )
    }

    const renderInputNewPassword = () => {
      const { new_password } = values

      if (!showBtnSave) return
      return (
        <FormInput
          label="New password"
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
          label="Confirm password"
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
        <FormInput disabled type="password" value={`${password}`} label="Password" />
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
    return <FormInput disabled label="Role" value={`${role}`} />
  }

  return (
    <div>
      <h3 className="title-content">Info Profile</h3>
      <CForm className="mt-3 p-3 w-80-percent">
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
