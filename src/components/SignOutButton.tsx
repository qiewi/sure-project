'use client'
import React from 'react'
import { Button } from '@/components/ui/Button'
import { logOut } from '@/app/auth/auth.action'
import { toast } from 'sonner'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({ children }: Props) => {
    const handleSignOut = async () => {
        try {
            await logOut(); // Ensure logout operation completes
            toast.success('Logged out successfully'); // Show toast after successful logout
        } catch (error) {
            toast.error('Failed to log out. Please try again.');
        }
    };

    return (
        <Button onClick={handleSignOut}>
            {children}
        </Button>
    );
}

export default SignOutButton;
