/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { CForm } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { initValuesClassRoom } from 'src/constants/classRoom'
import { classRoomSchema } from 'src/schemas/classRoom'
import { transformClassroomValues } from 'src/utils/helpers/transformData/classroom'
import { openNotifyErrorServer, showToastSuccess } from 'src/utils'
import { STATUS } from 'src/constants'
import { createClassroom, getDetailClassroomApi, updateClassroom } from 'src/services/classroom'
import { FormSelect } from 'src/components/FormControl'
import { optionsRoleUser } from 'src/constants/users'

const UsersForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // hàm tạo classroom
  const handleCreateClassroom = async (dataCreate) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await createClassroom(dataCreate)
      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Tạo', 'phòng học')
        history.goBack()
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  const handleEditClassroom = async (dataEdit) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await updateClassroom(id, dataEdit)

      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Thay đổi', 'phòng học')
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
    initialValues: initValuesClassRoom,
    validationSchema: classRoomSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
      }
      const dataSubmit = transformClassroomValues({ values: valuesUpdated, idClassroom: id })
      if (id) {
        handleEditClassroom(dataSubmit)
      } else {
        handleCreateClassroom(dataSubmit)
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

  const getDetailClassroom = useCallback(async () => {
    if (!id) return

    try {
      const { statusCode, values } = await getDetailClassroomApi(id)
      if (statusCode === STATUS.SUCCESS_NUM) {
        setValues(values)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setValues])

  useEffect(() => {
    getDetailClassroom()
  }, [getDetailClassroom])

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
