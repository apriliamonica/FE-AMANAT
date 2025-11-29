import { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal/Modal';
import Badge from '../../components/common/Badge/Badge';
import useDisposisiStore from '../../store/disposisiStore';
import TrackingModal from '../../components/Features/TrackingModal.jsx';
import toast from 'react-hot-toast';
import { SURAT_MASUK_STATUS, SURAT_MASUK_STATUS_LABELS } from '../../utils/constants';

const DisposisiList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedDisposisi, setSelectedDisposisi] = useState(null);
  const [catatan, setCatatan] = useState('');

  const { disposisiList, isLoading, fetchDisposisi, updateDisposisiStatus } = useDisposisiStore();

  useEffect(() => {
    fetchDisposisi();
  }, [fetchDisposisi]);

  const openUpdate = (disposisi) => {
    setSelectedDisposisi(disposisi);
    setCatatan('');
    setShowUpdateModal(true);
  };

  const openTracking = (disposisi) => {
    setSelectedDisposisi(disposisi);
    setShowTrackingModal(true);
  };

  const handleUpdateStatus = async (status) => {
    if (selectedDisposisi) {
      const result = await updateDisposisiStatus(selectedDisposisi.id, status, catatan);

      if (result.success) {
        setShowUpdateModal(false);
        setSelectedDisposisi(null);
        setCatatan('');
        fetchDisposisi();
      }
    }
  };

  // Dummy data disposisi
  const disposisiData =
    disposisiList.length > 0
      ? disposisiList
      : [
          {
            id: 1,
            nomorSurat: '001/SM/V/2025',
            dari: 'Admin',
            kepada: 'Ketua Yayasan',
            perihal: 'Undangan Rapat Koordinasi Pendidikan',
            tenggatWaktu: '16/10/2025',
            status: SURAT_MASUK_STATUS.SELESAI,
            aksi: 'Lanjut',
          },
          {
            id: 2,
            nomorSurat: '002/SM/V/2025',
            dari: 'Admin',
            kepada: 'Bendahara',
            perihal: 'Pemberian/huan Pencairan Dana Bantuan',
            tenggatWaktu: '20/10/2025',
            status: SURAT_MASUK_STATUS.DISPOSISI_KETUA,
            aksi: 'Lanjut',
          },
          {
            id: 3,
            nomorSurat: '003/SM/V/2025',
            dari: 'Admin',
            kepada: 'Sekretaris Yayasan',
            perihal: 'Verifikasi Data Kepegawaian',
            tenggatWaktu: '18/10/2025',
            status: SURAT_MASUK_STATUS.DIPROSES,
            aksi: 'Lanjut',
          },
        ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Disposisi Surat</h1>
        <p className="text-gray-600 mt-1">Pantau dan kelola disposisi surat</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor surat, perihal, atau penerima..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Button */}
          <Button variant="outline" icon={Filter}>
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nomor Surat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dari
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kepada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perihal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenggat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {disposisiData.map((disposisi) => (
                <tr key={disposisi.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {disposisi.nomorSurat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {disposisi.dari}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {disposisi.kepada}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{disposisi.perihal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {disposisi.tenggatWaktu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={disposisi.status}>
                      {SURAT_MASUK_STATUS_LABELS[disposisi.status] || 'Status'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openTracking(disposisi)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => openUpdate(disposisi)}
                        className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded transition-colors"
                      >
                        {disposisi.aksi}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Update Disposisi Modal */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedDisposisi(null);
          setCatatan('');
        }}
        title="Perbarui Status Disposisi"
        size="md"
      >
        {selectedDisposisi && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Nomor Surat: <span className="font-medium">{selectedDisposisi.nomorSurat}</span>
            </p>
            <label className="block text-sm font-medium text-gray-700">Catatan</label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedDisposisi(null);
                  setCatatan('');
                }}
              >
                Batal
              </Button>
              <Button
                variant="primary"
                onClick={() => handleUpdateStatus(SURAT_MASUK_STATUS.SELESAI)}
              >
                Selesai
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Tracking Modal */}
      <TrackingModal
        isOpen={showTrackingModal}
        onClose={() => {
          setShowTrackingModal(false);
          setSelectedDisposisi(null);
        }}
        surat={selectedDisposisi}
      />
    </div>
  );
};

export default DisposisiList;

// Lokasi: src/pages/disposisi/DisposisiList.jsx
