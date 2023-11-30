import React from 'react'
import Button from  './Button.jsx'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen , faTrash } from '@fortawesome/free-solid-svg-icons'
import service from '../appwrite/config.js'

function Card({ title , description , startFrom , task_status  }) {

  const navigate = useNavigate()

  const deleteHandler = async(data) => {
      await service.deleteTask(data.ID) ;
  }

  return (
    <div className=' w-80 h-56 border-2 border-black rounded-md shadow-sm dark:text-white dark:border-gray-500 dark:bg-gray-500'>
        <div className='w-full justify-center p-2 mb-4 '>
            <p className=' text-2xl pb-2 font-bold'>{title}</p>
            <p className=' text-xl pb-2'>{description}</p>
            <div className='flex justify-between'>
              <div className='mr-5'>
              <p className='text-lg pb-2'>{startFrom}</p>
              <Button value = {task_status} />
              </div>

              <div className='flex gap-1'>
              <FontAwesomeIcon
              icon={faFilePen}
              onClick={navigate('/edit-task')}
              style={{ cursor: 'pointer', marginRight: '10px' }}
              />

              <FontAwesomeIcon
              icon={faTrash}
              onClick={deleteHandler()}
              style={{ cursor: 'pointer', marginRight: '10px' }}
              />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Card