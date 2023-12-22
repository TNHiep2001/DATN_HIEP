import { CCol, CFormInput, CRow } from '@coreui/react'
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import {
  closeModalStatic,
  hideLoading,
  openNotifyErrorServer,
  showLoading,
  showToastSuccess,
} from 'src/utils'
import DetailSchedule from './components/DetailSchedule'
import { STATUS, optionsTypeSchedule } from 'src/constants'
import { getListSchedule } from 'src/services'
import API from 'src/services/api'
import { httpRequest } from 'src/services/http.service'

function ScheduleRegistration() {
  const history = useHistory()
  const isUnmounted = useRef(false)
  const valueInputRef = useRef()
  const valueSearch = useRef()

  const [visible, setVisible] = useState(false)
  const [idDetail, setIdDetail] = useState()
  const [dataSchedules, setDataSchedules] = useState([])

  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
  })
  const { current_page, limit } = paging

  const idUser = localStorage.getItem('ID')

  const getInfoSchedule = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {
        page: current_page,
        limit: limit,
        idUser: idUser,
        name_schedule_search: valueSearch.current,
      }
      const { data, statusCode } = await getListSchedule(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return

        setDataSchedules(data.data)
        if (data.data.length > 0) setPaging(data.paging)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    hideLoading()
  }, [current_page, limit, idUser])

  useEffect(() => {
    getInfoSchedule()
  }, [getInfoSchedule])

  const handleSearchSchedule = async () => {
    showLoading()
    try {
      const { value } = valueInputRef.current
      const dataParams = {
        name_schedule_search: value,
        page: current_page,
        limit: limit,
        idUser: idUser,
      }
      const { data, statusCode } = await getListSchedule(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return

        valueSearch.current = value
        setDataSchedules(data.data)
        if (data.data.length > 0) setPaging(data.paging)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    hideLoading()
  }

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

  const handleDetailScheduleShare = useCallback((idDetail) => {
    setVisible(true)
    setIdDetail(idDetail)
  }, [])

  const deleteScheduleHandler = useCallback(
    async (id) => {
      const url = `${API.DELETE_SCHEDULE}/${id}`
      try {
        const { statusCode } = await httpRequest().delete(url)
        if (statusCode === STATUS.SUCCESS_NUM) {
          showToastSuccess('Xóa', 'lịch trình')
          getInfoSchedule()
        }
      } catch (error) {
        openNotifyErrorServer()
      }
    },
    [getInfoSchedule],
  )

  /**
   * data matching with field table
   * Dữ liệu để render thông tin vào table tương ứng với các trường
   */
  const columns = useMemo(
    () => [
      {
        Header: 'Kiểu lịch trình',
        id: 'type_schedule',
        accessor: ({ type_schedule }) => {
          const typeSchedule = optionsTypeSchedule.find((val) => val.value === type_schedule)
          return <p>{typeSchedule.label}</p>
        },
        minWidth: 150,
      },
      {
        Header: 'Tiêu đề lịch trình',
        accessor: ({ type_schedule, lecture_content, course_schedule }) => {
          if (type_schedule === 'evtType') {
            return <p>{lecture_content}</p>
          } else {
            return <p>{course_schedule.label}</p>
          }
        },
        minWidth: 110,
      },
      {
        Header: 'Số tín chỉ',
        accessor: 'total_credit_points',
        minWidth: 60,
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
        Header: 'Hoạt động',
        id: 'action',
        accessor: ({ _id, name }) => {
          return (
            <div className="d-flex justify-content-center">
              <ButtonAuthen
                isCreate
                isAuthorized
                onClick={() => {
                  shareSchedule(_id)
                }}
              >
                Chia sẻ
              </ButtonAuthen>
              <div className="ms-4">
                <ButtonAuthen
                  isDetail
                  isAuthorized
                  onClick={() => {
                    handleDetailScheduleShare(_id)
                  }}
                >
                  <div className="text-white">Chi tiết</div>
                </ButtonAuthen>
              </div>
              <div className="ms-4">
                <ButtonAuthen
                  isEdit
                  isAuthorized
                  onClick={() => {
                    editSchedule(_id)
                  }}
                >
                  <div className="text-white">Chỉnh sửa</div>
                </ButtonAuthen>
              </div>

              <ButtonDelete
                isAuthorized
                onDelete={() => {
                  deleteScheduleHandler(_id)
                }}
              >
                <div className="text-white">Xóa</div>
              </ButtonDelete>
            </div>
          )
        },
        minWidth: 400,
      },
    ],
    [editSchedule, handleDetailScheduleShare, shareSchedule, deleteScheduleHandler],
  )

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
              ref={valueInputRef}
              name="lecture_content"
              placeholder="Nhập tiêu đề lịch trình"
              aria-label="Tiêu đề lịch trình"
              className="flex-1"
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSchedule()
                }
              }}
            />
            <div onClick={handleSearchSchedule} className="btn btn-primary text-white ms-2 col-2">
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
      <DetailSchedule visible={visible} setVisible={setVisible} idDetail={idDetail} />
      <h3 className="title-content">Danh sách lịch trình đăng ký</h3>
      <LoadingProvider>
        {renderHeader()}
        <div className="p-3">
          <TableProvider
            data={dataSchedules}
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
