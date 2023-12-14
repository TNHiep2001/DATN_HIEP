/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { CForm } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { initValuesCourses } from 'src/constants/courses'
import { coursesSchema } from 'src/schemas/courses'
import { createCourse, getDetailCourseApi, updateCourse } from 'src/services/course'
import { STATUS } from 'src/constants'
import { openNotifyErrorServer, showToastSuccess } from 'src/utils'
import { transformCourseValues } from 'src/utils/helpers/transformData/course'

const CoursesForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // hàm tạo course
  const handleCreateCourse = async (dataCreate) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await createCourse(dataCreate)
      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Tạo', 'môn học')
        history.goBack()
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  // hàm chỉnh sửa course
  const handleEditCourse = async (dataEdit) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await updateCourse(id, dataEdit)

      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Thay đổi', 'môn học')
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
    initialValues: initValuesCourses,
    validationSchema: coursesSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
      }
      const dataSubmit = transformCourseValues({ values: valuesUpdated, idCourse: id })
      if (id) {
        handleEditCourse(dataSubmit)
      } else {
        handleCreateCourse(dataSubmit)
      }
    },
  })

  const { handleChange, values, errors, handleBlur, handleSubmit, setValues, touched } = formik

  const getDetailCourse = useCallback(async () => {
    if (!id) return

    try {
      const { statusCode, values } = await getDetailCourseApi(id)
      if (statusCode === STATUS.SUCCESS_NUM) {
        setValues(values)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setValues])

  useEffect(() => {
    getDetailCourse()
  }, [getDetailCourse])

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

  const renderAcademicTerm = () => {
    const { academic_term } = values

    return (
      <FormInput
        isRequired
        label="Khóa học"
        placeholder="Nhập khóa học"
        name="academic_term"
        value={academic_term}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('academic_term')}
      />
    )
  }

  const renderDepartmentCourse = () => {
    const { department } = values

    return (
      <FormInput
        isRequired
        label="Khoa"
        placeholder="Nhập tên khoa"
        name="department"
        value={department}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('department')}
      />
    )
  }

  const renderMajorCourse = () => {
    const { major } = values

    return (
      <FormInput
        isRequired
        label="Chuyên ngành"
        placeholder="Nhập tên chuyên ngành"
        name="major"
        value={major}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('major')}
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
        {renderAcademicTerm()}
        {renderDepartmentCourse()}
        {renderMajorCourse()}
        {renderDescription()}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">{id ? 'Thay đổi môn học' : 'Tạo môn học'}</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(CoursesForm)
