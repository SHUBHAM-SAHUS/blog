import dynamic from 'next/dynamic';
import React from 'react';

const RepoDetailsTemplate = dynamic(
  () => import('@/design-system/Template/RepoDetailsTemplate'),
  {
    ssr: false,
  },
);

const RepoDetails: React.FC = () => {
  return (
    <>
      <RepoDetailsTemplate />
    </>
  );
};

export default RepoDetails;

export function generateMetadata(): { title: string; description: string } {
  return {
    title: 'Repo Details',
    description:
      'Details of the selected repository, including name, language, and other information.',
  };
}
