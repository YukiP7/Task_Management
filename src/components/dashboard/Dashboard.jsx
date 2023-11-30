import React from 'react'
import { LogoutBtn} from "../index.js"
import {Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'


function Dashboard() {
  const authStatus = useSelector((state) => {state.auth.status})
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home' ,
      slug: "/",
      active: true 
    } ,
    {
      name: 'Login' ,
      slug: "/login" ,
      active: !authStatus ,
    },
    {
      name: 'Signup' ,
      slug: "/signup" ,
      active: authStatus ,
    },
    {
      name: 'My Tasks' ,
      slug: "/my-tasks" ,
      active: true ,
    },
    {
      name: 'Add Task' ,
      slug: "/add-task" ,
      active: true ,
    },
    {
      name: ' Completed' ,
      slug: "/completed-task" ,
      active: true ,
    },
    {
      name: 'Incompleted ' ,
      slug: "/pending-task" ,
      active: true,
    },
  ]
  return (
    <div className=" h-screen bg-blue-500 w-1/6">
        <nav className='flex flex-col'>
          <div>
          <Link to="/">
          <div className=" bg-[url('../../assets/task_manager_logo.png')] w-20 h-20 mt-20"></div>
          </Link>
          </div>

        <ul className=' flex flex-col text-white text-xl'>
          {navItems.map((item) => 
            item.active? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-slate-400 rounded-full'>
                  {item.name}
                  </button>
              </li>
            ) : null
          )} 

          {authStatus && (
            <li>
              <LogoutBtn />  
            </li>
          )}
        </ul>
        </nav>
        </div>
   
  )
}

export default Dashboard