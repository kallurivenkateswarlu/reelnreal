import React, { useState } from 'react';
import { History, Award, Calendar, User, Film, Sparkles, Star } from 'lucide-react';
import { FilmHistoryItem, Language } from '../types';

interface TeluguHistorySectionProps {
  historyItems: FilmHistoryItem[];
  language: Language;
  onSelectMovie: (item: any) => void;
}

export const TeluguHistorySection: React.FC<TeluguHistorySectionProps> = ({
  historyItems,
  language,
  onSelectMovie,
}) => {
  const isTe = language === 'te';
  const [selectedDecade, setSelectedDecade] = useState<string>('all');

  const decades = [
    { id: 'all', label: isTe ? 'అన్ని యుగాలు' : 'All Decades' },
    { id: '1960s', label: '1950s - 1970s' },
    { id: '1980s', label: '1980s - 1990s' },
    { id: '2000s', label: '2000s - 2010s' },
    { id: '2020s', label: '2020s+' },
  ];

  const filteredItems = historyItems.filter((item) => {
    if (selectedDecade === 'all') return true;
    const year = item.year || parseInt(item.release) || 2000;
    if (selectedDecade === '1960s') return year < 1980;
    if (selectedDecade === '1980s') return year >= 1980 && year < 2000;
    if (selectedDecade === '2000s') return year >= 2000 && year < 2020;
    if (selectedDecade === '2020s') return year >= 2020;
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-950 p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isTe ? 'తెలుగు సినీ వైభవం' : 'Golden Legacy of Tollywood'}
          </div>

          <h2 className="font-serif-display text-2xl sm:text-4xl font-extrabold text-white">
            {isTe ? 'తెలుగు సినీ చరిత్ర మైలురాళ్లు' : 'Landmarks of Telugu Cinema History'}
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
            {isTe
              ? '1950ల నుంచి నేటి గ్లోబల్ ఆస్కార్ విరామం వరకు తెలుగు సినిమాను ప్రపంచ వేదికపై నిలిపిన క్లాసిక్స్.'
              : 'From 1950s mythological masterpieces to modern Oscar-winning global cinema, explore iconic films that redefined Indian cinema.'}
          </p>
        </div>
      </div>

      {/* Decade Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
        {decades.map((dec) => (
          <button
            key={dec.id}
            onClick={() => setSelectedDecade(dec.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedDecade === dec.id
                ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {dec.label}
          </button>
        ))}
      </div>

      {/* History Timeline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => {
          const title = isTe && item.title_te ? item.title_te : item.title;
          const genre = isTe && item.genre_te ? item.genre_te : item.genre;
          const description = isTe && item.description_te ? item.description_te : item.description;
          const collections = isTe && item.collections_te ? item.collections_te : item.collections;

          return (
            <div
              key={idx}
              onClick={() => onSelectMovie({ ...item, category: 'Telugu History' })}
              className="group bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Image Banner */}
              <div className="relative aspect-[16/9] w-full bg-zinc-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Release Year Tag */}
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 font-black text-xs">
                  {item.year || item.release}
                </div>

                {/* Rating Badge */}
                {item.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-400 font-extrabold text-xs border border-zinc-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">{genre}</p>

                  <div className="space-y-1.5 mt-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{item.cast}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{item.director}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Footer Milestone */}
                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-black text-[11px] uppercase tracking-wider">
                    {collections}
                  </span>
                  <span className="text-zinc-500 text-[11px] group-hover:text-amber-400 transition-colors font-bold">
                    {isTe ? 'వివరాలు చూడు' : 'Explore'} →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
