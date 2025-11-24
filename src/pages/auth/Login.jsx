import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, FileStack } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, checkAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Check if already authenticated
  useEffect(() => {
    if (checkAuth() || isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, checkAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      username: formData.username,
      password: formData.password,
    });
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // Background Gradien Sesuai Tema Sidebar
    <div className="min-h-screen bg-gradient-to-br from-primary-800 to-secondary-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Card Login Glassmorphism (Teks Gelap) */}
        <div className="
          bg-white/90                   /* Meningkatkan opacity background card agar teks hitam lebih kontras */
          backdrop-blur-lg             
          rounded-2xl                   
          p-10 sm:p-12 
          shadow-xl 
          shadow-black/20              
          border border-white/50        
          text-gray-900                 /* PERUBAHAN UTAMA: Warna teks default diubah menjadi gelap */
          transition-all duration-300
        ">
          
          {/* Logo Icon */}
          <div className="flex justify-center mb-4"> 
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full p-2 shadow-lg"> 
             <img 
                src="/LogoYPTU.png" 
                alt="Logo AMANAT" 
                className="max-h-full max-w-full object-contain"
             />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            {/* Judul utama menggunakan warna gelap untuk kontras */}
            <h1 className="text-5xl font-extrabold mb-1 tracking-wider text-gray-900">AMANAT</h1> 
            <p className="text-gray-600 text-base">Aplikasi Manajemen Surat YPTU</p> {/* Subtitle menggunakan abu-abu gelap */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div>
              {/* Label diubah menjadi abu-abu gelap */}
              <label className="block text-sm font-medium mb-1 text-gray-700">Username</label> 
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Icon dipertahankan abu-abu gelap */}
                  <User className="w-5 h-5 text-gray-500" /> 
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  required
                  // Teks input tetap abu-abu gelap/hitam
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition duration-300 text-gray-900 placeholder-gray-500" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              {/* Label diubah menjadi abu-abu gelap */}
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label> 
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Icon dipertahankan abu-abu gelap */}
                  <Lock className="w-5 h-5 text-gray-500" /> 
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition duration-300 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Submit Button (Tidak ada perubahan karena sudah solid) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-700 text-white py-3.5 mt-6 rounded-lg font-semibold hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Demo Login Info (Disetel untuk Teks Gelap) */}
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
            <p className="text-sm font-medium mb-2 text-gray-800">Demo Login (Mock Mode):</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>• Admin: admin/[password apapun]</p>
              <p>• Ketua: ketua/[password apapun]</p>
              <p>• Sekretaris: sekretaris/[password apapun]</p>
              <p>• Bendahara: bendahara/[password apapun]</p>
              <p>• Kepala Bagian: kabag_psdm / kabag_keuangan / kabag_umum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;