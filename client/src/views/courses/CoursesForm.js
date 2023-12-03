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
        label="Tên môn học"
        placeholder="Nhập tên môn học"
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
        label="Mã môn học"
        placeholder="Nhập mã môn học"
        name="code_course"
        value={code_course}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('code_course')}
      />
    )
  }

  const renderMajorCourse = () => {
    const { major } = values

    return (
      <FormInput
        isRequired
        label="Khóa học"
        placeholder="Nhập khóa học"
        name="major"
        value={major}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('major')}
      />
    )
  }

  const renderFacultyCourse = () => {
    const { faculty } = values

    return (
      <FormInput
        isRequired
        label="Khoa"
        placeholder="Nhập tên khoa"
        name="faculty"
        value={faculty}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('faculty')}
      />
    )
  }

  const renderSpecializationCourse = () => {
    const { specialization } = values

    return (
      <FormInput
        isRequired
        label="Chuyên ngành"
        placeholder="Nhập tên chuyên ngành"
        name="specialization"
        value={specialization}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('specialization')}
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
        {renderNameCourse()}
        {renderCodeCourse()}
        {renderMajorCourse()}
        {renderFacultyCourse()}
        {renderSpecializationCourse()}
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
