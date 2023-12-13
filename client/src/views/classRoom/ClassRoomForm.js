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

const ClassRoomForm = () => {
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

  const { handleChange, values, errors, handleBlur, handleSubmit, setValues, touched } = formik

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

  const renderNameClassRoom = () => {
    const { name_classroom } = values

    return (
      <FormInput
        isRequired
        label="Tên phòng học"
        placeholder="Nhập tên phòng học"
        name="name_classroom"
        value={name_classroom}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('name_classroom')}
      />
    )
  }

  const renderCodeClassRoom = () => {
    const { code_classroom } = values

    return (
      <FormInput
        isRequired
        label="Mã phòng học"
        placeholder="Nhập mã phòng học"
        name="code_classroom"
        value={code_classroom}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('code_classroom')}
      />
    )
  }

  const renderDescription = () => {
    const { description } = values

    return (
      <FormInput
        isTextArea
        label="Mô tả"
        placeholder="Nhập mô tả"
        name="description"
        value={description}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('description')}
      />
    )
  }

  const renderFormControl = () => {
    return (
      <>
        {renderNameClassRoom()}
        {renderCodeClassRoom()}
        {renderDescription()}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">{id ? 'Thay đổi phòng học' : 'Tạo phòng học'}</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(ClassRoomForm)
