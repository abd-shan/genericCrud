import '@testing-library/jest-dom';

// Mock window.confirm for delete confirmation tests
Object.defineProperty(window, 'confirm', {
  writable: true,
  value: jest.fn(() => true),
});

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
}); 