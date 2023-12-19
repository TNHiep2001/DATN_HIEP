/* eslint-disable prettier/prettier */
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import { STATUS } from 'src/constants'
import API from 'src/services/api'
import { getListCourse } from 'src/services/course'
import { httpRequest } from 'src/services/http.service'
import {
  closeModalStatic,
  hideLoading,
  openNotifyErrorServer,
  showLoading,
  showToastSuccess,
} from 'src/utils'

function Courses() {
  const history = useHistory()
  const isUnmounted = useRef(false)

  const [dataCourse, setDataCourse] = useState()

  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
  })
  const { current_page, limit } = paging

  const getCourses = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {
        page: current_page,
        limit: limit,
      }
      const { data, statusCode } = await getListCourse(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return

        setDataCourse(data.data)
        if (data.data.length > 0) setPaging(data.paging)
      }
    } catch (error) {
      openNotifyErrorServer(error.message)
    }
    hideLoading()
  }, [current_page, limit])

  const editCourse = useCallback(
    (idCourse) => {
      const urlDetailCourse = `/courses/${idCourse}/edit`

      history.push(urlDetailCourse)
    },
    [history],
  )

  const deleteCourseHandler = useCallback(
    async (id) => {
      const url = `${API.DELETE_COURSE}/${id}`
      try {
        const { statusCode } = await httpRequest().delete(url)
        if (statusCode === STATUS.SUCCESS_NUM) {
          showToastSuccess('Xóa', 'môn học')
          getCourses()
        }
      } catch (error) {
        openNotifyErrorServer()
      }
    },
    [getCourses],
  )

  /**
   * data matching with field table
   * Dữ liệu để render thông tin vào table tương ứng với các trường
   */
  const columns = useMemo(
    () => [
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
        accessor: 'academic_term',
        minWidth: 50,
      },
      {
        Header: 'Khoa',
        accessor: 'department',
        minWidth: 150,
      },
      {
        Header: 'Chuyên ngành',
        accessor: 'major',
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
        accessor: ({ _id, name }) => {
          return (
            <div className="d-flex justify-content-center">
              <ButtonAuthen
                isEdit
                isAuthorized
                onClick={() => {
                  editCourse(_id)
                }}
              >
                <div className="text-white">Chỉnh sửa</div>
              </ButtonAuthen>

              <ButtonDelete
                isAuthorized
                onDelete={() => {
                  deleteCourseHandler(_id)
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
    [editCourse, deleteCourseHandler],
  )

  useEffect(() => {
    getCourses()
  }, [getCourses])

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

  const renderCreateCourseBtn = () => {
    return (
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/courses/new')}>
        Tạo mới
      </ButtonAuthen>
    )
  }

  // Hiển thị nút create course
  const renderHeader = () => {
    return <div className="p-3 d-flex justify-content-end">{renderCreateCourseBtn()}</div>
  }

  return (
    <div>
      <h3 className="title-content">Danh sách môn học</h3>
      <LoadingProvider>
        {renderHeader()}
        <div className="p-3">
          <TableProvider
            data={dataCourse || []}
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
