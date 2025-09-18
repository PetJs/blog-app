// Routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layouts/layout';
import Dashboard from './pages/Dashboard';
import MyPost from './pages/MyPosts';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RouterErrorBoundary from './components/errors/RouteErrorBoundary';
import NotFoundPage from './components/errors/NotFoundPage';
import ProtectedRoute from './utils/ProtectedRoute';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // General layout
    errorElement: <RouterErrorBoundary />,
    children: [
      { 
        index: true, 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ) 
      },
      {
        path: 'myposts',
        element: (
          <ProtectedRoute>
            <MyPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-post",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:id",
        element: <PostDetail/>
      }
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },

  // Catch-all 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


export default router;
