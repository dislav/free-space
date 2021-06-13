import React from 'react';

interface IWithGroup {
  available: string[];
}

const WithGroup: React.FC<IWithGroup> = ({ children, available }) => {
  if (!available.includes(localStorage.getItem('group') || '0')) return <></>;
  return <>{children}</>;
};

export default WithGroup;
