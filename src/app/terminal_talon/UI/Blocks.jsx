'use client'
import { useEffect, useState } from 'react'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { ButtonOnTerminal } from './ButtonOnTerminal'
import { useRouter } from 'next/navigation'

export function Blocks({ setBlock }) {
  const router = useRouter()
  const gap = '1.5vw'
  return (
    <Column
      flex={8}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={gap}
      fontSize={'2em'}
    >
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Отправления'}
            onClick={() => setBlock(1)}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Переводы'}
            onClick={() => setBlock(2)}
          ></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Платежи'}
            onClick={() => setBlock(3)}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Стартовые переводы'}
            onClick={() => setBlock(4)}
          ></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'50%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Прочее'}
            onClick={() => setBlock(5)}
          ></ButtonOnTerminal>
        </Box>
      </Row>
      <Column alignItems={'end'} color={CustomColors.grey[600]}></Column>
    </Column>
  )
}

export function Blocks1() {
  const router = useRouter()
  const gap = '1.5vw'
  return (
    <Column
      flex={8}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={gap}
      fontSize={'2em'}
    >
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Отправить письменную корреспонденцию'}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Отправить крупногабаритные посылки'}
          ></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Отправить мелкие посылки'}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal title={'Получить'}></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'50%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal title={'Почтовая тара'}></ButtonOnTerminal>
        </Box>
      </Row>
      <Column alignItems={'end'} color={CustomColors.grey[600]}></Column>
    </Column>
  )
}

export function Blocks2() {
  const router = useRouter()
  const gap = '1.5vw'
  return (
    <Column
      flex={8}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={gap}
      fontSize={'2em'}
    >
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal title={'Отправить'}></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal title={'Получить'}></ButtonOnTerminal>
        </Box>
      </Row>

      <Column alignItems={'end'} color={CustomColors.grey[600]}></Column>
    </Column>
  )
}

export function Blocks3() {
  const router = useRouter()
  const gap = '1.5vw'
  return (
    <Column
      flex={8}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={gap}
      fontSize={'2em'}
    >
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal title={'Коммунальные услуги'}></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal title={'Интернет'}></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal title={'Телефония'}></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal title={'Другое'}></ButtonOnTerminal>
        </Box>
      </Row>

      <Column alignItems={'end'} color={CustomColors.grey[600]}></Column>
    </Column>
  )
}

export function Blocks4() {
  const router = useRouter()
  const gap = '1.5vw'
  return (
    <Column
      flex={8}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={gap}
      fontSize={'2em'}
    >
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal title={'Купить'}></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal title={'Восстановить'}></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal title={'Скретч-карты'}></ButtonOnTerminal>
        </Box>
      </Row>

      <Column alignItems={'end'} color={CustomColors.grey[600]}></Column>
    </Column>
  )
}

export function Blocks5() {
  const router = useRouter()
  const gap = '1.5vw'
  return (
    <Column
      flex={8}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap={gap}
      fontSize={'2em'}
    >
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Товары народного потребления'}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Подписка на газеты и журналы'}
          ></ButtonOnTerminal>
        </Box>
      </Row>
      <Row flex={1} width={'100%'} gap={gap}>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Написать заявление/обращение'}
          ></ButtonOnTerminal>
        </Box>
        <Box flex={1}>
          <ButtonOnTerminal
            title={'Выплата пенсий и пособий'}
          ></ButtonOnTerminal>
        </Box>
      </Row>

      <Column alignItems={'end'} color={CustomColors.grey[600]}></Column>
    </Column>
  )
}
