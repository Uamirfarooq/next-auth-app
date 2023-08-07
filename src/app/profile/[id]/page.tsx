"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

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

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='bg-red-600 p-2 rounded'>profile :</h1>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"> <Link href={'/profile'}>Go Back</Link> </button>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"> {username}</button>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"> {email} </button>
        <button  className="p-2 border  bg-orange-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"> {id} </button>
        <button onClick={getDetail} className='bg-pink-300 p-4 rounded'>Press to see user detail</button>
    </div>
  )
}

export default  page




