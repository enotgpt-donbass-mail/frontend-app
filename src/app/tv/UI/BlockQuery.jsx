import { Center, Row } from '@/components/common/FlexObjects'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { Box } from '@mui/material'

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min))
}

export function BlockQuery({ talon, window }) {
  return (
    <Row
      fontSize={'3em'}
      justifyContent={'space-around'}
      paddingX={'1vw'}
      color={CustomColors.grey[800]}
    >
      <Row alignItems={'center'} gap={1} justifyContent={'center'} flex={1}>
        <Box>{talon ? talon : 'Л' + getRandomInt(10, 99)}</Box>
      </Row>

      <Box
        component={'img'}
        src={CustomIMG.arrowRight}
        width={'5%'}
        sx={{ aspectRatio: '2/1', objectFit: 'contain' }}
      ></Box>

      <Row alignItems={'center'} gap={1} justifyContent={'center'} flex={1}>
        <Box>
          {window
            ? String(window).padStart(2, '0')
            : String(getRandomInt(1, 10)).padStart(2, '0')}
        </Box>
      </Row>
    </Row>
  )
}
