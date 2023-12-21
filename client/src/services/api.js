export const END_POINT = process.env.REACT_APP_BASE_URL

const API = {
  LOGIN: `${END_POINT}/user/login`,
  GET_INFO_USER: `${END_POINT}/user/profile`,
  GET_LIST_USER: `${END_POINT}/user/getListUser`,
  CHANGE_PASSWORD: `${END_POINT}/user/changePassword`,
  REGISTER: `${END_POINT}/user/register`,
  //classroom
  GET_INFO_CLASSROOM: `${END_POINT}/classroom/getInfo`,
  CREATE_CLASSROOM: `${END_POINT}/classroom/create`,
  EDIT_CLASSROOM: `${END_POINT}/classroom/edit`,
  DELETE_CLASSROOM: `${END_POINT}/classroom/delete`,
  DETAIL_CLASSROOM: `${END_POINT}/classroom/getDetail`,
  GET_LIST_CLASSROOM: `${END_POINT}/classroom/getListClassroom`,
  //course
  GET_INFO_COURSE: `${END_POINT}/course/getInfo`,
  CREATE_COURSE: `${END_POINT}/course/create`,
  DETAIL_COURSE: `${END_POINT}/course/getDetail`,
  EDIT_COURSE: `${END_POINT}/course/edit`,
  DELETE_COURSE: `${END_POINT}/course/delete`,
  GET_LIST_COURSE: `${END_POINT}/course/getListCourse`,
  //schedule
  GET_INFO_SCHEDULE: `${END_POINT}/schedule/getInfo`,
  CREATE_SCHEDULE: `${END_POINT}/schedule/create`,
  DETAIL_SCHEDULE: `${END_POINT}/schedule/getDetail`,
  EDIT_SCHEDULE: `${END_POINT}/schedule/edit`,
  DELETE_SCHEDULE: `${END_POINT}/schedule/delete`,
  GET_FULL_SCHEDULE: `${END_POINT}/schedule/getFullSchedule`,
  GET_SHARE_SCHEDULE: `${END_POINT}/schedule/getShareSchedule`,
  //share schedule
  CREATE_SHARE_SCHEDULE: `${END_POINT}/shareSchedule/create`,
  GET_LIST_SHARE_SCHEDULE: `${END_POINT}/shareSchedule/getListShareSchedule`,
}

export default API
