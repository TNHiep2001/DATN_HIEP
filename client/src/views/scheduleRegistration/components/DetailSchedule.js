/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableHead,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import { Box, Typography } from '@mui/material'

const DetailSchedule = ({ visible, setVisible, idDetail }) => {
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

  const renderInfoSchedule = () => {
    const renderType = () => {
      return (
        <Box className="d-flex align-item-end my-2">
          <CIcon icon={cilCalendarCheck} width={24} height={24} />
          <Typography style={{ margin: '2px 14px' }}>{dataSchedule.type}</Typography>
        </Box>
      )
    }

    const renderLectureContent = () => {
      return (
        <Box className="d-flex align-item-end my-2">
          <CIcon icon={cilBook} width={24} height={24} />
          <Typography style={{ margin: '2px 14px' }}>{dataSchedule.lecture_content}</Typography>
        </Box>
      )
    }

    const renderResponsibleTeacher = () => {
      return (
        <Box className="d-flex align-item-end my-2">
          <CIcon icon={cilUser} width={24} height={24} />
          <Typography style={{ margin: '2px 14px' }}>{dataSchedule.responsible_teacher}</Typography>
        </Box>
      )
    }

    const renderTotalCreditPoints = () => {
      if (dataSchedule.type !== 'Lịch trình giảng dạy') return
      return (
        <Typography className="my-2">{`Số tín chỉ: ${dataSchedule.total_credit_points}`}</Typography>
      )
    }

    const renderTotalNumLessons = () => {
      if (dataSchedule.type !== 'Lịch trình giảng dạy') return
      return (
        <Typography className="my-2">
          {`Tổng số tiết học: ${dataSchedule.total_num_lessons}`}{' '}
        </Typography>
      )
    }

    return (
      <Box>
        {renderType()}
        {renderLectureContent()}
        {renderResponsibleTeacher()}
        {renderTotalCreditPoints()}
        {renderTotalNumLessons()}
      </Box>
    )
  }

  const renderTableSchedule = () => {
    return (
      <>
        <CTable>
          <CTableHead></CTableHead>
          <CTableBody></CTableBody>
        </CTable>
      </>
    )
  }

  const renderBodyModal = () => {
    return (
      <CModalBody>
        {renderInfoSchedule()}
        {renderTableSchedule()}
      </CModalBody>
    )
  }

  return (
    <CModal size="xl" visible={visible} onClose={handleCloseDetailModal}>
      <CModalHeader>
        <CModalTitle className="fs-3 fw-normal">chi tiết lịch trình</CModalTitle>
      </CModalHeader>
      {renderBodyModal()}
    </CModal>
  )
}

DetailSchedule.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  idDetail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default DetailSchedule
