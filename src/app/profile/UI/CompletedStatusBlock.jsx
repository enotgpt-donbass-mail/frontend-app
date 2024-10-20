'use client'
import { Box } from '@mui/material'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { useEffect, useLayoutEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'
import { ProfileSubBlock } from './ProfileSubBlock'

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export function CompletedStatusBlock() {
  const { data, isLoading, isSuccess } = useGetUsersMeQuery()
  const ref = useRef()
  const sizeWindow = useWindowSize()
  const [size, setSize] = useState(500)
  useEffect(() => {
    if (ref.current) {
      setSize(ref.current.clientWidth)
    }
  }, [sizeWindow])
  return (
    <ProfileSubBlock flex={1} title={'Заполненость профиля'}>
      <Center width={'100%'} height={'100%'} ref={ref} minHeight={size + 'px'}>
        <Box position={'absolute'}>
          <CustomGraph
            width={ref.current ? size + 'px' : '500px'}
            height={ref.current ? size + 'px' : '500px'}
            type={'radialBar'}
            series={[77]}
            options={{
              chart: {
                type: 'radialBar'
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    name: {
                      fontSize: 'clamp(16px,1.1vw,72px)'
                    },
                    value: {
                      fontSize: 'clamp(12px,0.8vw,36px)'
                    }
                  }
                }
              },
              labels: ['Хорошо']
            }}
          ></CustomGraph>
        </Box>
      </Center>
    </ProfileSubBlock>
  )
}
