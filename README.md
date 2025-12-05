# User Management Dashboard

A React TypeScript application for managing user data with a comprehensive dashboard interface.

## Setup & Running

**Prerequisites:** Node.js 18+ and npm

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Features Implemented

### Core Functionality
- CSV data loading and parsing (1000 users)
- Responsive table with search, filtering, sorting, and pagination
- Add, edit, and delete users with form validation
- Bulk delete operations with multi-select
- Data export (CSV, JSON)

### Advanced Features
- Statistics dashboard with bar and pie charts
- Dark/light theme toggle with persistence
- Keyboard shortcuts (1-4 for navigation, Ctrl/Cmd+K for search)
- User preferences persistence (localStorage)
- Custom modals for confirmations
- Responsive mobile design with burger menu

### Performance Optimizations
- Debounced search (300ms)
- Memoized components
- Efficient pagination
- Optimized state updates

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management with persistence
- **Recharts** - Data visualization
- **PapaParse** - CSV parsing/generation
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

## Approach & Challenges

### State Management
Used **Zustand** for lightweight, performant state management with built-in persistence. The store manages user data, filters, sorting, pagination, theme preferences, and chart colors.

### Design System
Implemented a CSS Custom Properties-based design system with light/dark themes, consistent spacing, typography scale, and reusable component variants.

### Key Challenges Solved
1. **Data Persistence**: Implemented localStorage persistence for user edits while maintaining ability to reset to original CSV
2. **Set Serialization**: Zustand's persist doesn't handle Set objects - solved by keeping selection state as UI-only
3. **Performance**: Debounced search and pagination handle 1000+ users smoothly
4. **Type Safety**: Comprehensive TypeScript types throughout
5. **Responsive Layout**: Mobile-first design with sidebar-to-navbar transformation on mobile

## Build

```bash
cd frontend
npm run build
```

Production files are in `frontend/dist/`.
