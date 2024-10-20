import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import {
  useAddOfficeMutation,
  useAddOperatingWindowBindMutation,
  useAddOperatingWindowMutation,
  useAddOperationRoleMutation,
  useAddSubcategoryMutation,
  useEditActiveRolesMutation,
  useEditActiveWindowMutation,
  useGetOfficesQuery
} from '@/lib/api/MainApi'
import useCustomSnackbar from './Snackbar'
import { CustomSelect } from '@/app/dashboard/page'

export function SubmitAddOffice({ setIsOpen }) {
  const { showSnackbar } = useCustomSnackbar()
  const [addOffice, { isLoading: isLoadingAddOffice }] = useAddOfficeMutation()

  const [formData, setFormData] = useState({
    name: '',
    index: 0,
    place: '',
    coordinates: [0, 0]
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    let formedValue = value
    if (name == 'index') {
      formedValue = +value
    }
    setFormData({
      ...formData,
      [name]: formedValue
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addOffice(formData)
      .unwrap()
      .then((fulfilled) => {
        setIsOpen(false)
        window.location.reload()
        showSnackbar('Обновите страницу', 'success')
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Наименование'
        name='name'
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Индекс'
        name='index'
        type='number'
        value={formData.index}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Место'
        name='place'
        value={formData.place}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      {/* Для координат можно использовать два отдельных поля или более сложный компонент */}
      {/* <TextField
        label='Координата X'
        name='coordinates'
        type='number'
        value={formData.coordinates[0]}
        fullWidth
        margin='normal'
      /> */}
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Отправить
      </Button>
    </form>
  )
}

export function SubmitAddOperationOffice({ setIsOpen }) {
  const { showSnackbar } = useCustomSnackbar()
  const [addOperationRole, { isLoading: isLoadingAddOperationRole }] =
    useAddOperationRoleMutation()

  const [formData, setFormData] = useState({
    name: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addOperationRole(formData)
      .unwrap()
      .then((fulfilled) => {
        setIsOpen(false)

        window.location.reload()
        showSnackbar('Обновите страницу', 'success')
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Наименование'
        name='name'
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Отправить
      </Button>
    </form>
  )
}

export function SubmitAddSubcategory({ setIsOpen, mainOperationId }) {
  const { showSnackbar } = useCustomSnackbar()
  const [addSubcategory, { isLoading: isLoadingAddSubcategory }] =
    useAddSubcategoryMutation()

  const [formData, setFormData] = useState({
    name: '',
    main_operation_id: mainOperationId?.id
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addSubcategory(formData)
      .unwrap()
      .then((fulfilled) => {
        setIsOpen(false)
        window.location.reload()
        showSnackbar('Обновите страницу', 'success')
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Наименование'
        name='name'
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin='normal'
        required={true}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Отправить
      </Button>
    </form>
  )
}

export function SubmitEditActiveWindow({ setIsOpen, mainWindowId }) {
  const { showSnackbar } = useCustomSnackbar()

  const [editActiveWindow, { isLoading: isLoadingAddSubcategory }] =
    useEditActiveWindowMutation()

  const [formData, setFormData] = useState({
    id: mainWindowId?.id,
    is_active: !mainWindowId?.is_active
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    await editActiveWindow(formData)
      .unwrap()
      .then((fulfilled) => {
        setIsOpen(false)
        window.location.reload()
        showSnackbar('Обновите страницу', 'success')
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

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Изменить
      </Button>
    </form>
  )
}

export function SubmitAddOperatingWindow({ setIsOpen, mainWindowId }) {
  const { showSnackbar } = useCustomSnackbar()

  const [
    addOperatingWindowMutation,
    { isLoading: isLoadingAddOperatingWindowMutation }
  ] = useAddOperatingWindowMutation()

  const [formData, setFormData] = useState({
    number: 0,
    office_id: mainWindowId?.id
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    let formedValue = value
    if (name == 'number') {
      formedValue = +value
    }
    setFormData({
      ...formData,
      [name]: formedValue
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addOperatingWindowMutation(formData)
      .unwrap()
      .then((fulfilled) => {
        setIsOpen(false)
        window.location.reload()
        showSnackbar('Обновите страницу', 'success')
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Номер нового окна'
        name='number'
        type='number'
        value={formData.number}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Создать
      </Button>
    </form>
  )
}

export function SubmitAddOperatingWindowBind({
  setIsOpen,
  mainWindowId,
  data
}) {
  const { showSnackbar } = useCustomSnackbar()

  const [
    addOperatingWindowMutationBind,
    { isLoading: isLoadingAddOperatingWindowMutation }
  ] = useAddOperatingWindowBindMutation()

  const [formData, setFormData] = useState({
    window_id: mainWindowId?.id,
    operation_role_id: 0
  })

  const handleChange = (event) => {
    const { name, value } = event
    let formedValue = value
    if (name == 'operation_role_id') {
      formedValue = +value
    }
    setFormData({
      ...formData,
      [name]: formedValue
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addOperatingWindowMutationBind(formData)
      .unwrap()
      .then((fulfilled) => {
        setIsOpen(false)
        window.location.reload()
        showSnackbar('Обновите страницу', 'success')
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

  return (
    <form onSubmit={handleSubmit}>
      <CustomSelect
        label={'Выбор операции'}
        listValues={data?.operations.map((value) => [value.id, value.name])}
        value={
          data?.operations.filter((value) =>
            value.id == formData.operation_role_id ? value.name : ''
          )[0]
        }
        setPropsValue={handleChange}
        name={'operation_role_id'}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Привязать
      </Button>
    </form>
  )
}

export function SubmitEditActiveRoles({ setIsOpen, mainWindowId, data }) {
  const { showSnackbar } = useCustomSnackbar()

  const [editActiveWindow, { isLoading: isLoadingAddSubcategory }] =
    useEditActiveRolesMutation()

  const [formData, setFormData] = useState({
    operation_role_id: 0,
    is_active: null
  })

  const handleChange = (event) => {
    const { name, value } = event
    let formedValue = value
    if (name == 'operation_role_id') {
      formedValue = +value
    }
    setFormData({
      ...formData,
      [name]: formedValue
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formData.is_active) {
      await editActiveWindow(formData)
        .unwrap()
        .then((fulfilled) => {
          setIsOpen(false)
          window.location.reload()
          showSnackbar('Обновите страницу', 'success')
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
    } else alert('Выберите операцию')
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomSelect
        label={'Выбор операции'}
        listValues={[
          [1, 'Отправления'],
          [2, 'Переводы'],
          [3, 'Коммунальные услуги']
        ]}
        value={1}
        setPropsValue={handleChange}
        name={'operation_role_id'}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ marginTop: '1rem' }}
      >
        Изменить
      </Button>
    </form>
  )
}
