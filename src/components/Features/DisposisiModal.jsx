import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import useDisposisiStore from '../../store/disposisiStore';
import useAuthStore from '../../store/authStore';

const DisposisiModal = ({ isOpen, onClose, surat }) => {
  const { user } = useAuthStore();
  const { createDisposisi, isLoading } = useDisposisiStore();
  
  const [formData, setFormData] = useState({
    kepada: '',
    instruksi: '',
    tenggatWaktu: '',
    prioritas: 'sedang',
  });

  const pilihanPenerima = [
    { value: 'ketua_pengurus', label: 'Ketua Pengurus Yayasan' },
    { value: 'sekretaris_pengurus', label: 'Sekretaris Pengurus' },
    { value: 'bendahara_pengurus', label: 'Bendahara Pengurus' },
    { value: 'kabag_psdm', label: 'Kepala Bagian PSDM' },
    { value: 'kabag_keuangan', label: 'Kepala Bagian Keuangan' },
    { value: 'kabag_umum', label: 'Kepala Bagian Umum' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const disposisiData = {
      nomorSurat: surat.nomorSurat,
      dari: user.name,
      kepada: formData.kepada,
      perihal: surat.perihal,
      instruksi: formData.instruksi,
      tenggatWaktu: formData.tenggatWaktu,
      prioritas: formData.prioritas,
    };

    const result = await createDisposisi(disposisiData);
    
    if (result.success) {
      onClose();
      setFormData({
        kepada: '',
        instruksi: '',
        tenggatWaktu: '',
        prioritas: 'sedang',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!surat) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Disposisi"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Info Surat */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Informasi Surat</h4>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-600">Nomor Surat:</span> <span className="font-medium">{surat.nomorSurat}</span></p>
            <p><span className="text-gray-600">Asal:</span> <span className="font-medium">{surat.asalSurat}</span></p>
            <p><span className="text-gray-600">Perihal:</span> <span className="font-medium">{surat.perihal}</span></p>
          </div>
        </div>

        {/* Kepada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disposisi Kepada <span className="text-red-500">*</span>
          </label>
          <select
            name="kepada"
            value={formData.kepada}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="">Pilih penerima disposisi</option>
            {pilihanPenerima.map((penerima) => (
              <option key={penerima.value} value={penerima.value}>
                {penerima.label}
              </option>
            ))}
          </select>
        </div>

        {/* Instruksi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instruksi/Catatan <span className="text-red-500">*</span>
          </label>
          <textarea
            name="instruksi"
            value={formData.instruksi}
            onChange={handleChange}
            placeholder="Tuliskan instruksi atau catatan untuk penerima disposisi"
            rows="4"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tenggat Waktu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenggat Waktu <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tenggatWaktu"
              value={formData.tenggatWaktu}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Prioritas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioritas
            </label>
            <select
              name="prioritas"
              value={formData.prioritas}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Buat Disposisi'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DisposisiModal;

// Lokasi: src/components/features/DisposisiModal.jsx