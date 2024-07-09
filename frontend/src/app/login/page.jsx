'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from '../_utils/GlobalApi';

function Login() {
  const router = useRouter();
  const session = useSession();
  const [loading,setLoading] = useState(false);
  const [responseData,setResponseData] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [authState,setAutstate] = useState({
    email:'',
    password:''
  })
  const loginProcess = async (e)=>{
      e.preventDefault();
      const response = await axios.post('loginCredentials.php',authState);
      setResponseData(response.data);
      setIsVisible(true)
  }
  useEffect(()=>{
    if(responseData?.status === 'success'){
      const {email,password} = authState;
       signIn('credentials', {
        email,
        password
    });
    }
    setTimeout(() => {
        setIsVisible(false)
    }, 5000);
  },[responseData])
console.log(session)

  return  (

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Get started today
        </h1>
        <form
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={loginProcess}
        >
          <p className="text-center text-lg font-medium">Sign In</p>
          <div className="">
            <input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="enter your email"
              onChange={(e)=>setAutstate({ ...authState,email:e.target.value })}
            />
             <span className="mt-1 block text-red-400 ">
              {responseData?.status === 'danger' && responseData.name ==='email' && isVisible &&(
                responseData.message
              )}
             </span>
          </div>
          <div className="">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="enter your password"
              onChange={(e)=>setAutstate({ ...authState,password:e.target.value })}
            />
               <span className="mt-1 block text-red-400 ">
                {responseData?.status === 'danger' && responseData.name==='password' && isVisible &&(
                  responseData.message
                )}
               </span>
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
            Create a account ?
            <Link className="underline ml-2" href="/registration">
               Sign Up
            </Link>
          </p>
          <div onClick={()=>signIn('google')} className="bg-slate-50 rounded-lg duration-300 hover:bg-slate-100 p-3 flex gap-2 items-center justify-center cursor-pointer">
          <Image src='/Google__G__logo.svg.png' width={30} height={25} />
            <p>Continue with Googleoogle</p>
          </div>
        </form>
      </div>
    </div>
    )
}

export default Login