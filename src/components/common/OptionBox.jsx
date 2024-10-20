import { FormControlLabel, Radio } from '@mui/material'

export function CustomOptionBox({ label }) {
  return <FormControlLabel value={label} control={<Radio />} label={label} />
}
