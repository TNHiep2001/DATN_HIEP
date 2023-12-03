/* eslint-disable prettier/prettier */
import React, { useCallback, useMemo } from 'react'
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

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        minWidth: 50,
        width: 50,
      },
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
          return (
            <div
              style={{
                color:
                  status_schedule.value === 'incomplete'
                    ? '#DF826C'
                    : status_schedule.value === 'process'
                    ? '#61A3BA'
                    : '#79AC78',
                fontWeight: 600,
              }}
            >
              {status_schedule.label}
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
    data: dataSchedule.schedules,
  })

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
