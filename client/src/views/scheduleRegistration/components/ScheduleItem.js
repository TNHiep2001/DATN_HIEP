/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

import { ButtonDelete } from 'src/components'
import { FormInput, FormSelect } from 'src/components/FormControl'
import { DATE_FORMAT, optionsRoom, optionsStatusSchedule } from 'src/constants'
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

// Component hiển thị từng item schedule
const ScheduleItem = ({ scheduleItem, index, formik, setScheduleDestroys, dataListClassroom }) => {
  const { values, errors, handleBlur, handleChange, setFieldValue, touched, setTouched } = formik

  const { schedules, type } = values

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
    const schedulesUpdated = schedules.filter((item) => item.id !== scheduleItem.id)
    setFieldValue('schedules', schedulesUpdated)

    // push vào mảng destroy phục vụ cho việc xoá item schedule
    setScheduleDestroys((prevData) => {
      if (scheduleItem.idEdit) {
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
    if (type.value !== 'eduType') return

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
        defaultValue={{ label: 'Chưa hoàn thành', value: 'incomplete' }}
        options={optionsStatusSchedule}
        label="Trạng thái"
        placeholder="Lựa chọn trạng thái"
        name={`schedules[${index}].status_schedule`}
        value={scheduleItem.status_schedule}
        onChange={(newRoom) => handleChangeInput(FIELD_STATUS_SCHEDULE, newRoom)}
        error={validateScheduleField(FIELD_STATUS_SCHEDULE)}
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
      {/* {renderLanguages()} */}
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
