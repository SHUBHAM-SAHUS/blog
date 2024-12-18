import dynamic from 'next/dynamic';
import React from 'react';
const EditUserTemplate = dynamic(
  () => import('@/design-system/Template/EditUser'),
  { ssr: false },
);
const UserEdit = () => {
  return (
    <div>
      <EditUserTemplate />
    </div>
  );
};

export default UserEdit;
