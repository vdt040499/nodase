"use client"

import { Button } from '@/components/ui/button';
import { SignOutButton } from '@/features/auth/components/sign-out-button';
import { requireAuth } from '@/lib/auth-utils';
import { useTRPC } from '@/trpc/client';
import { caller, trpc } from '@/trpc/server'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued");
    }
  }));

  const testAI = useMutation(trpc.testAI.mutationOptions({
    onSuccess: () => {
      toast.success("AI job queued");
    }
  }))

  return (
    <>
      <div className='min-h-screen min-w-screen flex flex-col items-center justify-center gap-6'>
        <div className='text-center'>
          Workflows:
          <div>
            {JSON.stringify(data, null, 2)}
          </div>
        </div>
        <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
          Test AI
        </Button>
        {/* <Button disabled={create.isPending} onClick={() => create.mutate()}>
          Create Workflow
        </Button> */}
        <SignOutButton />
      </div>
    </>
  )
}

export default Page