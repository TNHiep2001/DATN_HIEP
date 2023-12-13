/* eslint-disable prettier/prettier */
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import { STATUS } from 'src/constants'
import API from 'src/services/api'
import { getListClassroom } from 'src/services/classroom'
import { httpRequest } from 'src/services/http.service'
import {
  closeModalStatic,
  hideLoading,
  openNotifyErrorServer,
  showLoading,
  showToastSuccess,
} from 'src/utils'

function ClassRoom() {
  const history = useHistory()
  const isUnmounted = useRef(false)

  const [dataClassroom, setDataClassroom] = useState()

  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
  })

  const { current_page, limit } = paging

  const getClassroom = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {
        page: current_page,
        limit: limit,
      }
      const { data, statusCode } = await getListClassroom(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return

        setDataClassroom(data.data)
        if (data.data.length > 0) setPaging(data.paging)
      }
    } catch (error) {
      openNotifyErrorServer(error.message)
    }
    hideLoading()
  }, [current_page, limit])

  useEffect(() => {
    getClassroom()
  }, [getClassroom])

  const editClassroom = useCallback(
    (idClassroom) => {
      const urlDetailClassroom = `/classRoom/${idClassroom}/edit`

      history.push(urlDetailClassroom)
    },
    [history],
  )

  const deleteClassroomHandler = useCallback(
    async (id) => {
      const url = `${API.DELETE_CLASSROOM}/${id}`
      try {
        const { statusCode } = await httpRequest().delete(url)
        if (statusCode === STATUS.SUCCESS_NUM) {
          showToastSuccess('Xóa', 'phòng học')
          getClassroom()
        }
      } catch (error) {
        openNotifyErrorServer()
      }
    },
    [getClassroom],
  )

  /**
   * data matching with field table
   * Dữ liệu để render thông tin vào table tương ứng với các trường
   */
  const columns = useMemo(
    () => [
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
        accessor: ({ _id, name }) => {
          return (
            <div className="d-flex justify-content-center">
              <ButtonAuthen
                isEdit
                isAuthorized
                onClick={() => {
                  editClassroom(_id)
                }}
              >
                <div className="text-white">Chỉnh sửa</div>
              </ButtonAuthen>

              <ButtonDelete
                isAuthorized
                onDelete={() => {
                  deleteClassroomHandler(_id)
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
    [editClassroom, deleteClassroomHandler],
  )

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

  const renderCreateClassroomBtn = () => {
    return (
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/classRoom/new')}>
        Tạo mới
      </ButtonAuthen>
    )
  }

  // Hiển thị nút create classroom
  const renderHeader = () => {
    return <div className="p-3 d-flex justify-content-end">{renderCreateClassroomBtn()}</div>
  }

  return (
    <div>
      <h3 className="title-content">Danh sách phòng học</h3>
      <LoadingProvider>
        {renderHeader()}
        <div className="p-3">
          <TableProvider
            data={dataClassroom || []}
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
