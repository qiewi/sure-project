import TabSwitcher from '@/src/components/TabSwitcher';
import { redirect } from 'next/navigation';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { getUser } from '@/src/lib/lucia';
import Image from 'next/image';

import BG from '@Images/auth-bg.png';

const AuthenticatePage = async () => {
  const user = await getUser();
  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={BG}
        alt="Background"
        layout="fill" 
        objectFit="cover" 
        className="z-0" 
      />

      {/* Form Container */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-20 w-full max-w-3xl h-[550px] flex justify-center pt-8"
      >
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};

export default AuthenticatePage;
