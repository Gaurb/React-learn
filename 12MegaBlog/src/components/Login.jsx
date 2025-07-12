import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authAlice'
import {Button ,Input, Logo} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import {useForm} from 'react-hook-form'
import Register from './SignUp';

function Login() {
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const {register,handleSubmit} =useForm();
    const [error,setError]= useState("");

    const login= async(data)=>{
        setError("")
        try{
            const session =await authService.login(data)
            if(session){
                const userData= await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        }catch(error){
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full py-12'
    >
        <div
        className={`mx-auto w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl p-10 border border-gray-200 shadow-2xl`}
        >
            <div
            className='mb-6 flex justify-center'
            >
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>

            </div>
            <h2 className='text-center text-3xl font-bold leading-tight text-gray-800 mb-2'>Welcome Back!</h2>
            <p
                className='text-center text-gray-600 mb-8'
            >  
                Don&apos;t have an account?&nbsp;
                <Link
                    to="/signup"
                    className='font-medium text-blue-600 transition-all
                    duration-200 hover:text-blue-800 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)}
                className='mt-8'
            >
                <div className='space-y-5'>
                    <Input 
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
                        Sign In
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login