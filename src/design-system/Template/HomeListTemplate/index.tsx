'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { RepoCard } from '@/design-system/Organisms';
import { node } from 'prop-types';
import { Typography } from '@/design-system/Atoms';
import theme from '@/utils/theme';
import { LoadingSpinner } from '@/design-system/Atoms';
import { useRepoList } from '@/hooks/API';

// Define the Repo type
interface Repo {
  owner: any;
  id: number;
  name: string;
  language?: string;
  watchers?: number;
  description?: string;
  forks?: number;
  open_issues?: number;
}

const HomeListTemplate: React.FC = () => {
  const { repoList, isRepoListLoading } = useRepoList();

  if (isRepoListLoading) {
    return;

    <LoadingSpinner />;
  }

  console.log(repoList);

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          overflowX: 'hidden',
        },
      }}
      className="c1"
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: 'background.paper',
          [theme.breakpoints.down('sm')]: {
            padding: '0px',
          },
        }}
        className="c2"
      >
        <Box sx={{ width: '100%' }} className="c3">
          <Box
            sx={{
              padding: '40px',
              [theme.breakpoints.down('sm')]: {
                padding: '20px',
              },
            }}
          >
            <Typography
              size="h3"
              sx={{
                fontSize: '36px',
                marginBottom: '20px',
                fontWeight: 800,
                color: '#000000',
                marginLeft: '5px',
              }}
            >
              List Items
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyleType: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {repoList?.map((card: Repo) => (
                <RepoCard
                  key={card?.id}
                  title={card?.name}
                  language={card?.language}
                  watchers={card?.watchers}
                  description={card?.description}
                  forks={card?.forks}
                  open_issues={card?.open_issues}
                  id={card?.id}
                  image={card?.owner?.avatar_url}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeListTemplate;
