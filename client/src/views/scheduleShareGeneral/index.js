import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  ButtonAuthen,
  ButtonDelete,
  ButtonShow,
  LoadingProvider,
  TableProvider,
} from 'src/components'
// import { STATUS } from 'src/constants'
// import API from 'src/services/api'
// import { httpRequest } from 'src/services/http.service'
import {
  closeModalStatic,
  // hideLoading,
  // openNotifyErrorServer,
  // showLoading,
  // showToastSuccess,
} from 'src/utils'
import DetailScheduleShare from './DetailScheduleShare'
import { CCol, CFormInput, CRow } from '@coreui/react'
// import { activeBanner, getListBanners } from 'src/services/banners'

function ScheduleShareGeneral() {
  const fullDataBanner = {
    status: 'success',
    data: [
      {
        id: 193,
        typeSchedule: 'Teaching schedule',
        nameUser: 'Kiều Tuấn Dũng',
        room: '401 C5',
        lectureContent: 'Giới thiệu về lập trình hướng đối tượng',
      },
      {
        id: 192,
        typeSchedule: 'Event schedule',
        nameUser: 'Kiều Tuấn Dũng',
        room: '201 C5',
        lectureContent: 'Giới thiệu về cấu trúc dữ liệu và giải thuật',
      },
      {
        id: 191,
        typeSchedule: 'Event schedule',
        nameUser: 'Trần Mạnh Tuấn',
        room: '202 C5',
        lectureContent: 'Giới thiệu về các ngôn ngữ cần thiết để giải mã giấc mơ',
      },
      {
        id: 190,
        typeSchedule: 'Teaching schedule',
        nameUser: 'Lương Thị Hồng Lan',
        room: '302 C5',
        lectureContent: 'Giới thiệu về sự quan trọng của thuật toán',
      },
      {
        id: 189,
        typeSchedule: 'Teaching schedule',
        nameUser: 'Trần Mạnh Tuấn',
        room: '202 B5',
        lectureContent: 'Giới thiệu về công nghệ tương lai',
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

  const [visible, setVisible] = useState(false)
  const [idDetail, setIdDetail] = useState()

  // const [dataBanners, setDataBanners] = useState([])
  // const [activeFail, setActiveFail] = useState(false)
  // const [statusActive, setStatusActive] = useState()
  // const [idBanner, setIdBanner] = useState()
  // const [restaurantExisted, setRestaurantExistes] = useState(null)
  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
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

  const handleDetailScheduleShare = useCallback((idDetail) => {
    setVisible(true)
    setIdDetail(idDetail)
  }, [])

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
        accessor: 'typeSchedule',
        minWidth: 200,
      },
      {
        Header: 'Name User',
        accessor: 'nameUser',
        minWidth: 200,
      },
      {
        Header: 'Lecture Content',
        accessor: 'lectureContent',
        minWidth: 400,
      },
      {
        Header: 'Room',
        accessor: 'room',
        minWidth: 100,
      },
      {
        Header: 'Action',
        id: 'action',
        accessor: ({ id }) => {
          return (
            <div className="d-flex justify-content-center">
              <div className="ms-4">
                <ButtonAuthen
                  isDetail
                  isAuthorized
                  onClick={() => {
                    handleDetailScheduleShare(id)
                  }}
                >
                  <div className="text-white">Chi tiết</div>
                </ButtonAuthen>
              </div>
            </div>
          )
        },
        minWidth: 100,
      },
    ],
    [handleDetailScheduleShare],
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

  const renderSearchInput = () => {
    return (
      <CRow className="align-items-center justify-content-between">
        <CCol xs={6}>
          <div className="filter-search p-4">
            <div className="filter-group">
              <div className="filter-label">Giáo viên phụ trách</div>
              <div className="filter-control row">
                <CFormInput
                  ref={codeInputRef}
                  name="responsible_teacher"
                  placeholder="Nhập tên giáo viên phụ trách"
                  aria-label="Giáo viên phụ trách"
                  className="flex-1"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      // handleSearchCoupon()
                    }
                  }}
                />
                <div
                  onClick={() => {
                    alert('search...')
                  }}
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
      <DetailScheduleShare visible={visible} setVisible={setVisible} idDetail={idDetail} />
      <h3 className="title-content">Danh sách lịch trình được chia sẻ</h3>
      <LoadingProvider>
        {renderSearchInput()}
        <div className="p-3">
          <TableProvider
            data={fullDataBanner.data}
            formatColumn={columns}
            paging={paging}
            setPaging={setPaging}
          />
        </div>
      </LoadingProvider>
    </div>
  )
}

ScheduleShareGeneral.propTypes = {
  value: PropTypes.oneOfType([string, number]),
  id: PropTypes.number,
}

export default React.memo(ScheduleShareGeneral)
