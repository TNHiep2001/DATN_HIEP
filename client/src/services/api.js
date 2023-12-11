export const END_POINT = process.env.REACT_APP_BASE_URL

const API = {
  LOGIN: `${END_POINT}/user/login`,
  GET_INFO_USER: `${END_POINT}/user/profile`,
}

export default API
