import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './features/common/layout/Header'
import Footer from './features/common/layout/Footer'
import CookieConsentComponent from './features/legal/CookieConsent'

function App() {

  return (
    <Stack>
      <Header />
      <CookieConsentComponent/>
      <Box minHeight={"95vh"}>
        <Outlet />
      </Box>
      <Footer />

    </Stack>
  )
}

export default App
