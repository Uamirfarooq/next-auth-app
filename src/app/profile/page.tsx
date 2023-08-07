"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import React, {useState} from 'react'

const page  = () => {
  const router = useRouter();
  const [data, setdata] = React.useState ("Nothing")
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);
    }
  }

  const getUserDetails = async ( ) => {
    const res = await axios.get('/api/users/myDetail')
    // console.log(res.data.data.username+"hhhhheeeeellllp");
    setdata(res.data.data._id)
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1>profile</h1>
        <h2>{data === "Nothing" ? "Noting" : <Link href={`profile/${data}`}>{data}</Link>}</h2>
        <button onClick={logout} className='h-12 rounded-2xl w-24 bg-blue-400 hover:bg-blue-600'>Logout</button>
        <button onClick={getUserDetails} className='h-12 rounded-2xl  bg-green-400 hover:bg-purple-600'>getUser_Id</button>

    </div>
  )
}
export default  page