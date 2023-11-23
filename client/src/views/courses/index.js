/* eslint-disable prettier/prettier */
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import { closeModalStatic } from 'src/utils'

function Courses() {
  const fullData = {
    status: 'success',
    data: [
      {
        id: 1,
        nameCourse: 'Lập trình hướng đối tượng',
        codeCourse: 'LT123',
        description: 'Xây dựng một hệ tư tưởng về lập trình hướng đối tượng',
      },
      {
        id: 2,
        nameCourse: 'Công nghệ web',
        codeCourse: 'CNW123',
        description: 'Xây dựng một website hoàn chỉnh vận hành thực tế',
      },
      {
        id: 3,
        nameCourse: 'Cấu trúc dữ liệu và giải thuật',
        codeCourse: 'CTDLGT123',
        description: 'Tiếp cận và hiểu được cấu trúc dữ liệu và giải thuật',
      },
      {
        id: 4,
        nameCourse: 'Tin đại cương',
        codeCourse: 'TDC123',
        description: 'Tiếp cận và sử dụng công nghệ lập trình',
      },
      {
        id: 5,
        nameCourse: 'Điện toán đám mây',
        codeCourse: 'CL123',
        description: 'Tiếp cận những công dụng điện toán đám mây mang lại',
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
      const urlDetailFoodCourt = `/courses/${idBanner}/edit`

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
        Header: 'Name Course',
        accessor: 'nameCourse',
        minWidth: 300,
      },
      {
        Header: 'Code Course',
        accessor: 'codeCourse',
        minWidth: 200,
      },
      {
        Header: 'Description ',
        accessor: 'description',
        minWidth: 300,
      },
      {
        Header: 'Action',
        id: 'action',
        accessor: ({ id, name }) => {
          return (
            <div className="d-flex justify-content-center">
              <div className="ms-4">
                <ButtonAuthen
                  isEdit
                  isAuthorized
                  onClick={() => {
                    editBanner(id)
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
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/courses/new')}>
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
      <h3 className="title-content">List Courses</h3>
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

Courses.propTypes = {
  value: PropTypes.oneOfType([string, number]),
  id: PropTypes.number,
}

export default React.memo(Courses)
