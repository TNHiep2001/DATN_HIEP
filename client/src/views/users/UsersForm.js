/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { CForm } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { openNotifyErrorServer, showToastSuccess } from 'src/utils'
import { STATUS } from 'src/constants'
import { FormSelect } from 'src/components/FormControl'
import { initValuesUser, optionsRoleUser } from 'src/constants/users'
import { createUser, getDetailUserApi, updateUser } from 'src/services'
import { usersSchema } from 'src/schemas/users'
import { transformUserValues } from 'src/utils/helpers/transformData/users'

const UsersForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // hàm tạo tài quản cho user
  const handleCreateUser = async (dataCreate) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await createUser(dataCreate)
      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Tạo', 'tài khoản người dùng')
        history.goBack()
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  const handleEditUser = async (dataEdit) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await updateUser(id, dataEdit)

      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Thay đổi', 'thông tin tài khoản người dùng')
        history.goBack()
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesUser,
    validationSchema: usersSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
      }
      const dataSubmit = transformUserValues({ values: valuesUpdated, idUser: id })
      if (id) {
        handleEditUser(dataSubmit)
      } else {
        handleCreateUser(dataSubmit)
      }
    },
  })

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    handleSubmit,
    setValues,
    touched,
    setFieldValue,
    setTouched,
  } = formik

  const getDetailUser = useCallback(async () => {
    if (!id) return

    try {
      const { statusCode, values } = await getDetailUserApi(id)
      if (statusCode === STATUS.SUCCESS_NUM) {
        setValues(values)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setValues])

  useEffect(() => {
    getDetailUser()
  }, [getDetailUser])

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const renderLastName = () => {
    const { last_name } = values

    return (
      <FormInput
        isRequired
        label="Họ"
        placeholder="Nhập họ của người dùng"
        name="last_name"
        value={last_name}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('last_name')}
      />
    )
  }

  const renderFirstName = () => {
    const { first_name } = values

    return (
      <FormInput
        isRequired
        label="Tên"
        placeholder="Nhập tên của người dùng"
        name="first_name"
        value={first_name}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('first_name')}
      />
    )
  }

  const renderEmail = () => {
    const { email } = values

    return (
      <FormInput
        isRequired
        label="Email"
        placeholder="Nhập email của người dùng"
        name="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('email')}
      />
    )
  }

  const renderPassword = () => {
    const { password } = values

    return (
      <FormInput
        type="password"
        isRequired
        label="Mật khẩu"
        placeholder="Nhập mật khẩu của người dùng"
        name="password"
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('password')}
      />
    )
  }

  const renderConfirmPassword = () => {
    const { confirm_password } = values

    return (
      <FormInput
        type="password"
        isRequired
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu của người dùng"
        name="confirm_password"
        value={confirm_password}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('confirm_password')}
      />
    )
  }

  const renderRole = () => {
    const { role } = values

    return (
      <FormSelect
        require
        isClearable
        value={role}
        name="role"
        options={optionsRoleUser}
        label="Quyền"
        placeholder="Chọn quyền cho người dùng"
        onChange={(value) => setFieldValue('role', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, role: true })
        }}
        error={validateInputField('role')}
      />
    )
  }

  const renderFormControl = () => {
    return (
      <>
        {renderLastName()}
        {renderFirstName()}
        {renderEmail()}
        {renderPassword()}
        {renderConfirmPassword()}
        {renderRole()}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">{id ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản'}</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(UsersForm)
