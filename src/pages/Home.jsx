import React, { useEffect, useState } from 'react'
import {Dashboard , Container, Button } from '../components/index'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [tasks , setTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        service.getTasks().then((tasks) => {
            if(tasks){
                setTasks(tasks.documents)
            }
        })
    } , [])

    return (
        <div className='w-full text-center flex'>
            <Dashboard  />
            <Container>
                <div className='w-full h-screen flex flex-col'>
                    <h1 className='text-4xl font-bold text-blue-900 dark:text-gray-600 mt-20 mb-10 '>Any Task</h1>
                    <p className='text-2xl text-blue-700 dark:text-white '>Easy way to manage daily task and office management.</p>

                    <div className='mt-5 flex  justify-center gap-2 items-center'>
                        {tasks.length !== 0 ? (
                            <>
                           <Button  onClick={() => navigate('/my-tasks')} children={"My Tasks"} /> 
                             <Button onClick={() => navigate('/add-task')} children={"Add New Task"} />;
                             </>
                        ) : (
                            <>
                            <Button onClick={() => navigate('/login')} children={"Login"} />
                            <Button onClick={() => navigate('/signup')} children={"Signup"} />
                            </>
                        )}
                        
                    </div>

                    <div className='w-1/2 flex items-center justify-center'>
                        {tasks.length !== 0 ? (
                            <>
                               <div className="h-1/2 bg-cover" style={{ backgroundImage: `url('../assets/task_managment_heroImg.png')` }}></div>
                                <button
                                    className='w-10 h-10 rounded-full bg-slate-400 text-4xl justify-end mb-0'
                                    onClick={() => navigate('/add-task')}>
                                    +
                                </button>
                            </>
                        ) : (
                            <div className="h-1/2 bg-cover" style={{ backgroundImage: `url('../assets/task_managment_heroImg.png')` }}></div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;