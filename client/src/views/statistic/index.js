import { CCol, CHeader, CRow } from '@coreui/react'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { STATUS, optionsStatusSchedule, optionsTypeSchedule } from 'src/constants'
import { Typography } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendarCheck, cilUser } from '@coreui/icons'
import { ProgressBar } from 'react-bootstrap'
import { closeModalStatic, hideLoading, openNotifyErrorServer, showLoading } from 'src/utils'
import { getListSchedule } from 'src/services'

function Statistic(props) {
  const [dataSchedules, setDataSchedules] = useState([])

  console.log(dataSchedules)

  const isUnmounted = useRef(false)

  const dataIncomplete = []
  const dataProcess = []
  const dataComplete = []

  const idUser = localStorage.getItem('ID')

  const getInfoSchedule = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {
        page: 1,
        limit: 10000,
        idUser: idUser,
      }
      const { data, statusCode } = await getListSchedule(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return

        setDataSchedules(data.data)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    hideLoading()
  }, [idUser])

  useEffect(() => {
    getInfoSchedule()
  }, [getInfoSchedule])

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

  const renderNumberStatistic = () => {
    let totalComplete = 0
    let totalProcess = 0
    let totalIncomplete = 0

    // tính toán tổng các loại của trạng thái
    dataSchedules?.forEach((val) => {
      const checkIncomplete = val?.schedules.every((el) => el.status_schedule === 'incomplete')
      const checkComplete = val?.schedules.every((el) => el.status_schedule === 'complete')

      // tính tổng lịch trình chưa diễn ra
      console.log(checkIncomplete)
      if (checkIncomplete) {
        totalIncomplete = totalIncomplete + 1
        dataIncomplete.push(val)
        return
      }

      //tính tổng lịch trình đã hoàn thành
      if (checkComplete) {
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
            <Box>{`${((totalComplete / dataSchedules?.length) * 100).toFixed(2)}%`}</Box>
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
            <Box>{`${((totalProcess / dataSchedules?.length) * 100).toFixed(2)}%`}</Box>
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
            <Box>{`${((totalIncomplete / dataSchedules?.length) * 100).toFixed(2)}%`}</Box>
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
          if (schedule?.status_schedule === 'complete') {
            totalScheduleComplete = totalScheduleProcess + 1
            return
          }
          if (schedule?.status_schedule === 'incomplete') {
            totalScheduleIncomplete = totalScheduleIncomplete + 1
            return
          }
          totalScheduleProcess = totalScheduleProcess + 1
        })

        const typeSchedule = optionsTypeSchedule.find(
          (schedule) => schedule.value === val.type_schedule,
        )

        const contentSchedule = () => {
          if (val.type_schedule === 'eduType') {
            return val.course_schedule.label
          } else {
            return val.lecture_content
          }
        }

        return (
          <Box key={index} className="box-float">
            <Box className="d-flex align-item-end my-2">
              <CIcon icon={cilCalendarCheck} width={24} height={24} />
              <Typography style={{ margin: '2px 14px', flex: 1 }}>{typeSchedule.label}</Typography>
            </Box>
            <Box className="d-flex align-item-end my-2">
              <CIcon icon={cilBook} width={24} height={24} />
              <Typography style={{ margin: '0px 14px', flex: 1 }}>{contentSchedule()}</Typography>
            </Box>
            <Box className="d-flex align-item-end my-2">
              <CIcon icon={cilUser} width={24} height={24} />
              <Typography style={{ margin: '2px 14px', flex: 1 }}>
                {val.responsible_teacher}
              </Typography>
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
          {optionsStatusSchedule.slice(0, 3).map((item, index) => {
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
