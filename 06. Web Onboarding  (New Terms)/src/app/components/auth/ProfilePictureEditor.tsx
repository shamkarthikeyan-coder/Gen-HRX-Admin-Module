import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Upload, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';

interface ProfilePictureEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageData: string) => void;
  currentImage?: string;
}

export function ProfilePictureEditor({ isOpen, onClose, onSave, currentImage }: ProfilePictureEditorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [image, setImage] = useState<string | null>(currentImage || null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Update image when currentImage prop changes
  useEffect(() => {
    if (currentImage) {
      setImage(currentImage);
    }
  }, [currentImage]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size to desired output (e.g., 400x400)
      canvas.width = 400;
      canvas.height = 400;
      
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw circular clip
      ctx.beginPath();
      ctx.arc(200, 200, 200, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Calculate draw position and size based on zoom and position
      const scale = zoom;
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const drawX = 200 - (drawWidth / 2) + (position.x * scale);
      const drawY = 200 - (drawHeight / 2) + (position.y * scale);
      
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
      onClose();
    };
    img.src = image;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`w-full max-w-lg rounded-2xl shadow-2xl ${
          isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Edit Profile Picture
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Upload Button */}
          {!image && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDark
                  ? 'border-slate-700 hover:border-purple-500 bg-slate-800/50'
                  : 'border-slate-300 hover:border-purple-500 bg-slate-50'
              }`}
            >
              <Upload className={`w-12 h-12 mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Click to upload photo
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                PNG, JPG up to 10MB
              </p>
            </div>
          )}

          {/* Image Preview & Editor */}
          {image && (
            <div className="space-y-4">
              {/* Preview Area */}
              <div
                className={`relative h-64 rounded-2xl overflow-hidden cursor-move ${
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={image}
                  alt="Preview"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  }}
                />
                {/* Circular Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <mask id="circle-mask">
                        <rect width="100" height="100" fill="white" />
                        <circle cx="50" cy="50" r="40" fill="black" />
                      </mask>
                    </defs>
                    <rect width="100" height="100" fill="black" fillOpacity="0.5" mask="url(#circle-mask)" />
                  </svg>
                </div>
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isDark ? 'bg-slate-900/80 text-slate-300' : 'bg-white/80 text-slate-700'
                } backdrop-blur-sm flex items-center gap-2`}>
                  <Move className="w-3 h-3" />
                  Drag to reposition
                </div>
              </div>

              {/* Zoom Controls */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  
                  <button
                    onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
                <p className={`text-xs text-center mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Zoom: {Math.round(zoom * 100)}%
                </p>
              </div>

              {/* Change Photo Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Change Photo
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer */}
        <div className={`flex gap-3 p-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <Button
            onClick={onClose}
            variant="outline"
            className={`flex-1 h-12 rounded-xl font-semibold ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!image}
            className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Photo
          </Button>
        </div>
      </motion.div>
    </div>
  );
}