import React, { useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { CButton, CCol, CForm, CFormLabel, CRow } from '@coreui/react'
import { ButtonSubmit, FormInput } from 'src/components'
import { FormSelect } from 'src/components/FormControl'
import {
  initValuesScheduleRegistration,
  optionsCourse,
  optionsRoom,
  optionsStatus,
  optionsTypeSchedule,
} from 'src/constants/scheduleRegistration'
import { scheduleRegistrationSchema } from 'src/schemas'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import { DATE_FORMAT, optionsDayOfWeek } from 'src/constants'
import DayjsUtils from '@date-io/dayjs'
import { Box } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import ScheduleItem from './components/ScheduleItem'

const ScheduleRegistrationForm = () => {
  const { id } = useParams()
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [scheduleDestroys, setScheduleDestroys] = useState([])
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

  // const handleCreateBanner = async (dataCreate, paramsUpload) => {
  //   setIsBtnLoading(true)
  //   try {
  //     const { statusCode } = await createBannerApi({ dataCreate, paramsUpload })
  //     if (statusCode === STATUS.SUCCESS_NUM) {
  //       showToastSuccess('Create', 'banner')
  //       history.goBack()
  //     }
  //   } catch (error) {
  //     const { data } = error.response
  //     handleErrorResponse(data, error)
  //   }
  //   setIsBtnLoading(false)
  // }

  // const handleEditBanner = async (dataEdit, paramsUpload) => {
  //   setIsBtnLoading(true)
  //   try {
  //     const { statusCode } = await updateBannerApi({ id, dataEdit, paramsUpload })

  //     if (statusCode === STATUS.SUCCESS_NUM) {
  //       showToastSuccess('Update', 'banner')
  //       history.goBack()
  //     }
  //   } catch (error) {
  //     const { data } = error.response
  //     handleErrorResponse(data, error)
  //   }
  //   if (isUnmounted.current) return
  //   setIsBtnLoading(false)
  // }

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesScheduleRegistration,
    validationSchema: scheduleRegistrationSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
      }

      // const dataSubmit = transformBannerValues({ values: valuesUpdated, idBanner: id })
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
    setTouched,
  } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const renderTypeSchedule = () => {
    const { type } = values

    return (
      <FormSelect
        require
        isClearable
        value={type}
        name="type"
        options={optionsTypeSchedule}
        label="Kiểu lịch trình"
        placeholder="Lựa chọn kiểu lịch trình"
        onChange={(value) => setFieldValue('type', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, type: true })
        }}
        error={validateInputField('type')}
      />
    )
  }

  const renderLectureContent = () => {
    const { lecture_content } = values

    return (
      <FormInput
        isRequired
        label="Tên khóa học"
        placeholder="Nhập tên khóa học"
        name="lecture_content"
        value={lecture_content}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('lecture_content')}
      />
    )
  }

  const renderTotalNumberLessons = () => {
    const { total_num_lessons } = values

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
        // errorMessage={validateInputField('lecture_content')}
      />
    )
  }

  const renderTotalCreditPoints = () => {
    const { total_credit_points } = values

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
        // errorMessage={validateInputField('lecture_content')}
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

  // const getDetailBanner = useCallback(async () => {
  //   if (!id) return

  //   try {
  //     const { statusCode, values } = await getDetailBannerApi(id)
  //     if (statusCode === STATUS.SUCCESS_NUM) {
  //       setValues(values)
  //     }
  //   } catch (_) {
  //     openNotifyErrorServer()
  //   }
  // }, [id, setValues])

  // useEffect(() => {
  //   getDetailBanner()
  // }, [getDetailBanner])

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
