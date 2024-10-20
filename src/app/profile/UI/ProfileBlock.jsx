import { Box } from '@mui/material'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { useEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'
import { AccountInfoFields } from './AccountInfoFields'
import { AccountBlock } from './AccountBlock'
import { ContactsFields } from './ContactFields'
import { CompletedStatusBlock } from './CompletedStatusBlock'

export function ProfileBlock({ id }) {
  const { data, isLoading, isSuccess, refetch } = useGetUsersMeQuery()
  const [testData, setTestData] = useState({})
  useEffect(() => {
    if (data) {
      setTestData({ user: { ...data.user, role: 'Пользователь' } })
    }
  }, [data])
  return isLoading || testData.user == null ? (
    <></>
  ) : (
    <Center marginTop={'70px'}>
      <Column width={'90%'} marginTop={5}>
        <AccountBlock></AccountBlock>
        <Row
          marginTop={3}
          gap={4}
          sx={{
            '@media screen and (max-width: 1024px)': { flexDirection: 'column' }
          }}
        >
          <Column flex={1.5} gap={4}>
            <AccountInfoFields></AccountInfoFields>
            <ContactsFields></ContactsFields>
          </Column>
          <Column flex={0.5}>
            <CompletedStatusBlock></CompletedStatusBlock>
          </Column>
        </Row>
      </Column>
    </Center>
  )
}
