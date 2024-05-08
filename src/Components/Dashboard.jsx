import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../container/services';

const Dashboard = () => {
  const [userType,setUserType]=useState("")
  const navigate=useNavigate();
  let token=localStorage.getItem("token")
  useEffect(()=>{
    let token=localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }
    else{
      async function getData(){
        let res=await fetchData(token);
        console.log(res)
        if(res.isAdmin){
          setUserType("Admin")
        }
        else{
          setUserType("User")
        }
      }
     getData();
    }
  },[])
  return (
    <div>
      Welcome {userType}
    </div>
  )
}

export default Dashboard