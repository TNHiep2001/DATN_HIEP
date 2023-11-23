import React, { useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { CCol, CForm, CFormLabel, CRow } from '@coreui/react'
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

const ScheduleRegistrationForm = () => {
  const { id } = useParams()
  const [isBtnLoading, setIsBtnLoading] = useState(false)
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
  console.log(values)

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
        label="Type Schedule"
        placeholder="Select type schedule"
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
        label="Lecture Content"
        placeholder="Enter lecture content"
        name="lecture_content"
        value={lecture_content}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={validateInputField('lecture_content')}
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

  const renderSelectRoom = () => {
    const { room } = values

    return (
      <FormSelect
        require
        isClearable
        value={room}
        name="room"
        options={optionsRoom}
        label="Room"
        placeholder="Select room"
        onChange={(value) => setFieldValue('room', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, room: true })
        }}
        error={validateInputField('room')}
      />
    )
  }

  const renderSelectCourse = () => {
    const { course } = values

    return (
      <FormSelect
        require
        isClearable
        value={course}
        name="course"
        options={optionsCourse}
        label="Course"
        placeholder="Select course"
        onChange={(value) => setFieldValue('course', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, course: true })
        }}
        error={validateInputField('course')}
      />
    )
  }

  const renderDateCourse = () => {
    const { schedule_date } = values

    console.log(schedule_date)

    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <CRow className="mb-3">
          <CFormLabel className="col-form-label">
            Schedule date <span className="text-danger">*</span>
          </CFormLabel>
          <CCol className="flex-1">
            <CRow>
              <CCol xs={5}>
                <DatePicker
                  required
                  placeholder={DATE_FORMAT}
                  style={{ width: '100%' }}
                  inputProps={{ style: { padding: '10px 20px' } }}
                  name="schedule_date"
                  value={schedule_date || null}
                  format={DATE_FORMAT}
                  views={['year', 'month', 'date']}
                  minDate={new Date()}
                  onChange={(date) => setFieldValue('schedule_date', date)}
                  onBlur={handleBlur}
                  inputVariant="outlined"
                />
                <div className="text-danger">{validateInputField('schedule_date')}</div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </MuiPickersUtilsProvider>
    )
  }

  const renderTimeStart = () => {
    const { time_start } = values
    console.log(time_start)

    return (
      <>
        <CFormLabel className="col-form-label">
          Time start <span className="text-danger">*</span>
        </CFormLabel>
        <CCol className="flex-1">
          <CRow>
            <CCol xs={8}>
              <TimePicker
                ampm={false}
                inputVariant="outlined"
                style={{ width: '100%' }}
                placeholder="HH:MM"
                name="time_start"
                value={time_start || null}
                inputProps={{ style: { padding: '10px 20px', textAlign: 'center' } }}
                onChange={(date) => setFieldValue('time_start', date)}
                onBlur={handleBlur}
              />
              <div className="text-danger">{validateInputField('time_start')}</div>
            </CCol>
          </CRow>
        </CCol>
      </>
    )
  }

  const renderTimeEnd = () => {
    const { time_end } = values

    return (
      <>
        <CFormLabel className="col-form-label">
          Time end <span className="text-danger">*</span>
        </CFormLabel>
        <CCol className="flex-1">
          <CRow>
            <CCol xs={8}>
              <TimePicker
                ampm={false}
                inputVariant="outlined"
                style={{ width: '100%' }}
                placeholder="HH:MM"
                name="time_end"
                value={time_end || null}
                inputProps={{ style: { padding: '10px 20px', textAlign: 'center' } }}
                onChange={(date) => setFieldValue('time_end', date)}
                onBlur={handleBlur}
              />
              <div className="text-danger">{validateInputField('time_end')}</div>
            </CCol>
          </CRow>
        </CCol>
      </>
    )
  }

  const renderScheduleTime = () => {
    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <CRow className="mb-3">
          {renderTimeStart()}
          {renderTimeEnd()}
        </CRow>
      </MuiPickersUtilsProvider>
    )
  }

  const renderSelectScheduleDay = () => {
    const { schedule_day } = values

    return (
      <FormSelect
        require
        isClearable
        value={schedule_day}
        name="schedule_day"
        options={optionsDayOfWeek}
        label="Schedule day"
        placeholder="Select schedule day"
        onChange={(value) => setFieldValue('schedule_day', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, schedule_day: true })
        }}
        error={validateInputField('schedule_day')}
      />
    )
  }

  const renderStatus = () => {
    const { status } = values

    return (
      <FormSelect
        require
        isClearable
        value={status}
        name="status"
        options={optionsStatus}
        label="Status"
        placeholder="Select status"
        onChange={(value) => setFieldValue('status', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, status: true })
        }}
        error={validateInputField('status')}
      />
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
        {renderSelectRoom()}
        {renderSelectCourse()}
        {renderLectureContent()}
        {renderDescription()}
        {renderDateCourse()}
        {renderSelectScheduleDay()}
        {renderScheduleTime()}
        {renderStatus()}
        {/* {renderErrorMessage()} */}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">
        {id ? 'Edit Schedule Registration' : 'Create Schedule Registration'}
      </h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <ButtonSubmit isLoading={isBtnLoading} id={id} />
      </CForm>
    </div>
  )
}

export default React.memo(ScheduleRegistrationForm)
