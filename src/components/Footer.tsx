import React from 'react';
import { Film, Heart, Shield, Globe } from 'lucide-react';
import { Language, NavTab } from '../types';

interface FooterProps {
  language: Language;
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setActiveTab }) => {
  const isTe = language === 'te';

  return (
    <footer className="mt-16 bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-800/60">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-bold">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-serif-display text-xl font-bold text-white">
                REEL <span className="text-amber-500 font-sans font-extrabold text-sm">N</span> REAL
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              {isTe
                ? 'రాజకీయం, క్రీడలు, సాంకేతికత మరియు సినిమాలు - సమకాలీన వార్తలు, బాక్స్ ఆఫీస్ ట్రాకింగ్, మరియు టెలుగు సినీ చరిత్ర.'
                : 'Breaking news on politics, sports, technology & entertainment, plus Tollywood box office tracking and Telugu cinema history.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs text-zinc-200 uppercase tracking-wider mb-3">
              {isTe ? 'త్వరిత లింక్‌లు' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('movies')} className="hover:text-amber-400 transition-colors">
                  {isTe ? 'సినిమాలు' : 'Movies Portal'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('boxoffice')} className="hover:text-amber-400 transition-colors">
                  {isTe ? 'బాక్స్ ఆఫీస్ ట్రాకర్' : 'Box Office Live'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('news')} className="hover:text-amber-400 transition-colors">
                  {isTe ? 'వార్తల హబ్' : 'News Hub'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-amber-400 transition-colors">
                  {isTe ? 'తెలుగు సినీ చరిత్ర' : 'Telugu Film History'}
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Disclaimer */}
          <div>
            <h4 className="font-bold text-xs text-zinc-200 uppercase tracking-wider mb-3">
              {isTe ? 'సమాచారం' : 'Portal Info'}
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              {isTe
                ? 'బాక్స్ ఆఫీస్ సమాచారం మరియు వార్తలు క్రమం తప్పకుండా అధికారిక ట్రేడ్ రిపోర్టుల ఆధారంగా అప్‌డేట్ చేయబడతాయి.'
                : 'All collection estimates and news reports are compiled from verified trade sources and official distributor bulletins.'}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Reel N Real. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for Indian Cinema & Tollywood Fans</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
