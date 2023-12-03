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
        name_course: 'Lập trình hướng đối tượng',
        code_course: 'LT123',
        major: 'K61',
        faculty: 'Công nghệ thông tin',
        specialization: 'Công nghệ thông tin',
        description: 'Xây dựng một hệ tư tưởng về lập trình hướng đối tượng',
      },
      {
        id: 2,
        name_course: 'Công nghệ web',
        code_course: 'CNW123',
        major: 'K61',
        faculty: 'Công nghệ thông tin',
        specialization: 'Hệ thống thông tin',
        description: 'Xây dựng một website hoàn chỉnh vận hành thực tế',
      },
      {
        id: 3,
        name_course: 'Cấu trúc dữ liệu và giải thuật',
        code_course: 'CTDLGT123',
        major: 'K61',
        faculty: 'Công nghệ thông tin',
        specialization: 'Kỹ thuật phần mềm',
        description: 'Tiếp cận và hiểu được cấu trúc dữ liệu và giải thuật',
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
        Header: 'Tên môn học',
        accessor: 'name_course',
        minWidth: 200,
      },
      {
        Header: 'Mã môn học',
        accessor: 'code_course',
        minWidth: 80,
      },
      {
        Header: 'Khóa học',
        accessor: 'major',
        minWidth: 50,
      },
      {
        Header: 'Khoa',
        accessor: 'faculty',
        minWidth: 150,
      },
      {
        Header: 'Chuyên ngành',
        accessor: 'specialization',
        minWidth: 150,
      },
      {
        Header: 'Mô tả ',
        accessor: 'description',
        minWidth: 250,
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
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/courses/new')}>
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
      <h3 className="title-content">Danh sách môn học</h3>
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
