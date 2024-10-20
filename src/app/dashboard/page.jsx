'use client'
import { DialogAddForm } from '@/components/common/DialogAddForm'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { CustomGraph } from '@/components/common/Graph'
import {
  SubmitAddOffice,
  SubmitAddOperatingWindow,
  SubmitAddOperatingWindowBind,
  SubmitAddOperationOffice,
  SubmitAddSubcategory,
  SubmitEditActiveRoles,
  SubmitEditActiveWindow
} from '@/components/common/SubmitAddForm'
import { CustomTable } from '@/components/common/Table'
import { CustomTextField } from '@/components/common/TextField'
import {
  useGetAllQueueQuery,
  useGetAllReservedTicketsQuery,
  useGetAllScoresQuery,
  useGetOfficesQuery,
  useGetOperationRolesQuery,
  useGetOperationWindowByOfficesIdQuery,
  useLazyGetOperationsByIndexQuery
} from '@/lib/api/MainApi'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  styled,
  TextField
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

export default function MainDashboard() {
  const [isOpenOfficeForm, setIsOpenOfficeForm] = useState(false)
  const [isOpenOperatiomRoleForm, setIsOpenOperatiomRoleForm] = useState(false)
  const [isOpenSubcategory, setIsOpenSubcategory] = useState(false)
  const [isOpenEditActiveWindow, setIsOpenEditActiveWindow] = useState(false)
  const [isOpenAddOperatingWindow, setIsOpenAddOperatingWindow] =
    useState(false)
  const [isOpenAddOperatingWindowBind, setIsOpenAddOperatingWindowBind] =
    useState(false)
  const [isOpenEditActiveRoles, setIsOpenEditActiveRoles] = useState(false)

  const [currOfficeId, setCurrOfficeId] = useState(0)
  const [selectedOperation, setSelectedOperation] = useState(0)
  const [prepareDataForWindowData, setPrepareDataForWindowData] = useState([])

  const { data: dataScores, isLoading: isLoadingScores } =
    useGetAllScoresQuery()
  const { data: dataOperationRoles, isLoading: isLoadingOperationRoles } =
    useGetOperationRolesQuery()
  const { data: dataOffices, isLoading: isLoadingOffices } =
    useGetOfficesQuery()
  const { data: reservedTickets, isLoading: isLoadingReservedTickets } =
    useGetAllReservedTicketsQuery()
  const {
    data: operationWindowByOfficesId,
    isLoading: isLoadingOperationWindowByOfficesId
  } = useGetOperationWindowByOfficesIdQuery(currOfficeId.value)
  const { data: allQueueQuery, isLoading: isLoadingAllQueueQuery } =
    useGetAllQueueQuery()
  const [
    getOperationsByIndexQuery,
    resultsOperationsByIndexQuery,
    { isLoadingOperationsByIndexQuery }
  ] = useLazyGetOperationsByIndexQuery() //берём по индексу await getOperationsByIndexQuery(index)
  const usersScores = [
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'Имя' },
    { field: 'last_name', headerName: 'Фамилия' },
    { field: 'middle_name', headerName: 'Отчество' },
    {
      field: 'phone_number',
      headerName: 'Телефон',
      sortable: false,
      type: 'phone',
      valueGetter: (value, row) => (value ? value : '-')
    },
    {
      field: 'email',
      headerName: 'Почта',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => (value ? value : '-')
    }
  ]

  const allOffices = [
    //id name index place coordinates operating_windows
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Наименование' },
    {
      field: 'index',
      headerName: 'Индекс'
    },
    { field: 'place', headerName: 'Адрес' },
    {
      field: 'operating_windows',
      headerName: 'Количество операционных окон',
      valueGetter: (value, row) => value?.length,
      type: 'number'
    }
  ]

  const allOperationRoles = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Наименование' },
    {
      field: 'subcategories',
      headerName: 'Подкатегории',
      sortable: false,
      valueGetter: (value, row) =>
        value.reduce(
          (accumulator, currentValue, index) =>
            index
              ? accumulator + ', ' + currentValue.name
              : accumulator + currentValue.name,
          ''
        )
    }
  ]

  const allReservedTickets = [
    { field: 'id', headerName: 'ID' },
    { field: 'uuid', headerName: 'ID бронирующего' },
    { field: 'reserved_date', headerName: 'Дата брони', type: 'Date' },
    { field: 'operation_text', headerName: 'Тип операции' },
    {
      field: 'is_active',
      headerName: 'Активна ли бронь?',
      valueGetter: (value, row) => (value ? 'Да' : 'Нет')
    }
  ]

  const tableOperationWindowByOfficesId = [
    { field: 'id', headerName: 'ID' },
    { field: 'number', headerName: 'Номер окна', type: 'number' },
    {
      field: 'is_active',
      headerName: 'Активно ли окно?',
      valueGetter: (value, row) => (value ? 'Да' : 'Нет')
    },
    { field: 'operations', headerName: 'Доступные операции' }
  ]

  const allQueue = [
    { field: 'id', headerName: 'ID' },
    { field: 'office_id', headerName: 'ID Офиса', type: 'number' },
    {
      field: 'date_of_admission',
      headerName: 'Дата добавления',
      type: 'Date'
    },
    {
      field: 'reservation',
      headerName: 'Наличие брони',
      valueGetter: (value, row) => (value ? 'Да' : 'Нет')
    },
    {
      field: 'reservation_date',
      headerName: 'Дата брони',
      type: 'Date',
      valueGetter: (value, row) => (value ? value : '-')
    },
    {
      field: 'operation_role_id',
      headerName: 'ID Типа операции',
      type: 'number'
    }
  ]

  useEffect(() => {
    const getOperationsByIndex = async (ind) =>
      await getOperationsByIndexQuery(dataOffices?.offices[ind]?.index)
    operationWindowByOfficesId?.windows &&
      setPrepareDataForWindowData(
        operationWindowByOfficesId?.windows.map((value, index) => ({
          ...value,
          operations: getOperationsByIndex(index)?.operations //?.
        }))
      )
  }, [operationWindowByOfficesId])

  return (
    <Column
      paddingX={'2vw'}
      boxSizing={'border-box'}
      fontSize={'clamp(24px,1vw,72px)'}
    >
      <Column width={'100%'} height={'100%'} paddingTop={'1em'}>
        <HeaderText>ПочтаБук</HeaderText>
        <PostBlock name='Инфографика' color='blue'>
          <PostGraphs />
        </PostBlock>
        <PostBlock name='Пользователи' color='lightgreen'>
          <PostTable
            name='Пользователи'
            columns={usersScores}
            data={dataScores}
          />
        </PostBlock>
        <PostBlock name='Типы операций почты' color='orange'>
          <PostTable
            name='Типы операций почты'
            columns={allOperationRoles}
            setSelectedOperation={setSelectedOperation}
            data={dataOperationRoles}
          />
          <Stack direction='row' spacing={1} justifyContent={'space-evenly'}>
            <Button
              size='small'
              onClick={() => setIsOpenOperatiomRoleForm(true)}
            >
              Добавить тип операции
            </Button>
            <Button
              size='small'
              onClick={() => {
                selectedOperation
                  ? setIsOpenSubcategory(true)
                  : alert('Выберите тип операции')
              }}
            >
              Добавить подкатегорию
            </Button>
          </Stack>
        </PostBlock>
        <PostBlock name='Отделения' color='lightblue'>
          <PostTable
            name='Отделения'
            columns={allOffices}
            setSelectedOperation={setSelectedOperation}
            data={dataOffices}
          />
          <Stack direction='row' spacing={1} justifyContent={'space-evenly'}>
            <Button size='small' onClick={() => setIsOpenOfficeForm(true)}>
              Добавить отделение
            </Button>
            <Button
              size='small'
              onClick={() => {
                selectedOperation
                  ? setIsOpenAddOperatingWindow(true)
                  : alert('Выберите необходимое отделение')
              }}
            >
              Зарегистрировать окно
            </Button>
          </Stack>
        </PostBlock>
        <PostBlock name='Окна по отделениям' color='pink'>
          <CustomSelect
            listValues={dataOffices?.offices.map((value) => [
              value.id,
              value.name
            ])}
            value={
              dataOffices?.offices.filter((value) =>
                value.id == currOfficeId.value ? value.name : ''
              )[0]
            }
            setPropsValue={setCurrOfficeId}
          />
          <PostTable
            name='Окна по отделениям'
            columns={tableOperationWindowByOfficesId}
            setSelectedOperation={setSelectedOperation}
            data={prepareDataForWindowData}
          />
          <Stack
            direction='row'
            spacing={1}
            justifyContent={'space-evenly'}
            flexWrap={'wrap'}
          >
            <Button
              size='small'
              onClick={() => {
                selectedOperation
                  ? setIsOpenAddOperatingWindowBind(true)
                  : alert('Выберите необходимое окно')
              }}
            >
              Привязать операцию к окну
            </Button>
            <Button
              size='small'
              onClick={() => {
                selectedOperation
                  ? setIsOpenEditActiveWindow(true)
                  : alert('Выберите необходимое окно')
              }}
            >
              Изменить активность окна
            </Button>
            <Button
              size='small'
              onClick={() => {
                selectedOperation
                  ? setIsOpenEditActiveRoles(true)
                  : alert('Выберите необходимое окно')
              }}
            >
              Вкл/Выкл операцию на окне
            </Button>
          </Stack>
        </PostBlock>
        <PostBlock name='Брони' color='lightgreen'>
          <PostTable
            name='Брони'
            columns={allReservedTickets}
            setSelectedOperation={() => {}}
            data={reservedTickets}
          />
          {/* <Stack direction='row' spacing={1} justifyContent={'space-evenly'}>
            <Button
              size='small'
              onClick={() => {
                alert('Типо удалил')
              }}
            >
              Удалить бронь
            </Button>
          </Stack> */}
        </PostBlock>
        <PostBlock name='История очереди' color='orange'>
          <PostTable
            name='История очереди'
            columns={allQueue}
            setSelectedOperation={() => {}}
            data={allQueueQuery}
          />
        </PostBlock>
        <PostBlock name='Загрузка файлов' color='lightblue'>
          <PostLoadImage
            name={'Загрузка файлов'}
            helperText={'Введите текст'}
          />
        </PostBlock>
      </Column>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenOfficeForm}
        setIsOpen={setIsOpenOfficeForm}
        title={'Добавление нового почтового отделения'}
      >
        <SubmitAddOffice setIsOpen={setIsOpenOfficeForm} />
      </DialogAddForm>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenOperatiomRoleForm}
        setIsOpen={setIsOpenOperatiomRoleForm}
        title={'Добавление нового типа операции'}
      >
        <SubmitAddOperationOffice setIsOpen={setIsOpenOperatiomRoleForm} />
      </DialogAddForm>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenSubcategory}
        setIsOpen={setIsOpenSubcategory}
        title={'Добавление подкатегории'}
      >
        <SubmitAddSubcategory
          setIsOpen={setIsOpenOperatiomRoleForm}
          mainOperationId={selectedOperation}
        />
      </DialogAddForm>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenEditActiveWindow}
        setIsOpen={setIsOpenEditActiveWindow}
        title={'Изменение активности окна'}
      >
        <SubmitEditActiveWindow
          setIsOpen={setIsOpenEditActiveWindow}
          mainWindowId={selectedOperation}
        />
      </DialogAddForm>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenAddOperatingWindow}
        setIsOpen={setIsOpenAddOperatingWindow}
        title={'Создание нового окна в отделении'}
      >
        <SubmitAddOperatingWindow
          setIsOpen={setIsOpenAddOperatingWindow}
          mainWindowId={selectedOperation}
        />
      </DialogAddForm>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenAddOperatingWindowBind}
        setIsOpen={setIsOpenAddOperatingWindowBind}
        title={'Привязка операции к окну'}
      >
        <SubmitAddOperatingWindowBind
          setIsOpen={setIsOpenAddOperatingWindowBind}
          mainWindowId={selectedOperation}
          data={dataOperationRoles}
        />
      </DialogAddForm>
      <DialogAddForm
        onAgree={() => {}}
        isOpen={isOpenEditActiveRoles}
        setIsOpen={setIsOpenEditActiveRoles}
        title={'Изменение активности операции'}
      >
        <SubmitEditActiveRoles
          setIsOpen={setIsOpenEditActiveRoles}
          mainWindowId={selectedOperation}
          data={dataOperationRoles}
        />
      </DialogAddForm>
    </Column>
  )
}

