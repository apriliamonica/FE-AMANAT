import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const SuratMasukList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nomorSurat: '',
    tanggalTerima: '',
    asalSurat: '',
    perihal: '',
    kategori: '',
    prioritas: '',
    file: null,
  });

  // Dummy data surat masuk
  const suratMasukData = [
    {
      id: 1,
      nomorSurat: '001/SM/V/2025',
      asalSurat: 'Dinas Pendidikan',
      tanggal: '10/10/2025',
      perihal: 'Undangan Rapat Koordinasi Pendidikan',
      prioritas: 'urgent',
      status: 'baru',
    },
    {
      id: 2,
      nomorSurat: '002/SM/V/2025',
      asalSurat: 'Kementerian Keuangan',
      tanggal: '9/10/2025',
      perihal: 'Permohonan Data Keuangan',
      prioritas: 'tinggi',
      status: 'diproses',
    },
    {
      id: 3,
      nomorSurat: '003/SM/V/2025',
      asalSurat: 'BKN Regional',
      tanggal: '8/10/2025',
      perihal: 'Verifikasi Data Kepegawaian',
      prioritas: 'sedang',
      status: 'diproses',
    },
    {
      id: 4,
      nomorSurat: '004/SM/V/2025',
      asalSurat: 'LKPP',
      tanggal: '7/10/2025',
      perihal: 'Pemberitahuan Lelang Pengadaan',
      prioritas: 'rendah',
      status: 'selesai',
    },
    {
      id: 5,
      nomorSurat: '005/SM/V/2025',
      asalSurat: 'Inspektorat Daerah',
      tanggal: '6/10/2025',
      perihal: 'Audit Internal Semester I',
      prioritas: 'urgent',
      status: 'selesai',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement API call
    setShowModal(false);
    // Reset form
    setFormData({
      nomorSurat: '',
      tanggalTerima: '',
      asalSurat: '',
      perihal: '',
      kategori: '',
      prioritas: '',
      file: null,
    });
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
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Surat Masuk</h1>
        <p className='text-gray-600 mt-1'>Kelola dan pantau surat masuk</p>
      </div>

      {/* Search & Actions */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
          {/* Search Bar */}
          <div className='relative flex-1 w-full sm:max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Cari nomor surat, asal, atau perihal...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2 w-full sm:w-auto'>
            <Button
              variant='outline'
              icon={Filter}
              className='flex-1 sm:flex-none'
            >
              Filter
            </Button>
            <Button
              variant='primary'
              icon={Plus}
              onClick={() => setShowModal(true)}
              className='flex-1 sm:flex-none'
            >
              Tambah Surat Masuk
            </Button>
          </div>
        </div>
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
                  Asal Surat
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Tanggal
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Perihal
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Prioritas
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
              {suratMasukData.map((surat) => (
                <tr
                  key={surat.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {surat.nomorSurat}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {surat.asalSurat}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {surat.tanggal}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    {surat.perihal}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Badge variant={surat.prioritas}>
                      {surat.prioritas.charAt(0).toUpperCase() +
                        surat.prioritas.slice(1)}
                    </Badge>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Badge variant={surat.status}>
                      {surat.status.charAt(0).toUpperCase() +
                        surat.status.slice(1)}
                    </Badge>
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

      {/* Modal Tambah Surat Masuk */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title='Tambah Surat Masuk Baru'
        size='lg'
      >
        <form onSubmit={handleSubmit} className='space-y-4'>
          <p className='text-sm text-gray-600 mb-4'>
            Isi formulir di bawah untuk menambahkan surat masuk baru
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nomor Surat */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Nomor Surat <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='nomorSurat'
                value={formData.nomorSurat}
                onChange={handleChange}
                placeholder='B/013M/V/2025'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              />
            </div>

            {/* Tanggal Terima */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tanggal Terima <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                name='tanggalTerima'
                value={formData.tanggalTerima}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              />
            </div>
          </div>

          {/* Asal Surat */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Asal Surat <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='asalSurat'
              value={formData.asalSurat}
              onChange={handleChange}
              placeholder='Nama instansi/lembaga'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          {/* Perihal */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Perihal <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='perihal'
              value={formData.perihal}
              onChange={handleChange}
              placeholder='Perihal surat'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Kategori */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Kategori <span className='text-red-500'>*</span>
              </label>
              <select
                name='kategori'
                value={formData.kategori}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              >
                <option value=''>Pilih kategori</option>
                <option value='undangan'>Undangan</option>
                <option value='permohonan'>Permohonan</option>
                <option value='pemberitahuan'>Pemberitahuan</option>
                <option value='laporan'>Laporan</option>
              </select>
            </div>

            {/* Prioritas */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Prioritas <span className='text-red-500'>*</span>
              </label>
              <select
                name='prioritas'
                value={formData.prioritas}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
              >
                <option value=''>Pilih prioritas</option>
                <option value='rendah'>Rendah</option>
                <option value='sedang'>Sedang</option>
                <option value='tinggi'>Tinggi</option>
                <option value='urgent'>Urgent</option>
              </select>
            </div>
          </div>

          {/* Upload File */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Unggah File (PDF, maksimal 10 MB)
            </label>
            <input
              type='file'
              accept='.pdf'
              onChange={handleFileChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Pastikan semua data telah diisi dengan benar sebelum menyimpan.
            </p>
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

export default SuratMasukList;

// Lokasi: src/pages/surat-masuk/SuratMasukList.jsx
