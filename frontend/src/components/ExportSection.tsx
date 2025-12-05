import React from 'react';
import { useUserStore } from '../store/userStore';
import { Button } from './Button';
import { IoDownload } from 'react-icons/io5';
import { exportToCSV, exportToJSON } from '../utils/exportData';

export const ExportSection: React.FC = () => {
  const { filteredUsers } = useUserStore();

  const handleExportCSV = () => {
    exportToCSV(filteredUsers, 'users.csv');
  };

  const handleExportJSON = () => {
    exportToJSON(filteredUsers, 'users.json');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Export
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Export your user data in various formats
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Export Options
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Export {filteredUsers.length} users
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" onClick={handleExportCSV} className="w-full sm:w-auto">
              <IoDownload /> Export as CSV
            </Button>
            <Button variant="primary" onClick={handleExportJSON} className="w-full sm:w-auto">
              <IoDownload /> Export as JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

