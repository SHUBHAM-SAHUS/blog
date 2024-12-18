import React, { memo } from 'react';
import styles from './styles.module.scss';
import { getFontFamily, getFontSize } from './utils';
import { TypographyProps } from './interface';
import { Box } from '@mui/material';

const Typography: React.FC<TypographyProps> = ({
  fontFamily = 'Poppins', // Default font family
  size = 'h4', // Default size
  className = '',
  children,
  tabIndex,
  color,
  textAlign = 'left', // Default text alignment
  tagType = 'div', // Default HTML tag
  sx,
}) => {
  // Combine dynamic and additional classes
  const classNames = [
    styles[getFontFamily(fontFamily)], // Dynamic font family
    styles[getFontSize(size)], // Dynamic font size
    className, // Additional custom classes
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      component={tagType}
      className={classNames}
      style={{ color, textAlign }} // Inline styles for color and text alignment
      tabIndex={tabIndex}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export default memo(Typography);
