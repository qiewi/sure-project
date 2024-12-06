'use client'
import React from 'react'
import { Button } from '@/src/components/ui/Button'
import { logOut } from '@/src/app/authenticate/auth.action'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({ children }: Props) => {
    return (
        <Button onClick={() => { logOut() }}>{children}</Button>
    )
}

export default SignOutButton