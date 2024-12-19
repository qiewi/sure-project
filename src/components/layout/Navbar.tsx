'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import SignOutButton from '../SignOutButton';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
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
          setUser(null); // No user session
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null); // No user session
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
        {user ? (
          // Conditional rendering based on the current route
          <>
            {pathname === '/home' ? (
              <Button
                className="bg-cyan-500 font-medium text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                onClick={() => router.push('/profile')}
              >
                Profile
              </Button>
            ) : pathname === '/profile' ? (
              <Button
                className="bg-cyan-500 font-medium text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                onClick={() => router.push('/home')}
              >
                Home
              </Button>
            ) : null}
            <SignOutButton>Logout</SignOutButton>
          </>
        ) : (
          // Show Login Button when no user is logged in
          <Button
            className="bg-cyan-500 font-medium text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
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
