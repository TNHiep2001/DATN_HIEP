/* eslint-disable prettier/prettier */
import PropTypes, { number, string } from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAuthen, ButtonDelete, LoadingProvider, TableProvider } from 'src/components'
import { STATUS } from 'src/constants'
import { getListInfoUser } from 'src/services'
import API from 'src/services/api'
import { httpRequest } from 'src/services/http.service'
import {
  closeModalStatic,
  hideLoading,
  openNotifyErrorServer,
  showLoading,
  showToastSuccess,
} from 'src/utils'

function Users() {
  const history = useHistory()
  const isUnmounted = useRef(false)

  const [dataUsers, setDataUsers] = useState()

  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
  })

  const { current_page, limit } = paging

  const getUsers = useCallback(async () => {
    showLoading()
    try {
      const dataParams = {
        page: current_page,
        limit: limit,
      }
      const { data, statusCode } = await getListInfoUser(dataParams)
      if (statusCode === STATUS.SUCCESS_NUM) {
        if (isUnmounted.current) return

        setDataUsers(data.data)
        if (data.data.length > 0) setPaging(data.paging)
      }
    } catch (error) {
      openNotifyErrorServer(error.message)
    }
    hideLoading()
  }, [current_page, limit])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const editUser = useCallback(
    (idUser) => {
      const urlDetailUser = `/users/${idUser}/edit`

      history.push(urlDetailUser)
    },
    [history],
  )

  const deleteUserHandler = useCallback(
    async (id) => {
      const url = `${API.DELETE_USER}/${id}`
      try {
        const { statusCode } = await httpRequest().delete(url)
        if (statusCode === STATUS.SUCCESS_NUM) {
          showToastSuccess('Xóa', 'người dùng')
          getUsers()
        }
      } catch (error) {
        openNotifyErrorServer()
      }
    },
    [getUsers],
  )

  /**
   * data matching with field table
   * Dữ liệu để render thông tin vào table tương ứng với các trường
   */
  const columns = useMemo(
    () => [
      {
        Header: 'Họ',
        accessor: 'last_name',
        minWidth: 200,
      },
      {
        Header: 'Tên',
        accessor: 'first_name',
        minWidth: 200,
      },
      {
        Header: 'Email',
        accessor: 'email',
        minWidth: 300,
      },
      {
        Header: 'Chức vụ',
        accessor: 'role',
        minWidth: 200,
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
                  editUser(_id)
                }}
              >
                <div className="text-white">Chỉnh sửa</div>
              </ButtonAuthen>

              <ButtonDelete
                isAuthorized
                onDelete={() => {
                  deleteUserHandler(_id)
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
    [editUser, deleteUserHandler],
  )

  useEffect(() => {
    return () => {
      isUnmounted.current = true
      closeModalStatic()
    }
  }, [])

  const renderCreateClassroomBtn = () => {
    return (
      <ButtonAuthen isCreate isAuthorized onClick={() => history.push('/users/new')}>
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
      <h3 className="title-content">Danh sách người dùng</h3>
      <LoadingProvider>
        {renderHeader()}
        <div className="p-3">
          <TableProvider
            data={dataUsers || []}
            formatColumn={columns}
            paging={paging}
            setPaging={setPaging}
          />
        </div>
      </LoadingProvider>
    </div>
  )
}

Users.propTypes = {
  value: PropTypes.oneOfType([string, number]),
  id: PropTypes.number,
}

export default React.memo(Users)
