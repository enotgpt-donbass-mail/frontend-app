import { Box } from '@mui/material'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { useEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'

export function ProfileSubBlock({
  children,
  flex = 1,
  title,
  icon,
  iconOnClick,
  height,
  width,
  boxShadow,
  padding,
  sx
}) {
  return (
    <Box
      height={height ? height : 'auto'}
      width={width ? width : 'auto'}
      flex={flex}
      borderRadius={4}
      padding={padding != null ? padding : 3}
      alignItems={'center'}
      gap={1}
      boxShadow={
        boxShadow ? boxShadow : '0px 0px 10px 2px rgba(34, 60, 80, 0.06);'
      }
      boxSizing={'border-box'}
      sx={sx ? sx : {}}
    >
      {title ? (
        <Column height={'100%'}>
          <Row
            fontSize={24}
            marginBottom={1}
            color={CustomColors.grey[900]}
            fontWeight={600}
            justifyContent={'space-between'}
          >
            {title}
            {icon && (
              <Box
                component={'img'}
                height={'24px'}
                width={'auto'}
                src={icon}
                onClick={iconOnClick}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    opacity: [0.9, 0.8, 0.7]
                  }
                }}
              ></Box>
            )}
          </Row>
          {children}
        </Column>
      ) : (
        <>{children}</>
      )}
    </Box>
  )
}
