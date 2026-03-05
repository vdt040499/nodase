import { SignOutButton } from '@/features/auth/components/sign-out-button';
import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server'
import React from 'react'

const Page = async () => {
  await requireAuth()

  const data = await caller.getUsers();

  return (
    <>
      <div className='min-h-screen min-w-screen flex flex-col items-center justify-center'>
        <div className='text-center pb-5'>
          protected server component
          {JSON.stringify(data)}
        </div>
        <SignOutButton />
      </div>
    </>
  )
}

export default Page