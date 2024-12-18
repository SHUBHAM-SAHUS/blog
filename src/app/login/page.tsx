import dynamic from 'next/dynamic';
import React from 'react';

const LoginPage = () => {
  const LoginTemplate = dynamic(
    () => import('@/design-system/Template/LoginTemplate'),
    {
      ssr: false,
    },
  );
  return (
    <div>
      <LoginTemplate />
    </div>
  );
};

export default LoginPage;
