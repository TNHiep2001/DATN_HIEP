let idTimer = null

export const debounce = (callback, value, option) => {
  if (idTimer) {
    clearTimeout(idTimer)
  }
  idTimer = setTimeout(() => {
    callback(value)
    if (option) {
      option.current.blur()
    }
  }, 500)
}
