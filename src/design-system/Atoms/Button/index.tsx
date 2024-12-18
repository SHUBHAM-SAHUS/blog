import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface ButtonComponentProps extends ButtonProps {
  label: string;
  isLoading?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
};

export default ButtonComponent;
