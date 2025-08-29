import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import NotFoundPage from './NotFound';

const RouterErrorBoundary = () => {
  const error = useRouteError();

  // Check if it's a 404 error
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  // For other errors
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-mono font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg font-mono mb-2 text-center">Sorry, an unexpected error has occurred.</p>
      <p className="font-mono text-gray-600 mt-4 p-4 bg-gray-100 rounded">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error instanceof Error
            ? error.message
            : 'Unknown error'}
      </p>
    </div>
  );
};

export default RouterErrorBoundary;