function FirstGraph({}) {
  return (
    <Column>
      <Box>Статистика получения/отправлений</Box>
      <CustomGraph
        type={'line'}
        series={[
          {
            name: 'Отправка',
            data: [10, 23, 15, 22, 14, 21, 23]
          },
          {
            name: 'Получение',
            data: [21, 16, 18, 22, 21, 17, 41]
          }
        ]}
        options={{
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: [
              '2024-09-19T00:00:00.000Z',
              '2024-09-20T01:30:00.000Z',
              '2024-09-21T02:30:00.000Z',
              '2024-09-22T03:30:00.000Z',
              '2024-09-23T04:30:00.000Z',
              '2024-09-24T05:30:00.000Z',
              '2024-09-25T06:30:00.000Z'
            ]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            }
          }
        }}
      ></CustomGraph>
    </Column>
  )
}

function SecondGraph({}) {
  return (
    <Column>
      <Box>Статистика загруженности окон</Box>
      <CustomGraph
        series={[
          {
            name: 'Загруженность',
            data: [51, 20, 62, 38]
          }
        ]}
        options={{
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'number',
            categories: [1, 2, 3, 4]
          }
        }}
        type={'bar'}
      ></CustomGraph>
    </Column>
  )
}

function ThirdGraph({}) {
  return (
    <Column>
      <Box>Загруженность отделения</Box>
      <CustomGraph
        type={'radialBar'}
        series={[44, 55, 67, 83]}
        options={{
          chart: {
            height: 350,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px'
                },
                value: {
                  fontSize: '16px'
                }
              }
            }
          },
          legend: { show: true },
          labels: ['08:00', '12:00', '15:00', '18:00']
        }}
      ></CustomGraph>
    </Column>
  )
}

