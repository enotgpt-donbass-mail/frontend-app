import styled from '@emotion/styled'
import { TextField } from '@mui/material'

export const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4'
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C'
    }
  }
})
