import React , {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button , Input} from "../components/index.js"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const {register , handleSubmit} = useForm() ;
    const [error , setError] = useState("")

    const login = async (data) => {
        setError("") 
        try {
          const session =  await authService.login(data)
          if(session){
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(authLogin)
            navigate("/")
          }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'>
        <div className="w-full mx-auto p-10 max-w-lg bg-gray-500 dark:bg-slate-300 rounded-xl text-black border-black dark:text-white dark:border-white">
        <h1 className='font-semibold text-center text-2xl leading-tight'>Sign in to your account 🤟 </h1>
        {error && <p className='text-red-600 mt-8 text-center'> {error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className="space-y-5">
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

                <Button type='submit'>Sign in </Button>
                <p>Don't have an account?
                    <Link to={"/signup"} >
                        Sign up 
                    </Link>
                </p>
                
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login