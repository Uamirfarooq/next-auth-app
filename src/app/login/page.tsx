"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const responce = await axios.post("api/users/login", user);
      console.log(responce);
      toast.success("login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const Forget = async () => {
    try {
      setLoading(true);
      
  
      router.push("/forget");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div
        style={{
          backgroundImage:
            "url('https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg')",
        }}
        className="flex bg-cover flex-col items-center  justify-center  py-2 border h-[800px] w-[800px] bg-transparent rounded-2xl"
      >
        <h1 className=" font-bold text-4xl p-6">
          {loading ? "Loading" : "Login"}
        </h1>
        <hr />

        <label htmlFor="email" className="py-1 text-3xl">
          Email
        </label>
        <input
          className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
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
          onClick={onLogin}
          className="p-2 border  bg-blue-500 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
        >
          {/* {" "} */}
          {buttonDisable ? "Full-fill" : "Login"}
          </button>
        <Link className="hover:text-blue-600" href="/signup">
          Haven't Account! Signup
          {/* {" "} */}
        </Link>
        <button onClick={Forget} className="p-2 rounded bg-orange-600">forget</button>
      </div>
    </div>
  );
};

export default Login;
