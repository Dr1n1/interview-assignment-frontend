import React from 'react';
import { useUserStore } from '../store/userStore';
import { SearchBar } from './SearchBar';
import { UserTable } from './UserTable';
import { Pagination } from './Pagination';
import { Button } from './Button';
import { IoAdd, IoTrash } from 'react-icons/io5';
import { LoadingSpinner } from './LoadingSpinner';

interface UsersSectionProps {
  onAddUser: () => void;
  onEditUser: (user: any) => void;
  onDeleteUser: (id: number) => void;
  onBulkDelete: () => void;
}

export const UsersSection: React.FC<UsersSectionProps> = ({
  onAddUser,
  onEditUser,
  onDeleteUser,
  onBulkDelete,
}) => {
  const {
    filteredUsers,
    isLoading,
    selectedUsers,
    getCurrentPageUsers,
    paginationConfig,
  } = useUserStore();

  const currentPageUsers = getCurrentPageUsers();
  const paginationKey = `${paginationConfig.currentPage}-${paginationConfig.itemsPerPage}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Users
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Manage your user database ({filteredUsers.length} users)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedUsers.size > 0 && (
            <Button variant="danger" size="sm" onClick={onBulkDelete}>
              <IoTrash /> Delete Selected ({selectedUsers.size})
            </Button>
          )}
          <Button onClick={onAddUser} size="sm" className="w-full sm:w-auto">
            <IoAdd /> Add User
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <SearchBar onFocusShortcut={() => {}} />
        {isLoading && <LoadingSpinner />}
        <UserTable
          key={paginationKey}
          users={currentPageUsers}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
        <Pagination />
      </div>
    </div>
  );
};

