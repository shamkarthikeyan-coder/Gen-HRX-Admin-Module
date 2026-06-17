import { useTheme } from '../../context/ThemeContext';
import { X, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Collection {
  id: string;
  name: string;
  itemCount: number;
  thumbnail: string;
  isTopChoice?: boolean;
}

interface SaveToCollectionModalProps {
  isOpen?: boolean;
  onClose: () => void;
  postId?: string | null;
  roomId?: string | null;
}

export function SaveToCollectionModal({ isOpen = true, onClose, postId, roomId }: SaveToCollectionModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Mock collections data
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'HR Best Practices',
      itemCount: 4,
      thumbnail: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=400',
      isTopChoice: true
    },
    {
      id: '2',
      name: 'Remote Work',
      itemCount: 3,
      thumbnail: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=400',
      isTopChoice: true
    },
    {
      id: '3',
      name: 'Performance Management',
      itemCount: 3,
      thumbnail: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=400',
      isTopChoice: false
    },
    {
      id: '4',
      name: 'Talent Acquisition',
      itemCount: 2,
      thumbnail: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=400',
      isTopChoice: false
    }
  ]);

  const topChoices = collections.filter(c => c.isTopChoice);
  const allCollections = collections;

  const filteredCollections = searchQuery
    ? allCollections.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCollections;

  const handleSelectCollection = (collectionId: string) => {
    // Update collection item count
    setCollections(prev => prev.map(c => 
      c.id === collectionId ? { ...c, itemCount: c.itemCount + 1 } : c
    ));
    
    // Close modal after brief delay to show selection
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        itemCount: 1,
        thumbnail: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=400',
        isTopChoice: false
      };
      setCollections([newCollection, ...collections]);
      setNewCollectionName('');
      setShowCreateCollection(false);
      
      // Close modal after brief delay
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

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
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-4 max-h-[85vh] rounded-t-3xl overflow-hidden ${
              isDark ? 'bg-[#242833]' : 'bg-white'
            }`}
          >
            <div className="flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className={`flex items-center justify-between px-6 py-5 border-b ${
                isDark ? 'border-[#363b4e]' : 'border-slate-200'
              }`}>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Save
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100'
                  }`}
                >
                  <X className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-6 py-6 flex-1">
                {/* Search Box */}
                <div className="mb-6">
                  <div className={`relative rounded-2xl border-2 ${
                    isDark 
                      ? 'border-purple-500/40 bg-purple-900/10' 
                      : 'border-purple-300 bg-purple-50/50'
                  }`}>
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search collections"
                      className={`w-full pl-12 pr-4 py-3.5 bg-transparent border-0 focus:outline-none ${
                        isDark 
                          ? 'text-white placeholder:text-slate-400' 
                          : 'text-slate-900 placeholder:text-slate-500'
                      }`}
                    />
                  </div>
                </div>

                {/* All Collections */}
                <div className="mb-6">
                  <h3 className={`text-base font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    All collections
                  </h3>
                  <div className="space-y-3">
                    {filteredCollections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() => handleSelectCollection(collection.id)}
                        className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-colors ${
                          isDark 
                            ? 'hover:bg-slate-700/30' 
                            : 'hover:bg-slate-100'
                        }`}
                      >
                        <img
                          src={collection.thumbnail}
                          alt={collection.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 text-left">
                          <h4 className={`font-semibold text-base ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {collection.name}
                          </h4>
                          <p className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {collection.itemCount} items
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Create Collection */}
                {showCreateCollection ? (
                  <div className={`rounded-2xl border p-4 ${
                    isDark ? 'bg-slate-700/20 border-slate-600' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <input
                      type="text"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      placeholder="Collection name"
                      autoFocus
                      className={`w-full px-4 py-3 rounded-xl border mb-3 ${
                        isDark 
                          ? 'bg-[#242833] border-[#363b4e] text-white placeholder:text-slate-400' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateCollection();
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateCollection}
                        disabled={!newCollectionName.trim()}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateCollection(false);
                          setNewCollectionName('');
                        }}
                        className={`flex-1 px-4 py-2.5 font-semibold rounded-xl transition-colors ${
                          isDark 
                            ? 'bg-slate-700/50 text-white hover:bg-slate-700' 
                            : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCreateCollection(true)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                      isDark 
                        ? 'hover:bg-slate-700/30' 
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isDark ? 'bg-slate-700/50' : 'bg-slate-200'
                    }`}>
                      <Plus className={`w-6 h-6 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`} />
                    </div>
                    <span className={`font-semibold text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Create collection
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}