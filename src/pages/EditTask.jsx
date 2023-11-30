import React, { useEffect, useState } from 'react'
import {Container , CreateForm} from '../components/index'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditTask() {
    const [task , setTasks] = useState([])
    const {slug} = useParams() 
    const navigate = useNavigate() 

    useEffect(() => {
        if(slug){
            service.getTasks(slug).then((task) => {
                if(task){
                    setTasks(task)
                }
            })
        }else{
            navigate('/')
        }
    } , [slug , navigate])

  return task ? (
    <div className='py-8'>
        <Container>
            <CreateForm task={task} />
        </Container>
    </div>
  ) : null
}

export default EditTask