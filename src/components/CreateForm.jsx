import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button , Input , Select } from './index'
import service from '../appwrite/config.js'

function CreateForm({prevTask}) {

  const {register , handleSubmit , watch , setValue , control , getValues} = useForm({
    defaultValues: {
      title: prevTask?.title ||'Create New Task' ,
      slug: prevTask?.slug || '' ,
      description : prevTask?.description ||'Create Task to learn Frontend Web Development',
      startFrom : prevTask?.startFrom || Date.now()  ,
      endAt:  prevTask?.endAt || Date.now()  ,
      typeOf_task :  prevTask?.typeOf_task || 'Personal'  ,
      task_status:  prevTask?.task_status || 'Pending' ,
    } ,
  }) 

  const navigate = useNavigate()
  const [error , setError] = useState("") 
  const data = useSelector(state => state.user.data) 

  const submit = async(data) => {
    setError("") 
    try {
      if(prevTask){
        const updatedTask = await service.updateTask(prevTask.ID , {...data});
        if(updatedTask){
          navigate('/my-tasks') 
        }
      }else{
       const newTask =  await service.createTask(data) ;
       if(newTask){
        navigate('/my-tasks')
       }
      }
    } catch (error) {
      setError(error.message)
    }
    
  }
 
  return (
  <div className="w-full mx-auto p-10 max-w-lg bg-gray-500 dark:bg-slate-300 rounded-xl text-black border-black dark:text-white dark:border-white">
      <h1 className='font-semibold text-center text-2xl leading-tight'>Add new Task</h1>
      {error && <p className='text-red-600 mt-8 text-center'> {error}</p>}

      <form onSubmit={handleSubmit(submit)} className='flex flex-col'>
        <Input
        type='title'
        placeholder="give short title"
        label='Add Title: ' 
        className="mb-4"
        {...register("Title" , {
          required: 'true' ,
        })}/>

      <div>
        <label>Add Description:</label>
        <textarea {...register('description')} rows="4" placeholder='give brief description...' className="mb-4"/>
      </div>

      <Input
      label="Start"
      type="date"
      className="mb-4"
      {...register("startFrom" , {
        required: 'true ',
      })} />

      <Input
      label="Start"
      type="date"
      className="mb-4"
      {...register("endAt")} />

      <Select
      options={["Personal" , "Professional"]}
      label="Task Category" 
      className="mb-4"
      {...register("task_status" , {
        required: 'true ',
      })}/>


      <Select
      options={["Completed" , "Pending"]}
      label="Task Status" 
      className="mb-4"
      {...register("task_status" , {
        required: 'true ',
      })}/>

      <Button type='submit' className='w-full'>
        {prevTask? "Update" : "Create"}
      </Button>
      
      </form>
  </div>
  )
}

export default CreateForm