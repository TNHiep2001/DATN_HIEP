import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CFormInput,
  CHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'

import { optionsStatusSchedule } from 'src/constants'
import { ProgressBar } from 'react-bootstrap'
import { LoadingProvider } from 'src/components'

export default function CalendarAggregation() {
  const [dataDetailSchedule, setDataDetailSchedule] = useState(null)
  const [visibleDetail, setVisibleDetail] = useState(false)

  const codeInputRef = useRef()

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
      schedules: [
        {
          id: 1,
          schedule_date: '10/12/2023',
          time_start: '09:00',
          time_end: '12:00',
          room: { label: '201 - C5', value: '201c5' },
          content_schedule: 'Giới thiệu môn học',
          num_of_lessons: '4',
          name_teacher: 'Đỗ Oanh Cường',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Cơ sở dữ liệu',
      responsible_teacher: 'Nguyễn Ngọc Quỳnh Châu',
      total_num_lessons: '12',
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
          name_teacher: 'Nguyễn Ngọc Quỳnh Châu',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình sự kiện',
      lecture_content: 'Định hướng nghề nghiệp',
      responsible_teacher: 'Trần Mạnh Tuấn',
      total_num_lessons: '',
      total_credit_points: '',
      description: '',
      schedules: [
        {
          id: 1,
          schedule_date: '01/12/2023',
          time_start: '08:00',
          time_end: '11:00',
          room: { label: '201 - C5', value: '201c5' },
          content_schedule: 'Thuyết trình, định hướng nghề nghiệp cho sinh viên',
          num_of_lessons: '',
          name_teacher: 'Trần Mạnh Tuấn',
          status_schedule: { label: 'Hoàn thành', value: 'complete' },
        },
        {
          id: 2,
          schedule_date: '01/12/2023',
          time_start: '13:00',
          time_end: '15:00',
          room: { label: '201 - C5', value: '201c5' },
          content_schedule: 'Tặng quà cho sinh viên',
          num_of_lessons: '',
          name_teacher: 'Trần Mạnh Tuấn',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
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
  const renderTotalCreditPoints = (value, type) => {
    if (type !== 'Lịch trình giảng dạy') return
    return <Typography className="my-2">{`Số tín chỉ: ${value}`}</Typography>
  }

  // số tiết học
  const renderTotalNumLessons = (value, type) => {
    if (type !== 'Lịch trình giảng dạy') return
    return <Typography className="my-2">{`Tổng số tiết học: ${value}`} </Typography>
  }

  // kết quả chi tiết lịch trình
  const renderResultSchedule = (val) => {
    let totalScheduleComplete = 0
    let totalScheduleProcess = 0
    let totalScheduleIncomplete = 0
    val?.forEach((schedule) => {
      if (schedule.status_schedule.value === 'complete') {
        totalScheduleComplete = totalScheduleProcess + 1
        return
      }
      if (schedule.status_schedule.value === 'incomplete') {
        totalScheduleIncomplete = totalScheduleIncomplete + 1
        return
      }
      totalScheduleProcess = totalScheduleProcess + 1
    })

    return (
      <Box>
        <Typography>Kết quả lịch trình: </Typography>
        <Box className="d-flex my-2">
          <Box className="d-flex align-items-center " sx={{ marginRight: '30px' }}>
            <CancelPresentationIcon
              style={{ fontSize: '22px', color: '#DF826C', marginRight: '6px' }}
            />
            <Typography>{totalScheduleIncomplete}</Typography>
          </Box>
          <Box className="d-flex align-items-center " sx={{ marginRight: '30px' }}>
            <RunningWithErrorsIcon
              style={{ fontSize: '22px', color: '#61A3BA', marginRight: '6px' }}
            />
            <Typography>{totalScheduleProcess}</Typography>
          </Box>
          <Box className="d-flex align-items-center ">
            <TaskAltIcon style={{ fontSize: '22px', color: '#79AC78', marginRight: '6px' }} />
            <Typography>{totalScheduleComplete}</Typography>
          </Box>
        </Box>
        <ProgressBar
          style={{ fontWeight: 700 }}
          now={((totalScheduleComplete / val?.length) * 100).toFixed(2) || 0}
          label={`${((totalScheduleComplete / val?.length) * 100).toFixed(2) || 0}%`}
        />
      </Box>
    )
  }

  const renderBoxInfoSchedule = () => {
    return dataSchedule.map((schedule, index) => {
      return (
        <CCol
          key={index}
          md={4}
          style={{
            // backgroundColor: '#7C96AB',
            width: '30%',
            minHeight: '150px',
            margin: '18px 1.65%',
            borderRadius: '10px',
            border: '2px solid #3c4b64',
          }}
        >
          <Box sx={{ padding: '10px' }}>
            {renderTypeSchedule(schedule.type)}
            {renderLectureContent(schedule.lecture_content)}
            {renderResponsibleTeacher(schedule.responsible_teacher)}
            {renderTotalCreditPoints(schedule.total_credit_points, schedule.type)}
            {renderTotalNumLessons(schedule.total_num_lessons, schedule.type)}
            {renderResultSchedule(schedule.schedules)}
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
              border: `2px solid ${colorBoxItem}`,
              borderRadius: '10px',
            }}
          >
            <Typography>{`Ngày diễn ra: ${value.schedule_date}`}</Typography>
            <Typography>{`Giờ diễn ra: ${value.time_start} - ${value.time_end}`}</Typography>
            <Typography>{`Giảng đường: ${value.room?.label}`}</Typography>
            <Typography>{`Nội dung lịch trình: ${value.content_schedule}`}</Typography>
            {dataDetailSchedule.type === 'Lịch trình giảng dạy' && (
              <Typography>{`Số tiết học: ${value.num_of_lessons}`}</Typography>
            )}
            <Typography>{`Giáo viên thực hiện: ${value.name_teacher}`}</Typography>
          </Box>
        )
      })
    }

    const renderBoxInfoDetail = () => {
      const renderIconHeader = (value) => {
        if (value === 'complete') {
          return <TaskAltIcon style={{ fontSize: '26px', color: '#79AC78', marginRight: '10px' }} />
        }

        if (value === 'incomplete') {
          return (
            <CancelPresentationIcon
              style={{ fontSize: '26px', color: '#DF826C', marginRight: '10px' }}
            />
          )
        }

        return (
          <RunningWithErrorsIcon
            style={{ fontSize: '26px', color: '#61A3BA', marginRight: '10px' }}
          />
        )
      }

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
                    {renderIconHeader(item?.value)}
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
            <CModalTitle className="fs-3 fw-medium">Thông tin chi tiết lịch trình</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* thông tin cơ bản */}
            <Box className="box-float" sx={{ padding: '10px 20px' }}>
              {renderTypeSchedule(dataDetailSchedule?.type)}
              {renderLectureContent(dataDetailSchedule?.lecture_content)}
              {renderResponsibleTeacher(dataDetailSchedule?.responsible_teacher)}
              {renderTotalCreditPoints(dataDetailSchedule?.total_credit_points)}
              {renderTotalNumLessons(dataDetailSchedule?.total_num_lessons)}
              {renderResultSchedule(dataDetailSchedule?.schedules)}
            </Box>
            {/* thông tin chi tiết bên trong */}
            {renderBoxInfoDetail()}
          </CModalBody>
        </CModal>
      </>
    )
  }

  // input search
  const renderSearchInput = () => {
    return (
      <CRow className="align-items-center justify-content-between">
        <CCol xs={6}>
          <div className="filter-search p-4">
            <div className="filter-group">
              <div className="filter-label">Giáo viên phụ trách</div>
              <div className="filter-control row">
                <CFormInput
                  ref={codeInputRef}
                  name="responsible_teacher"
                  placeholder="Nhập tên giáo viên phụ trách"
                  aria-label="Giáo viên phụ trách"
                  className="flex-1"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      // handleSearchCoupon()
                    }
                  }}
                />
                <div
                  onClick={() => {
                    alert('search...')
                  }}
                  className="btn btn-primary text-white ms-2 col-2"
                >
                  Tìm kiếm
                </div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    )
  }

  return (
    <div>
      <h3 className="title-content">Tổng hợp tất cả lịch trình</h3>
      <LoadingProvider>
        {renderDetailSchedule()}
        {renderSearchInput()}
        {renderListSchedule()}
      </LoadingProvider>
    </div>
  )
}
