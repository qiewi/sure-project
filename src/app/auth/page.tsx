import TabSwitcher from '@/components/TabSwitcher';
import { redirect } from 'next/navigation';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { getUser } from '@/lib/lucia';
import Image from 'next/image';

import BG from '@Images/auth-bg.png';

const AuthenticatePage = async () => {
  const user = await getUser();
  if (user) {
    return redirect('/home');
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
        className="absolute left-1/2 -translate-x-1/2 pt-8 w-full max-w-3xl h-[550px] flex justify-center"
      >
        <TabSwitcher FirstTitle="Sign in" SecondTitle="Sign Out" FirstTab={<SignInForm />} SecondTab={<SignUpForm />} />
      </div>
    </div>
  );
};

export default AuthenticatePage;
