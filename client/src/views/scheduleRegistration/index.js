import { CCol, CFormInput, CRow } from '@coreui/react'
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
        id: 1,
        type: 'Teaching Schedule',
        lecture_content: 'Lập trình hướng đối tượng',
        total_num_lessons: 3,
        total_credit_points: 45,
        responsible_teacher: 'Trương Xuân Nam',
        description: 'Hãy viết mô tả gì đó cho môn học này',
      },
      {
        id: 2,
        type: 'Teaching Schedule',
        lecture_content: 'Công nghệ web',
        total_num_lessons: 3,
        total_credit_points: 45,
        responsible_teacher: 'Kiều Tuấn Dũng',
        description: 'Hãy viết mô tả gì đó cho môn học này',
      },
      {
        id: 3,
        type: 'Teaching Schedule',
        lecture_content: 'Cơ sở dữ liệu',
        total_num_lessons: 4,
        total_credit_points: 45,
        responsible_teacher: 'Nguyễn Quỳnh Châu',
        description: 'Hãy viết mô tả gì đó cho môn học này',
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
  const codeInputRef = useRef()

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

  const shareSchedule = useCallback(
    (idSchedule) => {
      history.push('/scheduleRegistration/scheduleShare')
      const urlShareSchedule = `/scheduleRegistration/scheduleShare/${idSchedule}`

      history.push(urlShareSchedule)
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
        Header: 'Kiểu lịch trình',
        accessor: 'type',
        minWidth: 150,
      },
      {
        Header: 'Tiêu đề lịch trình',
        accessor: 'lecture_content',
        minWidth: 200,
      },
      {
        Header: 'Số tín chỉ',
        accessor: 'total_credit_points',
        minWidth: 80,
      },
      {
        Header: 'Tổng số tiết học',
        accessor: 'total_num_lessons',
        minWidth: 80,
      },
      {
        Header: 'Giáo viên phụ trách',
        accessor: 'responsible_teacher',
        minWidth: 150,
      },
      {
        Header: 'Mô tả',
        accessor: 'description',
        minWidth: 200,
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
                  onClick={() => {
                    shareSchedule(id)
                  }}
                >
                  Chia sẻ
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
                  <div className="text-white">Chỉnh sửa</div>
                </ButtonAuthen>
              </div>

              <ButtonDelete
                isAuthorized
                onDelete={() => {
                  // deleteBannerHandler(id)
                }}
              >
                <div className="text-white">Xóa</div>
              </ButtonDelete>
            </div>
          )
        },
        minWidth: 300,
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

  const renderCreateScheduleBtn = () => {
    return (
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/scheduleRegistration/new')}>
        Tạo mới
      </ButtonAuthen>
    )
  }

  const renderSearchInput = () => {
    return (
      <div className="filter-search p-4">
        <div className="filter-group">
          <div className="filter-label">Tiêu đề lịch trình</div>
          <div className="filter-control row">
            <CFormInput
              ref={codeInputRef}
              name="lecture_content"
              placeholder="Nhập tiêu đề lịch trình"
              aria-label="Tiêu đề lịch trình"
              className="flex-1"
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  // handleSearchCoupon()
                }
              }}
            />
            <div
              onClick={() => {
                alert('Tìm kiếm ...')
              }}
              className="btn btn-primary text-white ms-2 col-2"
            >
              Tìm kiếm
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị header
  const renderHeader = () => {
    return (
      <CRow className="align-items-center justify-content-between">
        <CCol xs={6}>{renderSearchInput()}</CCol>
        <CCol className="text-end me-3">{renderCreateScheduleBtn()}</CCol>
      </CRow>
    )
  }

  return (
    <div>
      <h3 className="title-content">Danh sách lịch trình đăng ký</h3>
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
