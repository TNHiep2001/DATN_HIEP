import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { optionsStatusSchedule } from 'src/constants'

export default function CalendarAggregation() {
  const [dataDetailSchedule, setDataDetailSchedule] = useState(null)
  const [visibleDetail, setVisibleDetail] = useState(false)

  const handleCloseDetailModal = useCallback(() => {
    setVisibleDetail(false)
  }, [setVisibleDetail])

  const dataSchedule = [
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Công nghệ web',
      responsible_teacher: 'Kiều Tuấn Dũng',
      total_num_lessons: '16',
      total_credit_points: '3',
      description: '',
      schedules: [
        {
          id: 1,
          schedule_date: '30/11/2023',
          time_start: '14:00',
          time_end: '17:00',
          room: { label: '401 - C5', value: '401c5' },
          content_schedule: 'Giới thiệu môn học',
          num_of_lessons: '4',
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Hoàn thành', value: 'complete' },
        },
        {
          id: 2,
          schedule_date: '02/12/2023',
          time_start: '08:00',
          time_end: '10:00',
          room: { label: '302 - C5', value: '302c5' },
          content_schedule: 'Tìm hiểu công cụ hỗ trợ',
          num_of_lessons: '4',
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Đang diễn ra', value: 'process' },
        },
        {
          id: 3,
          schedule_date: '05/12/2023',
          time_start: '13:00',
          time_end: '16:00',
          room: { label: '202 - B5', value: '202b5' },
          content_schedule: 'Giới thiệu ngôn ngữ',
          num_of_lessons: '4',
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
        {
          id: 4,
          schedule_date: '09/12/2023',
          time_start: '15:00',
          time_end: '18:00',
          room: { label: '401 - C5', value: '401c5' },
          content_schedule: 'Tìm hiểu ngôn ngữ',
          num_of_lessons: '4',
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Lập trình hướng đối tượng',
      responsible_teacher: 'Trương Xuân Nam',
      total_num_lessons: '15',
      total_credit_points: '3',
      description: '',
      schedules: [
        {
          id: 1,
          schedule_date: '10/12/2023',
          time_start: '09:00',
          time_end: '12:00',
          room: { label: '201 - C5', value: '201c5' },
          content_schedule: 'Giới thiệu môn học',
          num_of_lessons: '4',
          name_teacher: 'Trương Xuân Nam',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Điện toán đám mây',
      responsible_teacher: 'Đỗ Oanh Cường',
      total_num_lessons: '12',
      total_credit_points: '3',
      description: '',
      schedules: [],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Cơ sở dữ liệu',
      responsible_teacher: 'Nguyễn Ngọc Quỳnh Châu',
      total_num_lessons: '12',
      total_credit_points: '3',
      description: '',
      schedules: [],
    },
  ]

  // kiểu lịch trình
  const renderTypeSchedule = (value) => {
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilCalendarCheck} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{value}</Typography>
      </Box>
    )
  }

  // tên lịch trình
  const renderLectureContent = (value) => {
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilBook} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{value}</Typography>
      </Box>
    )
  }

  // tên giảng viên
  const renderResponsibleTeacher = (value) => {
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilUser} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{value}</Typography>
      </Box>
    )
  }

  // số tín chỉ
  const renderTotalCreditPoints = (value) => {
    return <Typography>{`Số tín chỉ: ${value}`}</Typography>
  }

  // số tiết học
  const renderTotalNumLessons = (value) => {
    return <Typography>{`Tổng số tiết học: ${value}`} </Typography>
  }

  const renderBoxInfoSchedule = () => {
    return dataSchedule.map((schedule, index) => {
      return (
        <CCol
          key={index}
          md={4}
          style={{
            backgroundColor: '#7C96AB',
            width: '30%',
            minHeight: '150px',
            margin: '18px 1.65%',
            borderRadius: '10px',
            border: '3px solid #3c4b64',
          }}
        >
          <Box sx={{ padding: '10px', color: '#fff' }}>
            {renderTypeSchedule(schedule.type)}
            {renderLectureContent(schedule.lecture_content)}
            {renderResponsibleTeacher(schedule.responsible_teacher)}
            {renderTotalCreditPoints(schedule.total_credit_points)}
            {renderTotalNumLessons(schedule.total_num_lessons)}
            <CButton
              style={{
                backgroundColor: '#3c4b64',
                border: 'none',
                float: 'right',
                margin: '10px 0',
                minWidth: '116px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setDataDetailSchedule(schedule)
                setVisibleDetail(true)
              }}
            >
              Chi tiết
            </CButton>
          </Box>
        </CCol>
      )
    })
  }

  const renderListSchedule = () => {
    return <CRow className="d-flex">{renderBoxInfoSchedule()}</CRow>
  }

  // chi tiết lịch trình
  const renderDetailSchedule = () => {
    const schedulesIncomplete = dataDetailSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule.value === 'incomplete',
    )
    const schedulesProcess = dataDetailSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule.value === 'process',
    )
    const schedulesComplete = dataDetailSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule.value === 'complete',
    )

    const renderBodyDetail = (value) => {
      let dataBodyDetail = []
      const colorBoxItem =
        value === 'incomplete' ? '#DF826C' : value === 'process' ? '#61A3BA' : '#79AC78'
      if (value === 'incomplete') {
        dataBodyDetail = schedulesIncomplete
      }
      if (value === 'process') {
        dataBodyDetail = schedulesProcess
      }
      if (value === 'complete') {
        dataBodyDetail = schedulesComplete
      }

      if (!dataBodyDetail) return null
      return dataBodyDetail?.map((value, index) => {
        return (
          <Box
            key={index}
            className="box-float"
            style={{
              padding: '10px 18px',
              backgroundColor: colorBoxItem,
              color: '#f1f1f1',
              borderRadius: '10px',
            }}
          >
            <Typography>{`Ngày diễn ra: ${value.schedule_date}`}</Typography>
            <Typography>{`Giờ diễn ra: ${value.time_start} - ${value.time_end}`}</Typography>
            <Typography>{`Lớp học: ${value.room?.label}`}</Typography>
            <Typography>{`Nội dung bài giảng: ${value.content_schedule}`}</Typography>
            <Typography>{`Số tiết học: ${value.num_of_lessons}`}</Typography>
            <Typography>{`Giáo viên giảng dạy: ${value.name_teacher}`}</Typography>
          </Box>
        )
      })
    }

    const renderBoxInfoDetail = () => {
      return (
        <Box
          className="box-float"
          sx={{
            width: '100%',
            minHeight: '200px',
            marginTop: '20px',
            padding: '10px 12px',
            borderRadius: '10px',
          }}
        >
          <CRow>
            {optionsStatusSchedule.map((item, index) => {
              return (
                <CCol
                  key={index}
                  className="box-float"
                  style={{
                    width: '30%',
                    minHeight: '200px',
                    margin: '0 12px',
                    borderRadius: '8px',
                  }}
                >
                  <CHeader
                    style={{
                      justifyContent: 'center',
                      minHeight: 0,
                      padding: '0 0 4px 0',
                      marginBottom: '10px',
                      fontWeight: 600,
                      color:
                        item.value === 'incomplete'
                          ? '#DF826C'
                          : item.value === 'process'
                          ? '#61A3BA'
                          : '#79AC78',
                    }}
                  >
                    {item?.label}
                  </CHeader>
                  {renderBodyDetail(item.value)}
                </CCol>
              )
            })}
          </CRow>
        </Box>
      )
    }

    return (
      <>
        <CModal size="xl" visible={visibleDetail} onClose={handleCloseDetailModal}>
          <CModalHeader>
            <CModalTitle className="fs-3 fw-normal">Thông tin chi tiết lịch trình</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* thông tin cơ bản */}
            <Box className="box-float" sx={{ padding: '10px 20px' }}>
              {renderTypeSchedule(dataDetailSchedule?.type)}
              {renderLectureContent(dataDetailSchedule?.lecture_content)}
              {renderResponsibleTeacher(dataDetailSchedule?.responsible_teacher)}
              {renderTotalCreditPoints(dataDetailSchedule?.total_credit_points)}
              {renderTotalNumLessons(dataDetailSchedule?.total_num_lessons)}
            </Box>
            {/* thông tin chi tiết bên trong */}
            {renderBoxInfoDetail()}
          </CModalBody>
        </CModal>
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">Tổng hợp tất cả lịch trình</h3>
      {renderDetailSchedule()}
      {renderListSchedule()}
    </div>
  )
}
