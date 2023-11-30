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
            margin: '18px 1.5%',
            backgroundColor: '#677a99',
            borderRadius: '10px',
            cursor: 'pointer',
            // backgroundImage: `url('data:image/png;base64,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')`,
            // backgroundBlendMode: 'color-burn',
            // backgroundRepeat: 'no-repeat',
            // backgroundPosition: 'center',
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
