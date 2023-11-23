import React from 'react'
import PropTypes, { array, object } from 'prop-types'
import { MainTable, NoData } from '..'

const TableProvider = ({ data, formatColumn, paging, setPaging }) => {
  if (data.length === 0) return <NoData />

  return (
    <div className="style-table">
      <MainTable setPaging={setPaging} paging={paging} columns={formatColumn} data={data} />
    </div>
  )
}

TableProvider.propTypes = {
  formatColumn: PropTypes.oneOfType([array, object]),
  data: PropTypes.array,
  paging: PropTypes.object,
  setPaging: PropTypes.func,
}

export default TableProvider
