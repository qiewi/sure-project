// File: /recommendation/page.tsx
'use client';

import React, { Suspense } from 'react';
import RecommendationContent from './RecommendationContent';

const RecommendationPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <RecommendationContent />
    </Suspense>
  );
};

export default RecommendationPage;
