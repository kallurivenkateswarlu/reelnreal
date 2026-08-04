import React from 'react';
import { Film, TrendingUp, Newspaper, History, Bookmark, Settings, Search, Globe, Flame } from 'lucide-react';
import { NavTab, Language, WordPressConfig } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarksCount: number;
  onOpenSettings: () => void;
  wpConfig: WordPressConfig;
  liveTickerText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  bookmarksCount,
  onOpenSettings,
  wpConfig,
  liveTickerText = "Peddi Worldwide Opening Pre-Sales Cross ₹50 Cr Target • RRR Crosses 1,380 Cr • Pushpa 2 All-time Hit",
}) => {
  const isTe = language === 'te';

  const navItems = [
    {
      id: 'news' as NavTab,
      label: isTe ? 'వార్తలు' : 'NEWS',
      icon: Newspaper,
    },
    {
      id: 'movies' as NavTab,
      label: isTe ? 'సినిమాలు' : 'MOVIES',
      icon: Film,
    },
    {
      id: 'bookmarks' as NavTab,
      label: isTe ? 'సేవ్ చేసినవి' : 'Saved',
      icon: Bookmark,
      count: bookmarksCount,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl">
      {/* Live Ticker Bar */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-1 px-4 text-xs font-medium text-amber-300 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 pr-4 bg-zinc-950/40 py-0.5 px-2 rounded font-bold uppercase tracking-wider text-[10px] text-red-400">
          <Flame className="w-3.5 h-3.5 animate-pulse text-red-500" />
          {isTe ? 'ఆఖరు వార్త' : 'BREAKING NEWS'}
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="inline-block animate-marquee pl-4">
            {isTe 
              ? 'సమాచార కేంద్రానికి స్వాగతం: రాజకీయ, క్రీడ, సాంకేతిక, వినోదం' 
              : 'Welcome to News Hub - Politics • Sports • Technology • Entertainment'}
          </div>
        </div>
      </div>

      {/* Main Topbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('movies')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Film className="w-6 h-6 text-zinc-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  REEL <span className="text-amber-500 font-sans font-extrabold text-sm sm:text-base tracking-widest mx-0.5">N</span> REAL
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold -mt-1">
                {isTe ? 'వార్త • సినిమా • చరిత్ర' : 'News • Movies • Culture'}
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTe ? 'సినిమా, నటుడు, వార్త శోధించండి...' : 'Search movies, actors, box office...'}
              className="w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 rounded-full pl-10 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 rounded-full px-1.5 py-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2.5 py-1 rounded-md transition-all font-telugu ${
                  language === 'te'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* WordPress CMS Settings Button */}
            <button
              onClick={onOpenSettings}
              title="WordPress CMS Integration Settings"
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                wpConfig.contentSource === 'wordpress'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-zinc-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">
                {wpConfig.contentSource === 'wordpress' ? 'WP Active' : 'CMS Sync'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isTe ? 'సినిమా, నటుడు, వార్త శోధించండి...' : 'Search movies, box office, news...'}
            className="w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 rounded-lg pl-10 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-amber-500/60 transition-all"
          />
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-3 pt-2 border-t border-zinc-800/60 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase ${
                      isActive ? 'bg-zinc-950 text-amber-400' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-zinc-950 text-amber-400' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
