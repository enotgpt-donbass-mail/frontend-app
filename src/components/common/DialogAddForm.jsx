import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { PostBlock } from '@/app/dashboard/page'

export function DialogAddForm({
  children,
  isOpen,
  setIsOpen,
  onAgree,
  onDisagree,
  title
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
        <PostBlock name={title} color='lightgreen' boxShadow={false}>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {children}
            </DialogContentText>
          </DialogContent>
        </PostBlock>
        <DialogActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
