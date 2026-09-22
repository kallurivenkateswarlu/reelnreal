import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, ChevronRight, Link as LinkIcon, Mail, Share2 } from 'lucide-react';
import { ArticleRecord, Language } from '../types';

interface ArticleDetailProps {
  article: ArticleRecord;
  related: ArticleRecord[];
  language: Language;
  onOpenArticle: (article: ArticleRecord) => void;
  onNavigate: (path: string) => void;
}

const Placeholder = ({ title }: { title: string }) => (
  <div className="w-full h-full min-h-64 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 flex items-center justify-center text-center p-8">
    <div><div className="text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-3">Reel N Real</div><div className="text-zinc-400 text-sm">{title}</div></div>
  </div>
);

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, related, language, onOpenArticle, onNavigate }) => {
  const isTe = language === 'te';
  const title = isTe && article.title_te ? article.title_te : article.title;
  const body = isTe && article.content_te ? article.content_te : article.content;
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const share = async (kind?: 'x' | 'facebook') => {
    const url = window.location.href;
    if (kind === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    } else if (kind === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    } else if (navigator.share) {
      await navigator.share({ title, text: article.excerpt, url }).catch(() => {});
    } else {
      await copyLink();
    }
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [article.id]);

  return <article className="max-w-5xl mx-auto animate-fade-in">
    <button onClick={() => onNavigate('/')} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 mb-6"><ArrowLeft className="w-4 h-4" /> Back to home</button>
    <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-4"><button onClick={() => onNavigate(`/${article.categorySlug}`)}>{article.category}</button><ChevronRight className="w-3 h-3 text-zinc-600" /><span>Article</span></div>
    <h1 className="font-serif-display text-3xl sm:text-5xl font-black leading-tight text-white max-w-4xl">{title}</h1>
    <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mt-5 mb-7"><Calendar className="w-4 h-4 text-amber-500" /><span>{article.publishedAt}</span>{(article.author || article.source) && <><span>•</span><span>{article.author || article.source}</span></>}</div>
    <div className="aspect-[16/8] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-8">{article.image && !imageError ? <img src={article.image} alt={title} className="w-full h-full object-cover" loading="eager" onError={() => setImageError(true)} /> : <Placeholder title="Image unavailable" />}</div>
    <div className="flex flex-wrap gap-2 mb-8"><button onClick={() => share()} className="share-button"><Share2 className="w-4 h-4" /> {copied ? 'Copied' : 'Share'}</button><button onClick={() => share('x')} className="share-button"><span className="font-black">X</span> Post</button><button onClick={() => share('facebook')} className="share-button"><span className="font-black">f</span> Facebook</button><button onClick={() => share()} className="share-button"><Mail className="w-4 h-4" /> Email</button><button onClick={copyLink} className="share-button"><LinkIcon className="w-4 h-4" /> Copy link</button></div>
    <div className="grid lg:grid-cols-[1fr_280px] gap-10"><div className="text-[17px] leading-8 text-zinc-200 whitespace-pre-line"><p className="text-xl text-zinc-300 leading-8 mb-6">{isTe && article.excerpt_te ? article.excerpt_te : article.excerpt}</p>{body.split(/\n\n|\n/).map((paragraph, index) => <p key={index} className="mb-5">{paragraph}</p>)}</div><aside className="space-y-4"><div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5"><h3 className="text-xs uppercase tracking-widest text-amber-400 font-black mb-4">Related stories</h3>{related.slice(0, 4).map(item => <button key={item.id} onClick={() => onOpenArticle(item)} className="text-left block w-full py-3 border-b border-zinc-800 last:border-0"><span className="text-xs text-zinc-500">{item.category}</span><span className="block text-sm font-bold text-zinc-200 hover:text-amber-400 mt-1">{isTe && item.title_te ? item.title_te : item.title}</span></button>)}</div></aside></div>
  </article>;
};
