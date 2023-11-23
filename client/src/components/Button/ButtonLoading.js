import { CButton, CSpinner } from '@coreui/react'
import React from 'react'

export default function ButtonLoading() {
  return (
    <CButton className="px-4 py-2" disabled>
      <CSpinner component="span" size="sm" aria-hidden="true" />
      <span className="ms-1">Loading...</span>
    </CButton>
  )
}
