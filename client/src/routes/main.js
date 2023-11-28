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
    name: 'Danh sách lịch trình',
    component: scheduleRegistration,
    breadcrumbs: '/scheduleRegistration',
  },
  {
    path: '/scheduleRegistration/new',
    exact: true,
    name: 'Tạo lịch trình',
    component: ScheduleRegistrationForm,
    breadcrumbs: '/scheduleRegistration/new',
  },
  {
    path: '/scheduleRegistration/:id/edit',
    exact: true,
    name: 'Chỉnh sửa lịch trình',
    component: ScheduleRegistrationForm,
    breadcrumbs: '/scheduleRegistration/edit',
  },
  {
    path: '/scheduleRegistration/scheduleShare/:id',
    exact: true,
    name: 'Chia sẻ lịch trình',
    component: ShareScheduleForm,
    breadcrumbs: '/scheduleRegistration/scheduleShare',
  },
  // Calendar Aggregation
  {
    path: '/calendarAggregation',
    exact: true,
    name: 'Tổng hợp lịch trình',
    component: CalendarAggregation,
    breadcrumbs: '/calendarAggregation',
  },
  // Schedule Share General
  {
    path: '/scheduleShareGeneral',
    exact: true,
    name: 'Lịch trình chia sẻ',
    component: scheduleShareGeneral,
    breadcrumbs: '/scheduleShareGeneral',
  },
  // Courses
  {
    path: '/courses',
    exact: true,
    name: 'Khóa học',
    component: courses,
    breadcrumbs: '/courses',
  },
  {
    path: '/courses/new',
    exact: true,
    name: 'Tạo khóa học',
    component: CoursesForm,
    breadcrumbs: '/courses/new',
  },
  {
    path: '/courses/:id/edit',
    exact: true,
    name: 'Chỉnh sửa lớp học',
    component: CoursesForm,
    breadcrumbs: '/courses/edit',
  },
  //ClassRoom
  {
    path: '/classRoom',
    exact: true,
    name: 'Lớp học',
    component: classRoom,
    breadcrumbs: '/classRoom',
  },
  {
    path: '/classRoom/new',
    exact: true,
    name: 'Tạo lớp học',
    component: ClassRoomForm,
    breadcrumbs: '/classRoom/new',
  },
  {
    path: '/classRoom/:id/edit',
    exact: true,
    name: 'Chỉnh sửa lớp học',
    component: ClassRoomForm,
    breadcrumbs: '/classRoom/edit',
  },
  //Statistic
  {
    path: '/statistic',
    exact: true,
    name: 'Thống kê',
    component: Statistic,
    breadcrumbs: '/statistic',
  },
  //Profile
  {
    path: '/profile',
    exact: true,
    name: 'Thông tin cá nhân',
    component: Profile,
    breadcrumbs: '/profile',
  },
]

export default routes
