import { CCol, CRow } from '@coreui/react'
import React from 'react'
import { Box, Typography } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'
import { listHomeItems } from 'src/constants/home'
import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory()

  const renderBoxItems = () => {
    const handleClickItemBox = (path) => {
      history.push(`/${path}`)
    }

    return listHomeItems.map((item, index) => {
      return (
        <CCol
          key={index}
          md={3}
          className="item-box-home"
          style={{
            width: '22%',
            minHeight: '150px',
            margin: '18px',
            backgroundColor: '#7C96AB',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={() => handleClickItemBox(item.path)}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <CIcon
              icon={cilCalendar}
              width={55}
              height={55}
              style={{ color: '#fff', marginBottom: '12px' }}
            />
            <Typography style={{ color: '#fff', fontSize: '16px' }}>{item.label}</Typography>
          </Box>
        </CCol>
      )
    })
  }

  const renderBody = () => {
    return <CRow className="p-3 d-flex">{renderBoxItems()}</CRow>
  }

  return <div>{renderBody()}</div>
}

export default React.memo(Home)
