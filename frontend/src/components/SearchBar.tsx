import React, { useState, useEffect, useRef } from 'react';
import { useUserStore } from '../store/userStore';
import { Select } from './Select';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
  onFocusShortcut?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onFocusShortcut }) => {
  const { filterConfig, setFilterConfig, users } = useUserStore();
  const [searchValue, setSearchValue] = useState(filterConfig.search);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onFocusShortcut) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          const target = e.target as HTMLElement;
          const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
          if (!isInput) {
            e.preventDefault();
            searchInputRef.current?.focus();
            onFocusShortcut();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onFocusShortcut]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterConfig.search !== searchValue) {
        setFilterConfig({ ...filterConfig, search: searchValue });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const genders = Array.from(new Set(users.map((u) => u.gender))).sort();

  const genderOptions = [
    { value: '', label: 'All Genders' },
    ...genders.map((g) => ({ value: g, label: g })),
  ];

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <div className="relative mb-4">
          <IoSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none z-10"
          />
          <input
            ref={searchInputRef}
            className="w-full px-4 py-2 pl-10 text-base font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by name, email, or gender... (Ctrl+K / Cmd+K)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="min-w-[150px]">
        <Select
          value={filterConfig.gender}
          onChange={(e) => setFilterConfig({ ...filterConfig, gender: e.target.value })}
          options={genderOptions}
        />
      </div>
    </div>
  );
};
