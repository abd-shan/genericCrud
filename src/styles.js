/**
 * Default styles for GenericCrudPage component
 * These styles provide a clean, modern look while being customizable
 */

export const defaultStyles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e1e5e9'
  },
  
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e1e5e9'
  },
  
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    alignSelf: 'end'
  },
  
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  
  searchBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '16px'
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#6c757d',
    fontSize: '16px'
  },
  
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#6c757d',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e1e5e9'
  }
};

// Input and select styles
export const inputStyles = {
  padding: '10px 12px',
  border: '1px solid #ced4da',
  borderRadius: '6px',
  fontSize: '14px',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  outline: 'none'
};

// Table styles
export const tableStyles = {
  th: {
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    color: '#495057',
    borderBottom: '2px solid #dee2e6'
  },
  
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #dee2e6',
    fontSize: '14px',
    color: '#212529'
  },
  
  actionButton: {
    padding: '6px 12px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  
  editButton: {
    backgroundColor: '#ffc107',
    color: '#212529'
  },
  
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white'
  }
}; 