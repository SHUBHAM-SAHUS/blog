export interface ImageProps {
  src: string | any;
  alt: string | undefined;
  width?: number;
  height?: number;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
