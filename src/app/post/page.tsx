import dynamic from 'next/dynamic';
import React from 'react';

const CreatePostTemplate = dynamic(
  () => import('@/design-system/Template/CreatePostTemplate'),
  {
    ssr: false,
  },
);
const CreatePost = () => {
  return (
    <div>
      <CreatePostTemplate />
    </div>
  );
};

export default CreatePost;
