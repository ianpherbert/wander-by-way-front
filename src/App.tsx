import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './features/common/layout/Header'

function App() {

  return (
    <Stack>
      <Header />
      <Box minHeight={"80vh"}>
        <Outlet />
      </Box>
    </Stack>
  )
}

export default App
