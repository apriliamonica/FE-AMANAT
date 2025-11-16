import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />

          {/* Protected Routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='dashboard' element={<Dashboard />} />

            {/* Placeholder routes - akan dibuat nanti */}
            <Route
              path='surat-masuk'
              element={
                <div className='p-6 bg-white rounded-lg'>
                  Halaman Surat Masuk (Coming Soon)
                </div>
              }
            />
            <Route
              path='surat-keluar'
              element={
                <div className='p-6 bg-white rounded-lg'>
                  Halaman Surat Keluar (Coming Soon)
                </div>
              }
            />
            <Route
              path='disposisi'
              element={
                <div className='p-6 bg-white rounded-lg'>
                  Halaman Disposisi (Coming Soon)
                </div>
              }
            />
            <Route
              path='arsip'
              element={
                <div className='p-6 bg-white rounded-lg'>
                  Halaman Arsip (Coming Soon)
                </div>
              }
            />
            <Route
              path='laporan'
              element={
                <div className='p-6 bg-white rounded-lg'>
                  Halaman Laporan (Coming Soon)
                </div>
              }
            />
            <Route
              path='pengaturan'
              element={
                <div className='p-6 bg-white rounded-lg'>
                  Halaman Pengaturan (Coming Soon)
                </div>
              }
            />
          </Route>

          {/* 404 Route */}
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
