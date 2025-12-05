export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

export type SortField = keyof User | '';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  search: string;
  gender: string;
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

export interface UserStats {
  total: number;
  byGender: Record<string, number>;
}

export type Theme = 'light' | 'dark';

export interface ChartColors {
  barChart: string;
  pieChartColors: string[];
}

