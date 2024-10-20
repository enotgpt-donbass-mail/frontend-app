'use client'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import ArrowDown from '../../public/images/arrow_down.png'
import { Center, Row } from '@/components/common/FlexObjects'
import { useEffect, useState } from 'react'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { CustomIMG } from '@/components/UI/images/imagesURL'
export default function MainPage() {
  const router = useRouter()
  return (
    <>
      <Header
        onProfileClick={() => {
          router.push('/profile')
        }}
      ></Header>
      <UpperBlock />
    </>
  )
}
//file

export const Header = ({ onProfileClick }) => {
  const router = useRouter()
  return (
    <Box
      position={'fixed'}
      zIndex={2}
      paddingTop={2}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      fontSize={'2rem'}
      sx={{
        '@media (max-width: 1024px)': { fontSize: '1.5rem' }
      }}
    >
      <Box
        width={'90%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
          onClick={() => {
            router.push('/')
          }}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Box
            component={'img'}
            src={CustomIMG.logoPost}
            width={50}
            height={50}
          ></Box>
          <Box
            fontWeight={700}
            color={'rgba(0,0,0,0.75)'}
            sx={{ '@media (max-width: 500px)': { display: 'none' } }}
          >
            Почта Донбасса
          </Box>
        </Box>
        <Box
          display={'flex'}
          gap={4}
          justifyContent={'end'}
          alignItems={'center'}
          fontWeight={300}
          fontSize={'0.6em'}
          color='#A0A0A0'
        >
          <Box
            display={'flex'}
            sx={{ '@media (max-width: 800px)': { display: 'none' } }}
            gap={4}
          >
            <Box>О приложении</Box>
            <Box>Особенности</Box>
            <Box>Примеры</Box>
          </Box>
          <HeaderButton onProfileClick={onProfileClick}></HeaderButton>
        </Box>
      </Box>
    </Box>
  )
}
const HeaderButton = ({ onProfileClick }) => {
  const [isLoadingState, setIsLoadingState] = useState(true)
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { data, isLoading, isSuccess, refetch } = useGetUsersMeQuery()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('access_token')) {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
      setIsLoadingState(false)
    }
  }, [data])

  const handleClick = async () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        await refetch()
        router.push('/')
      }
    }
  }

  if (isLoadingState) return <></>
  return (
    <>
      {isAuthorized && !isLoading && isSuccess ? (
        <Row
          alignItems={'center'}
          gap={1}
          paddingX={2}
          paddingY={1}
          border={1}
          borderRadius={4}
          borderColor={'rgb(0,0,0,0.4)'}
          onClick={onProfileClick ? onProfileClick : handleClick}
          sx={{
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <Center
            width={35}
            height={35}
            component={'img'}
            src={
              data.user.photo
                ? data.user.photo
                : 'https://img.icons8.com/?size=300&id=ABBSjQJK83zf&format=png&color=000000'
            }
            borderRadius={100}
            sx={{ '@media (max-width: 500px)': { display: 'none' } }}
          ></Center>
          <Box
            fontWeight={500}
            color={'rgba(0,0,0,0.75)'}
            sx={{ '@media (max-width: 500px)': { display: 'block' } }}
          >
            {data == undefined ? '' : data.user.first_name}
          </Box>
        </Row>
      ) : (
        <Box
          color={'black'}
          paddingX={4}
          paddingY={1}
          border={1}
          borderRadius={3}
          fontSize={'1em'}
          onClick={() => {
            router.push('/auth')
          }}
          sx={{ userSelect: 'none', cursor: 'pointer' }}
        >
          ВОЙТИ
        </Box>
      )}
    </>
  )
}

export const UpperBlock = () => {
  return (
    <Box>
      <ArrowsUp />
      <Box
        paddingTop={2}
        width={'100%'}
        height={'100dvh'}
        minHeight={'600px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={'2rem'}
        position={'relative'}
        overflow={'hidden'}
      >
        <Box
          width={'90%'}
          border={0}
          display={'flex'}
          alignItems={'stretch'}
          paddingX={4}
          gap={'4vw'}
          sx={{ '@media (max-width: 800px)': { width: '100%' } }}
        >
          <BgBubble left={-1600} color={'#B5EAEA'} />
          <BgBubble right={-1600} top={-1000} color={'#F38BA0'} />
          <BgBubble left={'0%'} bottom={'-1500px'} color={'#EDF6E5'} />

          <TextBlock />
        </Box>
      </Box>
      <Box height={'100dvh'}></Box>
    </Box>
  )
}

function BgBubble({ left, right, top, bottom, color }) {
  return (
    <Box
      zIndex={-1000}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      width={3000}
      height={2000}
      borderRadius={'100%'}
      position={'absolute'}
      sx={{
        userSelect: 'none',
        background: `radial-gradient(circle, ${color}44 0%, ${color}00 50%);`,
        filter: 'blur(10000px)',
        opacity: 1
      }}
    ></Box>
  )
}

function TextBlock() {
  const { data, isLoading, isSuccess, refetch } = useGetUsersMeQuery()

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      fontSize={'5vw'}
      lineHeight={1.2}
      sx={{ '@media (max-width: 800px)': { fontSize: '6vw' } }}
      fontWeight={700}
      color={'rgba(0, 0, 0, 0.6)'}
    >
      <Box>
        Сайт{' '}
        <Box component={'span'} color={'#546ba8'}>
          Почты Донбасса
        </Box>
      </Box>
      <Box>для электронной </Box>
      <Box>очереди</Box>
      <Box
        fontSize={'clamp(1rem, 10vw, 0.3em);'}
        fontWeight={300}
        paddingTop={'2vw'}
        paddingRight={'10vw'}
        color={'rgba(0, 0, 0, 0.6)'}
      >
        Наше приложение поможет пользователям регистрироваться <br />
        Удобный и рабочий функционал в нашем решении
      </Box>
    </Box>
  )
}

function ArrowsUp() {
  return (
    <Box
      width={'5vw'}
      position={'absolute'}
      right={'5vw'}
      height={'100dvh'}
      minHeight={'600px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ opacity: 0.1, '@media (max-width: 800px)': { right: '1vw' } }}
    >
      <Box
        height={'75%'}
        display={'flex'}
        flexDirection={'column'}
        sx={{
          '@keyframes appear': {
            '0%': { opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0 }
          }
        }}
      >
        <Arrow id={1} />
        <Arrow id={2} />
        <Arrow id={3} />
        <Arrow id={4} />
        <Arrow id={5} />
        <Arrow id={6} />
        <Arrow id={7} />
        <Arrow id={8} />
        <Arrow id={9} />
        <Arrow id={10} />
      </Box>
    </Box>
  )
}

function Arrow({ id }) {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      flex={1}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        opacity: 0,
        '@media (max-height: 800px)': { display: id > 8 ? 'none' : 'flex' },
        animationName: 'appear',
        animationDuration: '4s',
        animationDelay: `${id * 200}ms`,
        animationIterationCount: 'infinite'
      }}
    >
      <Box
        flex={1}
        component={'img'}
        width={'100%'}
        src={ArrowDown.src}
        sx={{ objectFit: 'contain' }}
      ></Box>
    </Box>
  )
}
