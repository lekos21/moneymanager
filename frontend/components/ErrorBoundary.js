import React from 'react';

/**
 * Error Boundary component to catch errors in the component tree
 * and display a fallback UI instead of crashing the app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render() {
    const { fallback, children } = this.props;
    
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(this.state.error, this.handleReset)
          : fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center bg-white rounded-xl shadow-md m-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We're sorry, but an error occurred while rendering this component.
          </p>
          <button 
            onClick={this.handleReset}
            className="btn-primary mb-4"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Reload App
          </button>
          
          {process.env.NODE_ENV !== 'production' && (
            <details className="mt-4 text-left bg-gray-50 p-4 rounded-lg w-full">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40">
                {this.state.error && this.state.error.toString()}
              </pre>
              <div className="mt-2 text-xs text-gray-600 overflow-auto max-h-40">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </div>
            </details>
          )}
        </div>
      );
    }

    return children;
  }
}

/**
 * Higher-order component to wrap a component with an ErrorBoundary
 * 
 * @param {React.Component} Component - The component to wrap
 * @param {React.Component|Function} fallback - Optional custom fallback UI
 * @returns {React.Component} - The wrapped component
 */
export const withErrorBoundary = (Component, fallback) => {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WithErrorBoundary = (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;
  return WithErrorBoundary;
};

export default ErrorBoundary;
