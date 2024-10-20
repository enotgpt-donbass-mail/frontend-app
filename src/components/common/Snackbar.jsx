'use client'
import { useSnackbar } from 'notistack'

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()

  const showSnackbar = (message, variant = 'default', options = {}) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },

      ...options
    })
  }

  return { showSnackbar }
}

export default useCustomSnackbar

export { SnackbarProvider as NotistackProvider } from 'notistack'
