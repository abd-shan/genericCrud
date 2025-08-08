/**
 * GenericCrudPage.jsx
 *
 * A reusable React component for handling CRUD operations (Create, Read, Update, Delete)
 * with built-in search and customizable actions.
 *
 * This component is UI-only and does not depend on any specific state management library.
 * You pass your own data, loading state, and handler functions via props.
 *
 * Features:
 * - Responsive design
 * - Accessibility support
 * - Customizable styling
 * - Form validation
 * - Search functionality
 * - Loading states
 * - Error handling
 *
 * Author: Abdulkader Shanbour
 * License: MIT
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Plus, RefreshCw, Search, AlertCircle } from 'lucide-react';
import { defaultStyles, inputStyles, tableStyles } from './styles.js';

export default function GenericCrudPage({
  title,                  // Page title
  data = [],              // Array of items to display
  loading = false,        // Boolean: is data loading
  error = null,           // Error message to display
  columns = [],           // Table columns [{ key, label, render, sortable }]
  formFields = [],        // Form fields [{ key, label, type, placeholder, required, options, validation }]
  onAdd,                  // Function: called when adding a new item
  onEdit,                 // Function: called when editing an item
  onDelete,               // Function: called when deleting an item
  onRefresh,              // Function: called when refreshing data
  renderActions,          // Function: custom action buttons per row
  AddButtonIcon = Plus,   // Optional custom add button icon
  RefreshButtonIcon = RefreshCw, // Optional custom refresh icon
  customStyles = {},      // Optional custom styles
  confirmDelete = true,   // Whether to show confirmation before delete
  searchPlaceholder = "Search...", // Custom search placeholder
  emptyMessage = "No data to display", // Custom empty state message
  loadingMessage = "Loading data...", // Custom loading message
  className = "",         // Additional CSS classes
  ...props               // Additional props passed to container
}) {
  const [formState, setFormState] = useState({});
  const [search, setSearch] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  // Merge default styles with custom styles
  const styles = useMemo(() => {
    const merged = {};
    Object.keys(defaultStyles).forEach(key => {
      merged[key] = { ...defaultStyles[key], ...customStyles[key] };
    });
    return merged;
  }, [customStyles]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    
    return data.filter(item =>
      columns.some(col => {
        const value = item[col.key];
        if (value == null) return false;
        return value.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  // Validate form field
  const validateField = useCallback((field, value) => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`;
    }
    
    if (field.validation) {
      const validationResult = field.validation(value);
      if (validationResult !== true) {
        return validationResult;
      }
    }
    
    return null;
  }, []);

  // Validate entire form
  const validateForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    formFields.forEach(field => {
      const error = validateField(field, formState[field.key]);
      if (error) {
        errors[field.key] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  }, [formState, formFields, validateField]);

  // Handle form field change
  const handleFieldChange = useCallback((fieldKey, value) => {
    setFormState(prev => ({ ...prev, [fieldKey]: value }));
    
    // Clear error when user starts typing
    if (formErrors[fieldKey]) {
      setFormErrors(prev => ({ ...prev, [fieldKey]: null }));
    }
  }, [formErrors]);

  // Handle adding a new item
  const handleAdd = useCallback(() => {
    if (!validateForm()) return;
    
    try {
      onAdd && onAdd(formState);
      setFormState({});
      setFormErrors({});
    } catch (err) {
      console.error('Error adding item:', err);
    }
  }, [formState, validateForm, onAdd]);

  // Handle editing an item
  const handleEdit = useCallback((item) => {
    try {
      onEdit && onEdit(item);
    } catch (err) {
      console.error('Error editing item:', err);
    }
  }, [onEdit]);

  // Handle deleting an item
  const handleDelete = useCallback((id) => {
    const confirmMessage = confirmDelete 
      ? `Are you sure you want to delete this item?`
      : null;
    
    if (confirmMessage && !window.confirm(confirmMessage)) {
      return;
    }
    
    try {
      onDelete && onDelete(id);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  }, [onDelete, confirmDelete]);

  // Handle form submission
  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    handleAdd();
  }, [handleAdd]);

  return (
    <div 
      style={styles.container} 
      className={`generic-crud-page ${className}`}
      {...props}
    >
      {/* Header */}
      <div style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
          {title}
        </h1>
        {onRefresh && (
          <button 
            onClick={onRefresh} 
            disabled={loading} 
            style={{
              ...styles.refreshButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            aria-label="Refresh data"
          >
            <RefreshButtonIcon size={18} /> Refresh
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #f5c6cb'
        }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Form */}
      {formFields.length > 0 && (
        <form onSubmit={handleFormSubmit} style={styles.form}>
          {formFields.map(field => (
            <div key={field.key} style={styles.formField}>
              <label 
                htmlFor={field.key}
                style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#495057',
                  marginBottom: '4px'
                }}
              >
                {field.label}
                {field.required && <span style={{ color: '#dc3545' }}> *</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  id={field.key}
                  value={formState[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  disabled={loading}
                  style={{
                    ...inputStyles,
                    borderColor: formErrors[field.key] ? '#dc3545' : '#ced4da'
                  }}
                  aria-describedby={formErrors[field.key] ? `${field.key}-error` : undefined}
                >
                  <option value="">{field.placeholder || `Select ${field.label}`}</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.key}
                  type={field.type || 'text'}
                  value={formState[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder || field.label}
                  disabled={loading}
                  style={{
                    ...inputStyles,
                    borderColor: formErrors[field.key] ? '#dc3545' : '#ced4da'
                  }}
                  aria-describedby={formErrors[field.key] ? `${field.key}-error` : undefined}
                />
              )}
              
              {formErrors[field.key] && (
                <div 
                  id={`${field.key}-error`}
                  style={{ 
                    color: '#dc3545', 
                    fontSize: '12px', 
                    marginTop: '4px' 
                  }}
                  role="alert"
                >
                  {formErrors[field.key]}
                </div>
              )}
            </div>
          ))}
          
          {onAdd && (
            <button 
              type="submit"
              disabled={loading} 
              style={{
                ...styles.addButton,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              aria-label="Add new item"
            >
              <AddButtonIcon size={18} /> Add
            </button>
          )}
        </form>
      )}

      {/* Search */}
      <div style={styles.searchBar}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#6c757d'
            }} 
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
            style={{
              ...inputStyles,
              paddingLeft: '40px',
              width: '100%',
              boxSizing: 'border-box'
            }}
            aria-label="Search data"
          />
        </div>
        <span style={{ 
          fontSize: '14px', 
          color: '#6c757d',
          whiteSpace: 'nowrap'
        }}>
          Total: {filteredData.length}
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div style={styles.loading}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
            {loadingMessage}
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div style={styles.empty}>
          {search ? 'No results found' : emptyMessage}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table} role="table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key} style={tableStyles.th}>
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete || renderActions) && (
                  <th style={tableStyles.th}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} style={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  {columns.map(col => (
                    <td key={`${item.id}-${col.key}`} style={tableStyles.td}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete || renderActions) && (
                    <td style={tableStyles.td}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {onEdit && (
                          <button 
                            onClick={() => handleEdit(item)}
                            style={{ ...tableStyles.actionButton, ...tableStyles.editButton }}
                            aria-label={`Edit ${item.name || item.id}`}
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => handleDelete(item.id)}
                            style={{ ...tableStyles.actionButton, ...tableStyles.deleteButton }}
                            aria-label={`Delete ${item.name || item.id}`}
                          >
                            Delete
                          </button>
                        )}
                        {renderActions && renderActions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
        
        .generic-crud-page input:focus,
        .generic-crud-page select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        
        .generic-crud-page button:hover:not(:disabled) {
          opacity: 0.9;
        }
        
        .generic-crud-page table tbody tr:hover {
          background-color: #f8f9fa;
        }
        
        @media (max-width: 768px) {
          .generic-crud-page .form {
            grid-template-columns: 1fr;
          }
          
          .generic-crud-page .searchBar {
            flex-direction: column;
            align-items: stretch;
          }
          
          .generic-crud-page table {
            font-size: 12px;
          }
          
          .generic-crud-page th,
          .generic-crud-page td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}
