import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Clock, Archive } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import TrackingModal from "../../components/Features/TrackingModal.jsx";
import {
  SURAT_MASUK_STATUS,
  SURAT_MASUK_STATUS_LABELS,
  SURAT_MASUK_STATUS_COLORS,
  SURAT_KELUAR_STATUS,
  SURAT_KELUAR_STATUS_LABELS,
  SURAT_KELUAR_STATUS_COLORS,
} from '../../utils/constants';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);

  const openTracking = (surat) => {
    setSelectedSurat(surat);
    setShowTrackingModal(true);
  };

  // Render dashboard based on role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'sekretaris_kantor':
        return <DashboardSekretarisKantor openTracking={openTracking} />;
      case 'ketua_pengurus':
        return <DashboardKetuaPengurus openTracking={openTracking} />;
      case 'sekretaris_pengurus':
      case 'bendahara_pengurus':
        return <DashboardSekretarisBendahara openTracking={openTracking} />;
      case 'kepala_bagian':
        return <DashboardKepalaBagian openTracking={openTracking} />;
      default:
        return <DashboardSekretarisKantor openTracking={openTracking} />;
    }
  };

  return (
    <>
      {renderDashboard()}
      
      {/* Tracking Modal */}
      <TrackingModal
        isOpen={showTrackingModal}
        onClose={() => {
          setShowTrackingModal(false);
          setSelectedSurat(null);
        }}
        surat={selectedSurat}
      />
    </>
  );
};

