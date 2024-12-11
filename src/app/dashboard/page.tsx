import SignOutButton from '@/components/SignOutButton';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { getUser } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import Image from "next/image";

import EXPLORE from "@Images/tutorial-explore.jpg";
import React from 'react';

const DashboardPage = async () => {
  // protected!
  const user = await getUser();
  if (!user) {
    redirect('/authenticate');
  }

  return (
    <>
      <div className="flex flex-col bg-gray-50 min-h-screen">
        {/* Navbar Section */}
        <div className="flex items-center justify-between p-6 px-8 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-cyan-500">SURE</h1>
          <div className="flex gap-6">
            <Button className='bg-cyan-600 text-white hover:bg-cyan-700'>Home</Button>
            <SignOutButton>Logout</SignOutButton>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center flex-grow text-center py-16 px-4 bg-neutral-50 overflow-hidden h-[500px]">
          {/* Background Circles */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[1000px] h-[1000px] border-8 border-blue-300 rounded-full absolute -1/2"></div>
            <div className="w-[700px] h-[700px] border-8 border-blue-300/40 rounded-full absolute -1/2"></div>
          </div>

          {/* Hero Content */}
          <h1 className="relative text-6xl font-bold text-gray-900 leading-snug">
            Explore Your Dream{' '}
            <span className="block bg-gradient-to-b from-blue-800 to-cyan-300 bg-clip-text text-transparent">
              University
            </span>
          </h1>
          <p className="relative mt-4 text-lg text-gray-600">
            Search for universities based on your major preference
          </p>
          <div className="relative mt-8 w-full max-w-lg">
            <Input
              placeholder="What's your dream major?"
              className="w-full p-4 text-lg border-2 rounded-full focus:bg-white bg-white text-gray-400"
            />
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-cyan-500 hover:text-cyan-700">
              <FaSearch size={20} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-center py-8 bg-white">
          <div className="w-full max-w-4xl -mt-20 shadow-gray-400/60 shadow-md z-10">
            <div className=" bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700">University Recommendation</h2>
              <p className="text-gray-500">Here are the best 5 universities we recommend for you</p>
            </div>
            
            <div className='flex flex-col gap-8 px-8'>
                <div className="relative">
                    {/* Image */}
                    <Image
                        src={EXPLORE}
                        alt="startup template"
                        className="rounded-lg object-cover h-80 w-full"
                    />

                    {/* Text with Glassmorphism */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md rounded-lg p-4">
                        <p className="text-neutral-200 text-sm font-normal">
                        EXPLORE YOUR MAJORS
                        </p>
                        <p className="text-white text-md font-normal">Explore a list of majors within your chosen field and select the one that excites you the most. Your dream major will set the stage for university recommendations.</p>
                    </div>
                </div>

                <div className="relative">
                    {/* Image */}
                    <Image
                        src={EXPLORE}
                        alt="startup template"
                        className="rounded-lg object-cover h-80 w-full"
                    />

                    {/* Text with Glassmorphism */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md rounded-lg p-4">
                        <p className="text-neutral-200 text-sm font-normal">
                        EXPLORE YOUR MAJORS
                        </p>
                        <p className="text-white text-md font-normal">Explore a list of majors within your chosen field and select the one that excites you the most. Your dream major will set the stage for university recommendations.</p>
                    </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;