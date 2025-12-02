import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal/Modal';
import {
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  Send,
  User,
  Archive,
  AlertCircle,
  Paperclip,
} from 'lucide-react';
import useDisposisiStore from '../../store/disposisiStore';
import useAuthStore from '../../store/authStore';
import useSuratStore from '../../store/suratStore';
import toast from 'react-hot-toast';
import { formatDateTime } from '../../utils/helpers';
import {
  SURAT_KELUAR_STATUS,
  SURAT_MASUK_STATUS,
  SURAT_MASUK_STATUS_LABELS,
  SURAT_KELUAR_STATUS_LABELS,
} from '../../utils/constants';

// --- 1. DETAIL TAB ---
const DetailTab = ({ surat }) => (
  // Diberi tinggi minimum agar konsisten dengan tab lain
  <div className="p-4 bg-white rounded-xl border border-green-500/20 shadow-sm min-h-[350px]">
    <h4 className="font-semibold text-green-600 mb-4">Informasi Surat</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
      {/* Nomor Surat */}
      <div className="flex items-start">
        <FileText className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-500">Nomor Surat</p>
          <p className="text-base font-medium text-gray-900 break-words">{surat.nomorSurat}</p>
        </div>
      </div>

      {/* Tanggal */}
      <div className="flex items-start">
        <Calendar className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-500">Tanggal</p>
          <p className="text-base font-medium text-gray-900">{surat.tanggal || 'N/A'}</p>
        </div>
      </div>

      {/* Pengirim */}
      <div className="flex items-start">
        <Send className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-500">Pengirim</p>
          <p className="text-base font-medium text-gray-900">{surat.asalSurat || 'N/A'}</p>
        </div>
      </div>

      {/* Penanggungjawab Saat Ini */}
      <div className="flex items-start">
        <User className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-500">Penanggungjawab Saat Ini</p>
          <p className="text-base font-medium text-gray-900">
            {surat.penanggungJawabSaatIni || 'N/A'}
          </p>
        </div>
      </div>
    </div>

    {/* Perihal */}
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-500 mb-1">Perihal</p>
      <p className="text-base font-medium text-gray-900">{surat.perihal}</p>
    </div>

    {/* Tombol Preview Surat */}
    <button className="flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
      <Archive className="w-4 h-4 mr-2" />
      Lihat Preview Surat
    </button>
  </div>
);

// --- 2. TRACKING TAB --- ganti DISPOSISI TAB
const TrackingTab = ({ surat }) => {
  const { trackingHistory, fetchTrackingHistory, isLoading } = useDisposisiStore();

  useEffect(() => {
    if (surat && surat.nomorSurat) {
      fetchTrackingHistory(surat.nomorSurat);
    }
  }, [surat, fetchTrackingHistory]);

  const getStatusIcon = (status) => {
    const s = (status || '').toLowerCase();
    // Completed / sent
    if (
      s === String(SURAT_MASUK_STATUS.SELESAI) ||
      s === String(SURAT_KELUAR_STATUS.TERKIRIM) ||
      s.includes('disetujui') ||
      s.includes('selesai')
    ) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }

    // In progress / review / tindak lanjut
    if (
      s === String(SURAT_MASUK_STATUS.DIPROSES) ||
      s === String(SURAT_MASUK_STATUS.DISPOSISI_KETUA) ||
      s.includes('proses') ||
      s.includes('review') ||
      s.includes('tindak lanjut')
    ) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }

    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="pt-2">
      <h4 className="font-semibold text-gray-900 mb-4">Riwayat Perjalanan Surat</h4>

      {isLoading ? (
        <div className="flex items-center justify-center py-8 min-h-[350px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : trackingHistory && trackingHistory.length > 0 ? (
        <div className="relative pl-4">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Riwayat Dibalik: Data Terbaru di Atas */}
          <div className="space-y-6 min-h-[350px]">
            {[...trackingHistory].reverse().map((item, index) => (
              <div key={item.id || index} className="relative flex items-start">
                <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-4 border-white rounded-full translate-x-[-15px] shadow-sm">
                  {getStatusIcon(item.status)}
                </div>

                <div className="ml-0 p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex-1 -mt-1 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-semibold text-gray-900">
                      {SURAT_MASUK_STATUS_LABELS[item.status] ||
                        SURAT_KELUAR_STATUS_LABELS[item.status] ||
                        item.status}
                    </h5>
                    <span className="text-xs text-gray-500">{formatDateTime(item.tanggal)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.keterangan}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    <span className="font-medium text-green-700">{item.oleh}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg min-h-[350px] flex flex-col justify-center items-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p>Belum ada riwayat tracking untuk surat ini</p>
        </div>
      )}
    </div>
  );
};

// // --- 3. DISPOSISI TAB (Mock-up) ---
// const DisposisiTab = ({ surat }) => (
//   <div className="pt-2 min-h-[350px]">
//     {' '}
//     {/* Diberi tinggi minimum */}
//     <h4 className="font-semibold text-gray-900 mb-4">Disposisi & Tindak Lanjut</h4>
//     <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg h-full flex flex-col justify-center items-center">
//       <Clock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
//       <p>Konten Form Disposisi atau Riwayat Disposisi akan ditempatkan di sini.</p>
//     </div>
//   </div>
// );

