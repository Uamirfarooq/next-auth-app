"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import React, {useEffect, useState} from 'react'

const page  = () => {
  const router = useRouter();
  const [data, setdata] = useState ("Nothing")
  const [verify, setVerify] = useState ("")
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
    if( res.data.data.isVerifyed === false){
      setVerify("Plz Check Your Mail to Verify Your Self")
    }else if( res.data.data.isVerifyed === true){
      setVerify("Your account is verifyed")
    }
    
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='p-3 font-bold text-2xl m-4 bg-yellow-500 rounded'>{verify}</h1>
        <h1 className='p-3 font-bold text-2xl m-4 bg-yellow-500 rounded'>Profile Page</h1>
        <h2 className='p-2 text-2xl bg-red-500 rounded m-4'>{data === "Nothing" ? "Nothing Here !" : <Link href={`profile/${data}`}>{data}</Link>}</h2>
        <button onClick={logout} className=' text-2xl font-bold rounded-2xl p-3 m-4 bg-blue-400 hover:bg-blue-600'>Logout</button>
        <button onClick={getUserDetails} className=' text-2xl font-bold m-4 p-3 rounded-2xl  bg-green-400 hover:bg-purple-600'>Press to Get User ID</button>

    </div>
  )
}
export default  page