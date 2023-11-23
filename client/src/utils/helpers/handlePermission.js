/**
 * Kiểm tra resource_name có trong danh sách permission trả về hay không nếu có trả về true ngược lại false
 * @param {array} current_permissions Danh sách current permissions mà api trả về
 * @param {string} resource_name tên resource muốn so sánh
 * @returns boolean
 */
export const isEqualResourceName = (current_permissions, resource_name) => {
  return current_permissions.includes(resource_name)
}

/**
 * Kiểm tra xem có method_name có trong danh sách permissions của resource_name tương ứng
 * @param {array} current_permissions Danh sách permissions mà api trả về
 * @param {string} resource_name tên của resource muốn check
 * @param {string} method_name tên phương thức muốn check
 * @return boolean
 */
export const isMethodNamePermission = (current_permissions, resource_name, method_name) => {
  const permission = current_permissions.find(
    (permission) => permission.resource_name === resource_name,
  )
  if (!permission) return false
  const { permissions } = permission
  const isPermission = permissions.some((item) => item.method_name === method_name)
  return isPermission
}
