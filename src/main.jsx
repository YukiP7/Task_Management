import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "../src/store/store.js"
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AddTask, CompletedTask, EditTask, Home, Login, MyTasks, PendingTask, Signup} from './pages/index.js'
import Protected from './components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/> ,
    children: [
      {
        path: '/' ,
        element: <Home />
      }, 
      {
        path: '/login' ,
        element: (
          <Protected>
            <Login/>
          </Protected>
        )
      }, 
      {
        path: '/signup' ,
        element: (
          <Protected>
            <Signup/>
          </Protected>
        )
      }, 
      {
        path: '/my-tasks' ,
        element: (
          <Protected>
            <MyTasks/>
          </Protected>
        )
      }, 
      {
        path: '/completed-task' ,
        element: (
          <Protected>
            <CompletedTask/>
          </Protected>
        )
      }, 
      {
        path: '/pending-task' ,
        element: (
          <Protected>
            <PendingTask/>
          </Protected>
        )
      }, 
      {
        path: '/add-task' ,
        element: (
          <Protected>
            <AddTask/>
          </Protected>
        )
      }, 
      {
        path: '/edit-task' ,
        element: (
          <Protected>
            <EditTask/>
          </Protected>
        )
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
