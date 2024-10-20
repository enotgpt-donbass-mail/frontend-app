'use client'
import MainPage from '@/app/page'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { scoresApi } from '@/lib/api/MainApi'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

export default function WaiterForClient({ params }) {
  const [client, setClient] = useState()
  const [isWorking, setIsWorking] = useState(false)
  const [query] = scoresApi.useLazyGetPtsQuery()
  const [longpoolMutation, { isLoading }] =
    scoresApi.useLongpoolRequestMutation()

  const [inviteMutation] = scoresApi.useInviteToSessionMutation()
  let pts = null
  const longpoll = async () => {
    let pts = null
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('pts')) {
        pts = localStorage.getItem('pts')
      } else {
        pts = await (await query(11)).data['new_pts']
      }
      var data_create = await (
        await longpoolMutation({ office_id: 11, pts: pts })
      ).data
      if (data_create?.poll[0] != undefined) {
        for (let index = 0; index < data_create?.poll.length; index++) {
          if (data_create['poll'][index]['type'] == 1) {
            console.log(
              'В очередь попал: ' + data_create['poll'][index]['updates']['id']
            )
            if (!client) inviteMutation()
          }
          if (!client && data_create['poll'][index]['type'] == 2) {
            console.log('Назначен человек: ' + data_create['poll'][index])
            var letter = data_create['poll'][index]['updates']['reserved']
              ? 'Б'
              : 'Л'
            setClient(letter + data_create['poll'][index]['updates']['id'])
          }
        }
      }
      localStorage.setItem('pts', data_create['new_pts'])
      longpoll()
    }
  }

  useEffect(() => {
    inviteMutation().then(() => {
      longpoll()
    })
  }, [])
  return (
    <Column
      padding={'1vw'}
      height={'100svh'}
      fontSize={'clamp(42px,2vw,72px)'}
      fontWeight={600}
      color={CustomColors.grey[800]}
      boxSizing={'border-box'}
    >
      <Center border={5} padding={2} borderRadius={4} flex={1}>
        {client ? (
          <Column>
            <Box color={CustomColors.grey[700]} fontSize={'0.5em'}>
              Ваше рабочее место: {String(params.window).padStart(2, '0')}
            </Box>
            <Box height={20}></Box>
            <Box>
              Клиент:{' '}
              <Box
                display={'inline'}
                color={CustomColors.grey[900]}
                fontWeight={800}
              >
                {client}
              </Box>
            </Box>
            <Box>
              Запрос:{' '}
              <Box
                display={'inline'}
                color={CustomColors.grey[900]}
                fontWeight={800}
              >
                Отправка посылки
              </Box>
            </Box>
            <Box>
              Статус:{' '}
              <Box
                display={'inline'}
                color={CustomColors.grey[900]}
                fontWeight={800}
              >
                {isWorking ? 'В работе' : 'Ожидание'}
              </Box>
            </Box>
            <Box height={50}></Box>
            <Row gap={1} fontSize={'0.75em'}>
              <Center
                flex={1}
                paddingY={1}
                border={5}
                borderColor={'pink'}
                borderRadius={2}
                onClick={() => {
                  if (isWorking) {
                    setClient()
                    setIsWorking(false)
                  } else {
                    setClient()
                    setIsWorking(false)
                  }
                }}
                sx={{ cursor: 'pointer', userSelect: 'none' }}
              >
                {isWorking ? 'Отказать' : 'Не пришёл'}
              </Center>
              <Center
                flex={1}
                paddingY={1}
                border={5}
                borderColor={'lightgreen'}
                borderRadius={2}
                onClick={() => {
                  if (isWorking) {
                    setClient()
                    setIsWorking(false)
                  } else {
                    setIsWorking(true)
                  }
                }}
                sx={{ cursor: 'pointer', userSelect: 'none' }}
              >
                {isWorking ? 'Выполнено' : 'Принять'}
              </Center>
            </Row>
          </Column>
        ) : (
          <Column>
            <Box color={CustomColors.grey[700]} fontSize={'0.5em'}>
              Ваше рабочее место: {String(params.window).padStart(2, '0')}
            </Box>
            <Box height={20}></Box>
            <Box>
              На данный момент у Вас нет назначенных клиентов{' '}
              <Box
                display={'inline'}
                color={CustomColors.grey[900]}
                fontWeight={800}
              >
                {client}
              </Box>
            </Box>
          </Column>
        )}
      </Center>
    </Column>
  )
}
