"use client"

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login')
                    router.refresh()
                }
            }
        });
    }

    return <Button onClick={handleSignOut}>Sign Out</Button>
}
