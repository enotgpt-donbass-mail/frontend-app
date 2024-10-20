import { Box } from '@mui/material'
import { useGetUsersMeQuery } from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { useEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'
import { ProfileSubBlock } from './ProfileSubBlock'
import { TextFieldChange } from './TextField'

export function ContactsFields() {
  const { data, isLoading, isSuccess } = useGetUsersMeQuery()

  const [isEditing, setIsEditing] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(data.user.phone_number)
  const [email, setEmail] = useState(data.user.email)

  return (
    <ProfileSubBlock
      flex={1}
      title={'Контактные данные'}
      icon={isEditing ? CustomIMG.done : CustomIMG.editIcon}
      iconOnClick={() => {
        isEditing ? handleClickSave() : handleClickEdit()
      }}
    >
      <Column justifyContent={'space-around'} flex={1} paddingTop={2} gap={1}>
        <TextFieldChange
          status={isEditing}
          title={'Телефон'}
          onChangeSetValue={setPhoneNumber}
          value={phoneNumber ? phoneNumber : 'Не указан'}
        ></TextFieldChange>
        <TextFieldChange
          status={isEditing}
          title={'Email'}
          onChangeSetValue={setEmail}
          value={email ? email : 'Не указан'}
        ></TextFieldChange>
      </Column>
    </ProfileSubBlock>
  )
}
