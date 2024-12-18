'use client';

import dynamic from 'next/dynamic';
import React from 'react';

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
