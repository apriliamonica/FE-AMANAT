import { Mail, Send, Clock, Archive } from 'lucide-react';

const Dashboard = () => {
  // Dummy data statistik
  const stats = [
    {
      id: 1,
      title: 'Surat Masuk Baru',
      value: '18',
      icon: Mail,
      bgColor: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Surat Keluar Draft',
      value: '12',
      icon: Send,
      bgColor: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Menunggu Disposisi',
      value: '8',
      icon: Clock,
      bgColor: 'bg-orange-500',
    },
    {
      id: 4,
      title: 'Total Arsip Bulan Ini',
      value: '156',
      icon: Archive,
      bgColor: 'bg-purple-500',
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
            <div
              key={stat.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tracking Section */}
      <div className="space-y-6">
        {/* Tracking Surat Masuk */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tracking Surat Masuk Real-time
          </h2>
          <div className="space-y-4">
            {[
              {
                date: '001/SM/V/2025',
                status: 'Menunggu Disposisi Ketua',
                title: 'Undangan Rapat Koordinasi Pendidikan',
                from: 'Dinas Pendidikan Provinsi',
                recipient: 'Ketua Pengurus Yayasan',
              },
              {
                date: '002/SM/V/2025',
                status: 'Dalam Proses',
                title: 'Permohonan Data Keuangan Triwulan III',
                from: 'Kantor Wilayah Kementerian Agama',
                recipient: 'Bendahara Pengurus',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.date}</span>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">Dari: {item.from}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">RS</span>
                    </div>
                    <p className="text-sm text-gray-600">Posisi Saat Ini: {item.recipient}</p>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors">
                  Lihat Tracking
                </button>
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
            {[
              {
                date: '04/SK/V/2025',
                status: 'Menunggu TTD Ketua',
                title: 'Surat Keterangan Aktif Pegawai - Rina Susanti',
                to: 'Bank BRI Cabang Jakarta Pusat',
                recipient: 'Ketua Pengurus Yayasan',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.date}</span>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">Kepada: {item.to}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">RS</span>
                    </div>
                    <p className="text-sm text-gray-600">Posisi Saat Ini: {item.recipient}</p>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-800 transition-colors">
                  Lihat Tracking
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Lokasi: src/pages/dashboard/Dashboard.jsx