// Dashboard Sekretaris Kantor
const DashboardSekretarisKantor = ({ openTracking }) => {
  const stats = [
    { id: 1, title: 'Surat Masuk Baru', value: '18', icon: Mail, bgColor: 'bg-blue-500', path: '/surat-masuk' },
    { id: 2, title: 'Surat Keluar Draft', value: '12', icon: Send, bgColor: 'bg-green-500', path: '/surat-keluar' },
    { id: 3, title: 'Menunggu Disposisi', value: '8', icon: Clock, bgColor: 'bg-orange-500', path: '/disposisi' },
    { id: 4, title: 'Total Arsip Bulan Ini', value: '156', icon: Archive, bgColor: 'bg-purple-500', path: '/arsip' },
  ];

  const trackingSuratMasuk = [
    {
      id: 1,
      nomorSurat: '001/SM/V/2025',
      date: '001/SM/V/2025',
      status: SURAT_MASUK_STATUS.DISPOSISI_KETUA,
      title: 'Undangan Rapat Koordinasi Pendidikan',
      from: 'Dinas Pendidikan Provinsi',
      posisi: 'Ketua Pengurus Yayasan'
    },
    {
      id: 2,
      nomorSurat: '002/SM/V/2025',
      date: '002/SM/V/2025',
      status: SURAT_MASUK_STATUS.DIPROSES,
      title: 'Permohonan Data Keuangan Triwulan III',
      from: 'Kantor Wilayah Kementerian Agama',
      posisi: 'Bendahara Pengurus'
    },
  ];

  const trackingSuratKeluar = [
    {
      id: 1,
      nomorSurat: '04/SK/V/2025',
      date: '04/SK/V/2025',
      status: SURAT_KELUAR_STATUS.REVIEW_KETUA,
      title: 'Surat Keterangan Aktif Pegawai - Rina Susanti',
      to: 'Bank BRI Cabang Jakarta Pusat',
      posisi: 'Ketua Pengurus Yayasan'
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Sekretaris Kantor</h1>
        <p className="text-gray-600 mt-1">Pusat kendali manajemen surat masuk dan keluar</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.id} to={stat.path} className="block" aria-label={`Buka ${stat.title}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2 font-bold">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tracking Sections */}
      <div className="space-y-6">
        {/* Tracking Surat Masuk */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tracking Surat Masuk Real-time
          </h2>
          <div className="space-y-4">
            {trackingSuratMasuk.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.date}</span>
                      {(() => {
                        const statusKey = item.status;
                        const label = SURAT_MASUK_STATUS_LABELS[statusKey] || statusKey;
                        const color = SURAT_MASUK_STATUS_COLORS[statusKey] || 'bg-yellow-100 text-yellow-800';
                        return (
                          <span className={`px-2 py-1 text-xs font-medium ${color} rounded`}>
                            {label}
                          </span>
                        );
                      })()}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Dari: {item.from}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">RS</span>
                      </div>
                      <p className="text-sm text-gray-600">Posisi Saat Ini: {item.posisi}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openTracking(item)}
                    className="ml-4 px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    Lihat Tracking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Surat Keluar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tracking Surat Keluar Real-time
          </h2>
          <div className="space-y-4">
            {trackingSuratKeluar.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.date}</span>
                      {(() => {
                        const statusKey = item.status;
                        const label = SURAT_KELUAR_STATUS_LABELS[statusKey] || statusKey;
                        const color = SURAT_KELUAR_STATUS_COLORS[statusKey] || 'bg-yellow-100 text-yellow-800';
                        return (
                          <span className={`px-2 py-1 text-xs font-medium ${color} rounded`}>
                            {label}
                          </span>
                        );
                      })()}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Kepada: {item.to}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">RS</span>
                      </div>
                      <p className="text-sm text-gray-600">Posisi Saat Ini: {item.posisi}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openTracking(item)}
                    className="ml-4 px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    Lihat Tracking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Ketua Pengurus
const DashboardKetuaPengurus = ({ openTracking }) => {
  const stats = [
    { id: 1, title: 'Disposisi Masuk', value: '6', icon: Mail, bgColor: 'bg-blue-500', path: '/disposisi' },
    { id: 2, title: 'Disposisi Selesai', value: '24', icon: Archive, bgColor: 'bg-green-500', path: '/arsip' },
    { id: 3, title: 'Menunggu Review', value: '6', icon: Clock, bgColor: 'bg-orange-500', path: '/disposisi' },
    { id: 4, title: 'Total Bulan Ini', value: '30', icon: Send, bgColor: 'bg-purple-500', path: '/arsip' },
  ];

  const menungguTindakan = [
    {
      id: 1,
      nomorSurat: '001/SM/V/2025',
      date: '001/SM/V/2025',
      badges: ['Surat Masuk', 'Urgent'],
      title: 'Undangan Rapat Koordinasi Pendidikan',
      from: 'Dinas Pendidikan Provinsi',
      deadline: '12/10/2025'
    },
    {
      id: 2,
      nomorSurat: '04/SK/V/2025',
      date: '04/SK/V/2025',
      badges: ['Surat Keluar', 'Menunggu'],
      title: 'Surat Keterangan Aktif Pegawai - Rina Susanti',
      to: 'Bank BRI Cabang Jakarta',
      note: 'Untuk ditandatangani'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Ketua Pengurus Yayasan</h1>
        <p className="text-gray-600 mt-1">Menyetujui dan memberikan disposisi surat</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.id} to={stat.path} className="block" aria-label={`Buka ${stat.title}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-bold">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Menunggu Tindakan Anda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Menunggu Tindakan Anda</h2>
        <div className="space-y-4">
          {menungguTindakan.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.date}</span>
                    {item.badges.map((badge, idx) => (
                      <span key={idx} className={`px-2 py-1 text-xs font-medium rounded ${
                        badge === 'Urgent' ? 'bg-red-100 text-red-800' :
                        badge === 'Surat Masuk' ? 'bg-blue-100 text-blue-800' :
                        badge === 'Menunggu' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  {item.from && <p className="text-sm text-gray-600">Dari: {item.from}</p>}
                  {item.to && <p className="text-sm text-gray-600">Kepada: {item.to}</p>}
                  {item.deadline && <p className="text-sm text-gray-600">Diterima: {item.deadline}</p>}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => openTracking(item)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Lihat Tracking
                  </button>
                  <button className="px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors">
                    {item.badges.includes('Surat Keluar') ? 'Review & TTD' : 'Buat Disposisi'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dashboard Sekretaris & Bendahara Pengurus
const DashboardSekretarisBendahara = ({ openTracking }) => {
  const stats = [
    { id: 1, title: 'Disposisi Masuk', value: '5', icon: Mail, bgColor: 'bg-blue-500', path: '/disposisi' },
    { id: 2, title: 'Menunggu Tidak Lanjut', value: '3', icon: Clock, bgColor: 'bg-orange-500', path: '/disposisi' },
    { id: 3, title: 'Selesai Bulan Ini', value: '28', icon: Archive, bgColor: 'bg-green-500', path: '/arsip' },
    { id: 4, title: 'Perlu Review', value: '2', icon: Send, bgColor: 'bg-purple-500', path: '/disposisi' },
  ];

  const disposisiKetua = [
    {
      id: 1,
      date: '003/SM/V/2025',
      badges: ['Disposisi Ketua'],
      title: 'Pengajuan Proposal Kegiatan Workshop',
      from: 'Lembaga Pengabdian Masyarakat',
      instruksi: 'Mohon ditinjau kelayakan proposal dan berikan rekomendasi. Koordinasikan dengan Kepala Bagian PSDM.'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Sekretaris Pengurus Yayasan</h1>
        <p className="text-gray-600 mt-1">Menindaklanjuti disposisi dan memberikan catatan administratif</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.id} to={stat.path} className="block" aria-label={`Buka ${stat.title}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-bold">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Disposisi dari Ketua */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Disposisi dari Ketua Yayasan</h2>
        <div className="space-y-4">
          {disposisiKetua.map((item) => (
            <div key={item.id} className="p-4 border-l-4 border-primary-600 bg-primary-50 rounded-r-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.date}</span>
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
                      {item.badges[0]}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Dari: {item.from}</p>
                  <div className="bg-white p-3 rounded-lg border border-primary-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Instruksi dari Ketua Yayasan:</p>
                    <p className="text-sm text-gray-600">"{item.instruksi}"</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => openTracking(item)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    Tracking
                  </button>
                  <button className="px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors whitespace-nowrap">
                    Tindak Lanjut
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dashboard Kepala Bagian
const DashboardKepalaBagian = ({ openTracking }) => {
  const stats = [
    { id: 1, title: 'Disposisi Masuk', value: '4', icon: Mail, bgColor: 'bg-blue-500', path: '/disposisi' },
    { id: 2, title: 'Lampiran Pending', value: '2', icon: Clock, bgColor: 'bg-orange-500', path: '/surat-masuk' },
    { id: 3, title: 'Selesai Bulan Ini', value: '22', icon: Archive, bgColor: 'bg-green-500', path: '/arsip' },
    { id: 4, title: 'Dalam Proses', value: '2', icon: Send, bgColor: 'bg-purple-500', path: '/surat-keluar' },
  ];

  const disposisiPSDM = [
    {
      id: 1,
      date: '003/SM/V/2025',
      badges: ['Disposisi PSDM', 'Urgent'],
      title: 'Pengajuan Proposal Kegiatan Workshop SDM',
      from: 'Lembaga Pengabdian Masyarakat',
      instruksi: 'Mohon tinjau kelayakan proposal dan cari SDM dan kelayakan yang tersedia"',
      lampiran: ['Data proposal pelatihan.pdf', 'Daftar anggota pelatihan.pdf'],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Kepala Bagian PSDM</h1>
        <p className="text-gray-600 mt-1">Mengelola disposisi terkait Personalia, Sumber Daya Manusia, dan Kesejahteraan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.id} to={stat.path} className="block" aria-label={`Buka ${stat.title}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-bold">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Disposisi PSDM */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Disposisi PSDM untuk Diselesaikan</h2>
        <div className="space-y-4">
          {disposisiPSDM.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.date}</span>
                    {item.badges.map((badge, idx) => (
                      <span key={idx} className={`px-2 py-1 text-xs font-medium rounded ${
                        badge === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Dari: {item.from}</p>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Instruksi dari Sekretaris Pengurus:</p>
                    <p className="text-sm text-gray-600">"{item.instruksi}"</p>
                  </div>
                  {item.lampiran && (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Lampiran yang dibutuhkan:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {item.lampiran.map((lamp, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{lamp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => openTracking(item)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    Tracking
                  </button>
                  <button className="px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors whitespace-nowrap">
                    Upload Hasil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Lokasi: src/pages/dashboard/Dashboard.jsx