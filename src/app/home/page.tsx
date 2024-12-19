// File: /recommendation/page.tsx
'use client';

import React, { Suspense } from 'react';
import HomeContent from './HomeContent';

const HomePage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default HomePage;
