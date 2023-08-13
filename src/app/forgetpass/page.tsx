"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React  from "react";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [user, setUser] = React.useState({
    password: "",
  });
  const [error, setError] = useState(false);
  const VerifyUserEmail = async () => {
    try {
      await axios.post("/api/users/forgetpass",  {token , user} );
      // await axios.post("/api/users/forgetpass, { token , user } );

      router.push("/login");
    } catch (error: any) {
      setError(true);

      console.log(error);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl ">forgetPassword</h1>
      <h1 className="p-2 bg-orange-50  bg-orange-500">
        {token ? `${token}` : "no token"}
      </h1>

      <div>
    
        <label htmlFor="password" className="py-1 text-3xl">
          Password
        </label>
        <input
          className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={VerifyUserEmail}
          className="p-2 border  bg-blue-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
        > Confirm </button>

      </div>

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500">Error</h2>
        </div>
      )}
    </div>
  );
}
