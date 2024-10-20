'use client'
import { Row } from '@/components/common/FlexObjects'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { Box } from '@mui/material'

export function Header() {
  return (
    <Row height={'2em'}>
      <Row flex={1} alignItems={'center'} gap={1} justifyContent={'center'}>
        <Box
          width={'1em'}
          height={'1em'}
          component={'img'}
          src={CustomIMG.arrowDown}
        ></Box>
        <Box>Клиент</Box>
      </Row>
      <Row flex={1} alignItems={'center'} gap={1} justifyContent={'center'}>
        <Box
          width={'1em'}
          height={'1em'}
          component={'img'}
          src={CustomIMG.arrowDown}
        ></Box>
        <Box>Окно</Box>
      </Row>
    </Row>
  )
}
