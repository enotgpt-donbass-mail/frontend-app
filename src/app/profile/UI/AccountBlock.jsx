import { Box } from '@mui/material'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { useEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'
import { ProfileSubBlock } from './ProfileSubBlock'

export function AccountBlock() {
  const { data, isLoading, isSuccess } = useGetUsersMeQuery()
  const [testData, setTestData] = useState(null)
  useEffect(() => {
    if (data) {
      setTestData({ user: { ...data.user, role: 'Пользователь' } })
    }
  }, [data])

  return !testData ? (
    <></>
  ) : (
    <Column width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <ProfileSubBlock width={'100%'} padding={0}>
        <Row
          height={'100%'}
          gap={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Column height={'15vw'} minHeight={'150px'}>
            <Box
              borderRadius={'1em 0 0 1em '}
              overflow={'hidden'}
              height={'100%'}
              sx={{ aspectRatio: 1 }}
            >
              <Box
                component={'img'}
                src={
                  data.user.photo ? data.user.photo : CustomIMG.profileDefault
                }
                width={'100%'}
                height={'100%'}
                sx={{ objectFit: 'cover' }}
              ></Box>
            </Box>
            <Box width={'100%'} bgcolor={CustomColors.grey[400]}></Box>
          </Column>
          <Column flex={1} marginRight={2}>
            <Box
              fontSize={'clamp(24px,1.5vw,72px)'}
              fontWeight={700}
              color={'#333333'}
              lineHeight={1.4}
              marginTop={1}
              textAlign={'center'}
            >
              {data.user.first_name + ' ' + data.user.last_name}
            </Box>
            <Box
              fontSize={'clamp(16px,1vw,72px)'}
              fontWeight={500}
              color={'#777777'}
              textAlign={'center'}
            >
              {testData.user.role}
            </Box>
          </Column>
        </Row>
      </ProfileSubBlock>
    </Column>
  )
}
