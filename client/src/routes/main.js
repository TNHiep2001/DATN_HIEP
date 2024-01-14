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
import users from 'src/views/users'
import UsersForm from 'src/views/users/UsersForm'

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
    path: '/scheduleRegistration/:id/scheduleShare',
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
    name: 'Môn học',
    component: courses,
    breadcrumbs: '/courses',
  },
  {
    path: '/courses/new',
    exact: true,
    name: 'Tạo môn học',
    component: CoursesForm,
    breadcrumbs: '/courses/new',
  },
  {
    path: '/courses/:id/edit',
    exact: true,
    name: 'Chỉnh sửa môn học',
    component: CoursesForm,
    breadcrumbs: '/courses/edit',
  },
  //ClassRoom
  {
    path: '/classRoom',
    exact: true,
    name: 'Phòng học',
    component: classRoom,
    breadcrumbs: '/classRoom',
  },
  {
    path: '/classRoom/new',
    exact: true,
    name: 'Tạo phòng học',
    component: ClassRoomForm,
    breadcrumbs: '/classRoom/new',
  },
  {
    path: '/classRoom/:id/edit',
    exact: true,
    name: 'Thay đổi phòng học',
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
  //Users
  {
    path: '/users',
    exact: true,
    name: 'Người dùng',
    component: users,
    breadcrumbs: '/users',
  },
  {
    path: '/users/new',
    exact: true,
    name: 'Thêm tài khoản người dùng',
    component: UsersForm,
    breadcrumbs: '/users/new',
  },
  {
    path: '/users/:id/edit',
    exact: true,
    name: 'Chỉnh sửa tài khoản người dùng',
    component: UsersForm,
    breadcrumbs: '/sers/edit',
  },
]

export default routes
