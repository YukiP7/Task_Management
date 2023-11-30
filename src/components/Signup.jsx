import React , {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Button , Input } from './index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const {register , handleSubmit} = useForm()
    const [error , setError] = useState("")

    const signupHandler = async (data) =>{
        setError("")
        try {
          const userData =  await authService.createAccount(data) 
          if(userData){
            const data = await authService.getCurrentUser() 
            if(data){
                dispatch(login(data)) ;
                navigate("/")
            }
          }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'>
        <div className="w-full mx-auto p-10 max-w-lg bg-gray-500 dark:bg-slate-300 rounded-xl text-black border-black dark:text-white dark:border-white">
        <h1 className='font-semibold text-center text-2xl leading-tight'>Send over your deets in the form below 🤟 </h1>
        {error && <p className='text-red-600 mt-8 text-center'> {error}</p>}

        <form onSubmit={handleSubmit(signupHandler)} className='mt-8'>
            <div className="space-y-5">

            <Input 
                label = "Name: "
                placeholder="Enter your full name" 
                type="name"
                {...register("name" , {
                    required: true ,
                })}
            /> 

            <Input 
            label = "Email: "
            placeholder="Enter your email" 
            type="email"
            {...register("email" , {
                required: true ,
                validate: {
                    //Pattern required for login --> use Regexr
                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(v) ||
                    "Email address must be a valid address" ,
                }
            })}
            /> 

            <Input 
            label= "Password: "
            placeholder="Enter password"
            type="password"
            {...register("password" , {
                required: true ,
                validate: {
                    matchPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v) || 
                    "Password should contain valid characters" ,
                }
            })}
            />

            <Input 
            label = "Contact :"
            placeholder="Give your phone number"
            type="number"
            {...register("number" , {
                validate: {
                    matchPattern: /09(0[1-2]|1[\d]|3[\d]|2[0-1])[\d]{3}[\d]{4}/.test(v) ||
                    "Phone number must be valid number",
                }
            })}
            />

            <Button type='submit'>Create Account</Button>
            <p>Already have an account?
                <Link to={"/login"} >
                    Login
                </Link>
            </p>
            
            </div>
        </form>
        </div>
    </div>
  )
}

export default Signup