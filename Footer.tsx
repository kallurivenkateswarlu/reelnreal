import React, { useState } from 'react';
import { Newspaper, Share2, Clock, Bookmark, BookmarkCheck, Tag, ExternalLink } from 'lucide-react';
import { NewsItem, Language } from '../types';

interface NewsSectionProps {
  politicalNews: NewsItem[];
  localNews: NewsItem[];
  language: Language;
  onToggleBookmark: (item: any) => void;
  isBookmarked: (id: any) => boolean;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  politicalNews,
  localNews,
  language,
  onToggleBookmark,
  isBookmarked,
}) => {
  const isTe = language === 'te';
  const [filter, setFilter] = useState<'all' | 'political' | 'local'>('all');

  const allItems = [
    ...politicalNews.map(n => ({ ...n, section: 'Political' })),
    ...localNews.map(n => ({ ...n, section: 'Local' }))
  ];

  const filteredItems = filter === 'all'
    ? allItems
    : filter === 'political'
      ? politicalNews.map(n => ({ ...n, section: 'Political' }))
      : localNews.map(n => ({ ...n, section: 'Local' }));

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Newspaper className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif-display text-2xl font-extrabold text-white">
              {isTe ? 'వార్తల సమాచారం' : 'News Hub & Updates'}
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            {isTe ? 'తాజా రాజకీయ, జాతీయ మరియు ప్రాంతీయ వినోద వార్తలు' : 'Verified political, national, and local entertainment news updates'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'all' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isTe ? 'అన్నీ' : 'All News'}
          </button>
          <button
            onClick={() => setFilter('political')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'political' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isTe ? 'రాజకీయాలు' : 'Political'}
          </button>
          <button
            onClick={() => setFilter('local')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'local' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isTe ? 'ప్రాంతీయ' : 'Local'}
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item, idx) => {
          const headline = isTe && item.headline_te ? item.headline_te : (item.headline || item.title);
          const summary = isTe && item.summary_te ? item.summary_te : item.summary;
          const bookmarked = isBookmarked(item.id || headline);

          return (
            <article
              key={item.id || idx}
              className="group bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              {/* Media Image */}
              {item.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-zinc-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                      {item.category || item.section}
                    </span>
                  </div>
                </div>
              )}

              {/* News Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time || '1 hour ago'}</span>
                    <span>•</span>
                    <span>{item.readTime || '3 min read'}</span>
                  </div>

                  <h3 className="font-serif-display text-base sm:text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {headline}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {summary}
                  </p>
                </div>

                {/* News Footer Actions */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-amber-500 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    {isTe ? 'పూర్తి కథనం చదవండి' : 'Read Full Story'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={() => onToggleBookmark({ ...item, type: 'news', title: headline })}
                    className="p-1.5 rounded-lg bg-zinc-950 text-zinc-400 hover:text-amber-400 transition-colors"
                  >
                    {bookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
