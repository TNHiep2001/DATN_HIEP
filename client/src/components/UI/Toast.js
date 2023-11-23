import { CToast, CToastClose, CToaster, CToastHeader } from '@coreui/react'
import React, { useRef } from 'react'
import CIcon from '@coreui/icons-react'
import { cilChevronCircleDownAlt, cilWarning, cilInfo } from '@coreui/icons'
import { useSelector } from 'react-redux'
import { toasterSelector } from 'src/redux/reducers/toaster'

function Toast() {
  const { status, info } = useSelector(toasterSelector)
  const { title, message, type, duration } = info
  const listIcon = {
    danger: cilWarning,
    warning: cilWarning,
    success: cilChevronCircleDownAlt,
    info: cilInfo,
  }
  const toaster = useRef()

  const ToastElement = status && (
    <CToast delay={duration} className={`align-items-center my-toast toast--${type}`}>
      <CToastHeader>
        <div className="d-flex align-items-center ">
          <CIcon className={`text-${type} fw-bold`} size="xl" icon={listIcon[type]} />
          <div className="ms-3">
            <b className={`me-auto text-${type}`}>{title}</b>
            <div>{message}</div>
          </div>
        </div>
        <CToastClose className="me-2 m-auto toast-close" />
      </CToastHeader>
    </CToast>
  )
  return (
    <>
      <CToaster ref={toaster} push={ToastElement} placement="top-end" />
    </>
  )
}

export default Toast
