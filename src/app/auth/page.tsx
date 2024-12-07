import TabSwitcher from '@/src/components/TabSwitcher';
import { redirect } from 'next/navigation';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { getUser } from '@/src/lib/lucia';
import Image from 'next/image';

import ITB from '@Images/univ-itb.jpeg';

const AuthenticatePage = async () => {
  const user = await getUser();
  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className="relative justify-center flex items-center h-[100vh] overflow-hidden">
      {/* Background Image */}
      <Image src={ITB} alt="ITB" className="object-cover w-full" />

      {/* Form Container */}
      <div
        className="max-w-3xl w-full h-[550px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg flex justify-center overflow-hidden"
      >
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};

export default AuthenticatePage;
