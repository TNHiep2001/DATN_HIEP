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
  const role = localStorage.getItem('ROLE')

  let dataRoutesSidebar = routesSidebar
  if (role === 'teacher') {
    dataRoutesSidebar = routesSidebar.filter((value) => {
      if (
        value.role === 'all' ||
        value.role === 'teacher' ||
        value.role === 'student-teacher' ||
        value.role === 'teacher-admin'
      )
        return true
      return false
    })
  }

  if (role === 'student') {
    dataRoutesSidebar = routesSidebar.filter((value) => {
      if (value.role === 'all' || value.role === 'student-teacher') return true
      return false
    })
  }

  if (role === 'admin') {
    dataRoutesSidebar = routesSidebar.filter((value) => {
      if (value.role === 'all' || value.role === 'teacher-admin' || value.role === 'admin')
        return true
      return false
    })
  }

  return (
    <CSidebar position="fixed" visible={sidebarShow}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <h4 className="fs-4">Edu Schedule TLU</h4>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={dataRoutesSidebar} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch(sideBarShowAction())} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
