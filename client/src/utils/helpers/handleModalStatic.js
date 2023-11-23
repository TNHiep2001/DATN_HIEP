import { hideModalStatic, setVisibleModalStatic } from 'src/redux/actions'
import { dispatch } from 'src/redux/configStore'

export const openModalStaticUnauthorized = () => {
  dispatch(
    setVisibleModalStatic({
      title: 'The session has expired. Please log in again',
      visible: true,
      nameAction: 'Confirm',
      action: () => {
        localStorage.clear()
        window.location.href = '/login'
      },
    }),
  )
}

export const openModalStaticForbidden = () => {
  dispatch(
    setVisibleModalStatic({
      title: "You don't have permission to this features",
      visible: true,
      action: () => window.location.reload(),
      nameAction: 'Reload',
    }),
  )
}

export const closeModalStatic = () => {
  dispatch(hideModalStatic())
}