function PostGraphs({ name }) {
  return (
    <Row flexWrap={'wrap'} justifyContent={'space-between'}>
      <FirstGraph></FirstGraph>
      <SecondGraph></SecondGraph>
      <ThirdGraph></ThirdGraph>
    </Row>
  )
}

function PostTable({ name, columns, setSelectedOperation, data, isLoading }) {
  let currData
  if (name == 'Пользователи') {
    currData = data
  } else if (name == 'Типы операций почты') {
    currData = data?.operations
  } else if (name == 'Отделения') {
    currData = data?.offices
  } else if (name == 'Окна по отделениям') {
    currData = data
  } else if (name == 'Брони') {
    currData = data?.reserved
  } else if (name == 'История очереди') {
    currData = data?.queue
  }

  return (
    <CustomTable
      rows={currData}
      columns={columns}
      setSelectedRowIndex={setSelectedOperation}
    ></CustomTable>
  )
}

function PostCheckBox({ name }) {
  return (
    <Column gap={1}>
      <Box fontWeight={500} fontSize={'0.8em'}>
        {name}
      </Box>
      <Row gap={2} alignItems={'center'}>
        <Column>
          <CustomCheckBox label={'Текст1'} />
          <CustomCheckBox label={'Текст2'} />
          <CustomCheckBox label={'Текст3'} />
        </Column>
        <Column>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            <CustomOptionBox label={'Текст1'} />
            <CustomOptionBox label={'Текст2'} />
            <CustomOptionBox label={'Текст3'} />
          </RadioGroup>
        </Column>
        <Box width={'300px'}>
          <CustomSelect listValues={['Привет', 'Это', 'Пример']} />
        </Box>
      </Row>
    </Column>
  )
}

