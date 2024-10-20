'use client'
import { useEffect, useState } from 'react'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { ButtonOnTerminal } from './ButtonOnTerminal'
import { useRouter } from 'next/navigation'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { QRCodeSVG } from 'qrcode.react'

export function BottomBar({ block, setBlock }) {
  const router = useRouter()
  const [openQrCode, setOpenQrCode] = useState(true)
  return (
    <Row
      flex={2}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={'1vw'}
      fontSize={'1.5em'}
    >
      {openQrCode ? (
        <Center
          top={0}
          left={0}
          position={'absolute'}
          width={'100%'}
          height={'100%'}
        >
          <Box
            zIndex={0}
            position={'absolute'}
            width={'100%'}
            height={'100%'}
            bgcolor={CustomColors.grey[200]}
            sx={{ opacity: 0.7 }}
            onClick={() => {
              setOpenQrCode(false)
            }}
          ></Box>
          <Center zIndex={2} position={'absolute'}>
            <QRCodeSVG
              imageSettings={{
                src: CustomIMG.logoPost,
                height: 30,
                width: 30
              }}
              width={'100%'}
              height={'80%'}
              value={
                'https://t.me/post_donbass_bookings_bot?start=e29badb3-9508-413d-8170-97593a0a53a5__111111'
              }
            ></QRCodeSVG>
          </Center>
          <Box></Box>
        </Center>
      ) : (
        <></>
      )}
      <Row flex={1} width={'100%'} height={'100%'} gap={'1vw'}>
        {block != 0 ? (
          <Box flex={0.4}>
            <ButtonOnTerminal
              flex={0.5}
              title={'Назад'}
              onClick={() => {
                setBlock(0)
              }}
            ></ButtonOnTerminal>
          </Box>
        ) : (
          <></>
        )}
        <Box flex={1}>
          <ButtonOnTerminal
            color={'#546ba8'}
            title={'Бронь по записи'}
            onClick={() => {
              setOpenQrCode(true)
            }}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            border={5}
            borderColor={'#546ba8'}
            colorText={'#546ba8'}
            color={'#ffffff'}
            title={'Помощь'}
            onClick={() => {
              router.push('/terminal_talon/help')
            }}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Для льготной категории'}
            color={'#402a93'}
          ></ButtonOnTerminal>
        </Box>
      </Row>
    </Row>
  )
}
