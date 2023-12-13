export const END_POINT = process.env.REACT_APP_BASE_URL

const API = {
  LOGIN: `${END_POINT}/user/login`,
  GET_INFO_USER: `${END_POINT}/user/profile`,
  CHANGE_PASSWORD: `${END_POINT}/user/changePassword`,
  REGISTER: `${END_POINT}/user/register`,
  GET_INFO_CLASSROOM: `${END_POINT}/classroom/getInfo`,
  CREATE_CLASSROOM: `${END_POINT}/classroom/create`,
  EDIT_CLASSROOM: `${END_POINT}/classroom/edit`,
  DELETE_CLASSROOM: `${END_POINT}/classroom/delete`,
  DETAIL_CLASSROOM: `${END_POINT}/classroom/getDetail`,
}

export default API
