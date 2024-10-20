'use client'
import { useState } from 'react'

import { Center, Column, Row } from '@/components/common/FlexObjects'
import { CustomOptionBox } from '@/components/common/OptionBox'
import useCustomSnackbar from '@/components/common/Snackbar'
import { CustomTextField } from '@/components/common/TextField'
import {
  useRegisterByEmailCodeConfirmMutation,
  useRegisterByEmailMutation
} from '@/lib/api/AuthApi'
import { Box, RadioGroup } from '@mui/material'
import { useRouter } from 'next/navigation'

export function RegisterBlock({ emailField }) {
  const { showSnackbar } = useCustomSnackbar()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [dateBirthday, setDateBirthday] = useState('')
  const [gender, setGender] = useState('Мужчина')
  const [codeID, setCodeID] = useState()
  const [code, setCode] = useState('')
  const [registerByEmail, { isLoading: isLoadingRegister }] =
    useRegisterByEmailMutation()
  const [registerByEmailCodeConfirm, { isLoading: isLoadingCodeConfirm }] =
    useRegisterByEmailCodeConfirmMutation()
  const colorLogo = '444444'
  const router = useRouter()
  const colorTextLogin = '333333'
  const handleClickContinue = async () => {
    registerByEmail({
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      birth_date: dateBirthday,
      gender: gender == 'Мужчина' ? 1 : 0,
      email: emailField
    })
      .unwrap()
      .then((fulfilled) => {
        showSnackbar('Переходим к коду', 'success')
        setCodeID(fulfilled.code_id)
      })
      .catch((rejected) => {
        if (rejected.status) {
          if (typeof rejected.status != 'string') {
            showSnackbar('Проверьте правильность данных', 'error')
          } else {
            showSnackbar('Ошибка сервера', 'error')
          }
          return
        }
        if (rejected.data?.error) {
          showSnackbar(rejected.data.error, 'error')
          return
        }

        console.log(rejected)
      })
  }
  const handleClickCodeConfirm = async () => {
    registerByEmailCodeConfirm({
      code_id: codeID,
      code: +code,
      email: emailField
    })
      .unwrap()
      .then((fulfilled) => {
        showSnackbar('Зарегистрирован', 'success')
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', fulfilled.access_token)
          localStorage.setItem('refresh_token', fulfilled.refresh_token)
          location.reload()
        }
      })
      .catch((rejected) => {
        if (rejected.status) {
          if (typeof rejected.status != 'string') {
            showSnackbar(rejected.data.error, 'error')
          } else {
            showSnackbar('Ошибка сервера', 'error')
          }
          return
        }
        if (rejected.data?.error) {
          showSnackbar(rejected.data.error, 'error')
          return
        }

        console.log(rejected)
      })
  }
  return (
    <Column
      flex={60}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {codeID == undefined ? (
        <Column
          width={'25vw'}
          boxSizing={'border-box'}
          sx={{
            '@media screen and (max-width: 1024px)': {
              width: '100%',
              paddingX: '20px'
            }
          }}
        >
          <Box fontSize={'3em'} fontWeight={700} color={'#' + colorTextLogin}>
            Регистрация
          </Box>

          <Box
            marginTop={2}
            marginBottom={4}
            width={'100%'}
            height={'2px'}
            bgcolor={'#f2f2f2'}
          ></Box>
          <Column>
            <RegisterInputField
              name={'Фамилия'}
              example={'Иванов'}
              state={lastName}
              setState={setLastName}
            ></RegisterInputField>
            <RegisterInputField
              name={'Имя'}
              example={'Иван'}
              state={firstName}
              setState={setFirstName}
            ></RegisterInputField>

            <RegisterInputField
              name={'Отчество'}
              example={'Иванович'}
              state={middleName}
              setState={setMiddleName}
            ></RegisterInputField>
            <RegisterInputField
              name={'Дата рождения'}
              example={'01.01.1970'}
              type='date'
              state={dateBirthday}
              setState={setDateBirthday}
            ></RegisterInputField>
            <Row>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <CustomOptionBox label={'Мужчина'} />
                <CustomOptionBox label={'Женщина'} />
              </RadioGroup>
            </Row>
            <Center
              bgcolor={'#24A9E8'}
              paddingY={1.5}
              borderRadius={2}
              marginTop={2}
              color={'white'}
              onClick={handleClickContinue}
            >
              {'Продолжить'}
            </Center>
            <Center color={'#aaaaaa'} fontSize={'0.75em'} marginTop={3}>
              Нажимая продолжить Вы соглашаетесь с политикой обработки данных и
              разрешаете использовать Ваши данные для системы "Почта Донбасса"
            </Center>
          </Column>
        </Column>
      ) : (
        <Column
          width={'25vw'}
          boxSizing={'border-box'}
          sx={{
            '@media screen and (max-width: 1024px)': {
              width: '100%',
              paddingX: '20px'
            }
          }}
        >
          <Box fontSize={'3em'} fontWeight={700} color={'#' + colorTextLogin}>
            Введите код
          </Box>

          <Box
            marginTop={2}
            marginBottom={4}
            width={'100%'}
            height={'2px'}
            bgcolor={'#f2f2f2'}
          ></Box>
          <Column>
            <RegisterInputField
              name={'Код подтверждения'}
              example={'*****'}
              state={code}
              setState={setCode}
            ></RegisterInputField>

            <Center
              bgcolor={'#24A9E8'}
              paddingY={1.5}
              borderRadius={2}
              marginTop={2}
              color={'white'}
              onClick={handleClickCodeConfirm}
            >
              {'Продолжить'}
            </Center>
            <Center color={'#aaaaaa'} fontSize={'0.75em'} marginTop={3}>
              Нажимая продолжить Вы соглашаетесь с политикой обработки данных и
              разрешаете использовать Ваши данные для системы "Почта Донбасса"
            </Center>
          </Column>
        </Column>
      )}
    </Column>
  )
}

function RegisterInputField({
  name,
  example,
  icon,
  state,
  setState,
  type = 'text'
}) {
  const colorLogo = '444444'
  const colorTextLogin = '333333'
  return (
    <>
      <Box
        marginBottom={1}
        fontSize={'1em'}
        fontWeight={500}
        color={'#' + colorLogo + 'aa'}
      >
        {name}
      </Box>
      <CustomTextField
        slotProps={{
          input: {
            startAdornment: icon && (
              <Center paddingRight={'14px'}>
                <Box
                  width={'20px'}
                  height={'20px'}
                  component={'img'}
                  src='https://img.icons8.com/?size=100&id=eBEo6FOQZ3v4&format=png&color=333333'
                ></Box>
              </Center>
            ),
            sx: { borderRadius: 2 }
          }
        }}
        type={type}
        placeholder={example}
        size='small'
        value={state}
        onChange={(e) => setState(e.target.value)}
      ></CustomTextField>
      <Box marginBottom={1}></Box>
    </>
  )
}
