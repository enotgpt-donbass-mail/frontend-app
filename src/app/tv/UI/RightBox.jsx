'use client'

import { Center, Column, Row } from '@/components/common/FlexObjects'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { scoresApi } from '@/lib/api/MainApi'

export function RightBox({ lista, setLista }) {
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
      today = dd + '.' + mm + '.' + yyyy
      timeText = hours + ':' + minutes + ':' + seconds
      setTextTime(timeText)
      setTextDate(today)
    }, 500)
    return () => clearInterval(interval)
  }, [])
  return (
    <Column
      flex={1}
      bgcolor={'#7f90be'}
      color={'white'}
      fontWeight={500}
      alignItems={'end'}
      boxSizing={'border-box'}
      fontSize={'2em'}
    >
      <Column paddingTop={6} paddingRight={6} alignItems={'end'} gap={1}>
        <Box component={'img'} src={CustomIMG.logoPost} width={'3em'}></Box>
        <Column paddingY={2} alignItems={'end'}>
          <Box fontWeight={900} lineHeight={1}>
            ПОЧТА
          </Box>
          <Box lineHeight={1} fontWeight={900}>
            ДОНБАССА
          </Box>
        </Column>
      </Column>
      <Row
        padding={4}
        alignSelf={'end'}
        fontSize={'0.5em'}
        fontWeight={700}
        gap={3}
      >
        <Column>
          <Box>Сегодня: </Box>
          <Box>Cейчас: </Box>
        </Column>
        <Column>
          <Box>{textDate}</Box>
          <Box>{textTime}</Box>
        </Column>
      </Row>
      <Column
        width='100%'
        height={'100%'}
        justifyContent={'end'}
        paddingBottom={'1vw'}
      >
        <Column
          width='100%'
          sx={{ aspectRatio: '16/9' }}
          justifyContent={'end'}
        >
          <video
            muted
            width={'100%'}
            autoPlay='autoplay'
            src={
              'https://s33.enotgpt.ru/files/videos/3d15ab29ec0a20b118db33df1a7b3418:baf91f4576b6423fe3b7ae00da0be99a76acc4866c81ce1f7ef424c00a14c2b2.mp4'
            }
          ></video>
        </Column>
      </Column>
    </Column>
  )
}
