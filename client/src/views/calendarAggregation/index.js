import {
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useCallback, useState } from 'react'
import Scheduler from 'react-mui-scheduler'
import { FormInput } from 'src/components'

export default function CalendarAggregation() {
  const [state] = useState({
    options: {
      transitionMode: 'zoom', // or fade
      startWeekOn: 'mon', // or sun
      defaultMode: 'month', // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      height: 690,
      minHeight: 690,
      maxHeight: 690,
    },
    alertProps: {
      open: false,
      color: 'info', // info | success | warning | error
      severity: 'info', // info | success | warning | error
      message: 'Something went wrong',
      showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
    },
  })

  const [isVisible, setIsVisible] = useState(false)
  const [dataInfo, setDataInfo] = useState({})

  const handleCloseDetailModal = useCallback(() => {
    setIsVisible(false)
  }, [setIsVisible])

  const events = [
    {
      id: '1',
      label: 'Bài giảng đầu tiên của tôi hãy tập trung học nhé bạn ơi hahah',
      groupLabel: 'Kiều Tuấn Dũng',
      user: 'Kiều Tuấn Dũng',
      color: '#f28f6a',
      startHour: '04:00 AM',
      endHour: '05:00 AM',
      date: '2023-11-19',
      createdAt: new Date(),
      createdBy: 'Kiều Tuấn Dũng',
    },
    {
      id: '2',
      label: 'Ở đây chúng ta sẽ tìm hiểu về học máy',
      groupLabel: 'Trần Mạnh Tuấn',
      user: 'Trần Mạnh Tuấn',
      color: '#099ce5',
      startHour: '09:00 AM',
      endHour: '10:00 AM',
      date: '2023-11-16',
      createdAt: new Date(),
      createdBy: 'Trần Mạnh Tuấn',
    },
    {
      id: '3',
      label: 'Buổi họp lớp đầu tiên trong năm',
      groupLabel: 'Lương Thị Hồng Lan',
      user: 'Lương Thị Hồng Lan',
      color: '#263686',
      startHour: '15:00 PM',
      endHour: '16:00 PM',
      date: '2023-11-17',
      createdAt: new Date(),
      createdBy: 'Lương Thị Hồng Lan',
    },
    {
      id: '4',
      label: 'Chúng ta sẽ học web tại đây',
      groupLabel: 'Kiều Tuấn Dũng',
      user: 'Kiều Tuấn Dũng',
      color: '#f28f6a',
      startHour: '08:00 AM',
      endHour: '09:00 AM',
      date: '2023-11-11',
      createdAt: new Date(),
      createdBy: 'Kiều Tuấn Dũng',
    },
    {
      id: '5',
      label: 'Hãy làm đồ án thật tốt sau khoá học này nhé các em',
      groupLabel: 'Kiều Tuấn Dũng',
      user: 'Kiều Tuấn Dũng',
      color: '#f28f6a',
      startHour: '12:00 PM',
      endHour: '14:00 PM',
      date: '2023-11-11',
      createdAt: new Date(),
      createdBy: 'Kiều Tuấn Dũng',
    },
    {
      id: '6',
      label: 'Chúc các em có một đồ án tốt sau khoá học',
      groupLabel: 'Lương Thị Hồng Lan',
      user: 'Lương Thị Hồng Lan',
      color: '#263686',
      startHour: '15:00 PM',
      endHour: '16:00 PM',
      date: '2023-11-10',
      createdAt: new Date(),
      createdBy: 'Lương Thị Hồng Lan',
    },
    {
      id: '7',
      label: 'Nếu thích học máy các em có thể tham gia buổi học này',
      groupLabel: 'Trần Mạnh Tuấn',
      user: 'Trần Mạnh Tuấn',
      color: '#099ce5',
      startHour: '15:00 PM',
      endHour: '16:00 PM',
      date: '2023-11-15',
      createdAt: new Date(),
      createdBy: 'Trần Mạnh Tuấn',
    },
  ]

  const handleCellClick = (event, row, day) => {
    // Do something...
    console.log(1)
  }

  const handleEventClick = (event, item) => {
    console.log(item)
    setDataInfo(item)
    setIsVisible(true)
  }

  const handleEventsChange = (item) => {
    // Do something...
    console.log(3)
  }

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
    console.log(4)
  }

  const renderPopupDetailSchedule = () => {
    const { user, label, startHour, endHour, date } = dataInfo
    return (
      <CModal size="m" visible={isVisible} onClose={handleCloseDetailModal} backdrop={false}>
        <CModalHeader>
          <CModalTitle className="fs-5 fw-normal">Info Schedule</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormInput label="Full name" value={user} disabled />
          <FormInput label="Shedule content" value={label} isTextArea disabled />
          <FormInput label="Schedule date" value={date} disabled />
          <CRow className="d-flex">
            <CCol md={3}>Schedule time</CCol>
            <CCol md={9} className="d-flex flex-start">
              <CFormInput value={startHour} disabled />
              <span style={{ display: 'flex', alignItems: 'center', margin: '0 32px' }}>~</span>
              <CFormInput value={endHour} disabled />
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    )
  }

  const renderFormSchedule = () => {
    return (
      <Scheduler
        locale="en"
        events={events}
        legacyStyle={true}
        options={state?.options}
        alertProps={state?.alertProps}
        toolbarProps={state?.toolbarProps}
        onEventsChange={handleEventsChange}
        onCellClick={handleCellClick}
        onTaskClick={handleEventClick}
        onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
      />
    )
  }

  return (
    <div>
      <h3 className="title-content">Calendar Aggregation</h3>
      {renderPopupDetailSchedule()}
      {renderFormSchedule()}
    </div>
  )
}
