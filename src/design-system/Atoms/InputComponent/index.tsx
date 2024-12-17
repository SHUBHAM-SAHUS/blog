import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

// interface InputComponentProps extends TextFieldProps {
//   label: string;
//   errorText?: string; // Optional error message
// }

const InputComponent: React.FC<any> = ({
  label,
  errorText,
  value,
  onChange,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={!!errorText} // Displays red border if errorText is provided
      helperText={errorText} // Displays error message below the input
      fullWidth
      
      {...props}
    />
  );
};

export default InputComponent;
