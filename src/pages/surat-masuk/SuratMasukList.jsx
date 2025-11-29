import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit2, Trash2, X } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal/Modal';
import Badge from '../../components/common/Badge/Badge';
import useSuratStore from '../../store/suratStore';
import { formatDate } from '../../utils/helpers';
import useAuthStore from '../../store/authStore';
import {
  PRIORITAS_LABELS,
  JENIS_SURAT_LABELS,
  SURAT_MASUK_STATUS_LABELS,
} from '../../utils/constants';

const SuratMasukList = () => {
  const {
    suratMasuk,
    isLoading,
    fetchSuratMasuk,
    createSuratMasuk,
    updateSuratMasuk,
    deleteSuratMasuk,
    searchSuratMasuk,
  } = useSuratStore();

  const { user } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [formData, setFormData] = useState({
    nomorSurat: '',
    tanggalTerima: '',
    asalSurat: '',
    perihal: '',
    kategori: '',
    prioritas: '',
    file: null,
  });

  // Fetch data on mount
  useEffect(() => {
    fetchSuratMasuk();
  }, [fetchSuratMasuk]);

  // Filter data based on search
  let filteredData = searchQuery ? searchSuratMasuk(searchQuery) : suratMasuk;

  // Role-based filter: Bendahara hanya melihat kategori 'keuangan'
  if (
    user &&
    (user.role === 'bendahara_pengurus' || user.role?.toLowerCase().includes('bendahara'))
  ) {
    filteredData = (filteredData || []).filter((s) => {
      const kategori = (s.kategori || '').toString().toLowerCase();
      return kategori === 'keuangan' || kategori.includes('keuangan');
    });
  }

  const resetForm = () => {
    setFormData({
      nomorSurat: '',
      tanggalTerima: '',
      asalSurat: '',
      perihal: '',
      kategori: '',
      prioritas: '',
      file: null,
    });
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (surat) => {
    setFormData({
      nomorSurat: surat.nomorSurat || '',
      tanggalTerima: surat.tanggalTerima || surat.tanggal || '',
      asalSurat: surat.asalSurat || '',
      perihal: surat.perihal || '',
      kategori: surat.kategori || '',
      prioritas: surat.prioritas || '',
      file: null,
    });
    setEditingId(surat.id);
    setShowModal(true);
  };

  const handleOpenView = (surat) => {
    setSelectedSurat(surat);
    setShowViewModal(true);
  };

  const handleOpenDelete = (surat) => {
    setSelectedSurat(surat);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tanggalTerima: formData.tanggalTerima,
    };

    let result;
    if (editingId) {
      result = await updateSuratMasuk(editingId, submitData);
    } else {
      result = await createSuratMasuk(submitData);
    }

    if (result.success) {
      setShowModal(false);
      resetForm();
      fetchSuratMasuk(); // Refresh data
    }
  };

  const handleDelete = async () => {
    if (selectedSurat) {
      const result = await deleteSuratMasuk(selectedSurat.id);
      if (result.success) {
        setShowDeleteModal(false);
        setSelectedSurat(null);
        fetchSuratMasuk(); // Refresh data
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" icon={Filter} className="flex-1 sm:flex-none">
              Filter
            </Button>
            <Button
              variant="primary"
              icon={Plus}
              onClick={handleOpenAdd}
              className="flex-1 sm:flex-none"
            >
              Tambah Surat Masuk
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Tidak ada data surat masuk</div>
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
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perihal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioritas
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
                {filteredData.map((surat) => (
                  <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {surat.nomorSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {surat.asalSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(surat.tanggal || surat.tanggalTerima, 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{surat.perihal}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={surat.prioritas}>
                        {PRIORITAS_LABELS[surat.prioritas] || surat.prioritas}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={surat.status}>
                        {SURAT_MASUK_STATUS_LABELS[surat.status] || surat.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenView(surat)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(surat)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
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

      {/* Modal Tambah/Edit Surat Masuk */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? 'Edit Surat Masuk' : 'Tambah Surat Masuk Baru'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            {editingId
              ? 'Edit data surat masuk di bawah'
              : 'Isi formulir di bawah untuk menambahkan surat masuk baru'}
          </p>

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
                onChange={handleChange}
                placeholder="B/013M/V/2025"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Tanggal Terima */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Terima <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggalTerima"
                value={formData.tanggalTerima}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
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
              onChange={handleChange}
              placeholder="Nama instansi/lembaga"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Perihal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perihal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="perihal"
              value={formData.perihal}
              onChange={handleChange}
              placeholder="Perihal surat"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="">Pilih kategori</option>
                <option value="undangan">Undangan</option>
                <option value="permohonan">Permohonan</option>
                <option value="pemberitahuan">Pemberitahuan</option>
                <option value="laporan">Laporan</option>
                <option value="surat_tugas">Surat Tugas</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            {/* Prioritas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioritas <span className="text-red-500">*</span>
              </label>
              <select
                name="prioritas"
                value={formData.prioritas}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="">Pilih prioritas</option>
                <option value="rendah">Rendah</option>
                <option value="sedang">Sedang</option>
                <option value="tinggi">Tinggi</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unggah File (PDF, maksimal 10 MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
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
              {isLoading ? 'Menyimpan...' : editingId ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal View Surat Masuk */}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
                <p className="text-sm text-gray-900">{selectedSurat.nomorSurat}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Terima
                </label>
                <p className="text-sm text-gray-900">
                  {formatDate(selectedSurat.tanggal || selectedSurat.tanggalTerima)}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Asal Surat</label>
                <p className="text-sm text-gray-900">{selectedSurat.asalSurat}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Perihal</label>
                <p className="text-sm text-gray-900">{selectedSurat.perihal}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <p className="text-sm text-gray-900">
                  {JENIS_SURAT_LABELS[selectedSurat.kategori] || selectedSurat.kategori}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioritas</label>
                <Badge variant={selectedSurat.prioritas}>
                  {PRIORITAS_LABELS[selectedSurat.prioritas] || selectedSurat.prioritas}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Badge variant={selectedSurat.status}>
                  {SURAT_STATUS_LABELS[selectedSurat.status] || selectedSurat.status}
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
