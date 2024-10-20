'use client'
import { useEffect, useState } from 'react'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { CustomColors } from '@/components/UI/colors/CustomColors'

export function Header() {
  const [textDate, setTextDate] = useState()
  const [textTime, setTextTime] = useState()

  useEffect(() => {
    var interval = setInterval(() => {
      var today = new Date()
      var timeText = ''
      var hours = String(today.getHours()).padStart(2, '0')
      var minutes = String(today.getMinutes()).padStart(2, '0')
      var seconds = String(today.getSeconds()).padStart(2, '0')
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()
      today = dd + '/' + mm + '/' + yyyy
      timeText = hours + ':' + minutes + ':' + seconds
      setTextTime(timeText)
      setTextDate(today)
    }, 500)
    return () => clearInterval(interval)
  }, [])
  return (
    <Row flex={1} alignItems={'center'} justifyContent={'space-between'}>
      <Box flex={2}>
        <Box
          height={'100%'}
          maxHeight={100}
          width={'auto'}
          component={'img'}
          src='https://postdonbass.ru/sites/default/files/logotip_0.png'
        ></Box>
      </Box>
      <Box
        flex={6}
        textAlign={'center'}
        fontSize={'3em'}
        fontWeight={700}
        color={'#213875'}
      >
        Почта Донбасса
      </Box>
      <Row
        flex={2}
        justifyContent={'end'}
        gap={'1vw'}
        height={'100%'}
        alignItems={'center'}
      >
        <Column
          width={'80px'}
          height={'60px'}
          border={1}
          borderColor={CustomColors.grey[700]}
          borderRadius={'0.25em'}
          overflow={'hidden'}
        >
          <Box height={'100%'}></Box>
          <Box height={'100%'} bgcolor={'blue'}></Box>
          <Box height={'100%'} bgcolor={'red'}></Box>
        </Column>
        <Column alignItems={'end'} color={'#192a58'} fontWeight={600}>
          <Box fontSize={'2em'}>{textDate}</Box>
          <Box fontSize={'2em'}>{textTime}</Box>
        </Column>
      </Row>
    </Row>
  )
}
