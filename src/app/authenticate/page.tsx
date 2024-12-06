import TabSwitcher from '@/src/components/TabSwitcher'
import React from 'react'
// import SignInForm from './SignInForm'
// import SignUpForm from './SignUpForm'
// import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'
import SignInForm from './SignInForm'
// import GoogleOAuthButton from '@/src/components/GoogleOAuthButton'

const AuthenticatePage = async () => {
  // const user = await getUser()
  // if (user) {
  //   return redirect('/dashboard')
  // }
  return (
    <div className='relative flex w-full h-screen bg-background'>
      <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        {/* <GoogleOAuthButton /> */}
        <div className="h-4"></div>
        <TabSwitcher SignInTab={<SignInForm/>} SignUpTab={<h1>Sign Up</h1>} />
      </div>
    </div>
  )
}

export default AuthenticatePage