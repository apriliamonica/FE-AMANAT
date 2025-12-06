import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Send, Trash2, DownloadCloud } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal/Modal';
import Badge from '../../components/common/Badge/Badge';
import useSuratStore from '../../store/suratStore';
import { formatDate } from '../../utils/helpers';
import useAuthStore from '../../store/authStore';
import {
  SURAT_MASUK_STATUS,
  SURAT_MASUK_STATUS_LABEL,
  KATEGORI_SURAT,
  KATEGORI_SURAT_LABEL,
  STATUS_COLOR,
} from '../../utils/constants';
import { suratService } from '../../services/suratService';
import toast from 'react-hot-toast';

const SuratMasukList = () => {
  const {
    suratMasukList,
    suratMasukTotal,
    suratMasukPage,
    suratMasukLimit,
    isLoading,
    fetchSuratMasuk,
    createSuratMasuk,
    updateSuratMasukStatus,
    deleteSuratMasuk,
  } = useSuratStore();

  const { user } = useAuthStore();

  // ==================== STATE ====================
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterKategori, setFilterKategori] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisposisiModal, setShowDisposisiModal] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    nomorSurat: '',
    tanggalSurat: '',
    tanggalDiterima: new Date().toISOString().split('T')[0],
    asalSurat: '',
    perihal: '',
    kategori: '',
    namaPengirim: '',
  });

  // Disposisi data
  const [disposisiData, setDisposisiData] = useState({
    toUserId: '',
    instruksi: '',
    jenisDispo: 'TRANSFER',
    tenggatWaktu: '',
  });

  // ==================== LIFECYCLE ====================
  useEffect(() => {
    fetchData();
  }, [currentPage, filterStatus, filterKategori]);

  // ==================== FUNCTIONS ====================

  const fetchData = async () => {
    const filters = {};
    if (filterStatus) filters.status = filterStatus;
    if (filterKategori) filters.kategori = filterKategori;
    if (searchQuery) filters.search = searchQuery;

    await fetchSuratMasuk(currentPage, suratMasukLimit, filters);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const resetForm = () => {
    setFormData({
      nomorSurat: '',
      tanggalSurat: '',
      tanggalDiterima: new Date().toISOString().split('T')[0],
      asalSurat: '',
      perihal: '',
      kategori: '',
      namaPengirim: '',
    });
  };

  const resetDisposisiForm = () => {
    setDisposisiData({
      toUserId: '',
      instruksi: '',
      jenisDispo: 'TRANSFER',
      tenggatWaktu: '',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenView = async (surat) => {
    // Fetch detail surat untuk lampiran, tracking, dll
    setShowViewModal(true);
    setSelectedSurat(surat);
  };

  const handleOpenDelete = (surat) => {
    setSelectedSurat(surat);
    setShowDeleteModal(true);
  };

  const handleOpenDisposisi = (surat) => {
    setSelectedSurat(surat);
    resetDisposisiForm();
    setShowDisposisiModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisposisiChange = (e) => {
    const { name, value } = e.target;
    setDisposisiData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formData.nomorSurat || !formData.asalSurat || !formData.perihal || !formData.kategori) {
      toast.error('Semua field wajib diisi');
      return;
    }

    const submitData = {
      nomorSurat: formData.nomorSurat,
      tanggalSurat: new Date(formData.tanggalSurat).toISOString(),
      tanggalDiterima: new Date(formData.tanggalDiterima).toISOString(),
      asalSurat: formData.asalSurat,
      perihal: formData.perihal,
      kategori: formData.kategori,
      namaPengirim: formData.namaPengirim || '',
    };

    const result = await createSuratMasuk(submitData);

    if (result.success) {
      setShowModal(false);
      resetForm();
      setCurrentPage(1);
      await fetchData();
    }
  };

  const handleSubmitDisposisi = async (e) => {
    e.preventDefault();

    if (!disposisiData.toUserId || !disposisiData.instruksi) {
      toast.error('Kepada dan Instruksi wajib diisi');
      return;
    }

    try {
      const payload = {
        suratMasukId: selectedSurat.id,
        toUserId: disposisiData.toUserId,
        instruksi: disposisiData.instruksi,
        jenisDispo: disposisiData.jenisDispo,
        tahapProses: 'DISPOSISI_KETUA',
        tenggatWaktu: disposisiData.tenggatWaktu
          ? new Date(disposisiData.tenggatWaktu).toISOString()
          : null,
      };

      const response = await suratService.createDisposisi(payload);

      if (response?.success || response?.data) {
        toast.success('Disposisi berhasil dibuat');
        setShowDisposisiModal(false);
        resetDisposisiForm();
        await fetchData();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Gagal membuat disposisi';
      toast.error(errorMsg);
    }
  };

  const handleDelete = async () => {
    const result = await deleteSuratMasuk(selectedSurat.id);
    if (result.success) {
      setShowDeleteModal(false);
      setSelectedSurat(null);
      setCurrentPage(1);
      await fetchData();
    }
  };

  const handleStatusChange = async (suratId, newStatus) => {
    const result = await updateSuratMasukStatus(suratId, newStatus);
    if (result.success) {
      await fetchData();
    }
  };

  // ==================== RENDER ====================

  const totalPages = Math.ceil(suratMasukTotal / suratMasukLimit);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Surat Masuk</h1>
        <p className="text-gray-600 mt-1">Kelola dan pantau surat masuk</p>
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor surat, asal, atau perihal..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Status */}
          <div className="w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
            >
              <option value="">Semua Status</option>
              {Object.entries(SURAT_MASUK_STATUS).map(([key, value]) => (
                <option key={key} value={value}>
                  {SURAT_MASUK_STATUS_LABEL[value]}
                </option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <Button
            variant="primary"
            icon={Plus}
            onClick={handleOpenAdd}
            className="w-full sm:w-auto"
          >
            Tambah Surat Masuk
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"></div>
            </div>
            <p className="mt-2">Memuat data...</p>
          </div>
        ) : suratMasukList.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Tidak ada data surat masuk</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nomor Surat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asal Surat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Diterima
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perihal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
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
                {suratMasukList.map((surat) => (
                  <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {surat.nomorSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {surat.asalSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(surat.tanggalDiterima)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {surat.perihal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {KATEGORI_SURAT_LABEL[surat.kategori] || surat.kategori}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={STATUS_COLOR[surat.status]}>
                        {SURAT_MASUK_STATUS_LABEL[surat.status]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenView(surat)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleOpenDisposisi(surat)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Buat Disposisi"
                        >
                          <Send className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(surat)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Hal {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* ==================== MODALS ==================== */}

      {/* Modal Tambah Surat Masuk */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title="Tambah Surat Masuk Baru"
        size="lg"
      >
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nomor Surat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Surat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nomorSurat"
                value={formData.nomorSurat}
                onChange={handleFormChange}
                placeholder="001/PSDM/2024"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Tanggal Surat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Surat <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggalSurat"
                value={formData.tanggalSurat}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Tanggal Diterima */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Diterima <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalDiterima"
              value={formData.tanggalDiterima}
              onChange={handleFormChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Asal Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asal Surat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="asalSurat"
              value={formData.asalSurat}
              onChange={handleFormChange}
              placeholder="Nama instansi/lembaga"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Nama Pengirim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pengirim</label>
            <input
              type="text"
              name="namaPengirim"
              value={formData.namaPengirim}
              onChange={handleFormChange}
              placeholder="Nama pengirim surat"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Perihal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perihal <span className="text-red-500">*</span>
            </label>
            <textarea
              name="perihal"
              value={formData.perihal}
              onChange={handleFormChange}
              placeholder="Perihal surat"
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleFormChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Pilih kategori</option>
              {Object.entries(KATEGORI_SURAT).map(([key, value]) => (
                <option key={key} value={value}>
                  {KATEGORI_SURAT_LABEL[value]}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Buat Disposisi */}
      <Modal
        isOpen={showDisposisiModal}
        onClose={() => {
          setShowDisposisiModal(false);
          resetDisposisiForm();
        }}
        title="Buat Lembar Disposisi"
        size="lg"
      >
        <form onSubmit={handleSubmitDisposisi} className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Nomor Surat:</strong> {selectedSurat?.nomorSurat}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Perihal:</strong> {selectedSurat?.perihal}
            </p>
          </div>

          {/* Kepada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kepada <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="toUserId"
              value={disposisiData.toUserId}
              onChange={handleDisposisiChange}
              placeholder="Nama atau User ID penerima"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Jenis Disposisi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Disposisi</label>
            <select
              name="jenisDispo"
              value={disposisiData.jenisDispo}
              onChange={handleDisposisiChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="TRANSFER">Transfer</option>
              <option value="REQUEST_LAMPIRAN">Request Lampiran</option>
              <option value="APPROVAL">Approval</option>
              <option value="REVISI">Revisi</option>
            </select>
          </div>

          {/* Instruksi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instruksi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="instruksi"
              value={disposisiData.instruksi}
              onChange={handleDisposisiChange}
              placeholder="Tuliskan instruksi atau catatan disposisi"
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Tenggat Waktu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenggat Waktu</label>
            <input
              type="date"
              name="tenggatWaktu"
              value={disposisiData.tenggatWaktu}
              onChange={handleDisposisiChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowDisposisiModal(false);
                resetDisposisiForm();
              }}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Mengirim...' : 'Kirim Disposisi'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal View Detail */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedSurat(null);
        }}
        title="Detail Surat Masuk"
        size="lg"
      >
        {selectedSurat && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nomor Surat
                </label>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {selectedSurat.nomorSurat}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Diterima
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {formatDate(selectedSurat.tanggalDiterima)}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asal Surat
                </label>
                <p className="text-sm text-gray-900 mt-1">{selectedSurat.asalSurat}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perihal
                </label>
                <p className="text-sm text-gray-900 mt-1">{selectedSurat.perihal}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {KATEGORI_SURAT_LABEL[selectedSurat.kategori]}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </label>
                <Badge className={`${STATUS_COLOR[selectedSurat.status]} mt-1`}>
                  {SURAT_MASUK_STATUS_LABEL[selectedSurat.status]}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSurat(null);
        }}
        title="Konfirmasi Hapus"
        size="md"
      >
        {selectedSurat && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Apakah Anda yakin ingin menghapus surat masuk{' '}
              <span className="font-semibold">{selectedSurat.nomorSurat}</span>?
            </p>
            <p className="text-xs text-gray-500">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSurat(null);
                }}
              >
                Batal
              </Button>
              <Button type="button" variant="danger" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Menghapus...' : 'Hapus'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SuratMasukList;
