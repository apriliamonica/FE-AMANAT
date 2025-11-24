// src/pages/auth/Login.jsx

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
          bg-white/90                   /* Opacity tinggi agar teks hitam kontras */
          backdrop-blur-lg             
          rounded-2xl                   
          p-10 sm:p-12 
          shadow-xl 
          shadow-black/20              
          border border-white/50        
          text-gray-900                 
          transition-all duration-300
        ">
          
          {/* Logo Icon (W-24 H-24) */}
          <div className="flex justify-center mb-4"> 
            <div className="w-24 h-24 flex items-center justify-center rounded-full p-2 "> 
             <img 
                src="/LogoYPTU.png" 
                alt="Logo AMANAT" 
                className="max-h-full max-w-full object-contain"
             />
            </div>
          </div>

          {/* Title (Blok Warna dan Sub-judul Tetap) */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold mb-1 tracking-wider">
              {/* Blok 1: AMAN (Hijau Sekunder) */}
              <span className="text-secondary-600">AMAN</span>
              {/* Blok 2: AT (Kuning Amber) */}
              <span className="text-amber-500">AT</span>
            </h1> 

            {/* Subtitle: Tetap seperti sebelumnya (A, M, S, T aksen warna primary-700) */}
            <p className="text-base text-gray-600">
              <span className="font-semibold text-primary-700">A</span><span className="text-gray-600">p</span><span className="text-gray-600">l</span><span className="text-gray-600">i</span><span className="text-gray-600">k</span><span className="text-gray-600">a</span><span className="text-gray-600">s</span><span className="text-gray-600">i</span> <span className="font-semibold text-primary-700">M</span><span className="text-gray-600">a</span><span className="text-gray-600">n</span><span className="text-gray-600">a</span><span className="text-gray-600">j</span><span className="text-gray-600">e</span><span className="text-gray-600">m</span><span className="text-gray-600">e</span><span className="text-gray-600">n</span> <span className="font-semibold text-primary-700">S</span><span className="text-gray-600">u</span><span className="text-gray-600">r</span><span className="text-gray-600">a</span><span className="font-semibold text-primary-700">t</span> 
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Username</label> 
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" /> 
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  required
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition duration-300 text-gray-900 placeholder-gray-500" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label> 
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-700 text-white py-3.5 mt-6 rounded-lg font-semibold hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default Login;