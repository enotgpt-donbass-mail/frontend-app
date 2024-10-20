import { Box } from '@mui/material'
import { Row, Center, Column } from '@/components/common/FlexObjects'
import DashboardMenu from '@/components/UI/dashboard/menu/Menu'
import { SearchPanel } from '@/components/UI/dashboard/search/Search'
export default function LayoutDashboard({ children }) {
  return (
    <>
      <Column>
        <Row minHeight={'100svh'} maxWidth={'100vw'} position={'relative'}>
          <Box minWidth={'240px'}></Box>
          <Box position={'fixed'}>
            <DashboardMenu />
          </Box>
          <Column
            width={'calc(100% - 240px)'}
            minHeight={'100%'}
            bgcolor={'#f4f4f4'}
            position={'relative'}
          >
            <Box position={'sticky'} top={0} zIndex={'999'} width={'100%'}>
              <SearchPanel />
            </Box>
            <Box width={'100%'} height={'100%'}>
              {children}
            </Box>
          </Column>
        </Row>
      </Column>
    </>
  )
}
