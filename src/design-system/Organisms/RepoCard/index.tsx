'use client';

import React, { memo } from 'react';
import { Box, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import Typography from '@/design-system/Atoms/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import Badge from '@/design-system/Atoms/Badge';
import theme from '@/utils/theme';
import { Image } from '@/design-system/Molecules';

interface RepoCardProps {
  id?: string | number;
  title?: string;
  language?: string | null; // Allow null
  watchers?: string | number | null;
  description?: string | null;
  forks?: string | number | null;
  open_issues?: string | number | null;
  image?: string | null | any;
}

const RepoCard: React.FC<RepoCardProps> = ({
  id,
  title,
  language,
  watchers,
  description,
  forks,
  open_issues,
  image,
}) => {
  return (
    <Link
      href={`/repoDetails/${id}`}
      passHref
      style={{ textDecoration: 'none' }}
    >
      <Box
        component="div"
        sx={{
          marginBottom: '16px',
          '&:last-child': {
            marginBottom: 0,
          },
          backgroundColor: '#fff',
          // border: '1px solid ',
          // borderColor: 'grey.600',
          textDecoration: 'none',
          cursor: 'pointer',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          padding: '15px 20px',
          gap: '10px',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.02)',
            transition: 'all 0.2s ease-in-out',
          },
          textDecorationLine: 'none',
        }}
      >
        {/* Top section of List card contains title , action icons  */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexShrink: 1,
          }}
        >
          {/* Status */}
          <Typography
            size="h6"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              wordBreak: 'break-word',
              whiteSpace: 'nowrap', // Prevent wrapping
              overflow: 'hidden', // Hide overflow text
              textOverflow: 'ellipsis', // Add '...'
              maxWidth: '200px', // Limit width to control truncation
            }}
          >
            {title}
          </Typography>

          {/* Action Icons */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                overflow: 'hidden',
                height: '25px',
                width: '25px',
              }}
            >
              <Image
                src={image}
                alt="user avatar image"
                height={30}
                width={30}
                style={{
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                }}
              />
            </Box>

            {/* <IconButton>
              <ArrowDropDownIcon sx={{ color: 'grey.600' }} />
            </IconButton> */}
          </Box>
        </Box>

        <Typography size="body" sx={{ color: 'grey.600' }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Typography size="body" color="text.primary">
            <Badge sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ForkRightIcon sx={{ height: '16px', width: '16px' }} /> forks:{' '}
              {forks}
            </Badge>
          </Typography>
          <Typography size="body" color="text.primary">
            <Badge>open_issues: {open_issues}</Badge>
          </Typography>
          <Typography size="body" color="text.primary">
            <Badge>language: {language}</Badge>
          </Typography>
          {/* Domain */}
          <Typography size="body" color="text.secondary">
            <Badge sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RemoveRedEyeIcon sx={{ height: '12px', width: '12px' }} />{' '}
              watchers: {watchers}
            </Badge>
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default memo(RepoCard);
