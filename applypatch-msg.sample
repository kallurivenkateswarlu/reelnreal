import React from 'react';
import { TrendingUp, Flame, Award, DollarSign, ArrowUpRight, BarChart3, AlertCircle } from 'lucide-react';
import { BoxOfficeItem, Language } from '../types';

interface BoxOfficeSectionProps {
  items: BoxOfficeItem[];
  top5: { rank: number; title: string; collections: string; trend: string }[];
  updates: { title: string; tag: string; summary: string }[];
  language: Language;
}

export const BoxOfficeSection: React.FC<BoxOfficeSectionProps> = ({
  items,
  top5,
  updates,
  language,
}) => {
  const isTe = language === 'te';

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-950 p-6 sm:p-8 border border-amber-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            {isTe ? 'లైవ్ ట్రేడ్ రిపోర్ట్' : 'Real-Time Box Office Tracker'}
          </div>

          <h2 className="font-serif-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isTe ? 'బాక్స్ ఆఫీస్ విశ్లేషణ & వసూళ్లు' : 'Official Trade Analytics & Collections'}
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
            {isTe
              ? 'ఆంధ్రప్రదేశ్, తెలంగాణ మరియు ప్రపంచవ్యాప్త మార్కెట్లలో సినిమాల నిజ-సమయ కలెక్షన్ల లెక్కలు.'
              : 'Verified theatre collections, pre-sales tracking, and breakeven milestones across Nizam, Ceeded, AP & Overseas.'}
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group relative bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all duration-300 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {item.tag || 'Trade'}
                </span>
                <span className="text-[11px] font-extrabold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {item.status}
                </span>
              </div>

              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold line-clamp-1">
                {isTe && item.title_te ? item.title_te : item.title}
              </h4>

              <div className="mt-2 text-xl sm:text-2xl font-black text-white gold-gradient-text">
                {item.total}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <span>{isTe ? 'AP/TS షేర్' : 'AP/TS'}: {item.apTsCollection || '₹ 58.4 Cr'}</span>
              <span>{isTe ? 'వరల్డ్‌వైడ్' : 'WW'}: {item.wwCollection || '₹ 112 Cr'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top 5 Leaderboard & Trade Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top 5 Box Office Leaderboard */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif-display text-lg font-bold text-white">
                {isTe ? 'టాప్ 5 సినిమాల కలెక్షన్లు' : 'Current Top 5 Box Office Chart'}
              </h3>
            </div>
            <span className="text-xs text-zinc-500 font-semibold">{isTe ? 'ఈ వారం' : 'This Week'}</span>
          </div>

          <div className="space-y-3">
            {top5.map((row) => (
              <div
                key={row.rank}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                    row.rank === 1 ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30' :
                    row.rank === 2 ? 'bg-zinc-700 text-zinc-200' :
                    row.rank === 3 ? 'bg-amber-900/60 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    #{row.rank}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">{row.title}</h4>
                    <span className="text-xs text-zinc-500 font-medium">{row.trend}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-amber-400 block">{row.collections}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{isTe ? 'అధిక డిమాండ్' : 'High Traffic'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Analysis & Updates */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-4">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif-display text-lg font-bold text-white">
              {isTe ? 'ట్రేడ్ విశ్లేషణ' : 'Trade Insights'}
            </h3>
          </div>

          <div className="space-y-4">
            {updates.map((up, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400">
                  {up.tag}
                </span>
                <h4 className="font-bold text-xs text-zinc-100 mt-2">{up.title}</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{up.summary}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
