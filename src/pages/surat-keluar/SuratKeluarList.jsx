import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Send, Trash2 } from 'lucide-react';
import { SURAT_KELUAR_STATUS, SURAT_KELUAR_STATUS_LABELS } from '../../utils/constants';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal/Modal';
import Badge from '../../components/common/Badge/Badge';
import useSuratStore from '../../store/suratStore';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/helpers';

const SuratKeluarList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDisposisiModal, setShowDisposisiModal] = useState(false);
  const [selectedSuratId, setSelectedSuratId] = useState(null);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formData, setFormData] = useState({
    nomorSurat: '',
    tanggalSurat: '',
    tujuanSurat: '',
    perihal: '',
    isiSurat: '',
    kategori: '',
    fileSurat: null,
    lampiran: null,
  });
  const [disposisiData, setDisposisiData] = useState({
    kepada: '',
    instruksi: '',
    tenggat: '',
    catatan: '',
    file: null,
  });

  const {
    suratKeluarList: suratKeluar,
    isLoading,
    fetchSuratKeluar,
    createSuratKeluar,
    sendSuratKeluar,
    deleteSuratKeluar,
    searchSuratKeluar,
  } = useSuratStore();

  const { user } = useAuthStore();

  useEffect(() => {
    fetchSuratKeluar();
  }, [fetchSuratKeluar]);

  // Filter data based on search
  let filteredData = searchQuery ? searchSuratKeluar(searchQuery) : suratKeluar;

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

  const suratKeluarData = filteredData || [
    {
      id: 1,
      nomorSurat: '001/SK/V/2025',
      tujuan: 'Dinas Kesehatan',
      tanggal: '10/10/2025',
      perihal: 'Permohonan Data Kesehatan',
      kategori: 'Permohonan',
      status: SURAT_KELUAR_STATUS.TERKIRIM,
    },
    {
      id: 2,
      nomorSurat: '002/SK/V/2025',
      tujuan: 'Bank BRI Cabang Jakarta',
      tanggal: '11/10/2025',
      perihal: 'Surat Keterangan Aktif Pegawai',
      kategori: 'Keterangan',
      status: SURAT_KELUAR_STATUS.REVIEW_SEKRETARIS_PENGURUS,
    },
    {
      id: 3,
      nomorSurat: '003/SK/V/2025',
      tujuan: 'Universitas Indonesia',
      tanggal: '9/10/2025',
      perihal: 'Proposal Kerja Sama Pendidikan',
      kategori: 'Proposal',
      status: SURAT_KELUAR_STATUS.DRAFT,
    },
    {
      id: 4,
      nomorSurat: '004/SK/V/2025',
      tujuan: 'PT Telkom Indonesia',
      tanggal: '12/10/2025',
      perihal: 'Undangan Seminar Nasional',
      kategori: 'Undangan',
      status: SURAT_KELUAR_STATUS.TERKIRIM,
    },
  ];

  const resetDisposisiForm = () => {
    setDisposisiData({
      kepada: '',
      instruksi: '',
      tenggat: '',
      catatan: '',
      file: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createSuratKeluar(formData);
      if (result && result.success) {
        toast.success('Surat keluar tersimpan');
        setShowModal(false);
        // Reset form
        setFormData({
          nomorSurat: '',
          tanggalSurat: '',
          tujuanSurat: '',
          perihal: '',
          isiSurat: '',
          kategori: '',
          fileSurat: null,
          lampiran: null,
        });
        fetchSuratKeluar();
      }
    } catch (err) {
      toast.error('Gagal menyimpan surat keluar');
    }
  };

  const handleOpenView = (surat) => {
    setSelectedSurat(surat);
    setShowViewModal(true);
  };

  const handleOpenDisposisi = (surat) => {
    setSelectedSurat(surat);
    resetDisposisiForm();
    setShowDisposisiModal(true);
  };

  const handleDisposisiSubmit = async (e) => {
    e.preventDefault();

    // Data disposisi siap dikirim ke backend
    const disposisiPayload = {
      suratId: selectedSurat.id,
      nomorSurat: selectedSurat.nomorSurat,
      kepada: disposisiData.kepada,
      instruksi: disposisiData.instruksi,
      tenggat: disposisiData.tenggat,
      catatan: disposisiData.catatan,
      file: disposisiData.file,
      tanggalDisposisi: new Date().toISOString(),
      jenisSurat: 'keluar',
    };

    console.log('Disposisi Data:', disposisiPayload);

    // Simulasi sukses - ganti dengan API call yang sebenarnya
    // const result = await createDisposisi(disposisiPayload);
    // if (result.success) {
    toast.success('Disposisi berhasil dikirim!');
    setShowDisposisiModal(false);
    resetDisposisiForm();
    fetchSuratKeluar();
    // }
  };

  const handleSend = async (id) => {
    try {
      const res = await sendSuratKeluar(id);
      if (res && res.success) {
        toast.success('Surat berhasil dikirim');
        fetchSuratKeluar();
      }
    } catch (err) {
      toast.error('Gagal mengirim surat');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
  };

  const handleDisposisiChange = (e) => {
    const { name, value } = e.target;
    setDisposisiData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisposisiFileChange = (e) => {
    setDisposisiData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Surat Keluar</h1>
        <p className="text-gray-600 mt-1">Kelola dan pantau surat keluar</p>
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor surat, tujuan, atau perihal..."
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
              onClick={() => setShowModal(true)}
              className="flex-1 sm:flex-none"
            >
              Buat Surat Keluar
            </Button>
          </div>
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
                  Tujuan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
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
              {suratKeluarData.map((surat) => (
                <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {surat.nomorSurat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {surat.tujuanSurat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(surat.tanggalSurat)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{surat.perihal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {surat.kategori}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={surat.status}>
                      {SURAT_KELUAR_STATUS_LABELS[surat.status] || surat.status}
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
                        onClick={() => handleOpenDisposisi(surat)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Buat Disposisi"
                      >
                        <Send className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSuratId(surat.id);
                          setShowConfirmModal(true);
                        }}
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
      </div>

      {/* Modal Buat Surat Keluar */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Buat Surat Keluar Baru"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Isi formulir di bawah untuk membuat surat keluar baru
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
                placeholder="001/SK/V/2025"
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
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Tujuan Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tujuan Surat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tujuanSurat"
              value={formData.tujuanSurat}
              onChange={handleChange}
              placeholder="Nama instansi/lembaga/perorangan"
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

          {/* Isi Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Isi Surat <span className="text-red-500">*</span>
            </label>
            <textarea
              name="isiSurat"
              value={formData.isiSurat}
              onChange={handleChange}
              placeholder="Tuliskan isi surat di sini..."
              rows="4"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tulis secara lengkap surat Anda di kolom ini
            </p>
          </div>

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
              <option value="keterangan">Keterangan</option>
              <option value="proposal">Proposal</option>
            </select>
          </div>

          {/* Upload File Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unggah File Surat (PDF)
            </label>
            <input
              type="file"
              name="fileSurat"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>

          {/* Lampiran Tambahan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lampiran Tambahan
            </label>
            <input
              type="file"
              name="lampiran"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Surat akan disimpan sebagai draft dan memerlukan tanda tangan digital dari pimpinan
              sebelum dikirim.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Draft
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Buat Lembar Disposisi */}
      <Modal
        isOpen={showDisposisiModal}
        onClose={() => {
          setShowDisposisiModal(false);
          resetDisposisiForm();
        }}
        title="Buat Lembar Disposisi"
        size="lg"
      >
        <form onSubmit={handleDisposisiSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Disposisikan surat kepada pejabat yang berwenang
          </p>

          {/* Nomor Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
            <input
              type="text"
              value={selectedSurat?.nomorSurat || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Kepada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kepada <span className="text-red-500">*</span>
            </label>
            <select
              name="kepada"
              value={disposisiData.kepada}
              onChange={handleDisposisiChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Pilih penerima disposisi</option>
              <option value="ketua">Ketua Yayasan</option>
              <option value="sekretaris">Sekretaris Yayasan</option>
              <option value="bendahara">Bendahara Yayasan</option>
              <option value="koordinator_bidang">Kabag Umum</option>
              <option value="koordinator_bidang">Kabag Keuangan</option>
              <option value="koordinator_bidang">Kabag PSDM</option>
            </select>
          </div>

          {/* Instruksi/Catatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instruksi/Catatan <span className="text-red-500">*</span>
            </label>
            <textarea
              name="instruksi"
              value={disposisiData.instruksi}
              onChange={handleDisposisiChange}
              placeholder="Tuliskan instruksi atau catatan disposisi"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Tenggat Waktu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenggat Waktu</label>
            <input
              type="date"
              name="tenggat"
              value={disposisiData.tenggat}
              onChange={handleDisposisiChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Lampiran Tambahan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lampiran Tambahan
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDisposisiFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
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

      {/* Modal View Surat Keluar */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedSurat(null);
        }}
        title="Detail Surat Keluar"
        size="md"
      >
        {selectedSurat && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
              <p className="text-sm text-gray-900">{selectedSurat.nomorSurat}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <p className="text-sm text-gray-900">{formatDate(selectedSurat.tanggalSurat)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan</label>
              <p className="text-sm text-gray-900">
                {selectedSurat.tujuan || selectedSurat.tujuanSurat}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Perihal</label>
              <p className="text-sm text-gray-900">{selectedSurat.perihal}</p>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedSurat(null);
                }}
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setSelectedSuratId(null);
        }}
        title="Konfirmasi Hapus Surat Keluar"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus surat keluar ini?
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowConfirmModal(false);
                setSelectedSuratId(null);
              }}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={async () => {
                if (selectedSuratId) {
                  const res = await deleteSuratKeluar(selectedSuratId);
                  if (res && res.success) {
                    toast.success('Surat keluar dihapus');
                    setShowConfirmModal(false);
                    setSelectedSuratId(null);
                    fetchSuratKeluar();
                  }
                }
              }}
            >
              Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuratKeluarList;
