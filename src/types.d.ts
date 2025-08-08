import { ReactNode } from 'react';

export interface Column {
  key: string;
  label: string;
  render?: (item: any) => ReactNode;
  sortable?: boolean;
}

export interface FormField {
  key: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => true | string;
  options?: Array<{ value: string; label: string }>;
}

export interface CustomStyles {
  container?: React.CSSProperties;
  header?: React.CSSProperties;
  form?: React.CSSProperties;
  formField?: React.CSSProperties;
  addButton?: React.CSSProperties;
  refreshButton?: React.CSSProperties;
  searchBar?: React.CSSProperties;
  table?: React.CSSProperties;
  loading?: React.CSSProperties;
  empty?: React.CSSProperties;
}

export interface GenericCrudPageProps {
  title: string;
  data?: any[];
  loading?: boolean;
  error?: string | null;
  columns?: Column[];
  formFields?: FormField[];
  onAdd?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: string | number) => void;
  onRefresh?: () => void;
  renderActions?: (item: any) => ReactNode;
  AddButtonIcon?: React.ComponentType<{ size?: number }>;
  RefreshButtonIcon?: React.ComponentType<{ size?: number }>;
  customStyles?: CustomStyles;
  confirmDelete?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  [key: string]: any;
}

declare const GenericCrudPage: React.FC<GenericCrudPageProps>;

export default GenericCrudPage; 