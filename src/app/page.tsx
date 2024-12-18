import React from 'react';

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>
        Welcome to Home
      </h1>
    </div>
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
