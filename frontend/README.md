# User Management Dashboard

A modern, feature-rich React TypeScript application for managing user data with a comprehensive dashboard interface.

## Features

### Core Functionality
- ✅ **User Data Management**
  - Load and parse CSV data
  - Display users in a responsive table
  - Search functionality (first name, last name, email, gender)
  - Gender filtering
  - Column sorting (ascending/descending)
  - Pagination with configurable items per page

- ✅ **User Operations**
  - Add new users with form validation
  - Edit existing users
  - Delete users with confirmation
  - Bulk delete operations
  - Multi-select functionality

- ✅ **State Management**
  - Zustand for global state management
  - Local component state for forms
  - State normalization
  - Optimistic updates
  - Error state handling

- ✅ **UI/UX Features**
  - Modern, consistent design system
  - Dark/light theme toggle with persistence
  - Responsive design (mobile-friendly)
  - Loading states and skeleton screens
  - Error boundaries
  - Toast notifications
  - Smooth animations and transitions
  - Form validation with clear feedback

- ✅ **Advanced Features**
  - Data visualization with charts (Bar and Pie charts)
  - Statistics dashboard
  - Data export (CSV, JSON)
  - User preferences persistence (localStorage)
  - Debounced search
  - Memoized components for performance

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Recharts** - Data visualization
- **PapaParse** - CSV parsing and export
- **React Icons** - Icon library
- **CSS Custom Properties** - Theming system

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── UserTable.tsx
│   │   ├── UserForm.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── StatsDashboard.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   ├── store/               # Zustand store
│   │   └── userStore.ts
│   ├── utils/               # Utility functions
│   │   ├── csvParser.ts
│   │   ├── exportData.ts
│   │   └── validation.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── styles/              # CSS files
│   │   ├── variables.css
│   │   └── utilities.css
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/
│   └── data/
│       └── mock_data.csv    # User data
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

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

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Loading Data
The application automatically loads user data from `/public/data/mock_data.csv` on startup.

### Searching Users
- Use the search bar to filter users by first name, last name, email, or gender
- Search is debounced (300ms delay) for better performance
- Use the gender dropdown to filter by specific gender

### Sorting
- Click on any column header to sort by that column
- Click again to reverse the sort order
- Visual indicators show the current sort field and direction

### Adding Users
1. Click the "Add User" button
2. Fill in the form with valid data:
   - First Name (required)
   - Last Name (required)
   - Email (required, must be valid email format)
   - Gender (required)
   - IP Address (required, must be valid IP format)
3. Click "Create User"

### Editing Users
1. Click the edit icon (pencil) next to a user in the table
2. Modify the user data in the modal
3. Click "Update User"

### Deleting Users
- **Single delete**: Click the delete icon (trash) next to a user
- **Bulk delete**: 
  1. Select multiple users using checkboxes
  2. Click "Delete Selected" in the header
  3. Confirm the deletion

### Exporting Data
- Click "Export CSV" to download current filtered users as CSV
- Click "Export JSON" to download current filtered users as JSON

### Theme Toggle
- Click the moon/sun icon in the header to switch between light and dark themes
- Theme preference is saved to localStorage

## Performance Optimizations

1. **Debounced Search** - Search input is debounced to reduce unnecessary filtering
2. **Memoized Components** - UserTable is memoized to prevent unnecessary re-renders
3. **Pagination** - Large datasets are paginated to improve rendering performance
4. **Efficient State Updates** - Zustand's selective subscriptions prevent unnecessary re-renders

## Design System

The application uses a comprehensive design system with:

- **CSS Custom Properties** for theming
- **Consistent spacing scale** (xs, sm, md, lg, xl, 2xl)
- **Typography scale** with semantic font sizes
- **Color palette** with light/dark theme variants
- **Component variants** (primary, secondary, danger buttons)
- **Responsive breakpoints** for mobile/tablet/desktop

## Error Handling

- **Error Boundaries** - Catches React component errors
- **Form Validation** - Client-side validation with clear error messages
- **Loading States** - Shows loading spinners during data operations
- **Toast Notifications** - User-friendly feedback for all operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential improvements:
- Virtual scrolling for very large datasets
- Advanced filtering with multiple criteria
- Keyboard shortcuts
- PWA features (service worker, offline support)
- User preferences for table columns
- Import functionality
- Undo/redo functionality

## License

This project is created for interview/assessment purposes.
