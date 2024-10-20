import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export function AlertDialog({
  isOpen,
  setIsOpen,
  onAgree,
  onDisagree,
  title,
  contentText
}) {
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Отмена
          </Button>
          <Button
            onClick={() => {
              onAgree()
              handleClose()
            }}
          >
            Продолжить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
