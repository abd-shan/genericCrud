import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenericCrudPage from './GenericCrudPage.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Plus: ({ size }) => <span data-testid="plus-icon">Plus</span>,
  RefreshCw: ({ size }) => <span data-testid="refresh-icon">Refresh</span>,
  Search: ({ size }) => <span data-testid="search-icon">Search</span>,
  AlertCircle: ({ size }) => <span data-testid="alert-icon">Alert</span>,
}));

describe('GenericCrudPage', () => {
  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  const mockColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const mockFormFields = [
    { key: 'name', label: 'Name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true }
  ];

  const defaultProps = {
    title: 'Test Page',
    data: mockData,
    columns: mockColumns,
    formFields: mockFormFields,
    onAdd: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onRefresh: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title correctly', () => {
    render(<GenericCrudPage {...defaultProps} />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  test('renders table with data', () => {
    render(<GenericCrudPage {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('renders form fields', () => {
    render(<GenericCrudPage {...defaultProps} />);
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<GenericCrudPage {...defaultProps} loading={true} />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('shows error message', () => {
    const errorMessage = 'Something went wrong';
    render(<GenericCrudPage {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('shows empty state when no data', () => {
    render(<GenericCrudPage {...defaultProps} data={[]} />);
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(<GenericCrudPage {...defaultProps} />);
    
    const nameInput = screen.getByLabelText('Name *');
    const emailInput = screen.getByLabelText('Email *');
    const addButton = screen.getByText('Add');

    fireEvent.change(nameInput, { target: { value: 'New User' } });
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(defaultProps.onAdd).toHaveBeenCalledWith({
        name: 'New User',
        email: 'new@example.com'
      });
    });
  });

  test('validates required fields', async () => {
    render(<GenericCrudPage {...defaultProps} />);
    
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('handles search functionality', () => {
    render(<GenericCrudPage {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('handles edit action', () => {
    render(<GenericCrudPage {...defaultProps} />);
    
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockData[0]);
  });

  test('handles delete action', () => {
    render(<GenericCrudPage {...defaultProps} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(defaultProps.onDelete).toHaveBeenCalledWith(1);
  });

  test('handles refresh action', () => {
    render(<GenericCrudPage {...defaultProps} />);
    
    const refreshButton = screen.getByLabelText('Refresh data');
    fireEvent.click(refreshButton);

    expect(defaultProps.onRefresh).toHaveBeenCalled();
  });

  test('displays total count', () => {
    render(<GenericCrudPage {...defaultProps} />);
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
  });

  test('renders custom actions', () => {
    const customActions = jest.fn(() => <button>Custom Action</button>);
    render(<GenericCrudPage {...defaultProps} renderActions={customActions} />);
    
    expect(screen.getAllByText('Custom Action')).toHaveLength(2);
    expect(customActions).toHaveBeenCalledTimes(2);
  });

  test('applies custom styles', () => {
    const customStyles = {
      container: { backgroundColor: 'red' }
    };
    
    const { container } = render(
      <GenericCrudPage {...defaultProps} customStyles={customStyles} />
    );
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveStyle('background-color: red');
  });
}); 