import React, { useState } from 'react';
import { X, Star, Calendar, User, Film, Play, Share2, Bookmark, BookmarkCheck, DollarSign, Award } from 'lucide-react';
import { Movie, Language } from '../types';

interface MovieDetailModalProps {
  movie: Movie | null;
  language: Language;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (movie: Movie) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  language,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!movie) return null;

  const isTe = language === 'te';
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = isTe && movie.title_te ? movie.title_te : movie.title;
  const genre = isTe && movie.genre_te ? movie.genre_te : movie.genre;
  const status = isTe && movie.status_te ? movie.status_te : movie.status;
  const cast = isTe && movie.cast_te ? movie.cast_te : movie.cast;
  const director = isTe && movie.director_te ? movie.director_te : movie.director;
  const description = isTe && movie.description_te ? movie.description_te : movie.description;
  const collections = isTe && movie.collections_te ? movie.collections_te : movie.collections;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `${title} - ${genre} Movie Details on Reel N Real`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-8 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-950/80 border border-zinc-700/80 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Media Area */}
        <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
          {isPlayingTrailer ? (
            <iframe
              src={`${movie.trailerUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}?autoplay=1`}
              title={`${title} Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={movie.image}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
              
              {/* Play Trailer Overlay Button */}
              <button
                onClick={() => setIsPlayingTrailer(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-zinc-950 ml-1" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-300 border border-amber-500/30">
                  {isTe ? 'ట్రైలర్ ప్లే చేయండి' : 'Watch Official Trailer'}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {movie.category}
                </span>
                <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
                  <Film className="w-3.5 h-3.5 text-zinc-500" />
                  {movie.industry || 'Tollywood'}
                </span>
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-white">
                {title}
              </h2>
              <p className="text-sm text-amber-400 font-semibold mt-1">{status}</p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleBookmark(movie)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isBookmarked
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isBookmarked ? (isTe ? 'సేవ్ అయ్యింది' : 'Bookmarked') : (isTe ? 'సేవ్ చేయండి' : 'Save')}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied!' : (isTe ? 'షేర్' : 'Share')}</span>
              </button>
            </div>
          </div>

          {/* Key Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">{isTe ? 'రేటింగ్' : 'Rating'}</span>
              <div className="flex items-center gap-1 mt-1 text-amber-400 font-black text-base">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{movie.rating || '8.5/10'}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">{isTe ? 'విడుదల' : 'Release'}</span>
              <div className="flex items-center gap-1 mt-1 text-zinc-200 font-bold text-sm">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>{movie.release}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">{isTe ? 'జానర్' : 'Genre'}</span>
              <span className="mt-1 text-zinc-200 font-bold text-sm block truncate">{genre}</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">{isTe ? 'వసూళ్లు' : 'Collections'}</span>
              <div className="flex items-center gap-1 mt-1 text-emerald-400 font-extrabold text-sm truncate">
                <DollarSign className="w-4 h-4" />
                <span>{collections}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-extrabold mb-2">
              {isTe ? 'సినిమా సారాంశం' : 'Plot Summary'}
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/30 p-4 rounded-xl border border-zinc-800/50">
              {description}
            </p>
          </div>

          {/* Cast & Crew */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block mb-1">{isTe ? 'నటీనటులు' : 'Cast'}</span>
              <div className="flex items-center gap-2 text-sm text-zinc-200 font-semibold">
                <User className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{cast}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block mb-1">{isTe ? 'దర్శకత్వం' : 'Director'}</span>
              <div className="flex items-center gap-2 text-sm text-zinc-200 font-semibold">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{director}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
