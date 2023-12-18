import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { CButton, CCol, CForm, CFormLabel, CRow } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { FormSelect } from 'src/components/FormControl'
import {
  initValuesScheduleRegistration,
  optionsTypeSchedule,
} from 'src/constants/scheduleRegistration'
import { scheduleRegistrationSchema } from 'src/schemas'
import { STATUS } from 'src/constants'
import { Box } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import ScheduleItem from './components/ScheduleItem'
import { openNotifyErrorServer, showToastSuccess } from 'src/utils'
import { getListOptionCourseApi } from 'src/services/course'
import { getListOptionClassroomApi } from 'src/services/classroom'
import { createSchedule, getDetailScheduleApi, updateSchedule } from 'src/services'
import { transformScheduleValues } from 'src/utils/helpers/transformData/schedule'

const ScheduleRegistrationForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [scheduleDestroys, setScheduleDestroys] = useState([])
  const [dataListCourse, setDataListCourse] = useState([])
  const [dataListClassroom, setDataListClassroom] = useState([])

  const id_user_create = localStorage.getItem('ID')

  console.log(scheduleDestroys)
  // const [messageResponse, setMessageResponse] = useState('')
  // const history = useHistory()
  // const isUnmounted = useRef()

  // // Xử lý lỗi khi create/edit
  // const handleErrorResponse = (data, error) => {
  //   if (data) {
  //     // Trường hợp lỗi BE trả về
  //     setMessageResponse(getMessageError(data.message))
  //   } else {
  //     // Lỗi Axios trả về
  //     setMessageResponse(getMessageError(error.message))
  //   }
  // }

  const handleCreateSchedule = async (dataCreate) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await createSchedule(dataCreate)
      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Tạo', 'lịch trình')
        history.goBack()
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  // hàm chỉnh sửa lịch trình
  const handleEditSchedule = async (dataEdit) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await updateSchedule(id, dataEdit)

      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Thay đổi', 'lịch trình')
        history.goBack()
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  const getListOptionCourse = useCallback(async () => {
    try {
      const { statusCode, data } = await getListOptionCourseApi()
      if (statusCode === STATUS.SUCCESS_NUM) {
        setDataListCourse(data.data)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [])

  useEffect(() => {
    getListOptionCourse()
  }, [getListOptionCourse])

  const getListOptionClassroom = useCallback(async () => {
    try {
      const { statusCode, data } = await getListOptionClassroomApi()
      if (statusCode === STATUS.SUCCESS_NUM) {
        setDataListClassroom(data.data)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [])

  useEffect(() => {
    getListOptionClassroom()
  }, [getListOptionClassroom])

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesScheduleRegistration,
    validationSchema: scheduleRegistrationSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
        id_user_create,
        scheduleDestroys,
      }

      console.log(valuesUpdated)

      const dataSubmit = transformScheduleValues({ values: valuesUpdated, idSchedule: id })
      if (id) {
        handleEditSchedule(dataSubmit)
      } else {
        handleCreateSchedule(dataSubmit)
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
    setTouched,
  } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const renderTypeSchedule = () => {
    const { type_schedule } = values

    return (
      <FormSelect
        require
        isClearable
        value={type_schedule}
        name="type_schedule"
        options={optionsTypeSchedule}
        label="Kiểu lịch trình"
        placeholder="Lựa chọn kiểu lịch trình"
        onChange={(value) => setFieldValue('type_schedule', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, type_schedule: true })
        }}
        error={validateInputField('type_schedule')}
      />
    )
  }

  const renderCourseSchedule = () => {
    const { course_schedule, type_schedule } = values
    if (type_schedule.value === 'evtType') return

    return (
      <FormSelect
        require
        isClearable
        value={course_schedule}
        name="course_schedule"
        options={dataListCourse}
        label="Môn học"
        placeholder="Lựa chọn môn học"
        onChange={(value) => setFieldValue('course_schedule', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, course_schedule: true })
        }}
        error={validateInputField('course_schedule')}
      />
    )
  }

  const renderLectureContent = () => {
    const { lecture_content, type_schedule } = values

    if (type_schedule.value === 'eduType') return

    return (
      <FormInput
        isRequired
        label="Tiêu đề lịch trình"
        placeholder="Tiêu đề lịch trình"
        name="lecture_content"
        value={lecture_content}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('lecture_content')}
      />
    )
  }

  const renderTotalNumberLessons = () => {
    const { total_num_lessons, type_schedule } = values

    if (type_schedule.value === 'evtType') return

    return (
      <FormInput
        isRequired
        type="number"
        label="Tổng số tiết học"
        placeholder="Nhập tổng số tiết học"
        name="total_num_lessons"
        value={total_num_lessons}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('total_num_lessons')}
      />
    )
  }

  const renderTotalCreditPoints = () => {
    const { total_credit_points, type_schedule } = values

    if (type_schedule.value === 'evtType') return

    return (
      <FormInput
        isRequired
        type="number"
        label="Số tín chỉ"
        placeholder="Nhập số tín chỉ"
        name="total_credit_points"
        value={total_credit_points}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('total_credit_points')}
      />
    )
  }

  const renderResponsibleTeacher = () => {
    const { responsible_teacher } = values

    return (
      <FormInput
        isRequired
        label="Giáo viên phụ trách"
        placeholder="Nhập tên giáo viên phụ trách"
        name="responsible_teacher"
        value={responsible_teacher}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('responsible_teacher')}
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

  //  Hiển thị danh sách lịch trình được thêm
  const renderDataScheduleAdded = () => {
    const { schedules } = values

    if (!schedules?.length) return null

    return schedules.map((schedule, index) => {
      return (
        <ScheduleItem
          key={index}
          scheduleItem={schedule}
          index={index}
          formik={formik}
          setScheduleDestroys={setScheduleDestroys}
          dataListClassroom={dataListClassroom}
        />
      )
    })
  }

  // Hàm xử lý add thêm một schedule
  const handleAddSchedule = () => {
    const newSchedule = {
      id: uuidv4(),
      schedule_date: '',
      time_start: '',
      time_end: '',
      room: null,
      content_schedule: '',
      num_of_lessons: '',
      name_teacher: '',
      status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
    }

    const schedulesUpdated = values.schedules?.concat(newSchedule)

    setFieldValue('schedules', schedulesUpdated)
  }

  // Hiển thị lỗi trong trường hợp không add lịch trình nào
  const renderErrorMinSchedule = () => {
    const errorMinSchedule = validateInputField('schedules')

    if (typeof errorMinSchedule === 'string') {
      return <Box className="text-danger">{errorMinSchedule}</Box>
    }

    return null
  }

  // Hiển thị nút add schedule
  const renderBtnAddSchedule = () => {
    return (
      <CRow className="mb-3">
        <CFormLabel className="col-form-label" />
        <CCol className="flex-1">
          <CButton className="px-4 py-2 text-white" color="success" onClick={handleAddSchedule}>
            + Thêm lịch trình
          </CButton>
          {renderErrorMinSchedule()}
        </CCol>
      </CRow>
    )
  }

  const getDetailSchedule = useCallback(async () => {
    if (!id) return

    try {
      const { statusCode, values } = await getDetailScheduleApi(id)
      if (statusCode === STATUS.SUCCESS_NUM) {
        setValues(values)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setValues])

  useEffect(() => {
    getDetailSchedule()
  }, [getDetailSchedule])

  // const renderErrorMessage = () => {
  //   return (
  //     <CRow className="mb-3 align-items-center">
  //       <CCol xs={3} />
  //       <CCol xs={9} className="text-danger">
  //         {messageResponse === 'RESTAURANT_BANNER_HAS_EXISTED' ? '' : messageResponse}
  //       </CCol>
  //     </CRow>
  //   )
  // }

  const renderFormControl = () => {
    return (
      <>
        {renderTypeSchedule()}
        {renderCourseSchedule()}
        {renderLectureContent()}
        {renderTotalCreditPoints()}
        {renderTotalNumberLessons()}
        {renderResponsibleTeacher()}
        {renderDescription()}
        {renderDataScheduleAdded()}
        {renderBtnAddSchedule()}
        {/* {renderErrorMessage()} */}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">{id ? 'Chỉnh sửa lịch trình' : 'Tạo lịch trình'}</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(ScheduleRegistrationForm)
