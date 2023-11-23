import CalendarAggregation from 'src/views/calendarAggregation'
import classRoom from 'src/views/classRoom'
import courses from 'src/views/courses'
import CoursesForm from 'src/views/courses/CoursesForm'
import scheduleRegistration from 'src/views/scheduleRegistration'
import ScheduleRegistrationForm from 'src/views/scheduleRegistration/ScheduleRegistrationForm'
import ShareScheduleForm from 'src/views/scheduleRegistration/ShareScheduleForm'
import Statistic from 'src/views/statistic'
import scheduleShareGeneral from 'src/views/scheduleShareGeneral'
import ClassRoomForm from 'src/views/classRoom/ClassRoomForm'
import Profile from 'src/views/profile/Profile'

const routes = [
  // Schedule Registration
  {
    path: '/scheduleRegistration',
    exact: true,
    name: 'Schedule Registration',
    component: scheduleRegistration,
    breadcrumbs: '/scheduleRegistration',
  },
  {
    path: '/scheduleRegistration/new',
    exact: true,
    name: 'Create Schedule Registration',
    component: ScheduleRegistrationForm,
    breadcrumbs: '/scheduleRegistration/new',
  },
  {
    path: '/scheduleRegistration/:id/edit',
    exact: true,
    name: 'Edit Schedule Registration',
    component: ScheduleRegistrationForm,
    breadcrumbs: '/scheduleRegistration/edit',
  },
  {
    path: '/scheduleRegistration/scheduleShare',
    exact: true,
    name: 'Create Share Schedule',
    component: ShareScheduleForm,
    breadcrumbs: '/scheduleRegistration/scheduleShare',
  },
  // Calendar Aggregation
  {
    path: '/calendarAggregation',
    exact: true,
    name: 'Calendar Aggregation',
    component: CalendarAggregation,
    breadcrumbs: '/calendarAggregation',
  },
  // Schedule Share General
  {
    path: '/scheduleShareGeneral',
    exact: true,
    name: 'Schedule Share General',
    component: scheduleShareGeneral,
    breadcrumbs: '/scheduleShareGeneral',
  },
  // Courses
  {
    path: '/courses',
    exact: true,
    name: 'Courses',
    component: courses,
    breadcrumbs: '/courses',
  },
  {
    path: '/courses/new',
    exact: true,
    name: 'Create Course',
    component: CoursesForm,
    breadcrumbs: '/courses/new',
  },
  {
    path: '/courses/:id/edit',
    exact: true,
    name: 'Edit Courses',
    component: CoursesForm,
    breadcrumbs: '/courses/edit',
  },
  //ClassRoom
  {
    path: '/classRoom',
    exact: true,
    name: 'Class Room',
    component: classRoom,
    breadcrumbs: '/classRoom',
  },
  {
    path: '/classRoom/new',
    exact: true,
    name: 'Create Class Room',
    component: ClassRoomForm,
    breadcrumbs: '/classRoom/new',
  },
  {
    path: '/classRoom/:id/edit',
    exact: true,
    name: 'Edit Class Room',
    component: ClassRoomForm,
    breadcrumbs: '/classRoom/edit',
  },
  //Statistic
  {
    path: '/statistic',
    exact: true,
    name: 'Statistic',
    component: Statistic,
    breadcrumbs: '/statistic',
  },
  //Profile
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    component: Profile,
    breadcrumbs: '/profile',
  },
]

export default routes
