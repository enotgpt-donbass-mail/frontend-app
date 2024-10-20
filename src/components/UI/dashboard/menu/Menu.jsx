'use client'
import { Box } from '@mui/material'
import { Row, Center, Column } from '@/components/common/FlexObjects'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isRedirectError } from 'next/dist/client/components/redirect'
const colorMenuItem = '#6f767e'
const colorDecorativeLine = '#eeeeee'
const selectedColor = '#efefef'
const selectedText = '#555555'
const menuItems = [
  {
    name: 'Главная',
    icon:
      'https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=' +
      colorMenuItem.slice(1),
    href: '/'
  },
  {
    name: 'Пользователи',
    icon:
      'https://img.icons8.com/?size=100&id=H101gtpJBVoh&format=png&color=' +
      colorMenuItem.slice(1),
    href: '/users',
    childrens: [
      { name: 'Админы', icon: '', href: '/users/admins' },
      { name: 'Просто', icon: '', href: '/users/common' }
    ]
  },
  {
    name: 'Аналитика',
    icon:
      'https://img.icons8.com/?size=100&id=WKts4zuaicmc&format=png&color=' +
      colorMenuItem.slice(1),
    href: '/analytics'
  },
  {
    name: 'Настройки',
    icon:
      'https://img.icons8.com/?size=100&id=4511GGVppfIx&format=png&color=' +
      colorMenuItem.slice(1),
    href: '/settings'
  }
]

export default function DashboardMenu() {
  return (
    <Box
      minWidth={'240px'}
      height={'100svh'}
      bgcolor={'white'}
      fontSize={'1.2em'}
      paddingLeft={'1em'}
      paddingRight={'1em'}
      boxSizing={'border-box'}
      fontFamily={'Inter'}
    >
      <Row
        width={'100%'}
        height={'75px'}
        alignItems={'center'}
        paddingBottom={'1em'}
        gap={1}
        color={'#444444'}
      >
        <Box
          height={'60%'}
          width={'auto'}
          component={'img'}
          src='https://irecommend.ru/sites/default/files/product-images/116964/uUmQFJ73TbHL7U1OUSIWhg.jpg'
        ></Box>
        <Box fontSize={'1.3em'} fontWeight={900}>
          ПочтаБорд
        </Box>
      </Row>
      <ListMenu />
    </Box>
  )
}

function ListMenu() {
  const [currURL, setCurrURL] = useState('/none')
  const router = useRouter()
  useEffect(() => {
    setCurrURL('/' + window.location.href.split('/').slice(4).join('/'))
  }, [])
  const redirectToAnother = (href) => {
    router.push('/dashboard' + href)
    setCurrURL(href)
  }
  return (
    <Column fontFamily={'Inter'} gap={'0.5em'}>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          selected={item.href == currURL}
          currURL={currURL}
          redirectToAnother={redirectToAnother}
        />
      ))}
    </Column>
  )
}

function MenuItem({ item, selected, redirectToAnother, currURL }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const [heightToShrink, setHeightToShrink] = useState(0)

  const handleClick = () => {
    if (item.childrens) setOpen(!open)
    else redirectToAnother(item.href)
  }

  useEffect(() => {
    if (ref.current) setHeightToShrink(ref.current.offsetHeight)
  }, [ref])

  useEffect(() => {
    if (item.childrens)
      for (let i = 0; i < item.childrens.length; i++) {
        if (item.childrens[i].href == currURL) {
          setOpen(true)
        }
      }
  }, [currURL])

  return (
    <Column
      width={'100%'}
      paddingLeft={1}
      height={'100%'}
      boxSizing={'border-box'}
      bgcolor={selected ? selectedColor : ''}
      sx={{ transition: 'all 300ms' }}
      gap={open ? '0.5vw' : 0}
      color={selected ? selectedText : colorMenuItem}
      borderRadius={'0.5em'}
      fontWeight={'600'}
    >
      <Row
        width={'100%'}
        height={'100%'}
        alignItems={'stretch'}
        justifyContent={'space-between'}
        onClick={handleClick}
        sx={{ userSelect: 'none', cursor: 'pointer' }}
      >
        <Row paddingY={1} alignItems={'center'} gap={1}>
          <Box
            component={'img'}
            src={item.icon}
            width={'1.3em'}
            height={'1.3em'}
          ></Box>
          <Box fontSize={'0.9em'}>{item.name}</Box>
        </Row>
        {item.childrens ? (
          <Center
            sx={{
              aspectRatio: 1,
              transition: 'all 300ms',
              transform: open ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
            }}
          >
            <Box
              width={'0.75em'}
              height={'0.75em'}
              sx={{
                backgroundSize: 'cover',
                backgroundImage:
                  'url("https://img.icons8.com/?size=100&id=39786&format=png&color=' +
                  colorMenuItem.slice(1) +
                  '")'
              }}
            ></Box>
          </Center>
        ) : (
          <></>
        )}
      </Row>
      {item.childrens ? (
        <Column
          gap={1}
          overflow={'hidden'}
          maxHeight={open ? heightToShrink + 'px' : '0vh'}
          sx={{ transition: 'all 300ms' }}
        >
          <Column ref={ref} minHeight={'fit-content'} gap={0.5}>
            {item.childrens?.map((elem, index) => {
              return (
                <MenuSubItem
                  key={index}
                  item={elem}
                  currURL={currURL}
                  redirectToAnother={redirectToAnother}
                ></MenuSubItem>
              )
            })}
          </Column>
        </Column>
      ) : (
        <></>
      )}
    </Column>
  )
}
function MenuSubItem({ item, redirectToAnother, currURL }) {
  const handleClick = () => {
    redirectToAnother(item.href)
  }
  const selected = item.href == currURL

  return (
    <Box position={'relative'} onClick={handleClick}>
      <Box
        left={'7px'}
        top={'-150%'}
        height={'200%'}
        width={'10px'}
        borderLeft={2.5}
        borderBottom={2.5}
        position={'absolute'}
        borderColor={colorDecorativeLine}
        borderRadius={'0 0 0 10px'}
      ></Box>
      <Column paddingLeft={3} width={'100%'} boxSizing={'border-box'}>
        <Box
          paddingY={1}
          paddingX={1}
          bgcolor={selected ? selectedColor : ''}
          color={selected ? selectedText : ''}
          borderRadius={'0.5em'}
          fontSize={'0.9em'}
          sx={{
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'all 300ms'
          }}
        >
          {item.name}
        </Box>
      </Column>
    </Box>
  )
}
