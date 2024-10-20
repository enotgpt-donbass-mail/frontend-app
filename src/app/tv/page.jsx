'use client'
import { Column, Row } from '@/components/common/FlexObjects'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { Box } from '@mui/material'
import { Header } from './UI/Header'
import { BlockQuery } from './UI/BlockQuery'
import { RightBox } from './UI/RightBox'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useEffect, useState } from 'react'
import { scoresApi } from '@/lib/api/MainApi'

export default function PageTV() {
  const [lista, setLista] = useState([{ talon: 'Л10', window: '03' }])
  const [hidr, setHidr] = useState(false)
  const [longpoolMutation, { isLoading }] =
    scoresApi.useLongpoolRequestMutation()
  const [query] = scoresApi.useLazyGetPtsQuery()

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
          }
          if (data_create['poll'][index]['type'] == 2) {
            var audio = new Audio(
              'https://s33.enotgpt.ru/files/audios/7e744de49b070b74a5adfd0de61470c0:c0ba1a83c62144fe83af94e5068b163e358972fac85ebaa963ed1ddb666b94e9.wav'
            )
            audio.play()
            let tmp = []

            tmp = lista

            if (
              !tmp.includes({
                talon: data_create['poll'][index]['updates']['reserved']
                  ? 'Б'
                  : 'Л' + data_create['poll'][index]['updates']['id'],
                window: data_create['poll'][index]['updates']['window_id']
              })
            )
              tmp.push({
                talon: data_create['poll'][index]['updates']['reserved']
                  ? 'Б'
                  : 'Л' + data_create['poll'][index]['updates']['id'],
                window: data_create['poll'][index]['updates']['window_id']
              })
            console.log(tmp)
            setLista((val) =>
              val.includes({
                talon: data_create['poll'][index]['updates']['reserved']
                  ? 'Б'
                  : 'Л' + data_create['poll'][index]['updates']['id'],
                window: data_create['poll'][index]['updates']['window_id']
              })
                ? val
                : tmp
            )
            console.log('Назначен человек: ' + data_create['poll'][index])
            var letter = data_create['poll'][index]['updates']['reserved']
              ? 'Л'
              : 'Б'
          }
        }
      }
      localStorage.setItem('pts', data_create['new_pts'])
      longpoll()
    }
  }
  useEffect(() => {
    longpoll()
    setHidr(true)
  }, [])
  console.log('dead inside')
  console.log(lista)
  return (
    <>
      {hidr ? (
        <Column
          height={'100svh'}
          sx={{ '@media screen and (max-width: 1400px)': { fontSize: '1vw' } }}
        >
          <Row width={'100%'} flex={1} fontSize={'2em'}>
            <Column flex={2}>
              <Row flex={3} fontWeight={300} padding={'1vw'}>
                <Column flex={1} justifyContent={'start'}>
                  <Header></Header>
                  {lista.map((elem, i) => {
                    return (
                      <BlockQuery
                        key={i + 'block_query'}
                        talon={elem.talon}
                        window={elem.window}
                      ></BlockQuery>
                    )
                  })}
                </Column>
                <Column flex={1} justifyContent={'start'}>
                  <Header></Header>
                </Column>
              </Row>
              <Box bgcolor={CustomColors.grey[200]} flex={2}>
                <Column padding={4} boxSizing={'border-box'}>
                  <Box color={CustomColors.grey[800]}>В очереди</Box>
                  <Row
                    gap={5}
                    fontSize={'2em'}
                    color={CustomColors.grey[600]}
                    flexWrap={'wrap'}
                  >
                    <InQuery label={'Л3'} />
                  </Row>
                </Column>
              </Box>
            </Column>

            <RightBox setLista={setLista} lista={lista}></RightBox>
          </Row>
        </Column>
      ) : (
        <></>
      )}
    </>
  )
}

function InQuery({ label }) {
  let min = 0
  let max = 30
  return (
    <Box>
      {label ? label : 'Л' + Math.floor(min + Math.random() * (max - min))}
    </Box>
  )
}