export function CustomSelect({
  label,
  name,
  listValues,
  value,
  setPropsValue
}) {
  return (
    <Select
      name={name}
      fullWidth
      onChange={(event) => {
        setPropsValue(event.target)
      }}
      value={value}
    >
      {listValues != undefined ? (
        listValues.map((elem, ind) => (
          <MenuItem key={elem[1] + ind} value={elem[0]}>
            {elem[1]}
          </MenuItem>
        ))
      ) : (
        <MenuItem key={'menuitem'} id={0} value={''}>
          {value}
        </MenuItem>
      )}
    </Select>
  )
}

function CustomOptionBox({ label, checked, handleChange }) {
  return (
    <FormControlLabel
      control={
        <Radio value={label} checked={checked} onChange={handleChange} />
      }
      label={label}
    />
  )
}

function CustomCheckBox({ label, checked, handleChange }) {
  return (
    <FormControlLabel
      control={
        <Checkbox defaultChecked checked={checked} onChange={handleChange} />
      }
      label={label}
    />
  )
}

function PostLoadImage({ name }) {
  const [dragOver, setDragOver] = useState(false)
  const [isDrag, setIsDrag] = useState(false)
  const handleDragOver = useCallback((event) => {
    event.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
    setDragOver(false)
  }, [])
  const handleDrop = useCallback((event) => {
    event.preventDefault()
    setDragOver(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      console.log(event.dataTransfer.files[0])
    }
  }, [])

  const handleChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
    }
  }, [])
  return (
    <Column gap={1}>
      <Box fontWeight={500} fontSize={'0.8em'}>
        {name}
      </Box>
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type='file'
          id={'dadada'}
          style={{ display: 'none' }}
          onChange={handleChange}
        ></input>
        <label htmlFor={'dadada'}>
          <Center
            boxSizing={'border-box'}
            border={dragOver ? 5 : 0}
            borderColor={'lightgreen'}
            onDrag={(e) => e.preventDefault()}
            width={'100%'}
            height={'300px'}
            bgcolor={'#f3f3f3'}
            borderRadius={3}
            sx={{ cursor: 'pointer' }}
          >
            <Row
              height={'15%'}
              paddingX={3}
              paddingY={2}
              borderRadius={3}
              bgcolor={'white'}
              color={'#555555'}
              alignItems={'center'}
              gap={1}
              border={dragOver ? 5 : 0}
              borderColor={'lightgreen'}
            >
              <Box
                height={'100%'}
                width={'auto'}
                component={'img'}
                src={
                  'https://img.icons8.com/?size=100&id=zjxyfVKTCQZA&format=png&color=444444'
                }
              ></Box>
              {dragOver ? 'Прикрепить файл' : 'Загрузите или перетащите файл'}
            </Row>
          </Center>
        </label>
      </Box>
    </Column>
  )
}

