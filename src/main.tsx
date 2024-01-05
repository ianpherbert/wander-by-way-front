import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import HomePage from './pages/Homepage.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import { theme } from './theme.ts'
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material'
import store from './redux/store.ts'
import TestPage from './pages/TestPage.tsx'

export const paths = {
  home: { entrypoint: "home" },
  test: { entrypoint: "test" }
}

const routes = [
  { path: paths.home.entrypoint, element: <HomePage /> },
  { path: paths.test.entrypoint, element: <TestPage /> }
]

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: routes
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
