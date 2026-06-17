import { useState, useRef, useEffect } from 'react';
import { X, Upload, User, Camera, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';

interface AvatarEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avatar: AvatarData) => void;
  currentAvatar?: string;
}

export interface AvatarData {
  type: 'photo' | 'virtual';
  value: string;
  virtualConfig?: VirtualAvatarConfig;
}

interface VirtualAvatarConfig {
  skinTone: string;
  body: string;
  eyes: string;
  eyebrows: string;
  mouth: string;
  hairStyle: string;
  hairColor: string;
  facialHair: string;
  top: string;
  topColor: string;
  accessories: string;
}

const skinTones = [
  { id: 'light', color: '#FFDFC4', name: 'Light' },
  { id: 'tan', color: '#F0C19E', name: 'Tan' },
  { id: 'medium', color: '#D1A684', name: 'Medium' },
  { id: 'olive', color: '#C68642', name: 'Olive' },
  { id: 'brown', color: '#8D5524', name: 'Brown' },
  { id: 'dark', color: '#593123', name: 'Dark' },
];

const bodies = [
  { id: 'round', name: 'Round' },
  { id: 'oval', name: 'Oval' },
  { id: 'square', name: 'Square' },
];

const eyes = [
  { id: 'default', name: 'Default' },
  { id: 'happy', name: 'Happy' },
  { id: 'wink', name: 'Wink' },
  { id: 'surprised', name: 'Surprised' },
];

const eyebrows = [
  { id: 'default', name: 'Default' },
  { id: 'raised', name: 'Raised' },
  { id: 'angry', name: 'Angry' },
  { id: 'flat', name: 'Flat' },
];

const mouths = [
  { id: 'smile', name: 'Smile' },
  { id: 'laugh', name: 'Laugh' },
  { id: 'neutral', name: 'Neutral' },
  { id: 'smirk', name: 'Smirk' },
];

const hairStyles = [
  { id: 'short', name: 'Short' },
  { id: 'long', name: 'Long' },
  { id: 'bun', name: 'Bun' },
  { id: 'curly', name: 'Curly' },
  { id: 'buzz', name: 'Buzz' },
  { id: 'bald', name: 'Bald' },
  { id: 'pixie', name: 'Pixie' },
  { id: 'wavy', name: 'Wavy' },
];

const hairColors = [
  { id: 'black', color: '#2C1B18', name: 'Black' },
  { id: 'brown', color: '#8B4513', name: 'Brown' },
  { id: 'blonde', color: '#E9C189', name: 'Blonde' },
  { id: 'auburn', color: '#A0522D', name: 'Auburn' },
  { id: 'red', color: '#DC143C', name: 'Red' },
  { id: 'gray', color: '#808080', name: 'Gray' },
];

const facialHairs = [
  { id: 'none', name: 'None' },
  { id: 'stubble', name: 'Stubble' },
  { id: 'beard', name: 'Beard' },
  { id: 'mustache', name: 'Mustache' },
];

const tops = [
  { id: 'shirt', name: 'Shirt' },
  { id: 'hoodie', name: 'Hoodie' },
  { id: 'sweater', name: 'Sweater' },
  { id: 'dress', name: 'Dress' },
];

const topColors = [
  { id: 'blue', color: '#4A90E2', name: 'Blue' },
  { id: 'red', color: '#E74C3C', name: 'Red' },
  { id: 'green', color: '#2ECC71', name: 'Green' },
  { id: 'purple', color: '#9B59B6', name: 'Purple' },
  { id: 'orange', color: '#F39C12', name: 'Orange' },
  { id: 'gray', color: '#95A5A6', name: 'Gray' },
];

const accessories = [
  { id: 'none', name: 'None' },
  { id: 'glasses', name: 'Glasses' },
  { id: 'sunglasses', name: 'Sunglasses' },
  { id: 'hat', name: 'Hat' },
];

