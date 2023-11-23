import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useRef } from 'react'
import { useTable } from 'react-table'
import { debounce } from 'src/utils'
import PropTypes, { array, object } from 'prop-types'

const MainTable = ({ columns, data, paging, setPaging }) => {
  const refSearch = useRef(null)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  const switchPage = (num) => {
    const newPaging = { ...paging }
    newPaging.current_page = num
    setPaging(newPaging)
  }
  const gotoPage = (num) => {
    if (num === paging.current_page || !num || num > paging.total_page) return
    switchPage(num)
  }
  const previousPage = () => {
    switchPage(paging.current_page - 1)
  }
  const nextPage = () => {
    switchPage(paging.next_page)
  }

  const setPageSize = (pageSize) => {
    setPaging({ ...paging, ...{ limit: pageSize } })
  }

  /**
   * Func xử lí nhập số page cần đến
   * @param {string} value
   */
  const handleChangePage = (value) => {
    debounce(gotoPage, Number(value), refSearch)
  }

  return (
    <>
      <CTable
        className="text-normal text-center"
        bordered
        responsive
        align="top"
        {...getTableProps()}
      >
        <CTableHead>
          {headerGroups.map((headerGroup, index) => (
            <CTableRow align="middle" key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <CTableHeaderCell
                  key={index}
                  {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  {column.render('Header')}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          ))}
        </CTableHead>
        <CTableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <CTableRow key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <CTableDataCell
                      key={index}
                      {...cell.getCellProps({
                        style: {
                          minWidth: cell.column.minWidth,
                          width: cell.column.width,
                        },
                      })}
                    >
                      {cell.render('Cell')}
                    </CTableDataCell>
                  )
                })}
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>

      <div className="pagination">
        <button
          className="btn-pagination btn border border-primary mx-1 px-3 py-2"
          onClick={() => gotoPage(1)}
          disabled={paging.current_page === 1}
        >
          {'<<'}
        </button>{' '}
        <button
          className="btn-pagination btn border border-primary mx-1 px-3"
          onClick={() => previousPage()}
          disabled={paging.current_page === 1}
        >
          {'<'}
        </button>{' '}
        <button
          className="btn-pagination btn border border-primary mx-1 px-3"
          onClick={() => nextPage()}
          disabled={paging.current_page === paging.total_page}
        >
          {'>'}
        </button>{' '}
        <button
          className="btn-pagination btn border border-primary mx-1 px-3"
          onClick={() => gotoPage(paging.total_page)}
          disabled={paging.current_page === paging.total_page}
        >
          {'>>'}
        </button>{' '}
        <span className="mx-2">
          Page{' '}
          <strong>
            {paging.current_page} of {paging.total_page}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            ref={refSearch}
            min="1"
            max={paging.total_page}
            className="border btn-pagination border-primary mx-1 rounded px-2 mw-100"
            type="number"
            placeholder="Page"
            onInput={(e) => {
              // Block case user input e , +, -
              if (e.target.value === '') {
                e.target.value = ''
              }
            }}
            onChange={(e) => {
              const page = e.target.value
              handleChangePage(page)
            }}
          />
        </span>{' '}
        <select
          className="btn-pagination btn border border-primary mx-1 h-43"
          value={paging.limit}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

MainTable.propTypes = {
  columns: PropTypes.oneOfType([array, object]),
  data: PropTypes.array,
  paging: PropTypes.object,
  setPaging: PropTypes.func,
}

export default MainTable
