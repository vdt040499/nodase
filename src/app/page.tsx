"use client";

import { authClient } from '@/lib/auth-client';
import React from 'react'

const Page = async () => {
  const { data } = authClient.useSession();

  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>
      <div>Home Page</div>
    </div>
  )
}

export default Page