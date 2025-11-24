import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal/Modal';
import { CheckCircle, Clock, FileText, Calendar, Send, User, Archive } from 'lucide-react';
import useDisposisiStore from '../../store/disposisiStore';
import { formatDateTime } from '../../utils/helpers';

// --- Komponen Tab Content ---

// 1. DETAIL TAB
const DetailTab = ({ surat }) => (
  <div className="p-4 bg-white rounded-xl border border-green-500/20 shadow-sm">
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

// 2. TRACKING TAB (Menggunakan logika dari kode sebelumnya)
const TrackingTab = ({ surat }) => {
  const { trackingHistory, fetchTrackingHistory, isLoading } = useDisposisiStore();

  useEffect(() => {
    // Hanya fetch jika surat tersedia
    if (surat && surat.nomorSurat) {
      fetchTrackingHistory(surat.nomorSurat);
    }
  }, [surat, fetchTrackingHistory]);

  const getStatusIcon = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('selesai') || lowerStatus.includes('disetujui')) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (lowerStatus.includes('proses') || lowerStatus.includes('review') || lowerStatus.includes('tindak lanjut')) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    } else {
      return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="pt-2">
      <h4 className="font-semibold text-gray-900 mb-4">Riwayat Perjalanan Surat</h4>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : trackingHistory && trackingHistory.length > 0 ? (
        <div className="relative pl-4">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {trackingHistory.map((item, index) => (
              <div key={index} className="relative flex items-start">
                
                <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-4 border-white rounded-full translate-x-[-15px] shadow-sm">
                  {getStatusIcon(item.status)}
                </div>

                <div className="ml-0 p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex-1 -mt-1 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-semibold text-gray-900">{item.status}</h5>
                    <span className="text-xs text-gray-500">{formatDateTime(item.tanggal)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.keterangan}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <User className='w-3 h-3 mr-1'/>
                    <span className="font-medium text-green-700">{item.oleh}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
          <Archive className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p>Belum ada riwayat tracking untuk surat ini</p>
        </div>
      )}
    </div>
  );
};

// 3. DISPOSISI TAB (Mock-up)
const DisposisiTab = ({ surat }) => (
  <div className="pt-2">
    <h4 className="font-semibold text-gray-900 mb-4">Disposisi & Tindak Lanjut</h4>
    <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
        <Clock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <p>Konten Form Disposisi atau Riwayat Disposisi akan ditempatkan di sini.</p>
    </div>
  </div>
);


// --- Komponen Modal Utama ---
const MailDetailModal = ({ isOpen, onClose, surat }) => {
  const [activeTab, setActiveTab] = useState('Detail'); // Default tab

  // Daftar Tab
  const tabs = [
    { name: 'Detail', component: DetailTab },
    { name: 'Tracking', component: TrackingTab },
    { name: 'Disposisi', component: DisposisiTab },
    // Tambahkan tab Lampiran jika diperlukan
  ];

  const ActiveComponent = tabs.find(t => t.name === activeTab)?.component || DetailTab;

  if (!surat) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={surat.perihal || 'Detail Surat'}
      size="3xl" // Ukuran Modal diperbesar agar konten tab nyaman
    >
      <div className="space-y-4">
        
        {/* Header Status (Mirip Desain Gambar) */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              {surat.nomorSurat} 
            </p>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
              Menunggu Tindak Lanjut
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              Surat Masuk
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`
                px-4 py-2 text-sm font-medium transition-colors duration-200 
                ${activeTab === tab.name
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-4">
          <ActiveComponent surat={surat} />
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
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