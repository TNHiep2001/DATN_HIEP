/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendarCheck, cilShare, cilUser } from '@coreui/icons'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { ProgressBar } from 'react-bootstrap'
import { optionsStatusSchedule, optionsTypeSchedule } from 'src/constants'
import { useTable } from 'react-table'

const DetailScheduleShare = ({ visible, setVisible, idDetail, listShareSchedule }) => {
  const handleCloseDetailModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const dataDetail = listShareSchedule.find((val) => val._id === idDetail)

  const columns = useMemo(
    () => [
      {
        Header: 'Ngày tháng',
        accessor: ({ schedule_date }) => {
          return <div>{schedule_date}</div>
        },
        minWidth: 100,
      },
      {
        Header: 'Thời gian diễn ra',
        accessor: ({ time_start, time_end }) => {
          return <div>{`${time_start} - ${time_end}`}</div>
        },
        minWidth: 100,
      },
      {
        Header: 'Giảng đường',
        accessor: ({ room }) => {
          return <div>{room.label}</div>
        },
        minWidth: 120,
      },
      {
        Header: 'Nội dung giảng dạy',
        accessor: 'content_schedule',
        minWidth: 180,
      },
      {
        Header: 'Số tiết',
        accessor: 'num_of_lessons',
        minWidth: 50,
      },
      {
        Header: 'Giáo viên thực hiện',
        accessor: 'name_teacher',
        minWidth: 150,
      },
      {
        Header: 'Trạng thái',
        accessor: ({ status_schedule }) => {
          const statusSchedule = optionsStatusSchedule.find((val) => val.value === status_schedule)
          return (
            <div
              style={{
                color:
                  status_schedule === 'incomplete'
                    ? '#DF826C'
                    : status_schedule === 'process'
                    ? '#61A3BA'
                    : status_schedule === 'complete'
                    ? '#79AC78'
                    : '#EEC759',
                fontWeight: 600,
              }}
            >
              {statusSchedule.label}
            </div>
          )
        },
        minWidth: 100,
      },
      {
        Header: 'Ngày tháng (bù hoãn)',
        accessor: ({ schedule_date_other }) => {
          if (!schedule_date_other) return
          return <div>{schedule_date_other}</div>
        },
        minWidth: 100,
      },
      {
        Header: 'Thời gian diễn ra (bù hoãn)',
        accessor: ({ time_start_other, time_end_other }) => {
          if (!time_start_other && !time_end_other) return
          return <div>{`${time_start_other} - ${time_end_other}`}</div>
        },
        minWidth: 100,
      },
      {
        Header: 'Giảng đường (bù hoãn)',
        accessor: ({ room_other }) => {
          return <div>{room_other?.label}</div>
        },
        minWidth: 100,
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: dataDetail?.schedules || [],
  })

  // kiểu lịch trình
  const renderTypeSchedule = (value) => {
    const typeSchedule = optionsTypeSchedule.find((type) => type.value === value)
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilCalendarCheck} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{typeSchedule?.label}</Typography>
      </Box>
    )
  }

  // tên lịch trình
  const renderLectureContent = (value, type) => {
    if (type === 'eduType') return
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilBook} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{value}</Typography>
      </Box>
    )
  }

  // tên môn học
  const renderCourseSchedule = (value, type) => {
    if (type === 'evtType') return
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilBook} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{value?.label}</Typography>
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

  // tên người chia sẻ
  const renderUserShare = (value) => {
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilShare} width={24} height={24} />
        <Typography style={{ margin: '2px 14px' }}>{value}</Typography>
      </Box>
    )
  }

  // số tín chỉ
  const renderTotalCreditPoints = (value, type) => {
    if (type !== 'eduType') return
    return <Typography className="my-2">{`Số tín chỉ: ${value}`}</Typography>
  }

  // số tiết học
  const renderTotalNumLessons = (value, type) => {
    if (type !== 'eduType') return
    return <Typography className="my-2">{`Tổng số tiết học: ${value}`} </Typography>
  }

  // kết quả chi tiết lịch trình
  const renderResultSchedule = (val) => {
    let totalScheduleComplete = 0
    let totalScheduleProcess = 0
    let totalScheduleIncomplete = 0
    let totalScheduleCancel = 0

    val?.forEach((schedule) => {
      if (schedule.status_schedule === 'complete') {
        totalScheduleComplete = totalScheduleProcess + 1
        return
      }
      if (schedule.status_schedule === 'incomplete') {
        totalScheduleIncomplete = totalScheduleIncomplete + 1
        return
      }
      if (schedule.status_schedule === 'cancel') {
        totalScheduleCancel = totalScheduleCancel + 1
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
          <Box className="d-flex align-items-center " sx={{ marginRight: '30px' }}>
            <TaskAltIcon style={{ fontSize: '22px', color: '#79AC78', marginRight: '6px' }} />
            <Typography>{totalScheduleComplete}</Typography>
          </Box>
          <Box className="d-flex align-items-center ">
            <PendingActionsIcon
              style={{ fontSize: '22px', color: '#EEC759', marginRight: '6px' }}
            />
            <Typography>{totalScheduleCancel}</Typography>
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
    const renderTableSchedule = () => {
      return (
        <>
          <Typography className="my-2" style={{ fontWeight: 600 }}>
            Lịch trình:
          </Typography>
          <CTable
            className="text-normal text-center"
            bordered
            responsive
            align="top"
            {...getTableProps()}
          >
            <CTableHead>
              {headerGroups.map((headerGroup, index) => (
                <CTableRow align="middle" key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <CTableHeaderCell
                      key={index}
                      {...column.getHeaderProps({
                        style: { minWidth: column.minWidth, width: column.width },
                      })}
                    >
                      {column.render('Header')}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              ))}
            </CTableHead>
            <CTableBody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <CTableRow key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      return (
                        <CTableDataCell
                          key={index}
                          {...cell.getCellProps({
                            style: {
                              minWidth: cell.column.minWidth,
                              width: cell.column.width,
                            },
                          })}
                        >
                          {cell.render('Cell')}
                        </CTableDataCell>
                      )
                    })}
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </>
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
              {renderTypeSchedule(dataDetail?.type_schedule)}
              {renderLectureContent(dataDetail?.lecture_content, dataDetail?.type_schedule)}
              {renderCourseSchedule(dataDetail?.course_schedule, dataDetail?.type_schedule)}
              {renderResponsibleTeacher(dataDetail?.responsible_teacher)}
              {renderUserShare(dataDetail?.user_share)}
              {renderTotalCreditPoints(dataDetail?.total_credit_points, dataDetail?.type_schedule)}
              {renderTotalNumLessons(dataDetail?.total_num_lessons, dataDetail?.type_schedule)}
              {renderResultSchedule(dataDetail?.schedules)}
            </Box>
            {/* thông tin chi tiết bên trong */}
            {renderTableSchedule()}
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
  listShareSchedule: PropTypes.array,
}

export default DetailScheduleShare
