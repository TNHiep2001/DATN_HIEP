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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'

import { STATUS, optionsStatusSchedule, optionsTypeSchedule } from 'src/constants'
import { ProgressBar } from 'react-bootstrap'
import { LoadingProvider } from 'src/components'
import { closeModalStatic, hideLoading, openNotifyErrorServer, showLoading } from 'src/utils'
import { getFullScheduleApi } from 'src/services'

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
    }
    hideLoading()
  }

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

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
    val?.forEach((schedule) => {
      if (schedule.status_schedule === 'complete') {
        totalScheduleComplete = totalScheduleProcess + 1
        return
      }
      if (schedule.status_schedule === 'incomplete') {
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
    return <CRow className="d-flex">{renderBoxInfoSchedule()}</CRow>
  }

  // chi tiết lịch trình
  const renderDetailSchedule = () => {
    const schedulesIncomplete = dataDetailSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule === 'incomplete',
    )
    const schedulesProcess = dataDetailSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule === 'process',
    )
    const schedulesComplete = dataDetailSchedule?.schedules.filter(
      (schedule) => schedule.status_schedule === 'complete',
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
            {dataDetailSchedule.type_schedule === 'eduType' && (
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
