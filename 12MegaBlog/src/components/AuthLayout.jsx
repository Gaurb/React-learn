import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children, authetication =true}) {
    const navigate= useNavigate();
    const[loader,seloader]= useState(true)
    const authStatus = useSelector(state=> state.auth.status)

    useEffect(()=>{
        if(authetication && authStatus !== authetication){
            navigate("/login")
        }else if(!authetication && authStatus!== authetication){
            navigate("/")
        }
    },[authStatus,navigate,authetication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
