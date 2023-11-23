import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { sideBarShowAction } from 'src/redux/actions/sideBarShow'
import routesSidebar from 'src/routes/sidebar'
import { AppSidebarNav } from './AppSidebarNav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { sidebarShow } = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar position="fixed" visible={sidebarShow}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <h4 className="fs-4">Edu Schedule TLU</h4>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={routesSidebar} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch(sideBarShowAction())} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
