/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { useParams } from 'react-router'

import { ButtonDelete } from 'src/components'
import { FormInput, FormSelect } from 'src/components/FormControl'
import { DATE_FORMAT, optionsStatusSchedule } from 'src/constants'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'
import { CCol, CFormLabel, CRow } from '@coreui/react'

const FIELD_STATUS_SCHEDULE = 'status_schedule'
const FIELD_NAME_TEACHER = 'name_teacher'
const FIELD_NUM_OF_LESSONS = 'num_of_lessons'
const FIELD_CONTENT_SCHEDULE = 'content_schedule'
const FIELD_ROOM = 'room'
const FIELD_TIME_END = 'time_end'
const FIELD_TIME_START = 'time_start'
const FIELD_SCHEDULE_DATE = 'schedule_date'
const FIELD_ROOM_OTHER = 'room_other'
const FIELD_TIME_END_OTHER = 'time_end_other'
const FIELD_TIME_START_OTHER = 'time_start_other'
const FIELD_SCHEDULE_DATE_OTHER = 'schedule_date_other'

// Component hiển thị từng item schedule
const ScheduleItem = ({ scheduleItem, index, formik, setScheduleDestroys, dataListClassroom }) => {
  const { values, errors, handleBlur, setFieldValue, touched } = formik

  const { schedules, type_schedule } = values

  const { id } = useParams()

  // validate trường bên trong schedules
  const validateScheduleField = (name) => {
    if (
      touched['schedules']?.[index]?.[name] &&
      errors?.['schedules'] &&
      errors['schedules']?.[index]?.[name]
    ) {
      return errors['schedules'][index][name]
    }
    return ''
  }

  // Hàm xử lý change input dùng chung cho tất cả input
  const handleChangeInput = (fieldName, newValue) => {
    const schedulesUpdated = [...schedules]

    schedulesUpdated[index][fieldName] = newValue

    setFieldValue('schedules', schedulesUpdated)
  }

  // Hàm xử lý xoá một lịch trình
  const handleDeleteSchedule = () => {
    const schedulesUpdated = schedules.filter((item) => item._id !== scheduleItem._id)
    setFieldValue('schedules', schedulesUpdated)

    // push vào mảng destroy phục vụ cho việc xoá item schedule
    setScheduleDestroys((prevData) => {
      if (scheduleItem._id) {
        return prevData.concat(scheduleItem)
      }

      return prevData
    })
  }

  // Hiển thị nút xoá một schedule. Phải confirm trước khi xoá
  const renderDeleteSchedule = () => {
    return (
      <div className="mb-3 d-flex justify-content-end">
        <ButtonDelete type="button" isAuthorized onDelete={handleDeleteSchedule}>
          <Box padding="4px" color="#fff">
            Delete
          </Box>
        </ButtonDelete>
      </div>
    )
  }

  const renderDateCourse = () => {
    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <CRow className="mb-3">
          <CFormLabel className="col-form-label">
            Ngày tháng <span className="text-danger">*</span>
          </CFormLabel>
          <CCol className="flex-1">
            <CRow>
              <CCol xs={5}>
                <DatePicker
                  required
                  placeholder={DATE_FORMAT}
                  style={{ width: '100%' }}
                  inputProps={{ style: { padding: '10px 20px' } }}
                  format={DATE_FORMAT}
                  views={['year', 'month', 'date']}
                  minDate={new Date()}
                  onBlur={handleBlur}
                  inputVariant="outlined"
                  name={`schedules[${index}].schedule_date`}
                  value={scheduleItem.schedule_date || null}
                  onChange={(newScheduleDate) =>
                    handleChangeInput(FIELD_SCHEDULE_DATE, newScheduleDate)
                  }
                />
                <div className="text-danger">{validateScheduleField(FIELD_SCHEDULE_DATE)}</div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </MuiPickersUtilsProvider>
    )
  }

  const renderTimeStart = () => {
    return (
      <>
        <CFormLabel className="col-form-label">
          Thời gian bắt đầu <span className="text-danger">*</span>
        </CFormLabel>
        <CCol className="flex-1">
          <CRow>
            <CCol xs={8}>
              <TimePicker
                ampm={false}
                value={scheduleItem.time_start || null}
                inputVariant="outlined"
                style={{ width: '100%' }}
                placeholder="HH:MM"
                inputProps={{ style: { padding: '10px 20px', textAlign: 'center' } }}
                onChange={(newTimeStart) => handleChangeInput(FIELD_TIME_START, newTimeStart)}
                onBlur={handleBlur}
                name={`schedules[${index}].time_start`}
              />
              <div className="text-danger">{validateScheduleField(FIELD_TIME_START)}</div>
            </CCol>
          </CRow>
        </CCol>
      </>
    )
  }

  const renderTimeEnd = () => {
    return (
      <>
        <CFormLabel className="col-form-label">
          Thời gian kết thúc <span className="text-danger">*</span>
        </CFormLabel>
        <CCol className="flex-1">
          <CRow>
            <CCol xs={8}>
              <TimePicker
                ampm={false}
                inputVariant="outlined"
                style={{ width: '100%' }}
                placeholder="HH:MM"
                inputProps={{ style: { padding: '10px 20px', textAlign: 'center' } }}
                onBlur={handleBlur}
                name={`schedules[${index}].time_end`}
                value={scheduleItem.time_end || null}
                onChange={(newTimeEnd) => handleChangeInput(FIELD_TIME_END, newTimeEnd)}
              />
              <div className="text-danger">{validateScheduleField(FIELD_TIME_END)}</div>
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

  const renderSelectRoom = () => {
    return (
      <FormSelect
        require
        isClearable
        options={dataListClassroom}
        label="Giảng đường"
        placeholder="Lựa chọn giảng đường"
        name={`schedules[${index}].room`}
        value={scheduleItem.room}
        onChange={(newRoom) => handleChangeInput(FIELD_ROOM, newRoom)}
        error={validateScheduleField(FIELD_ROOM)}
      />
    )
  }

  const renderSelectContentSchedule = () => {
    return (
      <FormInput
        isRequired
        label="Nội dung lịch trình"
        placeholder="Nhập nội dung lịch trình"
        onBlur={(e) => handleBlur(e)}
        name={`schedules[${index}].content_schedule`}
        value={scheduleItem.content_schedule}
        onChange={(e) => handleChangeInput(FIELD_CONTENT_SCHEDULE, e.target.value)}
        errorMessage={validateScheduleField(FIELD_CONTENT_SCHEDULE)}
      />
    )
  }

  const renderNumberOfLessons = () => {
    if (type_schedule.value !== 'eduType') return

    return (
      <FormInput
        isRequired
        type="number"
        label="Số tiết học"
        placeholder="Nhập số tiết học"
        onBlur={handleBlur}
        name={`schedules[${index}].num_of_lessons`}
        value={scheduleItem.num_of_lessons}
        onChange={(e) => handleChangeInput(FIELD_NUM_OF_LESSONS, e.target.value)}
        errorMessage={validateScheduleField(FIELD_NUM_OF_LESSONS)}
      />
    )
  }

  const renderNameTeacher = () => {
    return (
      <FormInput
        isRequired
        label="Giảng viên thực hiện"
        placeholder="Nhập tên giảng viên thực hiện"
        onBlur={handleBlur}
        name={`schedules[${index}].name_teacher`}
        value={scheduleItem.name_teacher}
        onChange={(e) => handleChangeInput(FIELD_NAME_TEACHER, e.target.value)}
        errorMessage={validateScheduleField(FIELD_NAME_TEACHER)}
      />
    )
  }

  const renderStatusSchedule = () => {
    return (
      <FormSelect
        require
        isClearable
        defaultValue={{ label: 'Chưa diễn ra', value: 'incomplete' }}
        options={id ? optionsStatusSchedule : optionsStatusSchedule.slice(0, 1)}
        label="Trạng thái"
        placeholder="Lựa chọn trạng thái"
        name={`schedules[${index}].status_schedule`}
        value={scheduleItem.status_schedule}
        onChange={(newStatus) => {
          handleChangeInput(FIELD_STATUS_SCHEDULE, newStatus)
          handleChangeInput(FIELD_ROOM_OTHER, null)
          handleChangeInput(FIELD_SCHEDULE_DATE_OTHER, '')
          handleChangeInput(FIELD_TIME_START_OTHER, '')
          handleChangeInput(FIELD_TIME_END_OTHER, '')
        }}
        error={validateScheduleField(FIELD_STATUS_SCHEDULE)}
      />
    )
  }

  const renderDateCourseOther = () => {
    if (scheduleItem.status_schedule.value === 'cancel')
      return (
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <CRow className="mb-3">
            <CFormLabel className="col-form-label">Ngày tháng (bù hoãn)</CFormLabel>
            <CCol className="flex-1">
              <CRow>
                <CCol xs={5}>
                  <DatePicker
                    placeholder={DATE_FORMAT}
                    style={{ width: '100%' }}
                    inputProps={{ style: { padding: '10px 20px' } }}
                    format={DATE_FORMAT}
                    views={['year', 'month', 'date']}
                    minDate={new Date()}
                    onBlur={handleBlur}
                    inputVariant="outlined"
                    name={`schedules[${index}].schedule_date_other`}
                    value={scheduleItem.schedule_date_other || null}
                    onChange={(newScheduleDateOther) =>
                      handleChangeInput(FIELD_SCHEDULE_DATE_OTHER, newScheduleDateOther)
                    }
                  />
                  <div className="text-danger">
                    {validateScheduleField(FIELD_SCHEDULE_DATE_OTHER)}
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </MuiPickersUtilsProvider>
      )
  }

  const renderTimeStartOther = () => {
    if (scheduleItem.status_schedule.value === 'cancel')
      return (
        <>
          <CFormLabel className="col-form-label">Thời gian bắt đầu (bù hoãn)</CFormLabel>
          <CCol className="flex-1">
            <CRow>
              <CCol xs={8}>
                <TimePicker
                  ampm={false}
                  value={scheduleItem.time_start_other || null}
                  inputVariant="outlined"
                  style={{ width: '100%' }}
                  placeholder="HH:MM"
                  inputProps={{ style: { padding: '10px 20px', textAlign: 'center' } }}
                  onChange={(newTimeStartOther) =>
                    handleChangeInput(FIELD_TIME_START_OTHER, newTimeStartOther)
                  }
                  onBlur={handleBlur}
                  name={`schedules[${index}].time_start_other`}
                />
                <div className="text-danger">{validateScheduleField(FIELD_TIME_START_OTHER)}</div>
              </CCol>
            </CRow>
          </CCol>
        </>
      )
  }

  const renderTimeEndOrther = () => {
    if (scheduleItem.status_schedule.value === 'cancel')
      return (
        <>
          <CFormLabel className="col-form-label">Thời gian kết thúc (bù hoãn)</CFormLabel>
          <CCol className="flex-1">
            <CRow>
              <CCol xs={8}>
                <TimePicker
                  ampm={false}
                  inputVariant="outlined"
                  style={{ width: '100%' }}
                  placeholder="HH:MM"
                  inputProps={{ style: { padding: '10px 20px', textAlign: 'center' } }}
                  onBlur={handleBlur}
                  name={`schedules[${index}].time_end_other`}
                  value={scheduleItem.time_end_other || null}
                  onChange={(newTimeEndOther) =>
                    handleChangeInput(FIELD_TIME_END_OTHER, newTimeEndOther)
                  }
                />
                <div className="text-danger">{validateScheduleField(FIELD_TIME_END_OTHER)}</div>
              </CCol>
            </CRow>
          </CCol>
        </>
      )
  }

  const renderScheduleTimeOther = () => {
    if (scheduleItem.status_schedule.value === 'cancel')
      return (
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <CRow className="mb-3">
            {renderTimeStartOther()}
            {renderTimeEndOrther()}
          </CRow>
        </MuiPickersUtilsProvider>
      )
  }

  const renderSelectRoomOther = () => {
    if (scheduleItem.status_schedule.value === 'cancel')
      return (
        <FormSelect
          isClearable
          options={dataListClassroom}
          label="Giảng đường (bù hoãn)"
          placeholder="Lựa chọn giảng đường"
          name={`schedules[${index}].room_other`}
          value={scheduleItem.room_other}
          onChange={(newRoomOther) => handleChangeInput(FIELD_ROOM_OTHER, newRoomOther)}
          error={validateScheduleField(FIELD_ROOM_OTHER)}
        />
      )
  }

  return (
    <Box borderTop="1px solid #ccc" mt={0} pt={3}>
      {renderDeleteSchedule()}
      {renderDateCourse()}
      {renderScheduleTime()}
      {renderSelectRoom()}
      {renderSelectContentSchedule()}
      {renderNumberOfLessons()}
      {renderNameTeacher()}
      {renderStatusSchedule()}
      {renderDateCourseOther()}
      {renderScheduleTimeOther()}
      {renderSelectRoomOther()}
    </Box>
  )
}

ScheduleItem.propTypes = {
  index: PropTypes.number,
  formik: PropTypes.object,
  scheduleItem: PropTypes.object,
  setScheduleDestroys: PropTypes.func,
  dataListClassroom: PropTypes.array,
}

export default React.memo(ScheduleItem)
