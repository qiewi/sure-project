// File: /recommendation/page.tsx
'use client';

import React, { Suspense } from 'react';
import HomeContent from './HomeContent';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <HomeContent />
      <Footer />
    </Suspense>
  );
};

export default HomePage;
