import React from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Page-level error boundary component with a more specific UI for page errors
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.pageName - Name of the page for error reporting
 * @returns {JSX.Element} - The error boundary component
 */
const PageErrorBoundary = ({ children, pageName = 'this page' }) => {
  // Custom fallback UI for page-level errors
  const PageErrorFallback = (error, reset) => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but an error occurred while loading {pageName}. 
          This could be due to a temporary issue or a problem with your connection.
        </p>
        
        <div className="flex flex-col space-y-3">
          <button 
            onClick={reset}
            className="btn-primary"
          >
            Try Again
          </button>
          
          <button 
            onClick={() => window.location.href = '/home'}
            className="btn-secondary"
          >
            Go to Home
          </button>
        </div>
        
        {process.env.NODE_ENV !== 'production' && error && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
            <p className="text-sm font-medium text-gray-700 mb-2">Error details (development only):</p>
            <pre className="text-xs text-red-600 overflow-auto max-h-32 p-2 bg-gray-100 rounded">
              {error.toString()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={PageErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
