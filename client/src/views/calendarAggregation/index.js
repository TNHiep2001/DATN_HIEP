import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import PendingActionsIcon from '@mui/icons-material/PendingActions'

import { STATUS, optionsStatusSchedule, optionsTypeSchedule } from 'src/constants'
import { ProgressBar } from 'react-bootstrap'
import { LoadingProvider, NoData } from 'src/components'
import { closeModalStatic, hideLoading, openNotifyErrorServer, showLoading } from 'src/utils'
import { getFullScheduleApi } from 'src/services'
import { useTable } from 'react-table'

export default function CalendarAggregation() {
  const [dataDetailSchedule, setDataDetailSchedule] = useState(null)
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [dataSchedules, setDataSchedules] = useState([])

  const valueInputRef = useRef()
  const valueSearch = useRef()
  const isUnmounted = useRef(false)

  const handleCloseDetailModal = useCallback(() => {
    setVisibleDetail(false)
  }, [setVisibleDetail])

  const getFullSchedule = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {
        name_teacher_search: valueSearch.current,
      }
      const { data, statusCode } = await getFullScheduleApi(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return
        setDataSchedules(data.data)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    hideLoading()
  }, [])

  useEffect(() => {
    getFullSchedule()
  }, [getFullSchedule])

  const handleSearchSchedule = async () => {
    showLoading()
    try {
      const { value } = valueInputRef.current
      const dataParams = {
        name_teacher_search: value,
      }
      const { data, statusCode } = await getFullScheduleApi(dataParams)

      if (statusCode === STATUS.SUCCESS_NUM) {
        valueSearch.current = value
        setDataSchedules(data.data)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
      setDataSchedules([])
    }
    hideLoading()
  }

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

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
    data: dataDetailSchedule?.schedules || [],
  })

  // kiểu lịch trình
  const renderTypeSchedule = (value) => {
    const typeSchedule = optionsTypeSchedule.find((val) => val.value === value)
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilCalendarCheck} width={24} height={24} />
        <Typography style={{ margin: '2px 14px', flex: '1' }}>{typeSchedule?.label}</Typography>
      </Box>
    )
  }

  // tên môn học
  const renderCourseSchedule = (value, type) => {
    if (type === 'evtType') return null
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilBook} width={24} height={24} />
        <Typography style={{ margin: '0px 14px', flex: '1' }}>{value?.label}</Typography>
      </Box>
    )
  }

  // tên lịch trình
  const renderLectureContent = (value, type) => {
    if (type === 'eduType') return null
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilBook} width={24} height={24} />
        <Typography style={{ margin: '2px 14px', flex: '1' }}>{value}</Typography>
      </Box>
    )
  }

  // tên giảng viên
  const renderResponsibleTeacher = (value) => {
    return (
      <Box className="d-flex align-item-end my-2">
        <CIcon icon={cilUser} width={24} height={24} />
        <Typography style={{ margin: '2px 14px', flex: '1' }}>{value}</Typography>
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

  const renderBoxInfoSchedule = () => {
    return dataSchedules.map((schedule, index) => {
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
            {renderTypeSchedule(schedule.type_schedule)}
            {renderCourseSchedule(schedule.course_schedule, schedule.type_schedule)}
            {renderLectureContent(schedule.lecture_content, schedule.type_schedule)}
            {renderResponsibleTeacher(schedule.responsible_teacher)}
            {renderTotalCreditPoints(schedule.total_credit_points, schedule.type_schedule)}
            {renderTotalNumLessons(schedule.total_num_lessons, schedule.type_schedule)}
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
    if (dataSchedules?.length === 0) return <NoData />
    return <CRow className="d-flex">{renderBoxInfoSchedule()}</CRow>
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
        <CModal size="xl" visible={visibleDetail} onClose={handleCloseDetailModal}>
          <CModalHeader>
            <CModalTitle className="fs-3 fw-medium">Thông tin chi tiết lịch trình</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* thông tin cơ bản */}
            <Box className="box-float" sx={{ padding: '10px 20px' }}>
              {renderTypeSchedule(dataDetailSchedule?.type_schedule)}
              {renderLectureContent(
                dataDetailSchedule?.lecture_content,
                dataDetailSchedule?.type_schedule,
              )}
              {renderCourseSchedule(
                dataDetailSchedule?.course_schedule,
                dataDetailSchedule?.type_schedule,
              )}
              {renderResponsibleTeacher(dataDetailSchedule?.responsible_teacher)}
              {renderTotalCreditPoints(
                dataDetailSchedule?.total_credit_points,
                dataDetailSchedule?.type_schedule,
              )}
              {renderTotalNumLessons(
                dataDetailSchedule?.total_num_lessons,
                dataDetailSchedule?.type_schedule,
              )}
              {renderResultSchedule(dataDetailSchedule?.schedules)}
            </Box>
            {/* thông tin chi tiết bên trong */}
            {renderTableSchedule()}
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
                  ref={valueInputRef}
                  name="responsible_teacher"
                  placeholder="Nhập tên giáo viên phụ trách"
                  aria-label="Giáo viên phụ trách"
                  className="flex-1"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSchedule()
                    }
                  }}
                />
                <div
                  onClick={handleSearchSchedule}
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
