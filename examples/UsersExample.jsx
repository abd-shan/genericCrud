import React, { useState } from 'react';
import GenericCrudPage from '../src/GenericCrudPage.jsx';

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return true;
  };

  // Custom render function for status
  const renderStatus = (user) => (
    <span style={{
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: user.status === 'Active' ? '#d4edda' : '#f8d7da',
      color: user.status === 'Active' ? '#155724' : '#721c24'
    }}>
      {user.status}
    </span>
  );

  // Custom actions
  const renderCustomActions = (user) => (
    <button
      onClick={() => {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: newStatus } : u
        ));
      }}
      style={{
        padding: '4px 8px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        marginLeft: '4px'
      }}
    >
      Toggle Status
    </button>
  );

  const handleAdd = (newUser) => {
    try {
      setError(null);
      const user = { 
        id: Date.now(), 
        ...newUser,
        status: 'Active' // Default status
      };
      setUsers([...users, user]);
    } catch (err) {
      setError('Failed to add user');
    }
  };

  const handleEdit = (user) => {
    // In a real app, you might open a modal or navigate to edit page
    alert(`Edit user: ${user.name} (${user.email})`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would fetch fresh data here
      setLoading(false);
    } catch (err) {
      setError('Failed to refresh data');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <GenericCrudPage
        title="User Management System"
        data={users}
        loading={loading}
        error={error}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status', render: renderStatus }
        ]}
        formFields={[
          { 
            key: 'name', 
            label: 'Full Name', 
            type: 'text',
            placeholder: 'Enter full name',
            required: true 
          },
          { 
            key: 'email', 
            label: 'Email Address', 
            type: 'email',
            placeholder: 'Enter email address',
            required: true,
            validation: validateEmail
          },
          { 
            key: 'role', 
            label: 'Role', 
            type: 'select',
            required: true,
            options: [
              { value: 'User', label: 'User' },
              { value: 'Manager', label: 'Manager' },
              { value: 'Admin', label: 'Admin' }
            ]
          }
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        renderActions={renderCustomActions}
        confirmDelete={true}
        searchPlaceholder="Search users by name, email, or role..."
        emptyMessage="No users found. Add your first user to get started!"
        loadingMessage="Loading users..."
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }
        }}
      />
    </div>
  );
}
