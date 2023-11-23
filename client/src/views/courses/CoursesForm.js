/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { CForm } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { initValuesCourses } from 'src/constants/courses'
import { coursesSchema } from 'src/schemas/courses'

const CoursesForm = () => {
  const { id } = useParams()
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesCourses,
    validationSchema: coursesSchema(id), // validate
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

  const renderNameCourse = () => {
    const { name_course } = values

    return (
      <FormInput
        isRequired
        label="Name course"
        placeholder="Enter name course"
        name="name_course"
        value={name_course}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('name_course')}
      />
    )
  }

  const renderCodeCourse = () => {
    const { code_course } = values

    return (
      <FormInput
        isRequired
        label="Code course"
        placeholder="Enter code course"
        name="code_course"
        value={code_course}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('code_course')}
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
        {renderNameCourse()}
        {renderCodeCourse()}
        {renderDescription()}
        {/* {renderErrorMessage()} */}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">{id ? 'Edit Courses' : 'Create Courses'}</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(CoursesForm)
