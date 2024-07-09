"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

function Dashboard() {
 
    const session = useSession();
    console.log(session)
    const router = useRouter();
    if(session.data === null){
        router.push('/login');
    }
  return (
    <div>dashboard</div>
  )
}

export default Dashboard