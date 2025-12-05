import React from 'react';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 flex items-center gap-4 sticky top-0 z-30">
      <MobileMenu activeSection={activeSection} onSectionChange={onSectionChange} />
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
        User Management Dashboard
      </h1>
    </header>
  );
};
