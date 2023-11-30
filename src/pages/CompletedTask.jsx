import React, { useEffect, useState } from 'react'
import { Container , Card} from '../components/index'
import service from '../appwrite/config'

export default function CompletedTasks() {
    const [tasks ,  setTasks] = useState([])

    useEffect(() => {
        service.getCompletedTask([])
            .then((tasks) => {setTasks(tasks)})
            .catch((error) => {
                console.log("Completed tasks in not Listed !! error: " , error);
            })
    } , [])
  return (
    <Container >
        <div className="w-2/3 ">
            <div className="flex flex-wrap ">
                {tasks.map((task) => (
                    <div key={task.ID} className='p-2 w-1/4'>
                        <Card task={task} />
                    </div>
                ))}
            </div>
        </div>
    </Container>
  )
}

