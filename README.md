# GenericCrud - React Component Library

A reusable React component for CRUD operations with search and customizable actions.

## Features

- 📊 **Data Table**: Display data in a clean, responsive table format
- 🔍 **Search Functionality**: Real-time search across all data fields
- ➕ **Add/Edit/Delete**: Full CRUD operations with form validation
- 🎨 **Customizable**: Custom styling, actions, and field rendering
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Lightweight**: No heavy dependencies, just React

## Quick Start

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
# or
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port if 3000 is in use)

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Usage

```jsx
import React, { useState } from 'react';
import GenericCrudPage from './src/GenericCrudPage.jsx';

function MyPage() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ]);

  const handleAdd = (newItem) => {
    setData([...data, { id: Date.now(), ...newItem }]);
  };

  const handleEdit = (item) => {
    // Handle edit logic
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <GenericCrudPage
      title="My Data"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' }
      ]}
      formFields={[
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true }
      ]}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

## Advanced Usage

### Custom Field Rendering

```jsx
const columns = [
  { key: 'name', label: 'Name' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        backgroundColor: item.status === 'Active' ? '#d4edda' : '#f8d7da',
        color: item.status === 'Active' ? '#155724' : '#721c24'
      }}>
        {item.status}
      </span>
    )
  }
];
```

### Custom Actions

```jsx
const renderCustomActions = (item) => (
  <button
    onClick={() => toggleStatus(item.id)}
    style={{
      padding: '4px 8px',
      backgroundColor: '#17a2b8',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    Toggle Status
  </button>
);

<GenericCrudPage
  {...props}
  renderActions={renderCustomActions}
/>
```

### Form Validation

```jsx
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return true;
};

const formFields = [
  { 
    key: 'email', 
    label: 'Email', 
    type: 'email',
    required: true,
    validation: validateEmail
  }
];
```

## API Reference

### GenericCrudPage Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Page title |
| `data` | array | Yes | Data to display |
| `columns` | array | Yes | Column definitions |
| `formFields` | array | Yes | Form field definitions |
| `onAdd` | function | Yes | Add handler |
| `onEdit` | function | Yes | Edit handler |
| `onDelete` | function | Yes | Delete handler |
| `onRefresh` | function | No | Refresh handler |
| `loading` | boolean | No | Loading state |
| `error` | string | No | Error message |
| `renderActions` | function | No | Custom action renderer |
| `customStyles` | object | No | Custom CSS styles |
| `confirmDelete` | boolean | No | Show confirmation dialog |
| `searchPlaceholder` | string | No | Search input placeholder |
| `emptyMessage` | string | No | Message when no data |
| `loadingMessage` | string | No | Loading state message |

### Column Definition

```jsx
{
  key: 'fieldName',        // Data field to display
  label: 'Display Name',   // Column header
  render: (item) => {},    // Optional custom renderer
  sortable: true          // Optional sorting capability
}
```

### Form Field Definition

```jsx
{
  key: 'fieldName',                    // Form field name
  label: 'Field Label',                // Field label
  type: 'text|email|select|textarea',  // Input type
  required: true,                      // Required field
  placeholder: 'Enter value',          // Placeholder text
  options: [                          // For select fields
    { value: 'option1', label: 'Option 1' }
  ],
  validation: (value) => {},          // Custom validation
  defaultValue: ''                    // Default value
}
```

## Configuration

### Jest Configuration

The project uses Jest for testing with the following configuration:

- **Test Environment**: `jsdom` for DOM testing
- **Transform**: Babel for JSX transformation
- **Module Mapping**: Handles CSS imports
- **Coverage**: 80% threshold for branches, functions, lines, and statements

### Babel Configuration

Babel is configured to:
- Transform modern JavaScript features
- Handle JSX transformation
- Target current Node.js version

## Project Structure

```
GenericCrud/
├── src/
│   ├── GenericCrudPage.jsx    # Main component
│   ├── GenericCrudPage.test.jsx # Tests
│   └── setupTests.js          # Test setup
├── examples/
│   └── UsersExample.jsx       # Usage example
├── jest.config.cjs            # Jest configuration
├── babel.config.cjs           # Babel configuration
├── index.html                 # Development server
└── package.json               # Dependencies and scripts
```

## Available Scripts

```bash
npm start          # Start development server
npm run dev        # Alternative dev server command
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run build      # Build command (placeholder)
npm run lint       # Lint command (placeholder)
npm run type-check # TypeScript type checking
```

## Dependencies

### Production Dependencies
- `react` (>=16.8.0)
- `react-dom` (>=16.8.0)
- `lucide-react` (^0.263.1)

### Development Dependencies
- `@babel/preset-env` (^7.22.0)
- `@babel/preset-react` (^7.22.0)
- `@testing-library/jest-dom` (^5.16.0)
- `@testing-library/react` (^13.0.0)
- `@types/react` (^18.2.0)
- `@types/react-dom` (^18.2.0)
- `babel-jest` (^29.0.0)
- `identity-obj-proxy` (^3.0.0)
- `jest` (^29.0.0)
- `jest-environment-jsdom` (^29.7.0)
- `jsdom` (^22.0.0)
- `typescript` (^5.0.0)

## Recent Fixes

### Jest Configuration Issues

1. **Fixed `moduleNameMapping` typo**: Changed to `moduleNameMapper`
2. **Added missing dependency**: Installed `jest-environment-jsdom@29`
3. **Fixed ES module issues**: Renamed config files to `.cjs` extension
4. **Fixed test selector**: Updated refresh button test to use `getByLabelText`

### Development Server

1. **Added start script**: `npm start` now serves the application
2. **Created HTML file**: `index.html` for development server
3. **Added dev script**: Alternative `npm run dev` command

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run `npm test` to ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Author

Abdulkader Shanbour

## Repository

- **GitHub**: https://github.com/abd-shan/genericCrud.git
- **Issues**: https://github.com/abd-shan/genericCrud/issues
