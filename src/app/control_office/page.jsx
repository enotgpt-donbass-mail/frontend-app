'use client'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { CustomGraph } from '@/components/common/Graph'
import { CustomTable } from '@/components/common/Table'
import { CustomTextField } from '@/components/common/TextField'
import { CustomColors } from '@/components/UI/colors/CustomColors'
import { CustomIMG } from '@/components/UI/images/imagesURL'
import {
  useGetAllScoresQuery,
  useGetOfficesQuery,
  useGetOperationRolesQuery
} from '@/lib/api/MainApi'
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

// {
//   "status": true,
//   "offices": [
//     {
//       "id": 1,
//       "name": "Главпочтамтп",
//       "index": 100001,
//       "place": "г. Донецк, ул. Артёма, 8",
//       "coordinates": [
//         39.3233323,
//         45.37828327
//       ],
//       "operating_windows": [
//         {
//           "id": 1,
//           "number": 1,
//           "office_id": 1,
//           "is_active": true
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "name": "Главное отделение Калининского района",
//       "index": 100043,
//       "place": "г. Донецк, ул. Владычанского, д. 46",
//       "coordinates": [
//         39.3233678,
//         45.37853227
//       ],
//       "operating_windows": []
//     }
//   ]
// }

export default function MainDashboard() {
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

  return (
    <Column
      paddingX={'2vw'}
      boxSizing={'border-box'}
      fontSize={'clamp(24px,1vw,72px)'}
    >
      <Column width={'100%'} height={'100%'} paddingTop={'1em'}>
        <HeaderText>Управление отделением</HeaderText>
        <PostBlock name='Карта отделения' color='lightgreen'>
          <Center
            width={'100%'}
            minHeight={'400px'}
            bgcolor={CustomColors.grey[100]}
            borderRadius={4}
          >
            <Row
              width={'90%'}
              gap={'2vw'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
            >
              <BlockPartOffice status={1} num={1} talon={'Л32'} />
              <BlockPartOffice status={2} num={2} />
              <BlockPartOffice status={1} num={3} talon={'Л18'} />
              <BlockPartOffice status={0} num={4} />
            </Row>
          </Center>
        </PostBlock>
        <PostBlock name='Статистика отделения' color='lightblue'>
          <PostGraphs></PostGraphs>
        </PostBlock>
      </Column>
    </Column>
  )
}

function BlockPartOffice({ status, num, talon }) {
  const statuses = {
    0: CustomIMG.computer,
    1: CustomIMG.computer_ok,
    2: CustomIMG.computer_error
  }
  return (
    <Center
      width={'10%'}
      minWidth={'120px'}
      sx={{ aspectRatio: '1' }}
      bgcolor={'white'}
      borderRadius={4}
      position={'relative'}
    >
      <Box
        width={'100px'}
        height={'auto'}
        component={'img'}
        src={status ? statuses[status] : CustomIMG.computer}
      ></Box>
      <Box position={'absolute'} color={'white'}>
        {String(num).padStart(2, '0')}
      </Box>
      {talon && (
        <Box position={'absolute'} color={CustomColors.grey[700]} top={0}>
          {String(talon)}
        </Box>
      )}
    </Center>
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

function PostTable({ name, columns }) {
  let data
  let {
    data: dataScores,
    isLoading: isLoadingScores,
    status: statusScores,
    error: errorScores,
    refetch: refetchScores
  } = useGetAllScoresQuery()
  let {
    data: dataOperationRoles,
    isLoading: isLoadingOperationRoles,
    status: statusOperationRoles,
    error: errorOperationRoles,
    refetch: refetchOperationRoles
  } = useGetOperationRolesQuery()
  let {
    data: dataOffices,
    isLoading: isLoadingOffices,
    status: statusOffices,
    error: errorOffices,
    refetch: refetchOffices
  } = useGetOfficesQuery()
  if (name == 'Пользователи') {
    data = dataScores
  } else if (name == 'Типы операций почты') {
    data = dataOperationRoles?.operations
  } else if (name == 'Офисы') {
    data = dataOffices?.offices
  }
  return <CustomTable rows={data} columns={columns}></CustomTable>
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

function CustomSelect({ label, listValues, value, handleChange }) {
  return (
    <Select
      fullWidth
      onChange={handleChange}
      value={value ? value : listValues[0]}
    >
      {listValues.map((elem, ind) => (
        <MenuItem key={'menuitem' + ind} value={elem}>
          {elem}
        </MenuItem>
      ))}
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
    <Box
      fontSize={'2em'}
      fontWeight={'bold'}
      color='#444444'
      marginBottom={'0.5em'}
    >
      {children}
    </Box>
  )
}

function PostBlock({ children, name, color }) {
  return (
    <Column
      marginY={'0.5em'}
      fontSize={'0.75em'}
      fontWeight={'bold'}
      color='#444444'
      borderRadius={4}
      bgcolor={'white'}
      paddingY={'1vw'}
      paddingX={'1vw'}
      position={'relative'}
      sx={{
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
      }}
    >
      <Row alignItems={'stretch'} gap={2} marginBottom={'0.75em'}>
        <Box width={'0.75em'} borderRadius={1} bgcolor={color}></Box>
        <Box fontSize={'1.25em'}>{name}</Box>
      </Row>
      <Column paddingTop={'0.5vw'} gap={'1.5em'} color='#656565'>
        {children}
      </Column>
    </Column>
  )
}
