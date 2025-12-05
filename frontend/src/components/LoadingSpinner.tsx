import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-500 rounded-full w-10 h-10 animate-spin mx-auto my-8" />
  );
};
