import React, { useState } from 'react';
import { X, Globe, CheckCircle2, AlertCircle, RefreshCw, Server, Lock, Key, Save } from 'lucide-react';
import { WordPressConfig, Language } from '../types';
import { testWordPressConnection } from '../services/contentFetcher';

interface WpConfigModalProps {
  config: WordPressConfig;
  language: Language;
  onSave: (newConfig: WordPressConfig) => void;
  onClose: () => void;
}

export const WpConfigModal: React.FC<WpConfigModalProps> = ({
  config,
  language,
  onSave,
  onClose,
}) => {
  const isTe = language === 'te';

  const [baseUrl, setBaseUrl] = useState(config.baseUrl || 'https://demo.reelnreal.com');
  const [username, setUsername] = useState(config.username || '');
  const [appPassword, setAppPassword] = useState(config.appPassword || '');
  const [contentSource, setContentSource] = useState<'json' | 'wordpress'>(config.contentSource || 'json');
  
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    const result = await testWordPressConnection({
      baseUrl,
      username,
      appPassword,
      contentSource,
      isConnected: false,
    });

    setTesting(false);
    setTestResult(result);
  };

  const handleSaveConfig = () => {
    const isConnected = testResult ? testResult.success : config.isConnected;
    onSave({
      baseUrl,
      username,
      appPassword,
      contentSource,
      isConnected,
      lastTested: new Date().toLocaleTimeString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-display text-xl font-bold text-white">
              {isTe ? 'వర్డ్‌ప్రెస్ కంటెంట్ సెట్టింగ్‌లు' : 'WordPress CMS Integration'}
            </h3>
            <p className="text-xs text-zinc-400">
              {isTe ? 'వర్డ్‌ప్రెస్ లేదా స్థానిక JSON ఫైల్ ద్వారా డేటా సింక్ చేయండి' : 'Configure WordPress REST API credentials & content source'}
            </p>
          </div>
        </div>

        <div className="space-y-5 text-xs">
          
          {/* Source Selection Toggle */}
          <div>
            <label className="block text-zinc-400 font-bold uppercase tracking-wider mb-2">
              {isTe ? 'కంటెంట్ మూలం' : 'Active Content Source'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContentSource('json')}
                className={`p-3 rounded-xl border text-left font-bold transition-all ${
                  contentSource === 'json'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span className="block text-sm text-white">Local site-content.json</span>
                <span className="text-[10px] text-zinc-400 font-normal">Offline Fast Local Data</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSource('wordpress')}
                className={`p-3 rounded-xl border text-left font-bold transition-all ${
                  contentSource === 'wordpress'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span className="block text-sm text-white">WordPress CMS REST API</span>
                <span className="text-[10px] text-zinc-400 font-normal">Live Remote Database</span>
              </button>
            </div>
          </div>

          {/* WordPress Base URL */}
          <div>
            <label className="block text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
              WordPress Site URL (https://)
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://your-wordpress-domain.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>
          </div>

          {/* Username & App Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                WP Admin Username
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                Application Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={appPassword}
                  onChange={(e) => setAppPassword(e.target.value)}
                  placeholder="abcd 1234 efgh 5678"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Test Connection Result Box */}
          {testResult && (
            <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
              testResult.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold transition-all text-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveConfig}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all text-xs shadow-lg shadow-amber-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isTe ? 'భద్రపరచు' : 'Save & Apply'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
