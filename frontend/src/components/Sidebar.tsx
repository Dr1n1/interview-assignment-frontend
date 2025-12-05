import React from 'react';
import { IoHome, IoPeople, IoSettings, IoDownload } from 'react-icons/io5';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IoHome },
    { id: 'users', label: 'Users', icon: IoPeople },
    { id: 'settings', label: 'Settings', icon: IoSettings },
    { id: 'export', label: 'Export', icon: IoDownload },
  ];

  return (
    <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gray-900 dark:bg-gray-950 border-r border-gray-800 dark:border-gray-800 flex-col z-40 shadow-xl">
      <div className="p-6 border-b border-gray-800 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-white">Drin</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-green-600 text-white font-medium shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

