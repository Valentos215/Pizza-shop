import React from 'react';

interface IShowProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function Show({ condition, children }: IShowProps): JSX.Element | null {
  if (!condition) {
    return null;
  }

  return <>{children}</>;
}
