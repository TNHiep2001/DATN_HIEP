import React from 'react'

export default function Nodata() {
  return (
    <div className=" text-center p-5 text-gray">
      <h5 className="fs-2">No data available</h5>
      <button
        className="btn btn-primary mt-5"
        onClick={() => {
          window.location.reload()
        }}
      >
        Reload
      </button>
    </div>
  )
}