const categories = [
  { id: 'skin', name: 'Skin', icon: '👤' },
  { id: 'face', name: 'Face', icon: '😊' },
  { id: 'hair', name: 'Hair', icon: '💇' },
  { id: 'body', name: 'Body', icon: '👕' },
  { id: 'extras', name: 'Extras', icon: '👓' },
];

export function AvatarEditorModal({ isOpen, onClose, onSave, currentAvatar }: AvatarEditorModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'create'>('create');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Image adjustment state
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Virtual avatar state
  const [selectedCategory, setSelectedCategory] = useState('skin');
  const [isBlinking, setIsBlinking] = useState(false);
  const [skinTone, setSkinTone] = useState(skinTones[1].id);
  const [body, setBody] = useState(bodies[1].id);
  const [eyeStyle, setEyeStyle] = useState(eyes[0].id);
  const [eyebrowStyle, setEyebrowStyle] = useState(eyebrows[0].id);
  const [mouthStyle, setMouthStyle] = useState(mouths[0].id);
  const [hairStyle, setHairStyle] = useState(hairStyles[0].id);
  const [hairColor, setHairColor] = useState(hairColors[0].id);
  const [facialHair, setFacialHair] = useState(facialHairs[0].id);
  const [top, setTop] = useState(tops[0].id);
  const [topColor, setTopColor] = useState(topColors[0].id);
  const [accessory, setAccessory] = useState(accessories[0].id);

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Blink animation
  useEffect(() => {
    if (activeTab === 'create') {
      const blinkInterval = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }, 3000 + Math.random() * 2000);
      return () => clearInterval(blinkInterval);
    }
  }, [activeTab]);

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
        setUploadedImage(imageUrl);
        setImageZoom(1);
        setImagePosition({ x: 50, y: 50 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !uploadedImage || !previewRef.current) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const containerWidth = previewRef.current.offsetWidth;
    const containerHeight = previewRef.current.offsetHeight;
    
    const percentX = (deltaX / containerWidth) * 100;
    const percentY = (deltaY / containerHeight) * 100;
    
    setImagePosition(prev => ({
      x: Math.max(0, Math.min(100, prev.x + percentX)),
      y: Math.max(0, Math.min(100, prev.y + percentY))
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!uploadedImage) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !uploadedImage || !previewRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    const containerWidth = previewRef.current.offsetWidth;
    const containerHeight = previewRef.current.offsetHeight;
    
    const percentX = (deltaX / containerWidth) * 100;
    const percentY = (deltaY / containerHeight) * 100;
    
    setImagePosition(prev => ({
      x: Math.max(0, Math.min(100, prev.x + percentX)),
      y: Math.max(0, Math.min(100, prev.y + percentY))
    }));
    
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (activeTab === 'upload' && uploadedImage) {
      onSave({
        type: 'photo',
        value: uploadedImage,
      });
      toast.success('Profile picture updated!');
      onClose();
    } else if (activeTab === 'create') {
      const virtualAvatarId = `virtual-${Date.now()}`;
      onSave({
        type: 'virtual',
        value: virtualAvatarId,
        virtualConfig: {
          skinTone,
          body,
          eyes: eyeStyle,
          eyebrows: eyebrowStyle,
          mouth: mouthStyle,
          hairStyle,
          hairColor,
          facialHair,
          top,
          topColor,
          accessories: accessory,
        },
      });
      toast.success('Virtual avatar created!');
      onClose();
    }
  };

  const getSkinToneColor = () => skinTones.find(t => t.id === skinTone)?.color || skinTones[1].color;
  const getHairColorValue = () => hairColors.find(h => h.id === hairColor)?.color || hairColors[0].color;
  const getTopColorValue = () => topColors.find(t => t.id === topColor)?.color || topColors[0].color;

  const renderVirtualAvatar = () => {
    const skinColor = getSkinToneColor();
    const currentHairColor = getHairColorValue();
    const currentTopColor = getTopColorValue();

    return (
      <motion.svg
        viewBox="0 0 200 280"
        className="w-full h-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Body/Clothing */}
        <g>
          {top === 'shirt' && (
            <>
              {/* Shirt */}
              <rect x="50" y="180" width="100" height="100" fill={currentTopColor} rx="10" />
              {/* Collar */}
              <path d="M70 180 L100 200 L130 180" fill={currentTopColor} opacity="0.8" />
            </>
          )}
          {top === 'hoodie' && (
            <>
              {/* Hoodie body */}
              <rect x="45" y="180" width="110" height="100" fill={currentTopColor} rx="15" />
              {/* Hood */}
              <path d="M60 160 Q100 140 140 160 L140 180 L60 180 Z" fill={currentTopColor} opacity="0.9" />
              {/* Drawstrings */}
              <line x1="90" y1="185" x2="90" y2="195" stroke="white" strokeWidth="2" />
              <line x1="110" y1="185" x2="110" y2="195" stroke="white" strokeWidth="2" />
            </>
          )}
          {top === 'sweater' && (
            <>
              {/* Sweater */}
              <rect x="50" y="180" width="100" height="100" fill={currentTopColor} rx="8" />
              {/* Ribbing */}
              <rect x="50" y="180" width="100" height="8" fill={currentTopColor} opacity="0.7" />
            </>
          )}
          {top === 'dress' && (
            <>
              {/* Dress */}
              <path d="M60 180 L140 180 L150 280 L50 280 Z" fill={currentTopColor} />
              {/* Belt/Waist */}
              <rect x="60" y="210" width="80" height="6" fill="white" opacity="0.4" />
            </>
          )}
        </g>

        {/* Neck */}
        <ellipse cx="100" cy="175" rx="18" ry="15" fill={skinColor} />

        {/* Head */}
        <g>
          {body === 'round' && <circle cx="100" cy="120" r="55" fill={skinColor} />}
          {body === 'oval' && <ellipse cx="100" cy="120" rx="50" ry="60" fill={skinColor} />}
          {body === 'square' && <rect x="50" y="65" width="100" height="110" rx="15" fill={skinColor} />}
        </g>

        {/* Ears */}
        <ellipse cx="50" cy="120" rx="8" ry="12" fill={skinColor} opacity="0.9" />
        <ellipse cx="150" cy="120" rx="8" ry="12" fill={skinColor} opacity="0.9" />

        {/* Hair (back layer) */}
        {hairStyle !== 'bald' && hairStyle !== 'buzz' && (
          <g>
            {hairStyle === 'short' && (
              <path d="M65 80 Q100 50 135 80 L135 95 Q100 75 65 95 Z" fill={currentHairColor} />
            )}
            {hairStyle === 'long' && (
              <path d="M60 75 Q100 45 140 75 L145 160 Q100 150 55 160 Z" fill={currentHairColor} />
            )}
            {hairStyle === 'bun' && (
              <>
                <path d="M70 85 Q100 60 130 85 L130 100 Q100 90 70 100 Z" fill={currentHairColor} />
                <circle cx="100" cy="70" r="20" fill={currentHairColor} />
              </>
            )}
            {hairStyle === 'curly' && (
              <path d="M55 80 Q65 50 75 70 Q85 50 95 70 Q105 50 115 70 Q125 50 135 70 Q145 50 145 85 L145 105 Q100 85 55 105 Z" fill={currentHairColor} />
            )}
            {hairStyle === 'pixie' && (
              <path d="M70 90 Q80 60 90 85 Q100 55 110 85 Q120 60 130 90 L125 105 Q100 95 75 105 Z" fill={currentHairColor} />
            )}
            {hairStyle === 'wavy' && (
              <path d="M58 78 Q75 55 92 75 Q108 55 125 75 Q142 55 142 80 L142 140 Q100 130 58 140 Z" fill={currentHairColor} />
            )}
          </g>
        )}

        {/* Hair (buzz cut) */}
        {hairStyle === 'buzz' && (
          <ellipse cx="100" cy="90" rx="52" ry="30" fill={currentHairColor} opacity="0.6" />
        )}

        {/* Eyebrows */}
        <g>
          {eyebrowStyle === 'default' && (
            <>
              <path d="M75 105 Q82 102 90 105" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M110 105 Q118 102 125 105" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {eyebrowStyle === 'raised' && (
            <>
              <path d="M75 100 Q82 95 90 100" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M110 100 Q118 95 125 100" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {eyebrowStyle === 'angry' && (
            <>
              <path d="M75 108 Q82 102 90 105" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M110 105 Q118 102 125 108" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {eyebrowStyle === 'flat' && (
            <>
              <line x1="75" y1="105" x2="90" y2="105" stroke="#2C1B18" strokeWidth="3" strokeLinecap="round" />
              <line x1="110" y1="105" x2="125" y2="105" stroke="#2C1B18" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Eyes */}
        <motion.g
          animate={{ scaleY: isBlinking ? 0.1 : 1 }}
          transition={{ duration: 0.1 }}
        >
          {eyeStyle === 'default' && (
            <>
              <circle cx="82" cy="115" r="6" fill="white" />
              <circle cx="82" cy="115" r="4" fill="#2C1B18" />
              <circle cx="83" cy="114" r="1.5" fill="white" />
              <circle cx="118" cy="115" r="6" fill="white" />
              <circle cx="118" cy="115" r="4" fill="#2C1B18" />
              <circle cx="119" cy="114" r="1.5" fill="white" />
            </>
          )}
          {eyeStyle === 'happy' && (
            <>
              <path d="M76 112 Q82 118 88 112" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M112 112 Q118 118 124 112" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {eyeStyle === 'wink' && (
            <>
              <path d="M76 115 Q82 118 88 115" stroke="#2C1B18" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="118" cy="115" r="6" fill="white" />
              <circle cx="118" cy="115" r="4" fill="#2C1B18" />
              <circle cx="119" cy="114" r="1.5" fill="white" />
            </>
          )}
          {eyeStyle === 'surprised' && (
            <>
              <circle cx="82" cy="115" r="8" fill="white" />
              <circle cx="82" cy="115" r="5" fill="#2C1B18" />
              <circle cx="83" cy="113" r="2" fill="white" />
              <circle cx="118" cy="115" r="8" fill="white" />
              <circle cx="118" cy="115" r="5" fill="#2C1B18" />
              <circle cx="119" cy="113" r="2" fill="white" />
            </>
          )}
        </motion.g>

        {/* Nose */}
        <path d="M100 125 Q98 132 100 135" stroke={skinColor} strokeWidth="2" fill="none" filter="brightness(0.8)" />

        {/* Mouth */}
        <g>
          {mouthStyle === 'smile' && (
            <path d="M85 145 Q100 155 115 145" stroke="#8B4545" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {mouthStyle === 'laugh' && (
            <>
              <path d="M85 145 Q100 158 115 145" stroke="#8B4545" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M88 147 Q100 155 112 147" fill="white" opacity="0.8" />
            </>
          )}
          {mouthStyle === 'neutral' && (
            <line x1="88" y1="148" x2="112" y2="148" stroke="#8B4545" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {mouthStyle === 'smirk' && (
            <path d="M85 148 Q95 150 110 145" stroke="#8B4545" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
        </g>

        {/* Facial Hair */}
        {facialHair === 'stubble' && (
          <ellipse cx="100" cy="155" rx="25" ry="12" fill="#2C1B18" opacity="0.2" />
        )}
        {facialHair === 'beard' && (
          <path d="M70 140 Q70 165 100 170 Q130 165 130 140" fill="#2C1B18" opacity="0.8" />
        )}
        {facialHair === 'mustache' && (
          <path d="M80 142 Q90 138 100 140 Q110 138 120 142" fill="#2C1B18" opacity="0.8" />
        )}

        {/* Accessories */}
        {accessory === 'glasses' && (
          <g>
            <circle cx="82" cy="115" r="12" fill="none" stroke="#2C1B18" strokeWidth="2.5" />
            <circle cx="118" cy="115" r="12" fill="none" stroke="#2C1B18" strokeWidth="2.5" />
            <line x1="94" y1="115" x2="106" y2="115" stroke="#2C1B18" strokeWidth="2.5" />
            <line x1="70" y1="115" x2="75" y2="112" stroke="#2C1B18" strokeWidth="2.5" />
            <line x1="130" y1="115" x2="125" y2="112" stroke="#2C1B18" strokeWidth="2.5" />
          </g>
        )}
        {accessory === 'sunglasses' && (
          <g>
            <rect x="70" y="107" width="25" height="16" rx="8" fill="#2C1B18" opacity="0.8" />
            <rect x="105" y="107" width="25" height="16" rx="8" fill="#2C1B18" opacity="0.8" />
            <line x1="95" y1="115" x2="105" y2="115" stroke="#2C1B18" strokeWidth="2.5" />
          </g>
        )}
        {accessory === 'hat' && (
          <g>
            <ellipse cx="100" cy="75" rx="45" ry="8" fill="#2C1B18" />
            <rect x="70" y="55" width="60" height="20" rx="8" fill="#2C1B18" />
          </g>
        )}
      </motion.svg>
    );
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`${isMobileView ? 'w-full h-full' : 'w-full max-w-2xl h-[90vh]'} flex flex-col ${
        isDark ? 'bg-[#1a1d29]' : 'bg-white'
      } ${isMobileView ? '' : 'rounded-3xl shadow-2xl overflow-hidden'}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {activeTab === 'create' ? 'Create Your Avatar' : 'Upload Photo'}
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

      {/* Tabs */}
      <div className={`flex border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 py-3 text-sm font-semibold relative transition-colors ${
            activeTab === 'create'
              ? isDark ? 'text-white' : 'text-slate-900'
              : isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4 inline mr-2" />
          Create Avatar
          {activeTab === 'create' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-3 text-sm font-semibold relative transition-colors ${
            activeTab === 'upload'
              ? isDark ? 'text-white' : 'text-slate-900'
              : isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          <Camera className="w-4 h-4 inline mr-2" />
          Upload Photo
          {activeTab === 'upload' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500"
            />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'create' ? (
          <div className="flex flex-col h-full">
            {/* Avatar Preview */}
            <div className={`p-5 ${isDark ? 'bg-gradient-to-br from-purple-900/20 to-orange-900/20' : 'bg-gradient-to-br from-purple-50 to-orange-50'}`}>
              <div className="flex justify-center">
                <div className={`${isMobileView ? 'w-56 h-56' : 'w-64 h-64'}`}>
                  {renderVirtualAvatar()}
                </div>
              </div>
            </div>

            {/* Category Navigation */}
            <div className={`flex gap-2 px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} overflow-x-auto`}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg scale-105'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Customization Options */}
            <div className="flex-1 p-5 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* Skin Category */}
                  {selectedCategory === 'skin' && (
                    <div>
                      <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Skin Tone
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {skinTones.map((tone) => (
                          <motion.button
                            key={tone.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSkinTone(tone.id)}
                            className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                              skinTone === tone.id
                                ? 'ring-2 ring-purple-500 bg-purple-500/10'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700'
                                : 'bg-slate-100 hover:bg-slate-200'
                            }`}
                          >
                            <div
                              className="w-8 h-8 rounded-full border-2 border-white/20"
                              style={{ backgroundColor: tone.color }}
                            />
                            <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              {tone.name}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Face Category */}
                  {selectedCategory === 'face' && (
                    <>
                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Face Shape
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {bodies.map((b) => (
                            <motion.button
                              key={b.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setBody(b.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                body === b.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {b.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Eyes
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {eyes.map((e) => (
                            <motion.button
                              key={e.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setEyeStyle(e.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                eyeStyle === e.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {e.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Eyebrows
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {eyebrows.map((eb) => (
                            <motion.button
                              key={eb.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setEyebrowStyle(eb.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                eyebrowStyle === eb.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {eb.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Mouth
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {mouths.map((m) => (
                            <motion.button
                              key={m.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setMouthStyle(m.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                mouthStyle === m.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {m.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hair Category */}
                  {selectedCategory === 'hair' && (
                    <>
                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Hair Style
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {hairStyles.map((h) => (
                            <motion.button
                              key={h.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setHairStyle(h.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                hairStyle === h.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {h.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Hair Color
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {hairColors.map((hc) => (
                            <motion.button
                              key={hc.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setHairColor(hc.id)}
                              className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                                hairColor === hc.id
                                  ? 'ring-2 ring-purple-500 bg-purple-500/10'
                                  : isDark
                                  ? 'bg-slate-800 hover:bg-slate-700'
                                  : 'bg-slate-100 hover:bg-slate-200'
                              }`}
                            >
                              <div
                                className="w-8 h-8 rounded-full border-2 border-white/20"
                                style={{ backgroundColor: hc.color }}
                              />
                              <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {hc.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Facial Hair
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {facialHairs.map((fh) => (
                            <motion.button
                              key={fh.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFacialHair(fh.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                facialHair === fh.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {fh.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Body Category */}
                  {selectedCategory === 'body' && (
                    <>
                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Clothing
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {tops.map((t) => (
                            <motion.button
                              key={t.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setTop(t.id)}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                top === t.id
                                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {t.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Clothing Color
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {topColors.map((tc) => (
                            <motion.button
                              key={tc.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setTopColor(tc.id)}
                              className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                                topColor === tc.id
                                  ? 'ring-2 ring-purple-500 bg-purple-500/10'
                                  : isDark
                                  ? 'bg-slate-800 hover:bg-slate-700'
                                  : 'bg-slate-100 hover:bg-slate-200'
                              }`}
                            >
                              <div
                                className="w-8 h-8 rounded-full border-2 border-white/20"
                                style={{ backgroundColor: tc.color }}
                              />
                              <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {tc.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Extras Category */}
                  {selectedCategory === 'extras' && (
                    <div>
                      <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Accessories
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {accessories.map((acc) => (
                          <motion.button
                            key={acc.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAccessory(acc.id)}
                            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                              accessory === acc.id
                                ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                                : isDark
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {acc.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="p-5">
            {/* Preview */}
            <div className="mb-6">
              <p className={`text-xs font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Preview
              </p>
              <div className="flex justify-center">
                <div 
                  ref={previewRef}
                  className={`w-48 h-48 rounded-full overflow-hidden relative ${
                    isDark ? 'bg-slate-800' : 'bg-slate-200'
                  } ${uploadedImage ? 'cursor-move' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {uploadedImage ? (
                    <img 
                      src={uploadedImage} 
                      alt="Preview" 
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                      style={{
                        transform: `scale(${imageZoom})`,
                        objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                      }}
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className={`w-16 h-16 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                    </div>
                  )}
                  
                  {/* Circular grid overlay */}
                  {uploadedImage && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Drag instruction */}
              {uploadedImage && (
                <p className={`text-xs text-center mt-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Drag to reposition • Pinch or use slider to zoom
                </p>
              )}
            </div>

            {/* Zoom Control - Only show when image is uploaded */}
            {uploadedImage && (
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Zoom
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={imageZoom}
                    onChange={(e) => setImageZoom(parseFloat(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(249, 115, 22) ${((imageZoom - 1) / 2) * 100}%, ${isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)'} ${((imageZoom - 1) / 2) * 100}%, ${isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)'} 100%)`
                    }}
                  />
                  <span className={`text-xs font-medium w-8 text-right ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {imageZoom.toFixed(1)}x
                  </span>
                </div>
              </div>
            )}

            {/* Upload Button */}
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
                {uploadedImage ? 'Change Photo' : 'Upload Photo'}
              </span>
            </button>
            <p className={`text-xs text-center mt-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Recommended: Square image, at least 400x400px
            </p>
          </div>
        )}
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
            disabled={activeTab === 'upload' && !uploadedImage}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              (activeTab === 'upload' && uploadedImage) || activeTab === 'create'
                ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg'
                : isDark
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Save Avatar
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
