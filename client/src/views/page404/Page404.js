import React from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'
import PropTypes from 'prop-types'

const Page404 = ({ isReload = true }) => {
  const handleBackHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {isReload && (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <div className="clearfix">
                <h1 className="float-start display-3 me-4 text-danger">404</h1>
                <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
                <p className="text-medium-emphasis float-start">
                  The page you are looking for was not found.
                </p>
              </div>
              <div>
                <CButton onClick={handleBackHome} className="mx-auto mt-3">
                  Back to home
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  )
}

Page404.propTypes = {
  isReload: PropTypes.bool,
}

export default React.memo(Page404)
