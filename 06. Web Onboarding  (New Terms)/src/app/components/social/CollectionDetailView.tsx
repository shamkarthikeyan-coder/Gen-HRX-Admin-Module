import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, Edit3, Settings, Bookmark, MoreVertical, Share2, ThumbsUp, MessageSquare, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface SavedPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    title: string;
    isVerified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  type: 'text' | 'article';
}

interface Collection {
  id: number;
  name: string;
  pins: number;
  timeAgo: string;
  posts: SavedPost[];
  items: {
    type: 'image' | 'text';
    url?: string;
    content?: string;
  }[];
}

interface CollectionDetailViewProps {
  collection: Collection;
  onBack: () => void;
  onEdit: () => void;
  onSettings: () => void;
  onUnsave: (postId: string) => void;
  isSaved: (postId: string) => boolean;
}

export function CollectionDetailView({ collection, onBack, onEdit, onSettings, onUnsave, isSaved }: CollectionDetailViewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ml-[72px] ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
      <div className="w-full max-w-[600px] mx-auto">
        {/* Header */}
        <div className={`sticky top-0 z-30 border-b ${
          isDark ? 'border-slate-800 bg-[#1a1d29]' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center px-4 py-3 gap-3">
            <button onClick={onBack} className="shrink-0">
              <ChevronLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
            </button>
            <h2 className={`flex-1 text-lg font-semibold text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {collection.name}
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={onEdit}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <Edit3 className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </button>
              <button 
                onClick={onSettings}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <Settings className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className={`px-4 py-6 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
          <div className="flex items-center gap-4">
            {/* Collection Thumbnail - 4-grid preview */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden grid grid-cols-2 gap-0.5 shrink-0">
              {collection.items.slice(0, 4).map((item, idx) => (
                <div key={idx} className={`${
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                } flex items-center justify-center`}>
                  {item.type === 'image' && item.url ? (
                    <img 
                      src={item.url} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-1">
                      <span className={`text-[8px] leading-tight text-center ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {item.type === 'text' ? item.content?.slice(0, 20) : ''}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex-1">
              <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {collection.pins} saved items
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Last updated {collection.timeAgo}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {collection.posts.map((post) => (
            <div 
              key={post.id}
              className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}
            >
              {/* Post Header */}
              <div className="px-4 pt-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img 
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className={`font-semibold text-base truncate ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {post.author.name}
                        </h4>
                        {post.author.isVerified && (
                          <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {post.author.title} · {post.timeAgo}
                      </p>
                    </div>
                    {/* Article Badge */}
                    {post.type === 'article' && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 shrink-0">
                        <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-purple-600">Article</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="mt-3">
                  <img 
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Article Title and Content (for articles) */}
              {post.type === 'article' && (
                <div className="px-4 pt-3">
                  <h3 className={`text-xl font-bold mb-2 leading-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {post.content.split('.')[0]}
                  </h3>
                  <p className={`text-sm leading-relaxed line-clamp-3 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {post.content}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                    </svg>
                    <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      5 min read
                    </span>
                  </div>
                </div>
              )}

              {/* Regular Post Content (for text posts) */}
              {post.type === 'text' && (
                <div className="px-4 pt-3">
                  <p className={`text-base leading-relaxed ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {post.content}
                  </p>
                </div>
              )}

              {/* Post Actions */}
              <div className={`px-4 py-4 flex items-center gap-6 ${
                isDark ? '' : ''
              }`}>
                <button className="flex items-center gap-2 group">
                  <ThumbsUp className={`w-5 h-5 ${
                    isDark ? 'text-slate-400 group-hover:text-purple-400' : 'text-slate-500 group-hover:text-purple-600'
                  } transition-colors`} />
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {post.likes}
                  </span>
                </button>

                <button className="flex items-center gap-2 group">
                  <MessageSquare className={`w-5 h-5 ${
                    isDark ? 'text-slate-400 group-hover:text-purple-400' : 'text-slate-500 group-hover:text-purple-600'
                  } transition-colors`} />
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {post.comments}
                  </span>
                </button>

                <button className="flex items-center gap-2 group">
                  <Share2 className={`w-5 h-5 ${
                    isDark ? 'text-slate-400 group-hover:text-purple-400' : 'text-slate-500 group-hover:text-purple-600'
                  } transition-colors`} />
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    0
                  </span>
                </button>

                <button 
                  onClick={() => onUnsave(post.id)}
                  className="flex items-center gap-2 group ml-auto"
                >
                  <Bookmark className={`w-5 h-5 ${
                    isSaved(post.id) 
                      ? 'text-purple-600 fill-purple-600' 
                      : isDark ? 'text-slate-400' : 'text-slate-500'
                  } transition-colors`} />
                </button>
              </div>

              {/* Separator between posts */}
              <div className={`h-2 ${isDark ? 'bg-slate-800/30' : 'bg-slate-100'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}