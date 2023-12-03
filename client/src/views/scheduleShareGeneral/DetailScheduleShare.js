/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormTextarea,
  CHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { ProgressBar } from 'react-bootstrap'
import { optionsStatusSchedule } from 'src/constants'

const DetailScheduleShare = ({ visible, setVisible, idDetail }) => {
  const handleCloseDetailModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const dataSchedule = {
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
  }

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

  // chi tiết lịch trình
  const renderDetailSchedule = () => {
    const schedulesIncomplete = dataSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule.value === 'incomplete',
    )
    const schedulesProcess = dataSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule.value === 'process',
    )
    const schedulesComplete = dataSchedule?.schedules.filter(
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
            {dataSchedule.type === 'Lịch trình giảng dạy' && (
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
        <CModal size="xl" visible={visible} onClose={handleCloseDetailModal}>
          <CModalHeader>
            <CModalTitle className="fs-3 fw-medium">Thông tin chi tiết lịch trình</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* thông tin cơ bản */}
            <Box className="box-float" sx={{ padding: '10px 20px' }}>
              {renderTypeSchedule(dataSchedule?.type)}
              {renderLectureContent(dataSchedule?.lecture_content)}
              {renderResponsibleTeacher(dataSchedule?.responsible_teacher)}
              {renderTotalCreditPoints(dataSchedule?.total_credit_points)}
              {renderTotalNumLessons(dataSchedule?.total_num_lessons)}
              {renderResultSchedule(dataSchedule?.schedules)}
            </Box>
            {/* thông tin chi tiết bên trong */}
            {renderBoxInfoDetail()}
          </CModalBody>
        </CModal>
      </>
    )
  }

  return <>{renderDetailSchedule()}</>
}

DetailScheduleShare.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  idDetail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default DetailScheduleShare
