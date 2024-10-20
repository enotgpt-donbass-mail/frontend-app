'use client'
import { styled, Box } from '@mui/material'

export const Row = styled(Box)(({ flexDirection = 'row' }) => ({
  display: 'flex',
  flexDirection: flexDirection
}))

export const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
})

export const Center = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})
