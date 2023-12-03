import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBook,
  cilCalendar,
  cilCalendarCheck,
  cilChart,
  cilRoom,
  cilTouchApp,
  cilUser,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const routesSidebar = [
  {
    component: CNavItem,
    name: 'Tổng hợp lịch trình',
    to: '/calendarAggregation',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Đăng ký lịch trình',
    to: '/scheduleRegistration',
    icon: <CIcon icon={cilTouchApp} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Lịch trình chia sẻ',
    to: '/scheduleShareGeneral',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/statistic',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Môn học',
    to: '/courses',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Phòng học',
    to: '/classRoom',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thông tin cá nhân',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default routesSidebar
