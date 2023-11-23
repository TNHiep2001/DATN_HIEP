import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
export default function Loading(prop) {
  const { isLoading } = useSelector((state) => state.loadingReducer)

  return (
    isLoading && (
      <div className="loading-container">
        <Spinner animation="border" variant="danger" role="status" />
      </div>
    )
  )
}
