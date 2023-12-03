/* eslint-disable prettier/prettier */
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import { closeModalStatic } from 'src/utils'

function ClassRoom() {
  const fullData = {
    status: 'success',
    data: [
      {
        id: 1,
        name_classroom: 'Phòng học lớn',
        code_classroom: '404-A4',
        description: 'Phòng học lớn cho lớp ghép',
      },
      {
        id: 2,
        name_classroom: 'Phòng máy',
        code_classroom: '401-C5',
        description: 'Phòng máy cấu hình tầm trung',
      },
      {
        id: 3,
        name_classroom: 'Phòng hội nghị',
        code_classroom: 'ROOM-1',
        description: 'Phòng hội nghị nhỏ',
      },
      {
        id: 4,
        name_classroom: 'Phòng máy lớn',
        code_classroom: '302-C5',
        description: 'Phòng máy cấu hình cao',
      },
      {
        id: 5,
        name_classroom: 'Phòng Lab',
        code_classroom: '101-C5',
        description: 'Phòng máy lab',
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

  const editBanner = useCallback(
    (idBanner) => {
      const urlDetailFoodCourt = `/classRoom/${idBanner}/edit`

      history.push(urlDetailFoodCourt)
    },
    [history],
  )

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
        Header: 'Tên phòng học',
        accessor: 'name_classroom',
        minWidth: 300,
      },
      {
        Header: 'Mã phòng học',
        accessor: 'code_classroom',
        minWidth: 200,
      },
      {
        Header: 'Mô tả ',
        accessor: 'description',
        minWidth: 300,
      },
      {
        Header: 'Hoạt động',
        id: 'action',
        accessor: ({ id, name }) => {
          return (
            <div className="d-flex justify-content-center">
              <ButtonAuthen
                isEdit
                isAuthorized
                onClick={() => {
                  editBanner(id)
                }}
              >
                <div className="text-white">Chỉnh sửa</div>
              </ButtonAuthen>

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
        minWidth: 220,
      },
    ],
    [editBanner],
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
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/classRoom/new')}>
        Tạo mới
      </ButtonAuthen>
    )
  }

  // Hiển thị nút create banner
  const renderHeader = () => {
    return <div className="p-3 d-flex justify-content-end">{renderCreateBannerBtn()}</div>
  }

  return (
    <div>
      <h3 className="title-content">Danh sách phòng học</h3>
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

ClassRoom.propTypes = {
  value: PropTypes.oneOfType([string, number]),
  id: PropTypes.number,
}

export default React.memo(ClassRoom)
