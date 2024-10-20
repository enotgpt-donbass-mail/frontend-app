'use client'
import { Center, Row } from '@/components/common/FlexObjects'
import { CustomTextField } from '@/components/common/TextField'
import { Box, TextField } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function SearchPanel() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Row
      width={'100%'}
      height={'75px'}
      alignItems={'center'}
      paddingX={'1em'}
      boxSizing={'border-box'}
      justifyContent={'space-between'}
      bgcolor={'white'}
    >
      <CustomTextField
        slotProps={{
          input: {
            startAdornment: (
              <Center paddingRight={'14px'}>
                <Box
                  width={'20px'}
                  height={'20px'}
                  component={'img'}
                  src='https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=000000'
                ></Box>
              </Center>
            ),
            sx: { borderRadius: 3 }
          }
        }}
        placeholder='Поиск'
        size='small'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></CustomTextField>
      <Row height={'100%'} alignItems={'center'} gap={4}>
        <Messages />
        <Notifications />
        <Account />
      </Row>
    </Row>
  )
}
function Account() {
  const userPhoto = useSelector((state) => state.authReducer.value.userPhoto)
  return (
    <Center
      height={'68%'}
      bgcolor={'lightgreen'}
      borderRadius={100}
      sx={{ aspectRatio: '1' }}
    >
      <Center width={'90%'} height={'90%'} bgcolor={'white'} borderRadius={100}>
        <Box
          width={'90%'}
          height={'90%'}
          component={'img'}
          src={userPhoto}
          borderRadius={100}
          sx={{ objectFit: 'cover' }}
        ></Box>
      </Center>
    </Center>
  )
}
function Notifications() {
  return (
    <Center height={'40%'} sx={{ aspectRatio: '1' }} position={'relative'}>
      <Box position={'absolute'} right={0} top={0}>
        <Box
          width={'7px'}
          height={'7px'}
          bgcolor={'orange'}
          borderRadius={100}
        ></Box>
      </Box>
      <Box
        component={'img'}
        height={'90%'}
        width={'90%'}
        src='https://img.icons8.com/?size=100&id=eMfeVHKyTnkc&format=png&color=555555'
      ></Box>
    </Center>
  )
}
function Messages() {
  return (
    <Center height={'40%'} sx={{ aspectRatio: '1' }} position={'relative'}>
      <Box position={'absolute'} right={0} top={0}>
        <Box
          width={'7px'}
          height={'7px'}
          bgcolor={'orange'}
          borderRadius={100}
        ></Box>
      </Box>
      <Box
        component={'img'}
        height={'90%'}
        width={'90%'}
        src='https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=555555'
      ></Box>
    </Center>
  )
}
