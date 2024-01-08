import React from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { STORAGE_KEYS } from 'src/constants'

const AppHeaderDropdown = () => {
  const handleLogout = async () => {
    await localStorage.clear()
    window.location.href = '/login'
  }

  const renderName = () => {
    const result = localStorage.getItem(STORAGE_KEYS.USER_INFO)
    try {
      const userInfo = JSON.parse(result)
      return userInfo.name
    } catch (error) {
      localStorage.clear()
      return
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 text-center align-items-center d-flex px-0      "
        caret={false}
      >
        <CAvatar src="../../TLU.png"></CAvatar>
        <div className="ms-2">{renderName()}</div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem className="btn " onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
