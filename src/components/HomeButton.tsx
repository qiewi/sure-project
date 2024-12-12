'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const HomeButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/home')} className="bg-cyan-600 text-white hover:bg-cyan-700">
      Home
    </Button>
  );
};

export default HomeButton;