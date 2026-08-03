import React from 'react';
import { Bookmark, Trash2, Film, Newspaper } from 'lucide-react';
import { Movie, NewsItem, Language } from '../types';

interface BookmarksSectionProps {
  bookmarks: any[];
  language: Language;
  onRemoveBookmark: (item: any) => void;
  onSelectMovie: (movie: Movie) => void;
  onClearAll: () => void;
}

export const BookmarksSection: React.FC<BookmarksSectionProps> = ({
  bookmarks,
  language,
  onRemoveBookmark,
  onSelectMovie,
  onClearAll,
}) => {
  const isTe = language === 'te';

  if (bookmarks.length === 0) {
    return (
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 shadow-xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-amber-500 mb-4">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="font-serif-display text-2xl font-extrabold text-white">
          {isTe ? 'సేవ్ చేసిన అంశాలు లేవు' : 'No Bookmarks Saved Yet'}
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2">
          {isTe
            ? 'సినిమాలు లేదా వార్తలపై సేవ్ బటన్ క్లిక్ చేసి ఇక్కడ భద్రపరుచుకోండి.'
            : 'Click the bookmark icon on any movie card or news article to save it for quick access later.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500" />
          <h2 className="font-serif-display text-2xl font-extrabold text-white">
            {isTe ? 'సేవ్ చేసిన అంశాలు' : 'Saved Bookmarks'} ({bookmarks.length})
          </h2>
        </div>

        <button
          onClick={onClearAll}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isTe ? 'అన్నీ తీసివేయి' : 'Clear All'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((item, idx) => {
          const title = isTe && item.title_te ? item.title_te : (item.title || item.headline);
          const isNews = item.type === 'news';

          return (
            <div
              key={idx}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isNews ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {isNews ? 'News' : 'Movie'}
                  </span>

                  <button
                    onClick={() => onRemoveBookmark(item)}
                    className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 
                  onClick={() => !isNews && onSelectMovie(item)}
                  className={`font-serif-display text-base font-bold text-white line-clamp-2 ${!isNews ? 'cursor-pointer hover:text-amber-400' : ''}`}
                >
                  {title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                  {isTe && item.description_te ? item.description_te : (item.description || item.summary)}
                </p>
              </div>

              {!isNews && (
                <button
                  onClick={() => onSelectMovie(item)}
                  className="mt-4 w-full py-2 bg-amber-500 text-zinc-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
                >
                  {isTe ? 'వివరాలు చూడు' : 'View Details'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
