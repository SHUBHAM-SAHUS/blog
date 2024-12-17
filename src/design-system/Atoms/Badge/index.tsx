import { Box, SxProps } from '@mui/material';

const Badge = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'customColors.green',
        color: 'text.primary',
        borderRadius: '20px',
        padding: '2px 12px',
        fontSize: '12px',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Badge;
