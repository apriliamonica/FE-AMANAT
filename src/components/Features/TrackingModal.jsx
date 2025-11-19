import { useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import Modal from '../../components/common/Modal/Modal';
import useDisposisiStore from '../../store/disposisiStore';
import { formatDateTime } from '../../utils/helpers';

const TrackingModal = ({ isOpen, onClose, surat }) => {
  const { trackingHistory, fetchTrackingHistory, isLoading } = useDisposisiStore();

  useEffect(() => {
    if (isOpen && surat) {
      fetchTrackingHistory(surat.nomorSurat);
    }
  }, [isOpen, surat, fetchTrackingHistory]);

  if (!surat) return null;

  const getStatusIcon = (status) => {
    if (status.toLowerCase().includes('selesai')) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (status.toLowerCase().includes('proses') || status.toLowerCase().includes('review')) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tracking Surat"
      size="lg"
    >
      <div className="space-y-4">
        {/* Info Surat */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Informasi Surat</h4>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-600">Nomor Surat:</span> <span className="font-medium">{surat.nomorSurat}</span></p>
            <p><span className="text-gray-600">Perihal:</span> <span className="font-medium">{surat.perihal}</span></p>
            {surat.asalSurat && (
              <p><span className="text-gray-600">Dari:</span> <span className="font-medium">{surat.asalSurat}</span></p>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Riwayat Perjalanan Surat</h4>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : trackingHistory.length > 0 ? (
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Timeline Items */}
              <div className="space-y-6">
                {trackingHistory.map((item, index) => (
                  <div key={item.id} className="relative flex items-start">
                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full">
                      {getStatusIcon(item.status)}
                    </div>

                    {/* Content */}
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-gray-900">{item.status}</h5>
                        <span className="text-xs text-gray-500">{formatDateTime(item.tanggal)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.keterangan}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">{item.oleh}</span>
                        {index < trackingHistory.length - 1 && (
                          <ArrowRight className="w-3 h-3 mx-2" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Belum ada riwayat tracking untuk surat ini</p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
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

export default TrackingModal;

// Lokasi: src/components/Features/TrackingModal.jsx