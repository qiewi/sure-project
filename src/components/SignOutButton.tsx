'use client'
import React from 'react'
import { Button } from '@/components/ui/Button'
import { logOut } from '@/app/auth/auth.action'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({ children }: Props) => {
    return (
        <Button onClick={() => { logOut() }}>{children}</Button>
    )
}

export default SignOutButton