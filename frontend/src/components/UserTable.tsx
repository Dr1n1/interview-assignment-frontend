import React, { memo } from 'react';
import type { User, SortField } from '../types';
import { useUserStore } from '../store/userStore';
import { IoArrowUp, IoArrowDown, IoChevronDown, IoCreate, IoTrash } from 'react-icons/io5';
import { Button } from './Button';

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = memo(({ users, onEdit, onDelete }) => {
  const {
    selectedUsers,
    sortConfig,
    toggleUserSelection,
    selectAllUsers,
    clearSelection,
    setSortConfig,
    paginationConfig,
  } = useUserStore();

  const allSelected = users.length > 0 && users.every((u) => selectedUsers.has(u.id));
  const someSelected = users.some((u) => selectedUsers.has(u.id));

  const handleSort = (field: SortField) => {
    if (sortConfig.field === field) {
      setSortConfig({
        field,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ field, direction: 'asc' });
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllUsers();
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) {
      return <IoChevronDown size={16} className="opacity-30" />;
    }
    return sortConfig.direction === 'asc' ? (
      <IoArrowUp size={16} />
    ) : (
      <IoArrowDown size={16} />
    );
  };

  const shouldScroll = paginationConfig.itemsPerPage > 25;

  return (
    <div className={`overflow-x-auto -mx-4 md:mx-0 ${shouldScroll ? 'max-h-[600px] overflow-y-auto' : ''}`}>
      <table className="w-full border-collapse min-w-[800px]">
        <thead className={shouldScroll ? 'sticky top-0 z-10' : ''}>
          <tr>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none w-[50px]">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = someSelected && !allSelected;
                }}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none" onClick={() => handleSort('id')}>
              <span className="flex items-center gap-1">ID <SortIcon field="id" /></span>
            </th>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none" onClick={() => handleSort('first_name')}>
              <span className="flex items-center gap-1">First Name <SortIcon field="first_name" /></span>
            </th>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none" onClick={() => handleSort('last_name')}>
              <span className="flex items-center gap-1">Last Name <SortIcon field="last_name" /></span>
            </th>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none" onClick={() => handleSort('email')}>
              <span className="flex items-center gap-1">Email <SortIcon field="email" /></span>
            </th>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none" onClick={() => handleSort('gender')}>
              <span className="flex items-center gap-1">Gender <SortIcon field="gender" /></span>
            </th>
            <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer select-none" onClick={() => handleSort('ip_address')}>
              <span className="flex items-center gap-1">IP Address <SortIcon field="ip_address" /></span>
            </th>
            {(onEdit || onDelete) && (
              <th className="p-4 text-left font-semibold border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-default">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`transition-colors ${
                selectedUsers.has(user.id)
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <td className="p-4 border-b border-gray-300 dark:border-gray-600">
                <input
                  type="checkbox"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                />
              </td>
              <td className="p-4 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.id}</td>
              <td className="p-4 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.first_name}</td>
              <td className="p-4 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.last_name}</td>
              <td className="p-4 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.email}</td>
              <td className="p-4 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.gender}</td>
              <td className="p-4 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.ip_address}</td>
              {(onEdit || onDelete) && (
                <td className="p-4 border-b border-gray-300 dark:border-gray-600">
                  <div className="flex gap-1">
                    {onEdit && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(user)}
                        title="Edit user"
                      >
                        <IoCreate size={16} />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(user.id)}
                        title="Delete user"
                      >
                        <IoTrash size={16} />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="p-12 text-center text-gray-600 dark:text-gray-400">
          No users found
        </div>
      )}
    </div>
  );
});
