'use client'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { Box } from '@mui/material'
export function LogoLeftCorner({ children }) {
  return (
    <Box position={'absolute'} width={'100%'}>
      <Box
        position={'relative'}
        top={20}
        left={20}
        height={'70px'}
        width={'auto'}
        component={'img'}
        src={CustomIMG.logoPost}
      ></Box>
    </Box>
  )
}
