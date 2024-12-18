'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the dashboardTemplate component
const DashboardTemplate = dynamic(
  () => import('@/design-system/Template/dashboardTemplate'),
  { ssr: false },
);

const DashBoard: React.FC = () => {
  return (
    <div>
      <DashboardTemplate />
    </div>
  );
};

export default DashBoard;
