import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

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
      error={!!errorText}
      helperText={errorText}
      fullWidth
      {...props}
    />
  );
};

export default InputComponent;
