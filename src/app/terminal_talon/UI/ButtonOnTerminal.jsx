import { Center, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'

export function ButtonOnTerminal({
  title,
  icon,
  onClick,
  color,
  colorText,
  border,
  borderColor,
  paddingX,
  paddingY
}) {
  return (
    <Center
      paddingX={paddingX ? paddingX : 0}
      paddingY={paddingY ? paddingY : 0}
      height={'100%'}
      onClick={onClick}
      bgcolor={color ? color : '#3a528e'}
      sx={{
        boxShadow: '0px 0px 10px 2px rgba(34, 60, 80, 0.3);',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      border={border ? border : 0}
      borderColor={borderColor ? borderColor : 0}
      borderRadius={'0.5em'}
      boxSizing={'border-box'}
    >
      <Row
        width={'90%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'1vw'}
        color={colorText ? colorText : 'white'}
        fontWeight={800}
      >
        {icon ? (
          <Box component={'img'} height={'2em'} width={'auto'} src={icon}></Box>
        ) : (
          <></>
        )}

        <Box fontSize={'2em'}>{title}</Box>
      </Row>
    </Center>
  )
}
