'use client';

import { useRepoList } from '@/hooks/API';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Box, Container, Stack, Button, Grid, Link } from '@mui/material';
import Typography from '@/design-system/Atoms/Typography';
import { Image } from '@/design-system/Molecules';
import { LoadingSpinner } from '@/design-system/Atoms';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import Badge from '@/design-system/Atoms/Badge';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import theme from '@/utils/theme';

interface RepoDetailsTemplateProps {}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  title?: string;
  language?: string;
  watchers?: string;
  description?: string;
  forks?: string;
  open_issues?: string;
  owner: {
    avatar_url: string;
  };
}

const RepoDetailsTemplate: React.FC<RepoDetailsTemplateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { repoList, isRepoListLoading } = useRepoList();
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    if (!id) return;

    const foundRepo = repoList?.find(
      (repo: Repo) => repo.id === parseInt(id, 10),
    );
    setRepo(foundRepo || null);
  }, [id, repoList]);

  if (isRepoListLoading) {
    return (
      <Typography size="h6" sx={{ marginTop: '20px', alignItems: 'center' }}>
        Loading repository details...
      </Typography>
    );
  }

  if (!repo) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: '40px 0',
        height: '100vh',
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
          padding: '0',
        },
      }}
      className="c1"
    >
      <Container
        maxWidth="lg"
        className="c2"
        sx={{
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
            padding: '0',
          },
        }}
      >
        <Box
          sx={{
            padding: '60px 40px',
            borderRadius: '20px',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
            backgroundColor: '#fff',
            [theme.breakpoints.down('sm')]: {
              padding: '40px 20px',
              width: '100%',
              borderRadius: '0',
            },
          }}
          className="c3"
        >
          <Grid container spacing={3}>
            {/* Image Section */}
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              sx={{ display: 'flex' }}
              className="c4"
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  [theme.breakpoints.down('sm')]: {
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  },
                  [theme.breakpoints.down('md')]: {
                    marginBottom: '20px',
                  },
                }}
                className="c5"
              >
                <Image
                  src={repo.owner.avatar_url}
                  alt={`${repo.name} Owner Avatar`}
                  width={360}
                  height={360}
                  className="rounded-xl shadow-md"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '20px',
                    boxShadow:
                      'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid
              item
              xs={12}
              md={6}
              lg={7}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: ' center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column', // Ensures elements stack vertically
                  gap: '16px', // Space between items
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: '20px',
                        borderColor: 'customColors.green',
                        color: 'customColors.green',
                        fontSize: '12px',
                        textTransform: 'capitalize',
                        fontWeight: '600',
                      }}
                    >
                      <a
                        href={repo.html_url}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        target="_blank"
                      >
                        View on GitHub{' '}
                        <OpenInNewIcon sx={{ fontSize: '16px' }} />{' '}
                      </a>
                    </Button>
                  </Stack>
                </Box>

                <Typography
                  size="h2"
                  textAlign="left"
                  sx={{ color: 'grey.600', wordBreak: 'break-all' }}
                >
                  {repo.name}
                </Typography>

                <Typography
                  size="h5"
                  textAlign="left"
                  color="grey.600"
                  sx={{ color: 'grey.600' }}
                >
                  {repo.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Typography size="h6" color="text.primary">
                    <Badge
                      sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ForkRightIcon sx={{ height: '18px', width: '18px' }} />{' '}
                      forks: {repo.forks}
                    </Badge>
                  </Typography>
                  <Typography size="h6" color="text.primary">
                    <Badge>open_issues: {repo.open_issues}</Badge>
                  </Typography>
                  <Typography size="h6" color="text.primary">
                    <Badge>language: {repo.language}</Badge>
                  </Typography>
                  {/* Domain */}
                  <Typography size="h6" color="text.secondary">
                    <Badge
                      sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RemoveRedEyeIcon
                        sx={{ height: '12px', width: '12px' }}
                      />{' '}
                      watchers: {repo.watchers}
                    </Badge>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default RepoDetailsTemplate;
