import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { MovieCard } from './components/MovieCard';
import { MovieDetailModal } from './components/MovieDetailModal';
import { BoxOfficeSection } from './components/BoxOfficeSection';
import { NewsSection } from './components/NewsSection';
import { TeluguHistorySection } from './components/TeluguHistorySection';
import { BookmarksSection } from './components/BookmarksSection';
import { WpConfigModal } from './components/WpConfigModal';
import { Footer } from './components/Footer';

import { Movie, NavTab, Language, WordPressConfig, SiteContent } from './types';
import { fallbackData } from './data/initialData';
import { fetchSiteContent, getStoredWpConfig, saveWpConfig } from './services/contentFetcher';
import { Film, Filter, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';

const BOOKMARKS_STORAGE_KEY = 'reelnreal_saved_bookmarks';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('news');
  const [language, setLanguage] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [siteContent, setSiteContent] = useState<SiteContent>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [wpConfig, setWpConfig] = useState<WordPressConfig>(getStoredWpConfig());
  const [isWpModalOpen, setIsWpModalOpen] = useState<boolean>(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  // Load Content from Source (JSON or WordPress)
  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await fetchSiteContent(wpConfig);
      setSiteContent(data);
    } catch (err) {
      console.error('Failed loading content', err);
      setSiteContent(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [wpConfig.contentSource, wpConfig.baseUrl]);

  // Toggle Bookmark
  const handleToggleBookmark = (item: any) => {
    const itemKey = item.id || item.title || item.headline;
    const exists = bookmarks.some(b => (b.id || b.title || b.headline) === itemKey);

    if (exists) {
      setBookmarks(prev => prev.filter(b => (b.id || b.title || b.headline) !== itemKey));
    } else {
      setBookmarks(prev => [...prev, item]);
    }
  };

  const isBookmarked = (itemKey: any) => {
    return bookmarks.some(b => (b.id || b.title || b.headline) === itemKey);
  };

  // Filtered Movies
  const filteredMovies = useMemo(() => {
    const movies = siteContent?.movies || fallbackData.movies;
    return movies.filter(m => {
      const isTe = language === 'te';
      const title = isTe && m.title_te ? m.title_te : m.title;
      const cast = isTe && m.cast_te ? m.cast_te : m.cast;
      const genre = isTe && m.genre_te ? m.genre_te : m.genre;

      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'theaters' && !m.category?.toLowerCase().includes('theater') && !m.category?.toLowerCase().includes('theatre')) return false;
        if (selectedCategory === 'upcoming' && !m.category?.toLowerCase().includes('upcoming')) return false;
        if (selectedCategory === 'ott' && !m.category?.toLowerCase().includes('ott')) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = title?.toLowerCase().includes(q);
        const matchesCast = cast?.toLowerCase().includes(q);
        const matchesGenre = genre?.toLowerCase().includes(q);
        return matchesTitle || matchesCast || matchesGenre;
      }

      return true;
    });
  }, [siteContent, selectedCategory, searchQuery, language]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarksCount={bookmarks.length}
        onOpenSettings={() => setIsWpModalOpen(true)}
        wpConfig={wpConfig}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              {language === 'te' ? 'కంటెంట్ లోడ్ అవుతుంది...' : 'Loading Breaking News...'}
            </p>
          </div>
        ) : (
          <>
            {/* NEWS TAB (PRIMARY) */}
            {activeTab === 'news' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Hero Breaking News Header */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-950 p-6 sm:p-10 border border-red-500/20 shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-extrabold uppercase tracking-widest mb-3 border border-red-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      {language === 'te' ? 'ఆఖరు సమాచారం' : 'Breaking News'}
                    </div>

                    <h1 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                      {language === 'te' ? 'సంకలిత వార్తా కేంద్రం' : 'All News Hub - Politics, Sports, Tech & Entertainment'}
                    </h1>

                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {language === 'te'
                        ? 'రాజకీయ వార్తలు, క్రీడా సమాచారం, సాంకేతిక నవీకరణలు, సినీ సংచికలు మరియు స్థానిక సమాచారం.'
                        : 'Latest updates on politics, sports, science & technology, entertainment, movies, and local news from around the world.'}
                    </p>
                  </div>
                </div>

                {/* Render NewsSection directly (covers all news categories) */}
                <NewsSection
                  politicalNews={siteContent?.politicalNews || fallbackData.politicalNews}
                  localNews={siteContent?.localNews || fallbackData.localNews}
                  language={language}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isBookmarked}
                />
              </div>
            )}

            {/* MOVIES TAB (SECONDARY) */}
            {activeTab === 'movies' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Hero Movies Header */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-950 p-6 sm:p-10 border border-amber-500/20 shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-3 border border-amber-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {language === 'te' ? 'టోలీవుడ్ అప్‌డేట్‌లు' : 'Movie Updates'}
                    </div>

                    <h1 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                      {language === 'te' ? 'సినిమా ప్రపంచం & ప్రత్యక్ష బాక్స్ ఆఫీస్' : 'Movies & Box Office Hub'}
                    </h1>

                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {language === 'te'
                        ? 'సినిమా థియేటర్లు, ఓటిటి డిజిటల్ విడుదలలు, ముందస్తు బుకింగ్‌లు మరియు ట్రేడ్ విశ్లేషణల పూర్తి వివరాలు.'
                        : 'Explore theatrical releases, upcoming blockbusters, OTT updates, and box office collections.'}
                    </p>
                  </div>
                </div>

                {/* Category Filters Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                    <Filter className="w-4 h-4 text-amber-500 shrink-0" />
                    {[
                      { id: 'all', label: language === 'te' ? 'అన్ని సినిమాలు' : 'All Movies' },
                      { id: 'theaters', label: language === 'te' ? 'థియేటర్లలో' : 'In Theaters' },
                      { id: 'upcoming', label: language === 'te' ? 'రాబోయే చిత్రాలు' : 'Upcoming' },
                      { id: 'ott', label: language === 'te' ? 'ఓటిటి విడుదలలు' : 'OTT Releases' },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                          selectedCategory === cat.id
                            ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-zinc-500 font-semibold">
                    {filteredMovies.length} {language === 'te' ? 'సినిమాలు దొరికాయి' : 'Movies Available'}
                  </div>
                </div>

                {/* Movies Grid */}
                {filteredMovies.length === 0 ? (
                  <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
                    <Film className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <p className="text-sm font-bold">
                      {language === 'te' ? 'ఎటువంటి సినిమాలు లభించలేదు' : 'No movies match your search criteria.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMovies.map(movie => (
                      <MovieCard
                        key={movie.id || movie.title}
                        movie={movie}
                        language={language}
                        isBookmarked={isBookmarked(movie.id || movie.title)}
                        onToggleBookmark={handleToggleBookmark}
                        onSelectMovie={setSelectedMovie}
                      />
                    ))}
                  </div>
                )}
                {/* Box Office Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                    {language === 'te' ? 'బాక్స్ ఆఫీస్ లైవ్' : 'Box Office Live'}
                  </h2>
                  <BoxOfficeSection
                    items={siteContent?.boxOfficeLive || fallbackData.boxOfficeLive}
                    top5={siteContent?.boxOfficeTop5 || fallbackData.boxOfficeTop5}
                    updates={siteContent?.boxOfficeUpdates || fallbackData.boxOfficeUpdates}
                    language={language}
                  />
                </div>

                {/* Film History Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                    {language === 'te' ? 'తెలుగు సినీ చరిత్ర' : 'Telugu Film History'}
                  </h2>
                  <TeluguHistorySection
                    historyItems={siteContent?.teluguFilmHistory || fallbackData.teluguFilmHistory}
                    language={language}
                    onSelectMovie={setSelectedMovie}
                  />
                </div>
              </div>
            )}

            {/* BOOKMARKS TAB */}
            {activeTab === 'bookmarks' && (
              <BookmarksSection
                bookmarks={bookmarks}
                language={language}
                onRemoveBookmark={handleToggleBookmark}
                onSelectMovie={setSelectedMovie}
                onClearAll={() => setBookmarks([])}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setActiveTab={setActiveTab} />

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          language={language}
          onClose={() => setSelectedMovie(null)}
          isBookmarked={isBookmarked(selectedMovie.id || selectedMovie.title)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* WordPress Config Modal */}
      {isWpModalOpen && (
        <WpConfigModal
          config={wpConfig}
          language={language}
          onSave={(newCfg) => {
            setWpConfig(newCfg);
            saveWpConfig(newCfg);
          }}
          onClose={() => setIsWpModalOpen(false)}
        />
      )}
    </div>
  );
}
