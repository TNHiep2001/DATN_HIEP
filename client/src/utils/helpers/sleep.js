export function sleep(miliseconds) {
  return new Promise((resolve) => {
    window.idTimer = setTimeout(resolve, miliseconds)
  })
}
