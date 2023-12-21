/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { CButton, CCol, CForm } from '@coreui/react'
import { ButtonLoading } from 'src/components'
import { FormSelect } from 'src/components/FormControl'
import { shareScheduleSchema } from 'src/schemas/shareSchedule'
import { initValuesShareSchedule } from 'src/constants/shareSchedule'
import { getListUserApi, getShareScheduleApi } from 'src/services'
import { STATUS } from 'src/constants'
import { openNotifyErrorServer, showToastSuccess } from 'src/utils'
import { transformShareScheduleValues } from 'src/utils/helpers/transformData/shareSchedule'
import { createShareScheduleApi } from 'src/services/shareSchedule'

const ShareScheduleForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [dataSchedule, setDataSchedule] = useState([])
  const [listUser, setListUser] = useState([])

  const id_user = localStorage.getItem('ID')

  const handleCreateSchedule = async (dataCreate) => {
    setIsBtnLoading(true)
    try {
      const { statusCode, message } = await createShareScheduleApi(dataCreate)
      if (statusCode === STATUS.SUCCESS_NUM) {
        showToastSuccess('Chia sẻ', 'lịch trình')
        history.push('/scheduleRegistration')
      } else {
        openNotifyErrorServer(message)
      }
    } catch (error) {
      openNotifyErrorServer(error.response.data.message)
    }
    setIsBtnLoading(false)
  }

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesShareSchedule,
    validationSchema: shareScheduleSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
        id_user,
      }
      const dataSubmit = transformShareScheduleValues({ values: valuesUpdated })
      handleCreateSchedule(dataSubmit)
    },
  })

  const { values, errors, handleBlur, setFieldValue, handleSubmit, touched, setTouched } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const getShareSchedule = useCallback(async () => {
    if (!id) return

    try {
      const { statusCode, data } = await getShareScheduleApi(id)
      if (statusCode === STATUS.SUCCESS_NUM) {
        setDataSchedule(data.data)
        setFieldValue('name_schedule_share', data.data)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [id, setFieldValue])

  useEffect(() => {
    getShareSchedule()
  }, [getShareSchedule])

  const getListUser = useCallback(async () => {
    try {
      const { statusCode, data } = await getListUserApi()
      if (statusCode === STATUS.SUCCESS_NUM) {
        setListUser(data.data)
      }
    } catch (_) {
      openNotifyErrorServer()
    }
  }, [])

  useEffect(() => {
    getListUser()
  }, [getListUser])

  const renderShareWithUser = () => {
    const { share_with_user } = values

    return (
      <FormSelect
        require
        isClearable
        value={share_with_user}
        name="share_with_user"
        options={listUser}
        label="Chia sẻ với"
        placeholder="Chọn người dùng muốn chia sẻ"
        onChange={(value) => setFieldValue('share_with_user', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, share_with_user: true })
        }}
        error={validateInputField('share_with_user')}
      />
    )
  }

  const renderNameScheduleShare = () => {
    const { name_schedule_share } = values
    return (
      <FormSelect
        require
        value={name_schedule_share}
        name="name_schedule_share"
        label="Tên lịch trình chia sẻ"
        placeholder="Chọn lịch trình muốn chia sẻ"
        error={validateInputField('name_schedule_share')}
      />
    )
  }

  const renderFormControl = () => {
    return (
      <>
        {renderShareWithUser()}
        {renderNameScheduleShare()}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">Chia sẻ lịch trình</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        <CCol xs={12} className="text-center">
          {isBtnLoading ? (
            <ButtonLoading />
          ) : (
            <CButton type="submit" className={`px-4 py-2`} color="primary">
              Chia sẻ
            </CButton>
          )}
        </CCol>
      </CForm>
    </div>
  )
}

export default React.memo(ShareScheduleForm)
