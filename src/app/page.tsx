import dynamic from 'next/dynamic';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <h1> home page</h1>
    </>
  );
};

export default Home;

// For SEO
export function generateMetadata(): { title: string; description: string } {
  return {
    title: 'Repo List',
    description:
      'Browse a list of repositories, including their details such as name, language, and more.',
  };
}
