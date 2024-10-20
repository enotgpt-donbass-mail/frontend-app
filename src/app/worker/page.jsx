'use client'
import { Center, Row } from '@/components/common/FlexObjects'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function WorkerPage() {
  return (
    <Center width={'100%'} height={'100svh'} fontSize={'3em'}>
      <Center paddingY={2} fontWeight={700} color={CustomColors.grey[800]}>
        Выберите окно, за котором Вы работаете:
      </Center>
      <Center width={'90%'} flex={1}>
        <Center width={'100%'} height={'100%'}>
          <Center borderRadius={8} width={'100%'} height={'100%'}>
            <Row
              width={'90%'}
              height={'90%'}
              gap={'2vw'}
              flexWrap={'wrap'}
              justifyContent={'center'}
              alignItems={'center'}
              fontWeight={300}
              color={CustomColors.grey[500]}
            >
              <WorkPlaceBlock window={1} />
              <WorkPlaceBlock window={2} />
              <WorkPlaceBlock window={3} />
              <WorkPlaceBlock window={4} />
              <WorkPlaceBlock window={5} />
              <WorkPlaceBlock window={6} />
              <WorkPlaceBlock window={7} />
              <WorkPlaceBlock window={8} />
            </Row>
          </Center>
        </Center>
      </Center>
    </Center>
  )
}

function WorkPlaceBlock({ window }) {
  const router = useRouter()
  return (
    <Center
      padding={5}
      borderRadius={4}
      bgcolor={'#fbfbfb'}
      onClick={() => {
        router.push(String('/worker/' + window))
      }}
      sx={{
        aspectRatio: '1',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      position={'relative'}
    >
      <Box component={'img'} src={CustomIMG.computer}></Box>
      <Box position={'absolute'} bottom={15} right={30} fontSize={'0.75em'}>
        {String(window).padStart(2, '0')}
      </Box>
    </Center>
  )
}
