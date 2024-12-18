import dynamic from 'next/dynamic';
import React from 'react';

const SignUpPage = () => {
  const SignUpTemplate = dynamic(
    () => import('@/design-system/Template/SignUpTemplate'),
    {
      ssr: false,
    },
  );
  return (
    <div>
      <SignUpTemplate />
    </div>
  );
};

export default SignUpPage;
