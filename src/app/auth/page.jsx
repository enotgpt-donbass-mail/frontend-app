'use client'
import { Column, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogoLeftCorner } from './UI/LogoLeftCorner'
import { KillerFeatchure } from './UI/KillerFeature'
import { RegisterBlock } from './UI/RegisterBlock'
import { LoginBlock } from './UI/LoginBlock'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const colorLogo = '444444'
  const router = useRouter()

  const [isRegistering, setIsRegistering] = useState(false)
  const [emailField, setEmailField] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('access_token')) {
        router.push('/')
      } else {
        setIsLoading(false)
      }
    }
  }, [])
  if (isLoading) return <Box></Box>
  return (
    <Row width={'100vw'} height={'100svh'}>
      <LogoLeftCorner></LogoLeftCorner>
      <Column
        flex={40}
        height={'100%'}
        bgcolor={'#00000005 '}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ '@media screen and (max-width: 1024px)': { display: 'none' } }}
      >
        <Box
          marginBottom={6}
          height={'15%'}
          width={'auto'}
          component={'img'}
          src={
            'https://img.icons8.com/?size=500&id=F20OYoZopkQd&format=png&color=' +
            colorLogo
          }
        ></Box>
        <Box fontSize={'3em'} fontWeight={700} color={'#' + colorLogo}>
          Почта Донбасса
        </Box>
        <Column fontSize={'1.2em'} gap={'1em'} marginTop={6}>
          <KillerFeatchure>Быстрая доставка</KillerFeatchure>
          <KillerFeatchure>Удобное бронирование</KillerFeatchure>
          <KillerFeatchure>Комфортное обслуживание</KillerFeatchure>
        </Column>
      </Column>
      {isRegistering ? (
        <RegisterBlock emailField={emailField}></RegisterBlock>
      ) : (
        <LoginBlock
          emailField={emailField}
          setEmailField={setEmailField}
          setIsRegistering={setIsRegistering}
        ></LoginBlock>
      )}
    </Row>
  )
}
