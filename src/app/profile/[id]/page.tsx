"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page  = ({params}:any) => {
  const [username , setUsername] = useState()
  const [email , setEmail] = useState()
  const [id , setId] = useState()
  
  const getDetail = async () => {
    const res = await axios.get('/api/users/userDetail')
    console.log("hellow mmmmm" + res.data.data.username);
      setUsername (res.data.data.username)
      setEmail (res.data.data.email)
      setId (res.data.data._id)
  }
  useEffect(() => {
    getDetail()
  },[])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='p-3 font-bold text-2xl m-4 bg-yellow-500 rounded'>Profile Page of User   :-  {id}</h1>
        <button  className="p-2 border  bg-red-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"> <Link href={'/profile'}>Go Back</Link> </button>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600">Name of the User is :-  {username}</button>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600">Email of the User is :- {email} </button>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600">Id of the user is as :- {id} </button>
       
    </div>
  )
}

export default  page




