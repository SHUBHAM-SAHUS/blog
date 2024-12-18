import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { BoxOwnProps } from '@mui/system';

export type TypographyVariant = 'Poppins'; // Only 'Poppins' is used in this project

export type TypographySize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption';

export interface TypographyProps {
  fontFamily?: TypographyVariant; // Font family option
  size?: TypographySize; // Size option
  className?: string; // Additional custom class names
  children?: React.ReactNode; // Content to display
  tabIndex?: number; // Accessibility
  color?: string; // Text color
  textAlign?: 'left' | 'center' | 'right'; // Text alignment
  tagType?: keyof JSX.IntrinsicElements; // HTML tag type
  sx?: SxProps<Theme> | undefined;
}
