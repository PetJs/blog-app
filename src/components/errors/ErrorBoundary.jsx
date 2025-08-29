import { Component } from 'react';
import { Link } from 'react-router-dom';

// interface ErrorBoundaryProps {
//   children: ReactNode;
//   fallback?: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
//   error?: Error;
// }

class ErrorBoundary extends Component{
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo){
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
          <h1 className="text-4xl font-mono font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-lg font-mono mb-8 text-center">
            We're sorry, an unexpected error has occurred.
          </p>
          <Link
            to="/"
            className="bg-gray-900 text-white px-6 py-3 font-mono text-sm font-bold 
                     rounded shadow-lg transition duration-200 transform hover:scale-110"
          >
            BACK TO HOMEPAGE
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
