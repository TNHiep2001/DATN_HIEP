import { Box } from '@mui/system'
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import { closeModalStatic } from 'src/utils'

function ScheduleRegistration() {
  const fullData = {
    status: 'success',
    data: [
      {
        id: 193,
        type: 'Teaching Schedule',
        time_start: '10:00 AM',
        time_end: '12:00 PM',
        room: '401 C5',
        course: 'Lập trình hướng đối tượng',
        lecture_content: 'Giới thiệu về lập trình hướng đối tượng',
        schedule_date: '26/10/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
      {
        id: 192,
        type: 'Teaching Schedule',
        time_start: '14:00 PM',
        time_end: '16:00 PM',
        room: '201 C5',
        course: 'Cấu trúc dữ liệu và giải thuật',
        lecture_content: 'Giới thiệu về cấu trúc dữ liệu và giải thuật',
        schedule_date: '05/11/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
      {
        id: 191,
        type: 'Teaching Schedule',
        time_start: '13:00 PM',
        time_end: '15:00 PM',
        room: '202 C5',
        course: 'Ngôn ngữ lập trình',
        lecture_content: 'Giới thiệu về các ngôn ngữ cần thiết để giải mã giấc mơ',
        schedule_date: '22/11/2023',
        schedule_day: 'Monday',
        status: 'Incomplete',
      },
      {
        id: 190,
        type: 'Teaching Schedule',
        time_start: '16:00 PM',
        time_end: '17:00 PM',
        room: '302 C5',
        course: 'Thuật toán ứng dụng',
        lecture_content: 'Giới thiệu về sự quan trọng của thuật toán',
        schedule_date: '19/11/2023',
        schedule_day: 'Monday',
        status: 'Incomplete',
      },
      {
        id: 189,
        type: 'Teaching Schedule',
        time_start: '08:00 AM',
        time_end: '10:00 AM',
        room: '202 B5',
        course: 'Lập trình nâng cao',
        lecture_content: 'Giới thiệu về công nghệ tương lai',
        schedule_date: '10/11/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
      {
        id: 188,
        type: 'Teaching Schedule',
        time_start: '07:00 AM',
        time_end: '10:00 AM',
        room: '203 B5',
        course: 'Cơ sở dữ liệu',
        lecture_content: 'Giới thiệu về cơ sở dữ liệu',
        schedule_date: '25/11/2023',
        schedule_day: 'Monday',
        status: 'Incomplete',
      },
      {
        id: 187,
        type: 'Teaching Schedule',
        time_start: '11:00 AM',
        time_end: '13:00 PM',
        room: '203 B5',
        course: 'Cơ sở dữ liệu',
        lecture_content: 'Giới thiệu về cơ sở dữ liệu',
        schedule_date: '13/11/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
      {
        id: 186,
        type: 'Teaching Schedule',
        time_start: '09:00 AM',
        time_end: '11:00 AM',
        room: '203 B5',
        course: 'Cơ sở dữ liệu',
        lecture_content: 'Giới thiệu về cơ sở dữ liệu',
        schedule_date: '14/11/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
      {
        id: 185,
        type: 'Teaching Schedule',
        time_start: '12:00 PM',
        time_end: '14:00 PM',
        room: '203 B5',
        course: 'Cơ sở dữ liệu',
        lecture_content: 'Giới thiệu về cơ sở dữ liệu',
        schedule_date: '12/11/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
      {
        id: 184,
        type: 'Teaching Schedule',
        time_start: '14:00 PM',
        time_end: '16:00 PM',
        room: '203 B5',
        course: 'Cơ sở dữ liệu',
        lecture_content: 'Giới thiệu về cơ sở dữ liệu',
        schedule_date: '14/11/2023',
        schedule_day: 'Monday',
        status: 'Complete',
      },
    ],
    paging: {
      total: 31,
      total_page: 4,
      current_page: 1,
      limit: 10,
      next_page: 2,
    },
  }
  const history = useHistory()
  const isUnmounted = useRef(false)

  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
    total_page: 4,
  })
  // const { current_page, limit } = paging

  // const getBanners = useCallback(async () => {
  //   showLoading()
  //   try {
  //     const dataParams = {
  //       page: current_page,
  //       limit: limit,
  //     }
  //     const { data, statusCode } = await getListBanners(dataParams)
  //     if (statusCode === STATUS.SUCCESS_NUM) {
  //       if (isUnmounted.current) return

  //       setDataBanners(data.data)
  //       if (data.data.length > 0) setPaging(data.paging)
  //     }
  //   } catch (error) {
  //     openNotifyErrorServer(error.message)
  //   }
  //   hideLoading()
  // }, [current_page, limit])

  const editSchedule = useCallback(
    (idSchedule) => {
      const urlEditSchedule = `/scheduleRegistration/${idSchedule}/edit`

      history.push(urlEditSchedule)
    },
    [history],
  )

  // const deleteBannerHandler = useCallback(
  //   async (id) => {
  //     const url = `${API.GET_BANNERS}/${id}`
  //     try {
  //       const { statusCode } = await httpRequest().delete(url)
  //       if (statusCode === STATUS.SUCCESS_NUM) {
  //         showToastSuccess('Delete', 'scheduleRegistration')
  //         getBanners()
  //       }
  //     } catch (error) {
  //       openNotifyErrorServer()
  //     }
  //   },
  //   [getBanners],
  // )

  /**
   * data matching with field table
   * Dữ liệu để render thông tin vào table tương ứng với các trường
   */
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        minWidth: 50,
        width: 50,
      },
      {
        Header: 'Type Schedule',
        accessor: 'type',
        minWidth: 150,
      },
      {
        Header: 'Room',
        accessor: 'room',
        minWidth: 80,
      },
      {
        Header: 'Course',
        accessor: 'course',
        minWidth: 100,
      },
      {
        Header: 'Lecture Content',
        accessor: 'lecture_content',
        minWidth: 180,
      },
      {
        Header: 'Schedule Date',
        accessor: 'schedule_date',
        minWidth: 100,
      },
      {
        Header: 'Schedule Time',
        accessor: (propsColumn) => {
          const { time_start, time_end, schedule_day } = propsColumn
          if (time_start && time_end)
            return (
              <div className="text-start mb-2">
                <div className="me-3 fw-semibold">{schedule_day}: </div>
                <div>{`${time_start} - ${time_end}`}</div>
              </div>
            )
        },
        minWidth: 150,
      },
      {
        Header: 'Status',
        accessor: (propsColumn) => {
          const { status } = propsColumn
          console.log(status)
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: status === 'Complete' ? '#5F8D4E' : '#E25E3E',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                }}
              >
                {status}
              </Box>
            </Box>
          )
        },
        minWidth: 100,
      },
      {
        Header: 'Action',
        id: 'action',
        accessor: ({ id, name }) => {
          return (
            <div className="d-flex justify-content-center">
              <div className="">
                <ButtonAuthen
                  isCreate
                  isAuthorized
                  onClick={() => history.push('/scheduleRegistration/scheduleShare')}
                >
                  Share
                </ButtonAuthen>
              </div>
              <div className="ms-4">
                <ButtonAuthen
                  isEdit
                  isAuthorized
                  onClick={() => {
                    editSchedule(id)
                  }}
                >
                  <div className="text-white">Edit</div>
                </ButtonAuthen>
              </div>

              <ButtonDelete
                isAuthorized
                onDelete={() => {
                  // deleteBannerHandler(id)
                }}
              >
                <div className="text-white">Delete</div>
              </ButtonDelete>
            </div>
          )
        },
        minWidth: 200,
      },
    ],
    [editSchedule, history],
  )

  // useEffect(() => {
  //   getBanners()
  // }, [getBanners])

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

  const renderCreateBannerBtn = () => {
    return (
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/scheduleRegistration/new')}>
        Create
      </ButtonAuthen>
    )
  }

  // Hiển thị nút create banner
  const renderHeader = () => {
    return <div className="p-3 d-flex justify-content-end">{renderCreateBannerBtn()}</div>
  }

  return (
    <div>
      <h3 className="title-content">List Schedule Registration</h3>
      <LoadingProvider>
        {renderHeader()}
        <div className="p-3">
          <TableProvider
            data={fullData.data}
            formatColumn={columns}
            paging={paging}
            setPaging={setPaging}
          />
        </div>
      </LoadingProvider>
    </div>
  )
}

ScheduleRegistration.propTypes = {
  value: PropTypes.oneOfType([string, number]),
  id: PropTypes.number,
}

export default React.memo(ScheduleRegistration)
