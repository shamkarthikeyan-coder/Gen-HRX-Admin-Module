import { X, Upload, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface EditBannerModalProps {
  show: boolean;
  onClose: () => void;
  selectedBanner: string;
  onSelectBanner: (banner: string) => void;
  onSave: () => void;
}

export function EditBannerModal({ show, onClose, selectedBanner, onSelectBanner, onSave }: EditBannerModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  if (!show) return null;

  const gradients = [
    { id: 'gradient-1', style: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500' },
    { id: 'gradient-2', style: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    { id: 'gradient-3', style: 'bg-gradient-to-r from-pink-600 via-red-500 to-orange-500' },
    { id: 'gradient-4', style: 'bg-gradient-to-r from-purple-600 to-purple-400' },
    { id: 'gradient-5', style: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { id: 'gradient-6', style: 'bg-gradient-to-r from-slate-700 to-slate-500' }
  ];

  const photos = [
    { id: 'photo-1', url: 'https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBtZWV0aW5nJTIwdGVhbXdvcmslMjBjb2xsYWJvcmF0aW9uJTIwYm9hcmR8ZW58MXx8fHwxNzcyNDI1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'photo-2', url: 'https://images.unsplash.com/photo-1769251971680-005dfa536f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMG5pZ2h0JTIwbGlnaHRzJTIwc3BhY2UlMjB2aWV3fGVufDF8fHx8MTc3MjQyNTAwOHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'photo-3', url: 'https://images.unsplash.com/photo-1758691736933-bb0f88fe2e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBoYWxsd2F5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNDI1MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'photo-4', url: 'https://images.unsplash.com/photo-1718982085789-8b7ffc6bc436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB3aW5kb3dzfGVufDF8fHx8MTc3MjQyNTAwOXww&ixlib=rb-4.1.0&q=80&w=1080' }
  ];

  const getBannerStyle = (bannerId: string) => {
    const gradient = gradients.find(g => g.id === bannerId);
    if (gradient) return gradient.style;
    
    const photo = photos.find(p => p.id === bannerId);
    if (photo) return '';
    
    return gradients[0].style;
  };

  const getBannerImage = (bannerId: string) => {
    const photo = photos.find(p => p.id === bannerId);
    return photo?.url;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      <div className={`fixed inset-x-0 top-0 bottom-0 z-50 max-w-2xl mx-auto overflow-y-auto ${
        isDark ? 'bg-[#1a1d29]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h2 className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Edit Banner
          </h2>
          <button 
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
            }`}
          >
            <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Preview */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>Preview</h3>
            <div className="relative h-32 rounded-2xl overflow-hidden">
              {getBannerImage(selectedBanner) ? (
                <img 
                  src={getBannerImage(selectedBanner)} 
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${getBannerStyle(selectedBanner)}`} />
              )}
            </div>
          </div>

          {/* Upload Custom */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>Upload Custom</h3>
            <button className={`w-full py-4 rounded-2xl border-2 border-dashed transition-colors flex items-center justify-center gap-2 ${
              isDark 
                ? 'border-slate-700 hover:border-slate-600' 
                : 'border-slate-300 hover:border-slate-400'
            }`}>
              <Upload className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`} />
              <span className={`text-base font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Upload Image</span>
            </button>
          </div>

          {/* Gradient Backgrounds */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>Gradient Backgrounds</h3>
            <div className="grid grid-cols-3 gap-3">
              {gradients.map((gradient) => (
                <button
                  key={gradient.id}
                  onClick={() => onSelectBanner(gradient.id)}
                  className="relative h-24 rounded-2xl overflow-hidden"
                >
                  <div className={`w-full h-full ${gradient.style}`} />
                  {selectedBanner === gradient.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Backgrounds */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>Photo Backgrounds</h3>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => onSelectBanner(photo.id)}
                  className="relative h-32 rounded-2xl overflow-hidden"
                >
                  <img 
                    src={photo.url} 
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                  {selectedBanner === photo.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className={`sticky bottom-0 border-t p-5 flex gap-3 ${
          isDark ? 'bg-[#1a1d29] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-2xl font-semibold transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Save Banner
          </button>
        </div>
      </div>
    </>
  );
}