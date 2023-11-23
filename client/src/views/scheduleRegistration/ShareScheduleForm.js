/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import { CButton, CCol, CForm } from '@coreui/react'
import { ButtonLoading } from 'src/components'
import { FormSelect } from 'src/components/FormControl'
import { optionsCourse, optionsRoom } from 'src/constants/scheduleRegistration'
import { shareScheduleSchema } from 'src/schemas/shareSchedule'
import { initValuesShareSchedule } from 'src/constants/shareSchedule'

const ShareScheduleForm = () => {
  const { id } = useParams()
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // Bắt validate và handle submit
  const formik = useFormik({
    initialValues: initValuesShareSchedule,
    validationSchema: shareScheduleSchema(id), // validate
    onSubmit: (values) => {
      const valuesUpdated = {
        ...values,
      }
    },
  })

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    setFieldValue,
    handleSubmit,
    setValues,
    touched,
    setTouched,
  } = formik

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name]
    }
    return ''
  }

  const renderShareWithUser = () => {
    const { share_with_user } = values

    return (
      <FormSelect
        require
        isClearable
        value={share_with_user}
        name="share_with_user"
        options={optionsRoom}
        label="Share with user"
        placeholder="Select user"
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
        isClearable
        value={name_schedule_share}
        name="name_schedule_share"
        options={optionsCourse}
        label="Name schedule share"
        placeholder="Select schedule"
        onChange={(value) => setFieldValue('name_schedule_share', value)}
        onBlur={(e) => {
          handleBlur(e)
          setTouched({ ...touched, name_schedule_share: true })
        }}
        error={validateInputField('name_schedule_share')}
      />
    )
  }

  const renderFormControl = () => {
    return (
      <>
        {renderShareWithUser()}
        {renderNameScheduleShare()}
        {/* {renderErrorMessage()} */}
      </>
    )
  }

  return (
    <div>
      <h3 className="title-content">Create Share Schedule</h3>
      <CForm className="mt-3 p-3 w-80-percent" onSubmit={handleSubmit}>
        {renderFormControl()}
        {/* <ButtonSubmit isLoading={isBtnLoading} id={id} /> */}
        <CCol xs={12} className="text-center">
          {isBtnLoading ? (
            <ButtonLoading />
          ) : (
            <CButton type="submit" className={`px-4 py-2`} color="primary">
              Share
            </CButton>
          )}
        </CCol>
      </CForm>
    </div>
  )
}

export default React.memo(ShareScheduleForm)
