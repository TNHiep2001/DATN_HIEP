import React, { useCallback, useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormLabel, CRow } from '@coreui/react'
import { FormInput } from 'src/components'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import { profileSchema } from 'src/schemas/profile'
import { initValuesProfile } from 'src/constants/profile'
import { STATUS, STORAGE_KEYS } from 'src/constants'
import { getInfoUser } from 'src/services/user'
import { openNotifyErrorServer } from 'src/utils'

const Profile = (props) => {
  const [showBtnSave, setShowBtnSave] = useState(false)
  const [showBtnChangePassword, setShowBtnChangePassword] = useState(true)

  const id = localStorage.getItem(STORAGE_KEYS.ID)
  console.log(id)

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
      const { statusCode, values } = await getInfoUser({ id })
      if (statusCode === STATUS.SUCCESS_NUM) {
        setValues(values)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setValues])

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  const renderName = () => {
    return <FormInput disabled label="Full name" value="Trần Ngọc Hiệp" />
  }

  const renderEmail = () => {
    return <FormInput disabled label="Email" value="tnhiep140701@gmail.com" />
  }

  const renderPassword = () => {
    const renderBtnSave = () => {
      const handleClickBtnSave = (event) => {
        if (errors.confirm_password || errors.new_password) {
          event.preventDefault()
          return null
        }

        console.log(values)

        setShowBtnSave(false)
        setShowBtnChangePassword(true)
      }
      if (!showBtnSave) return
      return (
        <CButton type="submit" onClick={handleClickBtnSave} className="px-4 py-2 text-white mb-3">
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
        <FormInput disabled type="password" value="hehehehe" label="Password" />
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
    return <FormInput disabled label="Role" value="Teacher" />
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
