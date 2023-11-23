/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'

const DetailScheduleShare = ({ visible, setVisible, idDetail }) => {
  const handleCloseDetailModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const renderTypeSchedule = () => {
    const type = 'Teaching Schedule'
    return (
      <CRow className="d-flex align-item-center mb-3">
        <CCol sx={12} md={3}>
          <Typography>Type schedule:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <Button
            style={{
              backgroundColor: type === 'Teaching Schedule' ? '#FF5B22' : '#F1EFEF',
              color: type === 'Teaching Schedule' ? '#fff' : '#000',
              marginRight: '20px',
            }}
          >
            Teaching schedule
          </Button>
          <Button
            style={{
              backgroundColor: type === 'Event Schedule' ? '#FF5B22' : '#F1EFEF',
              color: type === 'Event Schedule' ? '#fff' : '#000',
            }}
          >
            Event schedule
          </Button>
        </CCol>
      </CRow>
    )
  }

  const renderNameUser = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Name User:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <CFormInput disabled name="name_user" value={'Kiều Tuấn Dũng'} />
        </CCol>
      </CRow>
    )
  }

  const renderLectureContent = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Lecture Content:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <CFormInput disabled name="lecture_content" value={'Giới thiệu về công nghệ website'} />
        </CCol>
      </CRow>
    )
  }

  const renderStatus = () => {
    const status = 'Complete'
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Status:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <Box
            sx={{
              width: '100px',
              height: '40px',
              backgroundColor: status === 'Complete' ? '#5F8D4E' : '#E25E3E',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
            }}
          >
            {status}
          </Box>
        </CCol>
      </CRow>
    )
  }

  const renderDateSchedule = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Schedule Date:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '36px',
              border: '1px solid #000',
              borderRadius: '6px',
            }}
          >
            12/11/2023
          </Box>
        </CCol>
      </CRow>
    )
  }

  const renderDaySchedule = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Schedule Day:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <Box
            sx={{
              width: '100px',
              height: '40px',
              backgroundColor: '#FF5B22',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
            }}
          >
            Monday
          </Box>
        </CCol>
      </CRow>
    )
  }

  const renderTimeSchedule = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Schedule Time:</Typography>
        </CCol>
        <CCol sx={12} md={9} className="d-flex">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '36px',
              border: '1px solid #000',
              borderRadius: '6px',
            }}
          >
            12:00 PM
          </Box>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>~</div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '36px',
              border: '1px solid #000',
              borderRadius: '6px',
            }}
          >
            14:00 PM
          </Box>
        </CCol>
      </CRow>
    )
  }

  const renderCourse = () => {
    // if (typeSchedule !== 'Teaching Schedule') return null
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Course:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <CFormInput disabled name="course" value={'Công nghệ web'} />
        </CCol>
      </CRow>
    )
  }

  const renderClassRoom = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Class Room:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <Box
            sx={{
              width: '100px',
              height: '40px',
              backgroundColor: '#FF5B22',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
            }}
          >
            401 - C5
          </Box>
        </CCol>
      </CRow>
    )
  }

  const renderDescription = () => {
    return (
      <CRow className="mb-3">
        <CCol sx={12} md={3}>
          <Typography>Description:</Typography>
        </CCol>
        <CCol sx={12} md={9}>
          <CFormTextarea
            disabled
            name="description"
            value={'Toàn bộ mọi thứ về mô tả tôi sẽ để ở đây nhé!!!'}
          />
        </CCol>
      </CRow>
    )
  }

  const renderBodyModal = () => {
    return (
      <CModalBody>
        {renderTypeSchedule()}
        {renderNameUser()}
        {renderLectureContent()}
        {renderStatus()}
        {renderDateSchedule()}
        {renderDaySchedule()}
        {renderTimeSchedule()}
        {renderCourse()}
        {renderClassRoom()}
        {renderDescription()}
      </CModalBody>
    )
  }

  return (
    <>
      <CModal size="xl" visible={visible} onClose={handleCloseDetailModal}>
        <CModalHeader>
          <CModalTitle className="fs-3 fw-normal">Info Schedule</CModalTitle>
        </CModalHeader>
        {renderBodyModal()}
      </CModal>
    </>
  )
}

DetailScheduleShare.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  idDetail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default DetailScheduleShare
