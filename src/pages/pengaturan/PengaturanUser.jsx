import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, UserPlus } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const PengaturanUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    username: '',
    password: '',
    role: '',
    bagian: '',
    status: 'aktif',
  });

  // Dummy data users
  const usersData = [
    {
      id: 1,
      nama: 'Rudi Santoso',
      email: 'rudi@amanat.com',
      username: 'admin',
      role: 'Sekretaris Kantor',
      bagian: '-',
      status: 'aktif',
    },
    {
      id: 2,
      nama: 'Dr. Ahmad Fauzi',
      email: 'ahmad.fauzi@amanat.com',
      username: 'ketua',
      role: 'Ketua Pengurus',
      bagian: '-',
      status: 'aktif',
    },
    {
      id: 3,
      nama: 'Siti Nurhaliza',
      email: 'siti@amanat.com',
      username: 'sekretaris',
      role: 'Sekretaris Pengurus',
      bagian: '-',
      status: 'aktif',
    },
    {
      id: 4,
      nama: 'Budi Prasetyo',
      email: 'budi@amanat.com',
      username: 'bendahara',
      role: 'Bendahara Pengurus',
      bagian: '-',
      status: 'aktif',
    },
    {
      id: 5,
      nama: 'Andi Wijaya',
      email: 'andi@amanat.com',
      username: 'kabag_psdm',
      role: 'Kepala Bagian',
      bagian: 'PSDM',
      status: 'aktif',
    },
    {
      id: 6,
      nama: 'Dewi Kartika',
      email: 'dewi@amanat.com',
      username: 'kabag_keuangan',
      role: 'Kepala Bagian',
      bagian: 'Keuangan',
      status: 'aktif',
    },
    {
      id: 7,
      nama: 'Hadi Saputra',
      email: 'hadi@amanat.com',
      username: 'kabag_umum',
      role: 'Kepala Bagian',
      bagian: 'Umum',
      status: 'nonaktif',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement API call
    setShowModal(false);
    // Reset form
    setFormData({
      nama: '',
      email: '',
      username: '',
      password: '',
      role: '',
      bagian: '',
      status: 'aktif',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Page Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Pengaturan Pengguna
        </h1>
        <p className='text-gray-600 mt-1'>Kelola akun pengguna dan hak akses</p>
      </div>

      {/* Search & Actions */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
          {/* Search Bar */}
          <div className='relative flex-1 w-full sm:max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Cari nama, email, atau username...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          {/* Add User Button */}
          <Button
            variant='primary'
            icon={UserPlus}
            onClick={() => setShowModal(true)}
          >
            Tambah Pengguna
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Nama
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Username
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Role
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Bagian
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {usersData.map((user) => (
                <tr
                  key={user.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {user.nama}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {user.email}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {user.username}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {user.role}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {user.bagian}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Badge
                      variant={user.status === 'aktif' ? 'selesai' : 'ditolak'}
                    >
                      {user.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <div className='flex items-center gap-2'>
                      <button
                        className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
                        title='Edit'
                      >
                        <Edit2 className='w-4 h-4 text-gray-600' />
                      </button>
                      <button
                        className='p-1.5 hover:bg-red-50 rounded-lg transition-colors'
                        title='Hapus'
                      >
                        <Trash2 className='w-4 h-4 text-red-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah User */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title='Tambah Pengguna Baru'
        size='lg'
      >
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Nama Lengkap */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Nama Lengkap <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='nama'
              value={formData.nama}
              onChange={handleChange}
              placeholder='Masukkan nama lengkap'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='nama@email.com'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              />
            </div>

            {/* Username */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Username <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='username'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password <span className='text-red-500'>*</span>
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Minimal 8 karakter'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Role */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Role <span className='text-red-500'>*</span>
              </label>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              >
                <option value=''>Pilih role</option>
                <option value='sekretaris_kantor'>Sekretaris Kantor</option>
                <option value='ketua_pengurus'>Ketua Pengurus</option>
                <option value='sekretaris_pengurus'>Sekretaris Pengurus</option>
                <option value='bendahara_pengurus'>Bendahara Pengurus</option>
                <option value='kepala_bagian'>Kepala Bagian</option>
              </select>
            </div>

            {/* Bagian */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Bagian
              </label>
              <select
                name='bagian'
                value={formData.bagian}
                onChange={handleChange}
                disabled={formData.role !== 'kepala_bagian'}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none disabled:bg-gray-100'
              >
                <option value=''>-</option>
                <option value='psdm'>PSDM</option>
                <option value='keuangan'>Keuangan</option>
                <option value='umum'>Umum</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            >
              <option value='aktif'>Aktif</option>
              <option value='nonaktif'>Nonaktif</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-200'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setShowModal(false)}
            >
              Batal
            </Button>
            <Button type='submit' variant='primary'>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PengaturanUser;

// Lokasi: src/pages/pengaturan/PengaturanUser.jsx
