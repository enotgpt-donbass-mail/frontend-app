'use client'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import useCustomSnackbar from '@/components/common/Snackbar'
import { CustomTextField } from '@/components/common/TextField'
import {
  useLoginByEmailCodeConfirmMutation,
  useLoginByEmailMutation
} from '@/lib/api/AuthApi'
import { Box } from '@mui/material'

import { useState } from 'react'
import { QrCodeLogin } from './QrCodeLogin'
import { useRouter, useSearchParams } from 'next/navigation'

export function LoginBlock({ emailField, setEmailField, setIsRegistering }) {
  const [codeID, setCodeID] = useState()
  const [code, setCode] = useState('')
  const [qrCodeLogin, setQrCodeLogin] = useState(false)
  const colorLogo = '444444'
  const colorTextLogin = '333333'
  const { showSnackbar } = useCustomSnackbar()
  const [loginByEmail, { isLoading: isLoadingLogin }] =
    useLoginByEmailMutation()
  const [loginByEmailCodeConfirm, { isLoading: isLoadingCode }] =
    useLoginByEmailCodeConfirmMutation()
  const handleClickContinue = async () => {
    loginByEmail({ email: emailField })
      .unwrap()
      .then((fulfilled) => setCodeID(fulfilled.code_id))
      .catch((rejected) => {
        if (rejected.status) {
          if (rejected.status == 404 || rejected.status == 401) {
            showSnackbar('Ща будем регаться', 'success')
            setIsRegistering(true)
          } else if (typeof rejected.status != 'string') {
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
  const router = useRouter()
  const params = useSearchParams()
  const pageToRedir = params.get('redir') ?? '/'
  const handleClickCodeConfirm = async () => {
    loginByEmailCodeConfirm({
      code_id: codeID,
      code: +code,
      email: emailField
    })
      .unwrap()
      .then((fulfilled) => {
        showSnackbar('Авторизован', 'success')
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', fulfilled.access_token)
          localStorage.setItem('refresh_token', fulfilled.refresh_token)
          router.push(pageToRedir)
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
      {qrCodeLogin && (
        <QrCodeLogin setQrCodeLogin={setQrCodeLogin}></QrCodeLogin>
      )}
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
            Войти
          </Box>
          <Box
            marginTop={'2em'}
            fontSize={'1em'}
            fontWeight={700}
            color={'#' + colorLogo}
          >
            Войти при помощи
          </Box>
          <Row
            marginTop={'1em'}
            paddingX={'1em'}
            paddingY={'0.5em'}
            fontSize={'1em'}
            fontWeight={700}
            color={'#' + colorLogo}
            border={2}
            borderColor={'#aaaaaa'}
            borderRadius={2}
            alignItems={'center'}
            gap={1}
            onClick={() => setQrCodeLogin(true)}
          >
            <Box
              height={'35px'}
              width={'auto'}
              component={'img'}
              src={
                'https://img.icons8.com/?size=100&id=eVzJ4kKqXKDy&format=png&color=000000'
              }
            ></Box>
            Мобильное приложение
          </Row>
          <Box
            marginY={4}
            width={'100%'}
            height={'2px'}
            bgcolor={'#f2f2f2'}
          ></Box>
          <Column>
            <Box
              marginBottom={2}
              fontSize={'1em'}
              fontWeight={500}
              color={'#' + colorLogo + 'aa'}
            >
              Или войти при помощи почты
            </Box>
            <CustomTextField
              slotProps={{
                input: {
                  startAdornment: (
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
              placeholder='Ваш email'
              size='small'
              value={emailField}
              onChange={(e) => setEmailField(e.target.value)}
            ></CustomTextField>
            <Center
              bgcolor={'#24A9E8'}
              paddingY={1.5}
              borderRadius={2}
              marginTop={2}
              color={'white'}
              onClick={handleClickContinue}
            >
              {isLoadingLogin ? 'Загрузка' : 'Продолжить'}
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
            <LoginInputField
              name={'Код подтверждения'}
              example={'*****'}
              state={code}
              setState={setCode}
            ></LoginInputField>

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
function LoginInputField({
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
