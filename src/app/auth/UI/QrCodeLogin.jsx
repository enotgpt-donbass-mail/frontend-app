'use client'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import {
  useLazyGetQrCodeQuery,
  useLazyGetQrLongpollQuery
} from '@/lib/api/AuthApi'
import { Box } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

import { QRCodeSVG } from 'qrcode.react'
import { useEffect } from 'react'

export function QrCodeLogin({ setQrCodeLogin }) {
  const router = useRouter()
  const params = useSearchParams()
  const pageToRedir = params.get('redir') ?? '/'
  const [getQrCode, results, { isLoading }] = useLazyGetQrCodeQuery()
  const [getQrLongpoll] = useLazyGetQrLongpollQuery()
  useEffect(() => {
    getQrCode()
      .unwrap()
      .then((res) => {
        getQrLongpoll(res.token)
          .unwrap()
          .then((fulfilled) => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('access_token', fulfilled.access_token)
              localStorage.setItem('refresh_token', fulfilled.refresh_token)

              router.push(pageToRedir)
            }
          })
      })
  }, [])
  return (
    <Center
      position={'absolute'}
      top={0}
      left={0}
      width={'100%'}
      height={'100%'}
      zIndex={80}
    >
      <Box
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        bgcolor={'#000000aa'}
        onClick={() => {
          setQrCodeLogin(false)
        }}
      ></Box>
      <Center
        bgcolor={'white'}
        padding={5}
        position={'relative'}
        zIndex={82}
        borderRadius={4}
      >
        <Row
          alignItems={'center'}
          gap={4}
          sx={{
            '@media screen and (max-width: 1024px)': {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
        >
          <Box padding={2} boxSizing={'border-box'} border={5} borderRadius={3}>
            {isLoading || !results.data ? (
              <Box>Загрузка</Box>
            ) : (
              <QRCodeSVG
                imageSettings={{
                  src: CustomIMG.logoPost,
                  height: 30,
                  width: 30
                }}
                width={'100%'}
                height={'100%'}
                value={results.data?.token}
              ></QRCodeSVG>
            )}
          </Box>
          <Column
            fontSize={'1.5em'}
            sx={{
              '@media screen and (max-width: 1024px)': {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }}
          >
            <Box
              width={'200px'}
              height={'200px'}
              sx={{
                backgroundImage:
                  'url("https://img.icons8.com/?size=500&id=Y9eKbZgJIt4F&format=png&color=000000")',
                backgroundSize: 'contain'
              }}
            ></Box>
            <Box>Отсканируйте QR-код</Box>
            <Box>в мобильном приложении</Box>
            <Box fontSize={'1.5em'} fontWeight={700}>
              Почта Донбасса
            </Box>
          </Column>
        </Row>
      </Center>
    </Center>
  )
}
