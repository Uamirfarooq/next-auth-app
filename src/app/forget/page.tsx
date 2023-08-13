"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import  {useEffect, useState} from 'react'



const Page = () => {
  const router = useRouter();
    const [user,setUser] = useState({
        email: ""
      });

      const Onforget = async () => {
        try {
          console.log("making axios request");
           await axios.post("/api/users/forget", user);
          router.push("/check")
        } catch (error: any) {
          console.log("Forget Failed0000000", error.message);
          
        } 
      }
  return (
    <div className='flex flex-col min-h-screen justify-center items-center p-4'>
      <h1 className=' font-bold p-2'>Forget user page</h1>
      <input
          className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
         <button
          onClick={Onforget}
          className="p-2 border  bg-blue-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
        >forget</button>
    </div>
  )
}

export default Page
