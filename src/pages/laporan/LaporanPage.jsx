import { useState } from 'react';
import { FileText, Download, TrendingUp, TrendingDown, Mail, Send, BarChart3 } from 'lucide-react';
import Button from '../../components/common/Button';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LaporanPage = () => {
  const [jenisLaporan, setJenisLaporan] = useState('Bulanan');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalAkhir, setTanggalAkhir] = useState('');

  // Dummy data untuk chart
  const trendData = [
    { bulan: 'Jan', suratMasuk: 45, suratKeluar: 38 },
    { bulan: 'Feb', suratMasuk: 42, suratKeluar: 45 },
    { bulan: 'Mar', suratMasuk: 48, suratKeluar: 42 },
    { bulan: 'Apr', suratMasuk: 55, suratKeluar: 48 },
    { bulan: 'Mei', suratMasuk: 58, suratKeluar: 52 },
    { bulan: 'Jun', suratMasuk: 52, suratKeluar: 48 },
    { bulan: 'Jul', suratMasuk: 60, suratKeluar: 55 },
    { bulan: 'Agu', suratMasuk: 55, suratKeluar: 50 },
    { bulan: 'Sep', suratMasuk: 62, suratKeluar: 58 },
    { bulan: 'Okt', suratMasuk: 68, suratKeluar: 60 },
  ];

  const kategoriData = [
    { name: 'Undangan', value: 245, color: '#3b82f6' },
    { name: 'Permohonan', value: 189, color: '#8bc34a' },
    { name: 'Pemberitahuan', value: 156, color: '#ff9800' },
    { name: 'Verifikasi', value: 123, color: '#f44336' },
    { name: 'Audit', value: 98, color: '#9c27b0' },
    { name: 'Lainnya', value: 76, color: '#607d8b' },
  ];

  // Stats
  const stats = [
    {
      id: 1,
      title: 'Total Surat Masuk',
      value: '587',
      change: '+12.5%',
      trend: 'up',
      icon: Mail,
      bgColor: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Total Surat Keluar',
      value: '504',
      change: '+8.3%',
      trend: 'up',
      icon: Send,
      bgColor: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Rata-rata Per Bulan',
      value: '109',
      change: 'surat/bulan',
      icon: BarChart3,
      bgColor: 'bg-orange-500',
    },
    {
      id: 4,
      title: 'Waktu Proses Rata-rata',
      value: '2.3',
      change: 'hari',
      icon: FileText,
      bgColor: 'bg-purple-500',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
        <p className="text-gray-600 mt-1">Lihat rekap dan analisis surat masuk dan keluar</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Laporan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Jenis Laporan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan</label>
            <select
              value={jenisLaporan}
              onChange={(e) => setJenisLaporan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option>Bulanan</option>
              <option>Triwulan</option>
              <option>Semester</option>
              <option>Tahunan</option>
            </select>
          </div>

          {/* Tanggal Mulai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
            <input
              type="date"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Tanggal Akhir */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
            <input
              type="date"
              value={tanggalAkhir}
              onChange={(e) => setTanggalAkhir(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <Button variant="outline" icon={Download} className="flex-1">
              PDF
            </Button>
            <Button variant="primary" icon={Download} className="flex-1">
              Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <div key={stat.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                {stat.trend && (
                  <TrendIcon
                    className={`w-4 h-4 mr-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  />
                )}
                <span
                  className={
                    stat.trend
                      ? stat.trend === 'up'
                        ? 'text-green-600'
                        : 'text-red-600'
                      : 'text-gray-600'
                  }
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Trend Surat Bulanan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tren Surat Bulanan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="suratMasuk" fill="#3b82f6" name="Surat Masuk" />
              <Bar dataKey="suratKeluar" fill="#8bc34a" name="Surat Keluar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribusi Kategori */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Kategori Surat</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={kategoriData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {kategoriData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ringkasan Kategori */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Kategori</h2>
        <div className="space-y-3">
          {kategoriData.map((item, index) => {
            const total = kategoriData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((item.value / total) * 100).toFixed(1);

            return (
              <div key={index} className="flex items-center">
                <div className="flex items-center flex-1">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">{item.value} surat</span>
                  <span className="text-sm text-gray-500 w-12 text-right">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LaporanPage;

// Lokasi: src/pages/laporan/LaporanPage.jsx
