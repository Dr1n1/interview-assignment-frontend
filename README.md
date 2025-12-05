# Interview Assignment: React TypeScript User Management Dashboard

## Overview
This project implements a comprehensive user management dashboard built with React 19, TypeScript, and modern web technologies. The application demonstrates advanced state management, UI/UX design principles, and TypeScript development skills.

## Project Structure

```
Project/
├── data/
│   └── mock_data.csv          # Source CSV data (1000 users)
├── frontend/                  # React TypeScript application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── store/            # Zustand state management
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   └── styles/           # CSS design system
│   ├── public/
│   │   └── data/
│   │       └── mock_data.csv # Public CSV file
│   └── README.md             # Frontend documentation
└── README.md                 # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically `http://localhost:5173`)

## Features Implemented

### ✅ Core Requirements

#### User Data Management
- ✅ CSV data loading and parsing
- ✅ Responsive table/list view
- ✅ Search functionality (first name, last name, email, gender)
- ✅ Gender filtering
- ✅ Pagination (10, 25, 50, 100 items per page)
- ✅ Column sorting (ascending/descending)

#### User Operations
- ✅ Add new users with form validation
- ✅ Edit existing users with pre-populated forms
- ✅ Delete users with confirmation
- ✅ Bulk operations (select multiple users for batch delete)

#### State Management
- ✅ Local component state for forms and UI
- ✅ Global state with Zustand
- ✅ State normalization
- ✅ Optimistic updates
- ✅ Error state handling

#### UI/UX
- ✅ Consistent design system (colors, typography, spacing)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern CSS (Grid, Flexbox, Custom Properties)
- ✅ Loading states
- ✅ Error boundaries
- ✅ Form validation with feedback
- ✅ Smooth animations

### ✅ Advanced Features

#### Data Visualization
- ✅ Charts showing user demographics (Bar and Pie charts)
- ✅ Statistics dashboard with key metrics
- ✅ Data export (CSV, JSON)

#### Enhanced UX
- ✅ Dark/light theme toggle
- ✅ Theme persistence (localStorage)
- ✅ Advanced filtering (search + gender)
- ✅ User preferences persistence

#### Performance Optimization
- ✅ Debounced search implementation
- ✅ Memoization of expensive components
- ✅ Efficient pagination
- ✅ Optimized state updates

## Technologies Used

- **React 19** - UI library with hooks
- **TypeScript** - Type safety throughout
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization library
- **PapaParse** - CSV parsing and generation
- **React Icons** - Icon library
- **CSS Custom Properties** - Theming system

## Approach & Architecture

### State Management Strategy
I chose **Zustand** for state management because:
- Lightweight and simple API
- Excellent TypeScript support
- Built-in persistence middleware
- Better performance than Context API for this use case
- Easy to test and maintain

The store manages:
- User data (normalized)
- Filtering and sorting state
- Pagination state
- Selection state
- Theme preferences
- Loading and error states

### Design System
Created a comprehensive design system using CSS Custom Properties:
- **Theming**: Light/dark themes with CSS variables
- **Spacing**: Consistent scale (xs, sm, md, lg, xl, 2xl)
- **Typography**: Semantic font sizes and weights
- **Colors**: Theme-aware color palette
- **Components**: Reusable button, input, modal variants

### Performance Optimizations
1. **Debounced Search**: 300ms delay prevents excessive filtering
2. **Memoized Components**: UserTable uses React.memo
3. **Pagination**: Only renders visible users
4. **Efficient Updates**: Zustand's selective subscriptions

### Component Architecture
- **Atomic Components**: Button, Input, Select (reusable)
- **Composite Components**: UserTable, UserForm, SearchBar
- **Layout Components**: Header, Modal, Pagination
- **Feature Components**: StatsDashboard, ToastContainer

## Challenges Solved

1. **Set Serialization**: Zustand's persist middleware doesn't handle Set objects. Solved by not persisting selection state (UI-only state).

2. **CSV Loading**: Needed to serve CSV from public directory and parse it client-side. Used PapaParse for robust CSV parsing.

3. **Performance with Large Datasets**: Implemented pagination and debounced search to handle 1000+ users smoothly.

4. **Type Safety**: Comprehensive TypeScript types for all data structures, ensuring type safety throughout the application.

5. **Theme Persistence**: Used Zustand's persist middleware to save theme preference across sessions.

## Code Quality

- ✅ Proper TypeScript typing throughout
- ✅ React best practices (functional components, hooks)
- ✅ Clean code organization
- ✅ Error handling
- ✅ No linter errors
- ✅ Responsive design
- ✅ Accessibility considerations

## Testing the Application

1. **Search**: Type in the search bar to filter users
2. **Sort**: Click column headers to sort
3. **Filter**: Use gender dropdown to filter
4. **Add User**: Click "Add User" and fill the form
5. **Edit User**: Click edit icon on any row
6. **Delete**: Click delete icon or use bulk delete
7. **Export**: Use export buttons in header
8. **Theme**: Toggle dark/light mode

## Build & Deploy

```bash
# Build for production
cd frontend
npm run build

# Preview production build
npm run preview
```

The built files will be in `frontend/dist/`.

## Future Enhancements

Potential improvements:
- Virtual scrolling for very large datasets
- Advanced filtering with date ranges, IP ranges
- Keyboard shortcuts (Ctrl+F for search, etc.)
- PWA features (offline support, installable)
- User preferences for visible columns
- Import functionality
- Undo/redo for operations
- Advanced analytics and reporting

## License

Created for interview/assessment purposes.
