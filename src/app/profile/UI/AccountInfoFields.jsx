import { Box } from '@mui/material'
import {
  useGetUsersMeQuery,
  useLazyUpdateUserBirthDateQuery,
  useLazyUpdateUserFirstNameQuery,
  useLazyUpdateUserMiddleNameQuery,
  useLazyUpdateUserLastNameQuery as useLazyUpdateUserLastNameQuery
} from '@/lib/api/MainApi'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { use, useEffect, useState } from 'react'
import { CustomGraph } from '@/components/common/Graph'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { useRef } from 'react'
import { ProfileSubBlock } from './ProfileSubBlock'
import { TextFieldChange } from './TextField'
import {
  formatDateForApi,
  formatDateForInputFromApi,
  formatDateFromApi
} from '../services/formatDate'
import { formatGenderFromApi } from '../services/formatGender'
import { AlertDialog } from '@/components/common/Dialog'

export function AccountInfoFields() {
  const { data, isLoading, isSuccess, refetch } = useGetUsersMeQuery()

  const [isEditing, setIsEditing] = useState(false)
  const [editingAgree, setEditingAgree] = useState(false)
  const [lastName, setLastName] = useState(data.user.last_name)
  const [firstName, setFirstName] = useState(data.user.first_name)
  const [middleName, setMiddleName] = useState(data.user.middle_name)
  const [birthDate, setBirthDate] = useState(data.user.birth_date)
  const [gender, setGender] = useState(data.user.gender)
  const [
    updateUserFirstNameQuery,
    resultsFirstNameQuery,
    { isLoadingUpdateUserFirstName }
  ] = useLazyUpdateUserFirstNameQuery()
  const [
    updateUserLastNameQuery,
    resultsLastNameQuery,
    { isLoadingUpdateUserLastName }
  ] = useLazyUpdateUserLastNameQuery()
  const [
    updateUserMiddleNameQuery,
    resultsMiddleNameQuery,
    { isLoadingUpdateUserMiddleName }
  ] = useLazyUpdateUserMiddleNameQuery()
  const [
    updateUserBirthDateQuery,
    resultsBirthDateQuery,
    { isLoadingUpdateBirthDate }
  ] = useLazyUpdateUserBirthDateQuery()

  const handleClickSave = async () => {
    if (firstName != data.user.first_name) {
      await updateUserFirstNameQuery(firstName)
    }
    if (lastName != data.user.last_name) {
      await updateUserLastNameQuery(lastName)
    }
    if (middleName != data.user.middle_name) {
      await updateUserMiddleNameQuery(middleName)
    }
    if (birthDate != data.user.birth_date) {
      await updateUserBirthDateQuery(formatDateForApi(birthDate))
    }
    refetch()
      .unwrap()
      .then((data) => {
        setLastName(data.user.last_name)
        setFirstName(data.user.first_name)
        setMiddleName(data.user.middle_name)
        setBirthDate(data.user.birth_date)
        setGender(data.user.gender)
      })

    setIsEditing(!isEditing)
  }

  const handleClickEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <ProfileSubBlock
      flex={1}
      title={'Информация профиля'}
      icon={isEditing ? CustomIMG.done : CustomIMG.editIcon}
      iconOnClick={() => (isEditing ? handleClickSave() : handleClickEdit())}
    >
      <Column height={'100%'}>
        <Column justifyContent={'space-around'} flex={1} paddingTop={2} gap={1}>
          <TextFieldChange
            status={isEditing}
            title={'Фамилия'}
            value={lastName}
            onChangeSetValue={setLastName}
          ></TextFieldChange>
          <TextFieldChange
            status={isEditing}
            title={'Имя'}
            value={firstName}
            onChangeSetValue={setFirstName}
          ></TextFieldChange>
          <TextFieldChange
            status={isEditing}
            title={'Отчество'}
            value={middleName}
            onChangeSetValue={setMiddleName}
          ></TextFieldChange>
          <TextFieldChange
            status={isEditing}
            title={'Дата рождения'}
            value={
              isEditing
                ? formatDateForInputFromApi(birthDate)
                : formatDateFromApi(birthDate)
            }
            inputType='date'
            onChangeSetValue={setBirthDate}
          ></TextFieldChange>
          <TextFieldChange
            status={isEditing}
            title={'Пол'}
            value={formatGenderFromApi(gender)}
            onChangeSetValue={setGender}
          ></TextFieldChange>
        </Column>
      </Column>
      <AlertDialog
        onAgree={() => setIsEditing(!isEditing)}
        isOpen={editingAgree}
        setIsOpen={setEditingAgree}
        title={
          isEditing
            ? 'Отменить изменения?'
            : 'Перейти к редактированию информации профиля?'
        }
        contentText={
          isEditing
            ? 'Нажмите "Продолжить", чтобы выйти из режима редактирования. Изменения не сохранятся'
            : 'Нажмите "Продолжить", чтобы приступить к редактированию'
        }
      />
    </ProfileSubBlock>
  )
}
