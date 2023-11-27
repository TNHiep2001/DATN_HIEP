export const optionsRoom = [
  { label: '101 C5', value: '101c5' },
  { label: '102 C5', value: '102c5' },
  { label: '201 C5', value: '201c5' },
  { label: '202 C5', value: '202c5' },
  { label: '301 C5', value: '301c5' },
  { label: '302 C5', value: '302c5' },
  { label: '401 C5', value: '401c5' },
  { label: '402 C5', value: '402c5' },
]

export const optionsCourse = [
  { label: 'Lập trình hướng đối tượng', value: 'TLU1' },
  { label: 'Cấu trúc dữ liệu và giải thuật', value: 'TLU2' },
  { label: 'Tin học đại cương', value: 'TLU3' },
  { label: 'Nền tảng web', value: 'TLU4' },
  { label: 'Công nghệ web', value: 'TLU5' },
  { label: 'Truy hồi thông tin', value: 'TLU6' },
  { label: 'Học máy', value: 'TLU7' },
  { label: 'Điện toán đám mây', value: 'TLU8' },
]

export const optionsTypeSchedule = [
  { label: 'Lịch trình giảng dạy', value: 'eduType' },
  { label: 'Lịch trình sự kiện', value: 'evtType' },
]

export const optionsStatusSchedule = [
  { label: 'Hoàn thành', value: 'complete' },
  { label: 'Chưa hoàn thành', value: 'incomplete' },
  { label: 'Đang diễn ra', value: 'process' },
]

export const defaultType = { label: 'Lịch trình giảng dạy', value: 'eduType' }
export const defaultStatus = { label: 'Lịch trình sự kiện', value: 'incomplete' }

export const initValuesScheduleRegistration = {
  type: defaultType,
  lecture_content: '',
  total_num_lessons: '',
  total_credit_points: '',
  responsible_teacher: '',
  description: '',
  schedules: [],
}
