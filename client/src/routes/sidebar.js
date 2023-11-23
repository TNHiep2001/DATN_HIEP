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
    name: 'Calendar Aggregation',
    to: '/calendarAggregation',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schedule Registration',
    to: '/scheduleRegistration',
    icon: <CIcon icon={cilTouchApp} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schedule Share General',
    to: '/scheduleShareGeneral',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Statistic',
    to: '/statistic',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Class Room',
    to: '/classRoom',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default routesSidebar
