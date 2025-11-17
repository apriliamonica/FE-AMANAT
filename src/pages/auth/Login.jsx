import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, FileStack } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement actual login API call
    // Simulasi login untuk development
    setTimeout(() => {
      // Dummy login berhasil
      localStorage.setItem('token', 'dummy-token-12345');
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: 'Rudi Santoso',
          email: formData.username,
          role: 'sekretaris_kantor',
          role_label: 'Administrator',
        })
      );

      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Card Putih */}
        <div className='bg-white rounded-2xl shadow-2xl p-8 sm:p-10'>
          {/* Logo Icon */}
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 bg-primary-700 rounded-full flex items-center justify-center shadow-lg'>
              <FileStack className='w-10 h-10 text-white' />
            </div>
          </div>

          {/* Title */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>AMANAT</h1>
            <p className='text-gray-600 text-sm'>
              Aplikasi Manajemen Surat dan Arsip Terpadu
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Username
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Masukkan username'
                  required
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Masukkan password'
                  required
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-primary-700 text-white py-3 rounded-lg font-medium hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Demo Login Info */}
        </div>
      </div>
    </div>
  );
};

export default Login;

// Lokasi: src/pages/auth/Login.jsx