function PostTextFieldMultiline({ name, helperText }) {
  return (
    <Column gap={1}>
      <Box fontWeight={500} fontSize={'0.8em'}>
        {name}
      </Box>
      <CustomTextField
        fullWidth
        placeholder={helperText}
        multiline
        size='small'
        slotProps={{
          input: {
            sx: { borderRadius: 3 }
          }
        }}
      ></CustomTextField>
    </Column>
  )
}
function PostTextField({ name, helperText }) {
  return (
    <Column gap={1}>
      <Box fontWeight={500} fontSize={'0.8em'}>
        {name}
      </Box>
      <CustomTextField
        fullWidth
        placeholder={helperText}
        slotProps={{
          input: {
            sx: {
              borderRadius: 3
            }
          }
        }}
        sx={{
          '& label.Mui-focused': {
            color: 'red'
          }
        }}
      ></CustomTextField>
    </Column>
  )
}

function HeaderText({ children }) {
  return (
    <Box fontSize={'2em'} fontWeight={'bold'} color='#444444'>
      {children}
    </Box>
  )
}

export function PostBlock({ children, name, color, boxShadow = true }) {
  return (
    <Column
      marginY={'0.5em'}
      fontSize={'0.75em'}
      fontWeight={'bold'}
      color='#444444'
      borderRadius={'0.4vw'}
      bgcolor={'white'}
      paddingY={'1vw'}
      paddingX={'1vw'}
      position={'relative'}
      sx={
        boxShadow && {
          boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
        }
      }
    >
      <Row alignItems={'stretch'} gap={2} marginBottom={'0.75em'}>
        <Box width={'0.6vw'} borderRadius={'0.15vw'} bgcolor={color}></Box>
        <Box fontSize={'1.25em'}>{name}</Box>
      </Row>
      <Column paddingTop={'1em'} gap={'1.5em'} color='#656565'>
        {children}
      </Column>
    </Column>
  )
}
