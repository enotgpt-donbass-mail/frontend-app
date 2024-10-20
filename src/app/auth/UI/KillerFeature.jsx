'use client'
import { Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'

export function KillerFeatchure({ children }) {
  return (
    <Row alignItems={'center'} gap={1.5} color={'#777777'} fontWeight={600}>
      <Box
        height={'1.7em'}
        width={'auto'}
        component={'img'}
        src='https://img.icons8.com/?size=100&id=QPQ8uqS9OEpa&format=png&color=00bb00'
      ></Box>
      {children}
    </Row>
  )
}
