import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import SuratMasukList from './pages/surat-masuk/SuratMasukList';
import SuratKeluarList from './pages/surat-keluar/SuratKeluarList';
import DisposisiList from './pages/disposisi/DisposisiList';
import ArsipList from './pages/arsip/ArsipList';
import LaporanPage from './pages/laporan/LaporanPage';
import PengaturanUser from './pages/pengaturan/PengaturanUser';

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
            <Route path='surat-masuk' element={<SuratMasukList />} />
            <Route path='surat-keluar' element={<SuratKeluarList />} />
            <Route path='disposisi' element={<DisposisiList />} />
            <Route path='arsip' element={<ArsipList />} />
            <Route path='laporan' element={<LaporanPage />} />
            <Route path='pengaturan' element={<PengaturanUser />} />
          </Route>

          {/* 404 Route */}
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
      <Toaster position='top-right' />
    </>
  );
}

export default App;
