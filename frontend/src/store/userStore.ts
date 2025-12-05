import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, SortConfig, FilterConfig, PaginationConfig, Theme, UserStats, ChartColors } from '../types';

interface UserState {
  users: User[];
  filteredUsers: User[];
  selectedUsers: Set<number>;
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  paginationConfig: PaginationConfig;
  theme: Theme;
  chartColors: ChartColors;
  isLoading: boolean;
  error: string | null;
  
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
  deleteUsers: (ids: number[]) => void;
  setSortConfig: (config: SortConfig) => void;
  setFilterConfig: (config: FilterConfig) => void;
  setPaginationConfig: (config: PaginationConfig) => void;
  toggleUserSelection: (id: number) => void;
  selectAllUsers: () => void;
  clearSelection: () => void;
  setTheme: (theme: Theme) => void;
  setChartColors: (colors: ChartColors) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  getStats: () => UserStats;
  getCurrentPageUsers: () => User[];
}

const applyFilters = (users: User[], filterConfig: FilterConfig): User[] => {
  let filtered = [...users];
  
  if (filterConfig.search) {
    const searchLower = filterConfig.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.gender.toLowerCase().includes(searchLower)
    );
  }
  
  if (filterConfig.gender) {
    filtered = filtered.filter((user) => user.gender === filterConfig.gender);
  }
  
  return filtered;
};

const applySort = (users: User[], sortConfig: SortConfig): User[] => {
  if (!sortConfig.field) return users;
  
  const sorted = [...users].sort((a, b) => {
    const aValue = a[sortConfig.field as keyof User];
    const bValue = b[sortConfig.field as keyof User];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      filteredUsers: [],
      selectedUsers: new Set<number>(),
      sortConfig: { field: '', direction: 'asc' },
      filterConfig: { search: '', gender: '' },
      paginationConfig: { currentPage: 1, itemsPerPage: 10 },
      theme: 'light',
      chartColors: {
        barChart: '#10b981',
        pieChartColors: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#ecfdf5'],
      },
      isLoading: false,
      error: null,

      setUsers: (users) => {
        const { sortConfig, filterConfig } = get();
        let processed = applyFilters(users, filterConfig);
        processed = applySort(processed, sortConfig);
        set({ users, filteredUsers: processed });
      },

      addUser: (user) => {
        const { users, sortConfig, filterConfig } = get();
        const newUsers = [...users, user];
        let processed = applyFilters(newUsers, filterConfig);
        processed = applySort(processed, sortConfig);
        set({ users: newUsers, filteredUsers: processed });
      },

      updateUser: (id, updates) => {
        const { users, sortConfig, filterConfig } = get();
        const newUsers = users.map((u) => (u.id === id ? { ...u, ...updates } : u));
        let processed = applyFilters(newUsers, filterConfig);
        processed = applySort(processed, sortConfig);
        set({ users: newUsers, filteredUsers: processed });
      },

      deleteUser: (id) => {
        const { users, sortConfig, filterConfig } = get();
        const newUsers = users.filter((u) => u.id !== id);
        let processed = applyFilters(newUsers, filterConfig);
        processed = applySort(processed, sortConfig);
        const selectedUsers = new Set(get().selectedUsers);
        selectedUsers.delete(id);
        set({ users: newUsers, filteredUsers: processed, selectedUsers });
      },

      deleteUsers: (ids) => {
        const { users, sortConfig, filterConfig } = get();
        const newUsers = users.filter((u) => !ids.includes(u.id));
        let processed = applyFilters(newUsers, filterConfig);
        processed = applySort(processed, sortConfig);
        set({ users: newUsers, filteredUsers: processed, selectedUsers: new Set() });
      },

      setSortConfig: (config) => {
        const { filteredUsers } = get();
        const processed = applySort(filteredUsers, config);
        set({ sortConfig: config, filteredUsers: processed });
      },

      setFilterConfig: (config) => {
        const { users, sortConfig } = get();
        let processed = applyFilters(users, config);
        processed = applySort(processed, sortConfig);
        set({ filterConfig: config, filteredUsers: processed, paginationConfig: { ...get().paginationConfig, currentPage: 1 } });
      },

      setPaginationConfig: (config) => {
        set({ paginationConfig: config });
      },

      toggleUserSelection: (id) => {
        const selectedUsers = new Set(get().selectedUsers);
        if (selectedUsers.has(id)) {
          selectedUsers.delete(id);
        } else {
          selectedUsers.add(id);
        }
        set({ selectedUsers });
      },

      selectAllUsers: () => {
        const { filteredUsers } = get();
        const selectedUsers = new Set(filteredUsers.map((u) => u.id));
        set({ selectedUsers });
      },

      clearSelection: () => {
        set({ selectedUsers: new Set() });
      },

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setChartColors: (colors) => {
        set({ chartColors: colors });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      getStats: () => {
        const { users } = get();
        const byGender: Record<string, number> = {};
        users.forEach((user) => {
          byGender[user.gender] = (byGender[user.gender] || 0) + 1;
        });
        return { total: users.length, byGender };
      },

      getCurrentPageUsers: () => {
        const { filteredUsers, paginationConfig } = get();
        const start = (paginationConfig.currentPage - 1) * paginationConfig.itemsPerPage;
        const end = start + paginationConfig.itemsPerPage;
        return filteredUsers.slice(start, end);
      },
    }),
    {
      name: 'user-management-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        chartColors: state.chartColors,
        users: state.users.length > 0 ? state.users : undefined,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.users && state.users.length > 0) {
          const { sortConfig, filterConfig } = state;
          let processed = applyFilters(state.users, filterConfig);
          processed = applySort(processed, sortConfig);
          state.filteredUsers = processed;
        }
      },
    }
  )
);

