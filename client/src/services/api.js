const BASE_URL = process.env.REACT_APP_BASE_URL

export const VERSION = 'v3'
export const ROOT_SEGMENT_ROUTING = 'consoles'

export const END_POINT = `${BASE_URL}${VERSION}/${ROOT_SEGMENT_ROUTING}/`

const API = {
  LOGIN: 'sessions/sign_in',
}

export default API
