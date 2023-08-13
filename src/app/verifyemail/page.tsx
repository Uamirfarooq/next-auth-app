"use client"
import axios from "axios"
import Link from "next/link"
import React from "react"
import {useEffect,useState} from "react"

export default function VerifyEmailPage(){
    const[token,setToken] = useState("")
    const[verifyed, setVerifyed] = useState(false)
    const [error,setError ] = useState(false)
    const VerifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerifyed(true)
        } catch (error:any) {
            setError(true)

            console.log(error);
            
            
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])
    useEffect(() => {
        if(token.length > 0){
            VerifyUserEmail()
        }

    },[token])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl ">Verify Email</h1>
            <h1 className="p-2 bg-orange-50  bg-orange-500">{token ? `${token}` :"no token"}</h1>
            {verifyed && (
                <div>
                    <h2 className="text-2xl ">Email Verifyed</h2>
                    <Link href={"/login"}>
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500" >Error</h2>
                    
                    
                </div>
            )}
        </div>
    )
}