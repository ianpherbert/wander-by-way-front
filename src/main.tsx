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
import ExplorePage from './pages/ExplorePage.tsx'

export const endPoints = {
  home: { entrypoint: "" },
  test: { entrypoint: "test" },
  explore: { entrypoint: "explore" }
}

const routes = [
  { path: endPoints.home.entrypoint, element: <HomePage /> },
  { path: endPoints.test.entrypoint, element: <TestPage /> },
  { path: endPoints.explore.entrypoint, element: <ExplorePage /> },
  { path: `${endPoints.explore.entrypoint}`, element: <ExplorePage /> },
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
