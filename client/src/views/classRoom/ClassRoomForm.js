/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { CForm } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { initValuesClassRoom } from 'src/constants/classRoom'
import { classRoomSchema } from 'src/schemas/classRoom'
import { transformClassroomValues } from 'src/utils/helpers/transformData/classroom'

const ClassRoomForm = () => {
  const { id } = useParams()
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesClassRoom,
    validationSchema: classRoomSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
      }
      const dataSubmit = transformClassroomValues({ values: valuesUpdated, idClassroom: id })
      // if (id) {
      //   handleEditBanner(dataSubmit)
      // } else {
      //   handleCreateBanner(dataSubmit)
      // }
    },
  })

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    setFieldValue,
    handleSubmit,
    setValues,
    touched,
  } = formik

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
        {/* {renderErrorMessage()} */}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">{id ? 'Edit Class Room' : 'Create Class Room'}</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(ClassRoomForm)
