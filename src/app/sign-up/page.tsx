"use client"
import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'

function Signup() {
  interface formdataObj{
    username:string,
    password:string,
    email:string
  }

  const [formdata,setFormdata] = useState<formdataObj>({username:"",email:"",password:""})

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{

    const {name,value} = e.target
    setFormdata((prev)=>({...prev,[name]:value}))
    console.log(formdata);

  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    try {
       const response = await axios.post("/api/sign-up",formdata)
       if(response){
        alert(response.data["message"])
       }
      
    } catch (error) {
      if(error instanceof AxiosError && error.response){
        alert(error.response["data"].message)
      }
      
      console.log(error);
      setFormdata({username:"",email:"",password:""})
      
    }    


        
  }

  return (
    <form action="" onSubmit={handleSubmit}>
       <div className="w-[80%] container mx-auto min-h-screen flex items-center justify-center">
     
     <div className="form flex flex-col items-center w-[50%] h-[40%] gap-5 text-white">
        <h2 className='mb-5'>Sign up to register</h2>

        <div className='flex items-center justify-between gap-3 w-[50%]'>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" className='rounded-lg text-black px-2 h-7' value={formdata.username} onChange={handleChange}/>
        </div>

        <div className='flex items-center justify-between gap-3 w-[50%]'>
          <label htmlFor="email">email</label>
          <input type="text" name="email" id="email" className='rounded-lg text-black px-2 h-7' value={formdata.email} onChange={handleChange}/>
        </div>

        <div className='flex items-center justify-between gap-3 w-[50%]'>
          <label htmlFor="password">password</label>
          <input type="text" name="password" id="password" className='rounded-lg text-black px-2 h-7' value={formdata.password} onChange={handleChange}/>
        </div>

        <button className='bg-cyan-700 h-7 w-[50%] mt-5 rounded-lg'>Sign Up</button>
      </div>
    
    </div>
    </form>
   
  )
}

export default Signup
