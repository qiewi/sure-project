import TabSwitcher from '@/src/components/TabSwitcher'
import React from 'react'
import { redirect } from 'next/navigation'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { getUser } from '@/src/lib/lucia'
// import GoogleOAuthButton from '@/src/components/GoogleOAuthButton'

const AuthenticatePage = async () => {
  const user = await getUser()
  if (user) {
    return redirect('/dashboard')
  }
  return (
    <div className='relative flex w-full h-screen bg-background'>
      <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        {/* <GoogleOAuthButton /> */}
        <div className="h-4"></div>
        <TabSwitcher SignInTab={<SignInForm/>} SignUpTab={<SignUpForm/>} />
      </div>
    </div>
  )
}

export default AuthenticatePage