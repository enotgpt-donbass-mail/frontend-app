import { Center, Column, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { Header } from './UI/Header'
import { Blocks } from './UI/Blocks'
import { BottomBar } from './UI/BottomBar'

export default function TerminalTalon({ children }) {
  return (
    <Column
      width={'100%'}
      height={'100svh'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Column width={'90%'} height={'95%'}>
        <Column
          width={'100%'}
          height={'100%'}
          justifyContent={'space-between'}
          gap={'2vw'}
        >
          <Header></Header>
          {children}
        </Column>
      </Column>
    </Column>
  )
}
