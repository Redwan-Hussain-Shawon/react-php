"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import axios from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn,useSession } from 'next-auth/react'

function Registration() {
  const router = useRouter(); 
  const session = useSession();
  console.log(session)
  if(session.data !=null){
    router.push('/dashboard')
  }
  const [responseData, setResponseData] = useState();
  const [loading,setLoading] = useState(false);
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const registrationProcess = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = axios.post("registration.php", authState).then((res) => {
        setResponseData(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (responseData) {
      responseData.map((value) => {
        if (value.status === 'success') {
          setAuthState({
            name: "",
            email: "",
            password: "",
            number: ""
          })
          alert(value.message);
           router.replace('login')

        }
      });
    }
  }, [responseData]);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Get started today
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>
        <form
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={registrationProcess}
        >
          <p className="text-center text-lg font-medium">Sign Up Here</p>
          <div className="">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="enter your name"
              value={authState.name}
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
            />
          </div>

          <div>
            <div>
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="enter your email"
                value={authState.email}
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
                {responseData && responseData.some((error)=>error.name==='email') &&(
                   <span className="mt-1 block text-red-400 ">
                   {
                     responseData.find((error)=>error.name==='email').message
                   }
                 </span>
                )}
            </div>
          </div>
          <div>
            <div className="">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="enter your password"
                value={authState.password}
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
                  {responseData && responseData.some((error)=>error.name==='password') &&(
                   <span className="mt-1 block text-red-400 ">
                   {
                     responseData.find((error)=>error.name==='password').message
                   }
                 </span>
                )}
            </div>
          </div>
          <div className="">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="enter your number"
              value={authState.number}
              onChange={(e) =>
                setAuthState({ ...authState, number: e.target.value })
              }
            />
            {responseData && responseData.some((error)=>error.name==='number') &&(
             <span className="mt-1 block text-red-400 ">
              { responseData.find((error)=>error.name==='number').message }
              </span>
            )}
          </div>

          <button
            type="submit"
            className="flex justify-center w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
          >
            {loading?<div className="animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            </div>:
            'Sign up'
}
          </button>

          <p className="text-center text-sm text-gray-500">
            have a account?
            <Link className="underline" href="/login">
              Sign in
            </Link>
          </p>
          <div onClick={()=>signIn('google')} className="bg-slate-50 rounded-lg duration-300 hover:bg-slate-100 p-3 flex gap-2 items-center justify-center cursor-pointer">
          <Image src='/Google__G__logo.svg.png' width={30} height={25} />
            <p>Continue with Googleoogle</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
