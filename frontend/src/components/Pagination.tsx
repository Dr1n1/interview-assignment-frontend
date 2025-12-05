import React from 'react';
import { useUserStore } from '../store/userStore';
import { Button } from './Button';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export const Pagination: React.FC = () => {
  const { filteredUsers, paginationConfig, setPaginationConfig } = useUserStore();

  const totalPages = Math.ceil(filteredUsers.length / paginationConfig.itemsPerPage);
  const currentPage = paginationConfig.currentPage;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setPaginationConfig({ ...paginationConfig, currentPage: page });
      const mainElement = document.querySelector('main');
      if (mainElement) {
        requestAnimationFrame(() => {
          mainElement.scrollTo({ top: 0, behavior: 'smooth' });
        });
      } else {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }
  };

  const handleItemsPerPageChange = (items: number) => {
    setPaginationConfig({ currentPage: 1, itemsPerPage: items });
    const mainElement = document.querySelector('main');
    if (mainElement) {
      requestAnimationFrame(() => {
        mainElement.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  if (totalPages === 0) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-600 dark:text-gray-400">Items per page:</span>
        <select
          className="px-2 py-1 text-base font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={paginationConfig.itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Showing {Math.min((currentPage - 1) * paginationConfig.itemsPerPage + 1, filteredUsers.length)} to{' '}
          {Math.min(currentPage * paginationConfig.itemsPerPage, filteredUsers.length)} of{' '}
          {filteredUsers.length} users
        </span>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoChevronBack />
        </Button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 text-gray-600 dark:text-gray-400">
                ...
              </span>
            ) : (
              <Button
                variant={currentPage === page ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoChevronForward />
        </Button>
      </div>
    </div>
  );
};
