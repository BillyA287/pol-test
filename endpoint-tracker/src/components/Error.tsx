import React from 'react';
import './Error.css';

type ErrorMessageProps = {
  message: string | null;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <p className="error">{message}</p>;
};

export default ErrorMessage;