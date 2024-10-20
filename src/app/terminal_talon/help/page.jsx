'use client'
import { Center, Column } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ButtonOnTerminal } from '../UI/ButtonOnTerminal'

function Colorize({ children }) {
  return (
    <Box fontWeight={700} color={'#3a528e'} display={'inline'}>
      {children}
    </Box>
  )
}

export default function HelpPage() {
  const router = useRouter()
  return (
    <Column flex={9} justifyContent={'space-between'} gap={3}>
      <Column fontSize={'1.6em'} gap={'0.5vw'}>
        <Box>Это интерфейс почтового терминала "Почта Донбасса".</Box>

        <Box>
          <Colorize>Отправить:</Colorize> Для отправки писем, посылок и т.д.
          Нажмите эту кнопку, если хотите что-то отправить.
        </Box>
        <Box>
          {' '}
          <Colorize>Получить:</Colorize> Для получения отправлений. Нажмите эту
          кнопку, если ожидаете посылку или письмо.{' '}
        </Box>
        <Box>
          <Colorize>Купить:</Colorize> Для покупки товаров, доступных в почтовом
          отделении (например, конверты, марки).
        </Box>
        <Box>
          <Colorize>Оплатить:</Colorize> Для оплаты услуг, например,
          коммунальных платежей.
        </Box>
        <Box>
          <Colorize>Прочее:</Colorize> Если нужная вам услуга не входит в
          основные категории, нажмите кнопку "Прочее".
        </Box>

        <Box>
          {' '}
          <Colorize>Бронь по записи:</Colorize> Если вам необходимо
          забронировать время для посещения почтового отделения, нажмите эту
          кнопку.
        </Box>
        <Box>
          <Colorize>Помощь:</Colorize> Если вам нужна помощь в использовании
          терминала или у вас возникли вопросы, нажмите эту кнопку.
        </Box>
        <Box>
          <Colorize>Для льготной категории:</Colorize> Если вы относитесь к
          льготной категории, нажмите эту кнопку для получения соответствующих
          услуг.
        </Box>
        <Box>
          В правом верхнем углу отображается текущая дата и время. В левом
          верхнем углу - логотип "Почты Донбасса". После выбора нужной опции,
          следуйте инструкциям на экране.
        </Box>
      </Column>
      <Box width={'100%'} height={200}>
        <ButtonOnTerminal
          paddingX={4}
          paddingY={3}
          title={'Назад'}
          onClick={() => {
            router.back()
          }}
        ></ButtonOnTerminal>
      </Box>
    </Column>
  )
}
