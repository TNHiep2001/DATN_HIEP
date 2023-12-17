/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import { Box, Typography } from '@mui/material'
import { useTable } from 'react-table'
import { hideLoading, openNotifyErrorServer, showLoading } from 'src/utils'
import { getListSchedule } from 'src/services'
import { STATUS, optionsStatusSchedule, optionsTypeSchedule } from 'src/constants'

const DetailSchedule = ({ visible, setVisible, idDetail }) => {
  const [dataSchedules, setDataSchedules] = useState([])
  const dataDetail = dataSchedules.find((val) => val._id === idDetail)
  console.log(dataDetail)

  const handleCloseDetailModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const getInfoSchedule = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {}
      const { data, statusCode } = await getListSchedule(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        setDataSchedules(data.data)
      }
    } catch (error) {
      openNotifyErrorServer(error.message)
    }
    hideLoading()
  }, [])

  useEffect(() => {
    getInfoSchedule()
  }, [getInfoSchedule])

  const columns = useMemo(
    () => [
      {
        Header: 'Ngày tháng',
        accessor: 'schedule_date',
        minWidth: 150,
      },
      {
        Header: 'Thời gian diễn ra',
        accessor: ({ time_start, time_end }) => {
          return <div>{`${time_start} - ${time_end}`}</div>
        },
        minWidth: 150,
      },
      {
        Header: 'Giảng đường',
        accessor: ({ room }) => {
          return <div>{room.label}</div>
        },
        minWidth: 110,
      },
      {
        Header: 'Nội dung giảng dạy',
        accessor: 'content_schedule',
        minWidth: 250,
      },
      {
        Header: 'Số tiết',
        accessor: 'num_of_lessons',
        minWidth: 50,
      },
      {
        Header: 'Giáo viên thực hiện',
        accessor: 'name_teacher',
        minWidth: 180,
      },
      {
        Header: 'Trạng thái',
        accessor: ({ status_schedule }) => {
          const statusSchedule = optionsStatusSchedule?.find((val) => val.value === status_schedule)
          return (
            <div
              style={{
                color:
                  statusSchedule.value === 'incomplete'
                    ? '#DF826C'
                    : statusSchedule.value === 'process'
                    ? '#61A3BA'
                    : '#79AC78',
                fontWeight: 600,
              }}
            >
              {statusSchedule.label}
            </div>
          )
        },
        minWidth: 150,
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: dataDetail?.schedules || [],
  })

  const renderInfoSchedule = () => {
    const renderType = () => {
      const typeSchedule = optionsTypeSchedule.find(
        (val) => val.value === dataDetail?.type_schedule,
      )
      return (
        <Box className="d-flex align-item-end my-2">
          <CIcon icon={cilCalendarCheck} width={24} height={24} />
          <Typography style={{ margin: '2px 14px' }}>{typeSchedule?.label}</Typography>
        </Box>
      )
    }

    const renderLectureContent = () => {
      let contentSchedule = ''
      if (dataDetail?.type_schedule === 'eduType') {
        contentSchedule = dataDetail?.course_schedule.label
      } else {
        contentSchedule = dataDetail?.lecture_content
      }
      return (
        <Box className="d-flex align-item-end my-2">
          <CIcon icon={cilBook} width={24} height={24} />
          <Typography style={{ margin: '2px 14px' }}>{contentSchedule}</Typography>
        </Box>
      )
    }

    const renderResponsibleTeacher = () => {
      return (
        <Box className="d-flex align-item-end my-2">
          <CIcon icon={cilUser} width={24} height={24} />
          <Typography style={{ margin: '2px 14px' }}>{dataDetail?.responsible_teacher}</Typography>
        </Box>
      )
    }

    const renderTotalCreditPoints = () => {
      if (dataDetail?.type_schedule !== 'eduType') return
      return (
        <Typography className="my-2">{`Số tín chỉ: ${dataDetail?.total_credit_points}`}</Typography>
      )
    }

    const renderTotalNumLessons = () => {
      if (dataDetail?.type_schedule !== 'eduType') return
      return (
        <Typography className="my-2">
          {`Tổng số tiết học: ${dataDetail?.total_num_lessons}`}{' '}
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
        <CModalTitle className="fs-3 fw-normal">Chi tiết lịch trình</CModalTitle>
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
