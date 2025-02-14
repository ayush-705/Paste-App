import './App.css'
import {createBrowserRouter, RouterProvider, useRouteError, useSearchParams} from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import Paste_ID from './components/Paste_ID'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: 
      <div className='w-1/2 flex flex-col items-center my-3'>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: '/pastes',
      element: 
      <div className='w-1/2 flex flex-col items-center my-3'>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path: '/pastes/:id',
      element: 
      <div className='w-1/2 flex flex-col items-center my-3'>
        <Navbar/>
        <Paste_ID/>
      </div>
    },
    {
      path:'*',
      element: 
      <div>
        <ErrorPage/>
      </div>
    },
  ]
)

function App() {
  return (
    <div className='flex flex-col items-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App

// Complete the ErrorPage component
// Code the Share button