import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilXCircle } from '@coreui/icons'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import { useSelector } from 'react-redux'

const ModalStatic = () => {
  const { values } = useSelector((state) => state.modalStatic)
  const { title, action, nameAction, visible } = values

  return (
    <CModal visible={visible}>
      <CModalHeader className="justify-content-center bg-danger text-white" closeButton={false}>
        <CIcon icon={cilXCircle} size="3xl" />
      </CModalHeader>
      <CModalBody>
        <h5 className="mb-0 text-center py-4">{title}</h5>
      </CModalBody>
      <CModalFooter>
        <CButton onClick={action} color="primary">
          {nameAction}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default React.memo(ModalStatic)
