import { useEffect, useState } from 'react';
import { useUserStore } from './store/userStore';
import { parseCSV } from './utils/csvParser';
import type { User, UserFormData } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { UsersSection } from './components/UsersSection';
import { SettingsSection } from './components/SettingsSection';
import { ExportSection } from './components/ExportSection';
import { UserForm } from './components/UserForm';
import { Modal } from './components/Modal';
import { ToastContainer } from './components/Toast';
import { Button } from './components/Button';
import { LoadingSpinner } from './components/LoadingSpinner';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

function App() {
  const {
    users,
    isLoading,
    error,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteUsers,
    setLoading,
    setError,
    theme,
    selectedUsers,
  } = useUserStore();

  const [activeSection, setActiveSection] = useState(() => {
    const saved = localStorage.getItem('active-section');
    return saved || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('active-section', activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key >= '1' && e.key <= '4') {
        const sections = ['dashboard', 'users', 'settings', 'export'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
          e.preventDefault();
          setActiveSection(sections[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState<number[]>([]);
  const [resetDataConfirmOpen, setResetDataConfirmOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      const storedData = localStorage.getItem('user-management-storage');
      let hasStoredUsers = false;

      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          if (parsed.state?.users && Array.isArray(parsed.state.users) && parsed.state.users.length > 0) {
            hasStoredUsers = true;
          }
        } catch {
          hasStoredUsers = false;
        }
      }

      if (!hasStoredUsers) {
        setLoading(true);
        setError(null);
        try {
          const csvPath = '/data/mock_data.csv';
          const userData = await parseCSV(csvPath);
          setUsers(userData);
          showToast('Users loaded successfully', 'success');
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load users';
          setError(errorMessage);
          showToast(errorMessage, 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(loadData, 100);
    return () => clearTimeout(timer);
  }, [setUsers, setLoading, setError]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUserToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      deleteUser(userToDelete);
      showToast('User deleted successfully', 'success');
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedUsers.size > 0) {
      setUsersToDelete(Array.from(selectedUsers));
      setBulkDeleteConfirmOpen(true);
    }
  };

  const confirmBulkDelete = () => {
    if (usersToDelete.length > 0) {
      deleteUsers(usersToDelete);
      showToast(`${usersToDelete.length} user(s) deleted successfully`, 'success');
      setBulkDeleteConfirmOpen(false);
      setUsersToDelete([]);
    }
  };

  const cancelBulkDelete = () => {
    setBulkDeleteConfirmOpen(false);
    setUsersToDelete([]);
  };

  const handleResetData = () => {
    setResetDataConfirmOpen(true);
  };

  const confirmResetData = () => {
    localStorage.removeItem('user-management-storage');
    window.location.reload();
  };

  const cancelResetData = () => {
    setResetDataConfirmOpen(false);
  };

  const handleFormSubmit = (formData: UserFormData) => {
    if (editingUser) {
      updateUser(editingUser.id, formData);
      showToast('User updated successfully', 'success');
    } else {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
      };
      addUser(newUser);
      showToast('User created successfully', 'success');
    }
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <StatsDashboard />;
      case 'users':
        return (
          <UsersSection
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onBulkDelete={handleBulkDelete}
          />
        );
      case 'settings':
        return <SettingsSection onResetData={handleResetData} />;
      case 'export':
        return <ExportSection />;
      default:
        return <StatsDashboard />;
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Error Loading Data</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error}
        </p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 md:ml-64 flex flex-col w-full md:w-auto">
          <div className="w-full max-w-[1500px] mx-auto flex flex-col flex-1 px-4 md:px-6">
            <Header activeSection={activeSection} onSectionChange={setActiveSection} />
            
            <main className="flex-1 py-4 md:py-6 w-full">
              {renderContent()}
            </main>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(undefined);
          }}
          title={editingUser ? 'Edit User' : 'Add New User'}
        >
          <UserForm
            user={editingUser}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingUser(undefined);
            }}
          />
        </Modal>

        <Modal
          isOpen={deleteConfirmOpen}
          onClose={cancelDelete}
          title="Delete User"
        >
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={cancelDelete}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={bulkDeleteConfirmOpen}
          onClose={cancelBulkDelete}
          title="Delete Users"
        >
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete {usersToDelete.length} selected user(s)? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={cancelBulkDelete}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmBulkDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={resetDataConfirmOpen}
          onClose={cancelResetData}
          title="Reset Data"
        >
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to reset all data? This will clear all changes and reload from the original CSV file. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={cancelResetData}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmResetData}
              >
                Reset Data
              </Button>
            </div>
          </div>
        </Modal>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
