import React, { useState } from 'react';
import { Star, Play, Bookmark, BookmarkCheck, Calendar, User, Film, ExternalLink } from 'lucide-react';
import { Movie, Language } from '../types';

interface MovieCardProps {
  movie: Movie;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  language,
  isBookmarked,
  onToggleBookmark,
  onSelectMovie,
}) => {
  const isTe = language === 'te';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const title = isTe && movie.title_te ? movie.title_te : movie.title;
  const genre = isTe && movie.genre_te ? movie.genre_te : movie.genre;
  const status = isTe && movie.status_te ? movie.status_te : movie.status;
  const cast = isTe && movie.cast_te ? movie.cast_te : movie.cast;
  const collections = isTe && movie.collections_te ? movie.collections_te : movie.collections;

  // Category Badge Color Styling
  const getCategoryBadgeClass = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'in theaters':
      case 'in theatres':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'upcoming':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'ott':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-full">
      
      {/* Poster Container */}
      <div 
        onClick={() => onSelectMovie(movie)}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-950 cursor-pointer"
      >
        {/* Skeleton Shimmer */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
            <Film className="w-8 h-8 text-zinc-700" />
          </div>
        )}

        {/* Fallback Image */}
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-amber-950/40 to-zinc-950 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">{movie.industry || 'Tollywood'}</span>
              <Film className="w-6 h-6 text-amber-500/60" />
            </div>
            <div>
              <h4 className="font-serif-display text-lg font-bold text-white line-clamp-2">{title}</h4>
              <p className="text-xs text-zinc-400 mt-1">{genre}</p>
            </div>
          </div>
        ) : (
          <img
            src={movie.image}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide border backdrop-blur-md ${getCategoryBadgeClass(movie.category)}`}>
            {movie.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(movie);
          }}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark movie'}
          className="absolute top-3 right-3 p-2 rounded-full bg-zinc-950/70 border border-zinc-700/80 text-zinc-300 hover:text-amber-400 hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>

        {/* Rating Badge */}
        {movie.rating && movie.rating !== 'N/A' && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 backdrop-blur-md text-amber-400 text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{movie.rating}</span>
          </div>
        )}

        {/* Play Trailer Hover Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-xl shadow-amber-500/40 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="w-6 h-6 fill-zinc-950 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div 
        onClick={() => onSelectMovie(movie)}
        className="p-4 sm:p-5 flex-1 flex flex-col justify-between cursor-pointer"
      >
        <div>
          {/* Status Tag */}
          <div className="flex items-center justify-between gap-2 text-xs text-amber-400 font-semibold mb-1">
            <span className="truncate">{status}</span>
            <span className="text-[11px] text-zinc-500 font-normal shrink-0 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {movie.release}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif-display text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Genre */}
          <p className="text-xs text-zinc-400 font-medium mt-1">
            {genre}
          </p>

          {/* Cast */}
          {cast && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-2 line-clamp-1">
              <User className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
              <span className="truncate">{cast}</span>
            </div>
          )}

          {/* Short Description */}
          <p className="text-xs text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
            {isTe && movie.description_te ? movie.description_te : movie.description}
          </p>
        </div>

        {/* Bottom Collection Banner */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="truncate">{collections}</span>
          </div>
          <span className="text-zinc-500 group-hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold text-[11px]">
            {isTe ? 'వివరాలు' : 'Details'}
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
