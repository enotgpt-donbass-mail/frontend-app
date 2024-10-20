import { Box, TextField } from '@mui/material'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { useEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'
import { ProfileSubBlock } from './ProfileSubBlock'

export function TextFieldChange({
  title,
  value,
  status,
  onChangeSetValue,
  inputType = 'text'
}) {
  return (
    <Row
      fontSize={16}
      color={CustomColors.grey[700]}
      fontWeight={500}
      justifyContent={'space-between'}
      alignItems={'center'}
      minHeight={40}
    >
      {title}
      {status ? (
        <TextField
          color={CustomColors.grey[800]}
          id='outlined-basic'
          variant={'outlined'}
          type={inputType}
          defaultValue={value}
          size='small'
          onChange={(event) => {
            onChangeSetValue(event.target.value)
          }}
        />
      ) : (
        <Box color={CustomColors.grey[800]}>{value}</Box>
      )}
    </Row>
  )
}
