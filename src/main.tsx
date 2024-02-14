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
import TripPlannerPage from './pages/TripPlannerPage.tsx'

export const endPoints = {
  home: { entrypoint: "home" },
  test: { entrypoint: "test" },
  tripPlanner: { entrypoint: "trip-planner" }
}

const routes = [
  { path: endPoints.home.entrypoint, element: <HomePage /> },
  { path: endPoints.test.entrypoint, element: <TestPage /> },
  { path: endPoints.tripPlanner.entrypoint, element: <TripPlannerPage /> },
  { path: `${endPoints.tripPlanner.entrypoint}/:origin`, element: <TripPlannerPage /> },
  { path: `${endPoints.tripPlanner.entrypoint}/:origin/:destination`, element: <TripPlannerPage /> }
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
