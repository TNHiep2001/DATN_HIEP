import { CCol, CHeader, CRow } from '@coreui/react'
import { Box } from '@mui/system'
import React, { useMemo, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import moment from 'moment'
import { optionsStatusSchedule } from 'src/constants'
import { Typography } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import { ProgressBar } from 'react-bootstrap'

function Statistic(props) {
  const dataIncomplete = []
  const dataProcess = []
  const dataComplete = []

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
        {
          id: 3,
          schedule_date: '06/12/2023',
          time_start: '08:00',
          time_end: '10:00',
          room: { label: '302 - C5', value: '302c5' },
          content_schedule: 'Tìm hiểu các ngôn ngữ hỗ trợ',
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
      lecture_content: 'Cơ sở dữ liệu',
      responsible_teacher: 'Kiều Tuấn Dũng',
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
        dataIncomplete.push(val)
        return
      }

      //tính tổng lịch trình đã hoàn thành
      if (
        moment().isAfter(
          moment(`${endItem.time_start} ${endItem.schedule_date}`, 'DD/MM/YYYY HH:mm'),
        )
      ) {
        totalComplete = totalComplete + 1
        dataComplete.push(val)
        return
      }

      // không phải 2 trường hợp trên thì sẽ là đang sử lý
      totalProcess = totalProcess + 1
      dataProcess.push(val)
    })

    const renderStatusComplete = () => {
      return (
        <CCol md={4} className="text-center">
          <TaskAltIcon style={{ fontSize: '40px', color: '#79AC78' }} />
          <Box sx={{ fontSize: '17px', marginTop: '8px', color: '#79AC78', fontWeight: 500 }}>
            <Box>{`Hoàn Thành: ${totalComplete}`}</Box>
            <Box>{`${((totalComplete / dataSchedule.length) * 100).toFixed(2)}%`}</Box>
          </Box>
        </CCol>
      )
    }

    const renderStatusProcess = () => {
      return (
        <CCol md={4} className="text-center">
          <RunningWithErrorsIcon style={{ fontSize: '40px', color: '#61A3BA' }} />
          <Box sx={{ fontSize: '17px', marginTop: '8px', color: '#61A3BA', fontWeight: 500 }}>
            <Box>{`Đang xử lý: ${totalProcess}`}</Box>
            <Box>{`${((totalProcess / dataSchedule.length) * 100).toFixed(2)}%`}</Box>
          </Box>
        </CCol>
      )
    }

    const renderStatusIncomplete = () => {
      return (
        <CCol md={4} className="text-center">
          <CancelPresentationIcon style={{ fontSize: '40px', color: '#DF826C' }} />
          <Box sx={{ fontSize: '17px', marginTop: '8px', color: '#DF826C', fontWeight: 500 }}>
            <Box>{`Chưa diễn ra: ${totalIncomplete}`}</Box>
            <Box>{`${((totalIncomplete / dataSchedule.length) * 100).toFixed(2)}%`}</Box>
          </Box>
        </CCol>
      )
    }

    return (
      <CRow className="d-flex justify-content-center my-3">
        {renderStatusIncomplete()}
        {renderStatusProcess()}
        {renderStatusComplete()}
      </CRow>
    )
  }

  const renderDetailBodyStatistic = () => {
    const renderContentdetail = (value) => {
      let dataContentDetail = []

      if (value === 'incomplete') {
        dataContentDetail = dataIncomplete
      }

      if (value === 'process') {
        dataContentDetail = dataProcess
      }

      if (value === 'complete') {
        dataContentDetail = dataComplete
      }

      return dataContentDetail.map((val, index) => {
        let totalScheduleComplete = 0
        let totalScheduleProcess = 0
        let totalScheduleIncomplete = 0
        val.schedules.forEach((schedule) => {
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
          <Box key={index} className="box-float">
            <Box className="d-flex align-item-end my-2">
              <CIcon icon={cilCalendarCheck} width={24} height={24} />
              <Typography style={{ margin: '2px 14px' }}>{val.type}</Typography>
            </Box>
            <Box className="d-flex align-item-end my-2">
              <CIcon icon={cilBook} width={24} height={24} />
              <Typography style={{ margin: '2px 14px' }}>{val.lecture_content}</Typography>
            </Box>
            <Box className="d-flex align-item-end my-2">
              <CIcon icon={cilUser} width={24} height={24} />
              <Typography style={{ margin: '2px 14px' }}>{val.responsible_teacher}</Typography>
            </Box>
            <Typography className="my-2">{`Số tín chỉ: ${val.total_credit_points}`}</Typography>
            <Typography className="my-2">
              {`Tổng số tiết học: ${val.total_num_lessons}`}{' '}
            </Typography>
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
                now={((totalScheduleComplete / val.schedules.length) * 100).toFixed(2)}
                label={`${((totalScheduleComplete / val.schedules.length) * 100).toFixed(2)}%`}
              />
            </Box>
          </Box>
        )
      })
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
                  {item?.label}
                </CHeader>
                {renderContentdetail(item.value)}
              </CCol>
            )
          })}
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