// --- 4. LAMPIRAN TAB (Functional) ---
const LampiranTab = ({ surat }) => {
  const { user } = useAuthStore();
  const { createSuratKeluar } = useSuratStore();
  const { createDisposisi, updateDisposisiStatus } = useDisposisiStore();

  // For demo purposes: requested attachments come from surat.requestedAttachments or fallback list
  const requested = surat.requestedAttachments || [
    'detail_alat.xlsx',
    'budget_estimate.pdf',
    'proposal_kegiatan.docx',
  ];

  const [files, setFiles] = useState([]);
  const [matched, setMatched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [detectedNomor, setDetectedNomor] = useState('');

  useEffect(() => {
    // Auto-detect nomor surat dari surat.nomorSurat
    if (surat && surat.nomorSurat) {
      setDetectedNomor(surat.nomorSurat);
    }
  }, [surat]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);

    // check for matching names (simple contains or exact)
    const check = {};
    requested.forEach((r) => {
      const found = selected.find(
        (f) =>
          f.name.toLowerCase().includes(r.split('.')[0].toLowerCase()) ||
          f.name.toLowerCase() === r.toLowerCase()
      );
      check[r] = !!found;
    });
    setMatched(check);
  };

  const allMatched = Object.values(matched).every(Boolean) && requested.length > 0;

  const handleConfirm = async () => {
    if (!user) return toast.error('User tidak terautentikasi');

    // Basic validations
    if (!detectedNomor) return toast.error('Nomor surat tidak terdeteksi');
    if (!allMatched) return toast.error('Mohon upload semua lampiran yang diminta');

    setIsSubmitting(true);
    try {
      // Create surat lampiran (mocked) -- nomor generated using timestamp & bagian
      const bagianKey = (user.bagian || 'umum').toUpperCase();
      const now = new Date();
      const tahun = now.getFullYear();
      const nomorGenerated = `SK/LAMP/${bagianKey}/${now.getTime()}`;

      const newSurat = {
        nomorSurat: nomorGenerated,
        dari: user.role_label || user.name,
        tujuan: 'Sekretaris Kantor',
        perihal: `Lampiran untuk ${detectedNomor}`,
        tanggal: now.toISOString().split('T')[0],
        kategori: 'lampiran',
        status: SURAT_KELUAR_STATUS.DRAFT,
        attachments: files.map((f) => ({ name: f.name, size: f.size })),
      };

      const res = await createSuratKeluar(newSurat);

      if (res.success) {
        // Update original disposisi (if surat has disposisiId)
        if (surat.disposisiId) {
          await updateDisposisiStatus(
            surat.disposisiId,
            SURAT_MASUK_STATUS.SELESAI,
            `Lampiran ${nomorGenerated} dibuat oleh ${user.role_label || user.name}`
          );
        }

        // Create disposisi balik to sekretaris kantor
        await createDisposisi({
          nomorSurat: detectedNomor,
          dari: user.role_label || user.name,
          kepada: 'sekretaris_kantor',
          perihal: `Lampiran untuk ${detectedNomor}`,
          instruksi: `Lampiran ${nomorGenerated} telah dibuat dan siap ditandatangani`,
          tenggatWaktu: '',
        });

        toast.success('Lampiran berhasil diupload dan surat lampiran dibuat');
        // reset
        setFiles([]);
        setMatched({});
      } else {
        throw new Error(res.error || 'Gagal membuat surat lampiran');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Terjadi kesalahan saat membuat lampiran');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-2 min-h-[350px]">
      <h4 className="font-semibold text-gray-900 mb-4">Daftar Lampiran</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Lampiran Diminta</p>
          <ul className="space-y-2">
            {requested.map((r) => (
              <li key={r} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-800">{r}</span>
                </div>
                <span
                  className={`text-xs font-medium ${matched[r] ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {matched[r] ? 'Terverifikasi' : 'Belum diupload'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Upload Lampiran</p>
          <div className="mb-3">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700"
            />
          </div>

          <div className="text-sm text-gray-600 mb-3">
            <p>
              Nomor surat terdeteksi: <span className="font-medium">{detectedNomor || '—'}</span>
            </p>
          </div>

          <div className="space-y-2 mb-3">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm text-gray-700">
                <span>{f.name}</span>
                <span className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB</span>
              </div>
            ))}
            {files.length === 0 && (
              <div className="text-xs text-gray-400">Belum ada file yang dipilih</div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setFiles([]);
                setMatched({});
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              disabled={isSubmitting || !allMatched}
            >
              {isSubmitting ? 'Menyimpan...' : 'Confirm & Create Surat Lampiran'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Modal Utama: MailDetailModal ---
const MailDetailModal = ({ isOpen, onClose, surat }) => {
  const [activeTab, setActiveTab] = useState('Detail');

  const tabs = [
    { name: 'Detail', component: DetailTab },
    { name: 'Disposisi', component: TrackingTab },
    { name: 'Lampiran', component: LampiranTab },
  ];

  const ActiveComponent = tabs.find((t) => t.name === activeTab)?.component || DetailTab;

  if (!surat) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={surat.perihal || 'Detail Surat'}
      size="xl" // Lebar Modal konsisten di ukuran XL
    >
      <div className="space-y-4 flex flex-col h-full">
        {/* Header Status */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-sm text-gray-500 font-medium">{surat.nomorSurat}</p>
          </div>
          <div className="flex space-x-2">
            {/* Status label dari konstanta jika tersedia, fallback ke teks literal */}
            <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{}}>
              {SURAT_MASUK_STATUS_LABELS[surat.status] ||
                SURAT_KELUAR_STATUS_LABELS[surat.status] ||
                'Menunggu Tindak Lanjut'}
            </span>

            {/* Jenis surat (kategori) */}
            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              {surat.kategori
                ? surat.kategori.charAt(0).toUpperCase() + surat.kategori.slice(1)
                : 'Surat Masuk'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`
                px-4 py-2 text-sm font-medium transition-colors duration-200 
                ${
                  activeTab === tab.name
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content Area (Tinggi Konsisten + Scroll) */}
        <div className="py-4 flex-grow overflow-y-auto max-h-[400px]">
          <ActiveComponent surat={surat} />
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MailDetailModal;
