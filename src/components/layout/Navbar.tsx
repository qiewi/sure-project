'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import SignOutButton from '../SignOutButton';
import HomeButton from '../HomeButton';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch user session on component mount
  useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (!response.ok) {
            router.push('/auth');
            return;
          }
  
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
          router.push('/auth');
        }
      };
  
      fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-between p-6 px-8 bg-white shadow-md">
      <h1
        className="text-2xl font-bold text-cyan-500 cursor-pointer"
        onClick={() => router.push('/')}
      >
        SURE
      </h1>
      <div className="flex gap-6">
        <HomeButton />
        {user ? (
          <SignOutButton>Logout</SignOutButton>
        ) : (
          <Button
            className="bg-blue-500 font-medium text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => router.push('/auth')}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
