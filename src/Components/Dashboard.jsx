import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../container/services';

const Dashboard = () => {
  const [userType,setUserType]=useState("")
  const navigate=useNavigate();
  useEffect(()=>{
    let token=localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }
    else{
      let res=fetchData();
      if(res.isAdmin){
        setUserType("Admin")
      }
      else{
        setUserType("User")
      }
    }
  },[])
  return (
    <div>
      Welcome {userType}
    </div>
  )
}

export default Dashboard