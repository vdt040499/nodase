"use client";

import { authClient } from '@/lib/auth-client';
import React from 'react'

const Page = async () => {
  const { data } = authClient.useSession();

  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>

    </div>
  )
}

export default Page