import { CCol, CRow } from '@coreui/react'
import { Box } from '@mui/system'
import React, { useMemo, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import moment from 'moment'

function Statistic(props) {
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
          schedule_date: '29/11/2023',
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
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Lập trình hướng đối tượng',
      responsible_teacher: 'Kiều Tuấn Dũng',
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
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Điện toán đám mây',
      responsible_teacher: 'Kiều Tuấn Dũng',
      total_num_lessons: '12',
      total_credit_points: '3',
      description: '',
      schedules: [
        {
          id: 1,
          schedule_date: '09/12/2023',
          time_start: '14:00',
          time_end: '16:00',
          room: { label: '202 - C5', value: '202c5' },
          content_schedule: 'Giới thiệu môn học',
          num_of_lessons: '4',
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Chưa hoàn thành', value: 'incomplete' },
        },
      ],
    },
    {
      type: 'Lịch trình giảng dạy',
      lecture_content: 'Kiều Tuấn Dũng',
      responsible_teacher: 'Nguyễn Ngọc Quỳnh Châu',
      total_num_lessons: '12',
      total_credit_points: '3',
      description: '',
      schedules: [
        {
          id: 1,
          schedule_date: '29/11/2023',
          time_start: '16:00',
          time_end: '18:00',
          room: { label: '302 - C5', value: '302c5' },
          content_schedule: 'Giới thiệu môn học',
          num_of_lessons: '4',
          name_teacher: 'Kiều Tuấn Dũng',
          status_schedule: { label: 'Hoàn thành', value: 'complete' },
        },
      ],
    },
  ]

  const renderNumberStatistic = () => {
    let totalComplete = 0
    let totalProcess = 0
    let totalIncomplete = 0

    // tính toán tổng các loại của trạng thái
    dataSchedule.forEach((val) => {
      const firstItem = val.schedules.slice(0, 1).shift()
      const endItem = val.schedules.slice(-1).pop()
      // tính tổng lịch trình chưa diễn ra
      if (
        moment().isBefore(
          moment(`${firstItem.time_start} ${firstItem.schedule_date}`, 'DD/MM/YYYY HH:mm'),
        )
      ) {
        totalIncomplete = totalIncomplete + 1
        return
      }

      //tính tổng lịch trình đã hoàn thành
      if (
        moment().isAfter(
          moment(`${endItem.time_start} ${endItem.schedule_date}`, 'DD/MM/YYYY HH:mm'),
        )
      ) {
        totalComplete = totalComplete + 1
        return
      }

      // không phải 2 trường hợp trên thì sẽ là đang sử lý
      totalProcess = totalProcess + 1
    })

    const renderStatusComplete = () => {
      return (
        <CCol md={4} className="text-center">
          <TaskAltIcon style={{ fontSize: '40px', color: '#5D9C59' }} />
          <Box sx={{ fontSize: '17px', marginTop: '8px', color: '#5D9C59', fontWeight: 500 }}>
            <Box>{`Hoàn Thành: ${totalComplete}`}</Box>
            <Box>{`${(totalComplete / dataSchedule.length) * 100}%`}</Box>
          </Box>
        </CCol>
      )
    }

    const renderStatusProcess = () => {
      return (
        <CCol md={4} className="text-center">
          <RunningWithErrorsIcon style={{ fontSize: '40px', color: '#3876BF' }} />
          <Box sx={{ fontSize: '17px', marginTop: '8px', color: '#3876BF', fontWeight: 500 }}>
            <Box>{`Đang xử lý: ${totalProcess}`}</Box>
            <Box>{`${(totalProcess / dataSchedule.length) * 100}%`}</Box>
          </Box>
        </CCol>
      )
    }

    const renderStatusIncomplete = () => {
      return (
        <CCol md={4} className="text-center">
          <CancelPresentationIcon style={{ fontSize: '40px', color: '#D83F31' }} />
          <Box sx={{ fontSize: '17px', marginTop: '8px', color: '#D83F31', fontWeight: 500 }}>
            <Box>{`Chưa diễn ra: ${totalIncomplete}`}</Box>
            <Box>{`${(totalIncomplete / dataSchedule.length) * 100}%`}</Box>
          </Box>
        </CCol>
      )
    }

    return (
      <CRow className="d-flex justify-content-center my-3">
        {renderStatusComplete()}
        {renderStatusProcess()}
        {renderStatusIncomplete()}
      </CRow>
    )
  }

  const renderDetailBodyStatistic = () => {
    return (
      <Box className="box-float" style={{ margin: '20px 12px' }}>
        <CRow className="d-flex justify-content-center">
          <CCol className="box-float">hehe</CCol>
          <CCol className="box-float">haha</CCol>
          <CCol className="box-float">hoho</CCol>
        </CRow>
      </Box>
    )
  }

  const renderBodyStatistic = () => {
    return (
      <div>
        {renderNumberStatistic()}
        {renderDetailBodyStatistic()}
      </div>
    )
  }
  return (
    <div>
      <h3 className="title-content">Thống kê lịch trình</h3>
      {renderBodyStatistic()}
    </div>
  )
}

Statistic.propTypes = {}

export default React.memo(Statistic)
