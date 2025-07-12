import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {login} from '../store/authAlice'
import {Button,Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Input from './Input'

function Register() {

  const navigate= useNavigate();
  const dispatch = useDispatch();
  const[error,setError] = useState("");
  const {register,handleSubmit}= useForm();

  const signup= async(data)=>{
    setError("")
    console.log(data)
    try{
      const userData=await authService.createAccount(data);
      if(userData){
        const curUser= await authService.getCurrentUser();
        if(curUser){
          dispatch(login(curUser))
        }
      }
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center py-12'>
        <div className='mx-auto w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl p-10 border border-gray-200 shadow-2xl'>
          <div
            className='mb-6 flex justify-center'
            >
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-3xl font-bold leading-tight text-gray-800 mb-2'>Create Account</h2>
            <p
                className='text-center text-gray-600 mb-8'
            >  
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className='font-medium text-blue-600 transition-all
                    duration-200 hover:text-blue-800 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(signup)}>
                <div
                className='space-y-5'
                >
                  <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {
                      ...register("name",{
                        required: true
                      })
                    }
                  /><Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",
                        {
                            required: true
                        }
                    )}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register