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
        Header: 'Kiểu lịch trình',
        accessor: 'type',
        minWidth: 200,
      },
      {
        Header: 'Tiêu đề lịch trình',
        accessor: 'lecture_content',
        minWidth: 200,
      },
      {
        Header: 'Số tín chỉ',
        accessor: 'total_credit_points',
        minWidth: 50,
      },
      {
        Header: 'Tổng số tiết học',
        accessor: 'total_num_lessons',
        minWidth: 50,
      },
      {
        Header: 'Giáo viên phụ trách',
        accessor: 'responsible_teacher',
        minWidth: 150,
      },
      {
        Header: 'Mô tả',
        accessor: 'description',
        minWidth: 300,
      },
      {
        Header: 'Hoạt động',
        id: 'action',
        accessor: ({ id }) => {
          return (
            <div className="d-flex justify-content-center">
              <div className="">
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

ScheduleShareGeneral.propTypes = {
  value: PropTypes.oneOfType([string, number]),
  id: PropTypes.number,
}

export default React.memo(ScheduleShareGeneral)
