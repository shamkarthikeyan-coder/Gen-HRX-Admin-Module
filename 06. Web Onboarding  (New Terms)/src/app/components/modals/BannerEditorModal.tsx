import { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';

interface BannerEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (banner: BannerOption) => void;
  currentBanner?: BannerOption;
}

export interface BannerOption {
  type: 'gradient' | 'image' | 'custom';
  value: string;
  position?: { x: number; y: number };
  zoom?: number;
}

const predefinedBanners: BannerOption[] = [
  {
    type: 'gradient',
    value: 'from-purple-600 via-purple-500 to-orange-500',
  },
  {
    type: 'gradient',
    value: 'from-blue-600 via-cyan-500 to-teal-500',
  },
  {
    type: 'gradient',
    value: 'from-pink-600 via-rose-500 to-orange-500',
  },
  {
    type: 'gradient',
    value: 'from-indigo-600 via-purple-500 to-pink-500',
  },
  {
    type: 'gradient',
    value: 'from-emerald-600 via-green-500 to-teal-500',
  },
  {
    type: 'gradient',
    value: 'from-slate-700 via-slate-600 to-slate-500',
  },
  {
    type: 'image',
    value: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80',
  },
  {
    type: 'image',
    value: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    type: 'image',
    value: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    type: 'image',
    value: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
  },
];

export function BannerEditorModal({ isOpen, onClose, onSave, currentBanner }: BannerEditorModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<BannerOption | null>(currentBanner || null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageZoom, setImageZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCustomImage(imageUrl);
        setSelectedBanner({
          type: 'custom',
          value: imageUrl,
          position: { x: 50, y: 50 },
          zoom: 1,
        });
        setImagePosition({ x: 50, y: 50 });
        setImageZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedBanner?.type === 'custom' || selectedBanner?.type === 'image') {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && previewRef.current) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setImagePosition(prev => ({
        x: Math.max(0, Math.min(100, prev.x + (deltaX / previewRef.current!.offsetWidth) * 100)),
        y: Math.max(0, Math.min(100, prev.y + (deltaY / previewRef.current!.offsetHeight) * 100)),
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (selectedBanner) {
      const bannerToSave = {
        ...selectedBanner,
        position: (selectedBanner.type === 'custom' || selectedBanner.type === 'image') 
          ? imagePosition 
          : undefined,
        zoom: (selectedBanner.type === 'custom' || selectedBanner.type === 'image') 
          ? imageZoom 
          : undefined,
      };
      onSave(bannerToSave);
      toast.success('Banner updated successfully!');
      onClose();
    }
  };

  const handleBannerSelect = (banner: BannerOption) => {
    setSelectedBanner(banner);
    if (banner.type === 'image') {
      setImagePosition(banner.position || { x: 50, y: 50 });
      setImageZoom(banner.zoom || 1);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`${isMobileView ? 'w-full h-full' : 'w-full max-w-2xl h-[85vh]'} ${isMobileView ? '' : 'rounded-3xl'} shadow-2xl flex flex-col ${
        isDark ? 'bg-[#1a1d29]' : 'bg-white'
      } overflow-hidden`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Edit Banner
        </h2>
        <button
          onClick={onClose}
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
          } transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Preview */}
      <div className={`px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <p className={`text-xs font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Preview
        </p>
        <div
          ref={previewRef}
          className={`relative ${isMobileView ? 'h-32' : 'h-40'} rounded-xl overflow-hidden cursor-move`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {selectedBanner ? (
            selectedBanner.type === 'gradient' ? (
              <div className={`w-full h-full bg-gradient-to-br ${selectedBanner.value}`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-30"></div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={selectedBanner.value}
                  alt="Banner preview"
                  className="absolute w-full h-full object-cover"
                  style={{
                    transform: `scale(${imageZoom})`,
                    objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                  }}
                />
              </div>
            )
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <ImageIcon className={`w-8 h-8 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
            </div>
          )}
          {(selectedBanner?.type === 'custom' || selectedBanner?.type === 'image') && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageZoom(prev => Math.max(0.5, prev - 0.1));
                }}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ZoomOut className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageZoom(prev => Math.min(3, prev + 0.1));
                }}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
        {(selectedBanner?.type === 'custom' || selectedBanner?.type === 'image') && (
          <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            💡 Drag to reposition • Use zoom buttons to adjust size
          </p>
        )}
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Upload Custom */}
        <div className="mb-4">
          <p className={`text-xs font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Upload Custom
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`w-full p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-3 transition-all ${
              isDark 
                ? 'border-slate-700 hover:border-purple-500 hover:bg-slate-800/50' 
                : 'border-slate-300 hover:border-purple-500 hover:bg-purple-50'
            }`}
          >
            <Upload className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Upload Image
            </span>
          </button>
        </div>

        {/* Predefined Gradients */}
        <div className="mb-4">
          <p className={`text-xs font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Gradient Backgrounds
          </p>
          <div className="grid grid-cols-3 gap-2">
            {predefinedBanners.filter(b => b.type === 'gradient').map((banner, index) => (
              <button
                key={index}
                onClick={() => handleBannerSelect(banner)}
                className={`relative h-20 rounded-xl overflow-hidden transition-all ${
                  selectedBanner?.value === banner.value
                    ? 'ring-2 ring-purple-500 scale-95'
                    : 'hover:scale-95'
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${banner.value}`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-30"></div>
                  </div>
                </div>
                {selectedBanner?.value === banner.value && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Predefined Images */}
        <div className="mb-4">
          <p className={`text-xs font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Photo Backgrounds
          </p>
          <div className="grid grid-cols-2 gap-2">
            {predefinedBanners.filter(b => b.type === 'image').map((banner, index) => (
              <button
                key={index}
                onClick={() => handleBannerSelect(banner)}
                className={`relative h-24 rounded-xl overflow-hidden transition-all ${
                  selectedBanner?.value === banner.value
                    ? 'ring-2 ring-purple-500 scale-95'
                    : 'hover:scale-95'
                }`}
              >
                <img
                  src={banner.value}
                  alt={`Banner option ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {selectedBanner?.value === banner.value && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`px-5 py-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedBanner}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              selectedBanner
                ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg'
                : isDark
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Save Banner
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: isMobileView ? '100%' : 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobileView ? '100%' : 50 }}
            className={`fixed inset-0 z-[101] flex ${isMobileView ? 'items-end' : 'items-center'} justify-center ${isMobileView ? '' : 'p-8'}`}
          >
            {modalContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
