import { useState } from 'react';
import { Search, Eye, Download, Mail, Send, Archive } from 'lucide-react';
import Badge from '../../components/common/Badge';

const ArsipList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jenisFilter, setJenisFilter] = useState('Semua Jenis');
  const [kategoriFilter, setKategoriFilter] = useState('Semua Kategori');

  // Dummy data arsip
  const arsipData = [
    {
      id: 1,
      nomorSurat: '001/SM/V/2025',
      jenis: 'Surat Masuk',
      judul: 'Undangan Rapat Koordinasi Pendidikan',
      dari: 'Dinas Pendidikan Provinsi',
      tanggalSurat: '10/10/2025',
      tanggalArsip: '11/10/2025',
      kategori: 'Undangan',
    },
    {
      id: 2,
      nomorSurat: '001/SK/V/2025',
      jenis: 'Surat Keluar',
      judul: 'Undangan Workshop Digitalisasi',
      dari: 'PT Telkom Indonesia',
      tanggalSurat: '12/10/2025',
      tanggalArsip: '12/10/2025',
      kategori: 'Undangan',
    },
    {
      id: 3,
      nomorSurat: '002/SM/V/2025',
      jenis: 'Surat Masuk',
      judul: 'Audit Internal Semester I',
      dari: 'Inspektorat Daerah',
      tanggalSurat: '6/10/2025',
      tanggalArsip: '10/10/2025',
      kategori: 'Audit',
    },
    {
      id: 4,
      nomorSurat: '003/SM/V/2025',
      jenis: 'Surat Masuk',
      judul: 'Permohonan Bantuan Peralatan Media',
      dari: 'Dinas Kesehatan',
      tanggalSurat: '10/10/2025',
      tanggalArsip: '10/10/2025',
      kategori: 'Permohonan',
    },
    {
      id: 5,
      nomorSurat: '004/SM/V/2025',
      jenis: 'Surat Masuk',
      judul: 'Sosialisasi Pengisian Burung dan Jasa',
      dari: 'LKPP',
      tanggalSurat: '7/10/2025',
      tanggalArsip: '9/10/2025',
      kategori: 'Undangan',
    },
  ];

  // Stats
  const stats = [
    {
      id: 1,
      title: 'Total Arsip',
      value: '5',
      icon: Archive,
      bgColor: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Surat Masuk',
      value: '3',
      icon: Mail,
      bgColor: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Surat Keluar',
      value: '2',
      icon: Send,
      bgColor: 'bg-purple-500',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Arsip Surat</h1>
        <p className='text-gray-600 mt-1'>
          Kelola dan cari arsip surat yang telah selesai
        </p>
      </div>

      {/* Search & Filter */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Search Bar */}
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Cari nomor surat, judul, atau asal...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          {/* Filters */}
          <div className='flex gap-2'>
            <select
              value={jenisFilter}
              onChange={(e) => setJenisFilter(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            >
              <option>Semua Jenis</option>
              <option>Surat Masuk</option>
              <option>Surat Keluar</option>
            </select>

            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            >
              <option>Semua Kategori</option>
              <option>Undangan</option>
              <option>Permohonan</option>
              <option>Audit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <p className='text-sm text-gray-600 mb-2'>{stat.title}</p>
                  <p className='text-3xl font-bold text-gray-900'>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className='w-6 h-6 text-white' />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Nomor Surat
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Jenis
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Judul/Perihal
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Dari/Kepada
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Tanggal Surat
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Tanggal Arsip
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Kategori
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {arsipData.map((arsip) => (
                <tr
                  key={arsip.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {arsip.nomorSurat}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Badge
                      variant={
                        arsip.jenis === 'Surat Masuk' ? 'baru' : 'selesai'
                      }
                    >
                      {arsip.jenis}
                    </Badge>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    {arsip.judul}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    {arsip.dari}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {arsip.tanggalSurat}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {arsip.tanggalArsip}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {arsip.kategori}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <div className='flex items-center gap-2'>
                      <button
                        className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
                        title='Lihat'
                      >
                        <Eye className='w-4 h-4 text-gray-600' />
                      </button>
                      <button
                        className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
                        title='Download'
                      >
                        <Download className='w-4 h-4 text-gray-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArsipList;

// Lokasi: src/pages/arsip/ArsipList.jsx
