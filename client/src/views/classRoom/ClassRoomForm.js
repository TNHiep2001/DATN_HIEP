/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { CForm } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { initValuesClassRoom } from 'src/constants/classRoom'
import { classRoomSchema } from 'src/schemas/classRoom'

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
    const { name_class_room } = values

    return (
      <FormInput
        isRequired
        label="Name class room"
        placeholder="Enter name class room"
        name="name_class_room"
        value={name_class_room}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('name_class_room')}
      />
    )
  }

  const renderCodeClassRoom = () => {
    const { code_class_room } = values

    return (
      <FormInput
        isRequired
        label="Code class room"
        placeholder="Enter code class room"
        name="code_class_room"
        value={code_class_room}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('code_class_room')}
      />
    )
  }

  const renderDescription = () => {
    const { description } = values

    return (
      <FormInput
        isTextArea
        label="Description"
        placeholder="Enter description"
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
