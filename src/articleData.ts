import { ArticleRecord, Movie, NewsItem, SiteContent } from '../types';

export const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const categorySlug = (category: string, type: 'movie' | 'news') => {
  const value = category.toLowerCase();
  if (type === 'movie') return 'movie-updates';
  if (value.includes('national')) return 'national-news';
  if (value.includes('andhra') || value.includes('ap')) return 'andhra-pradesh';
  if (value.includes('polit')) return 'politics';
  if (value.includes('sport')) return 'sports';
  if (value.includes('business')) return 'business';
  if (value.includes('tech') || value.includes('science')) return 'technology';
  if (value.includes('entertain')) return 'entertainment';
  return 'local-news';
};

export const movieToArticle = (movie: Movie): ArticleRecord => {
  const id = String(movie.id ?? slugify(movie.title));
  return {
    id,
    title: movie.title,
    title_te: movie.title_te,
    category: movie.category || 'Movie Updates',
    categorySlug: 'movie-updates',
    excerpt: movie.description || 'Latest movie update from Reel N Real.',
    excerpt_te: movie.description_te,
    content: movie.content || movie.description || 'More details will be published soon.',
    content_te: movie.content_te || movie.description_te,
    image: movie.image,
    publishedAt: movie.timestamp || movie.release || 'Recently updated',
    author: movie.source || 'Reel N Real Entertainment Desk',
    source: movie.source,
    type: 'movie',
    original: movie,
  };
};

export const newsToArticle = (item: NewsItem, fallbackCategory?: string): ArticleRecord => {
  const title = item.headline || item.title || 'News update';
  const id = String(item.id ?? slugify(title));
  return {
    id,
    title,
    title_te: item.headline_te || item.title_te,
    category: item.category || fallbackCategory || 'Local News',
    categorySlug: categorySlug(item.category || fallbackCategory || 'Local', 'news'),
    excerpt: item.summary || item.description || 'Read the latest update from Reel N Real.',
    excerpt_te: item.summary_te || item.description_te,
    content: item.content || item.description || item.summary || 'More details will be published soon.',
    content_te: item.content_te || item.description_te || item.summary_te,
    image: item.image,
    publishedAt: item.timestamp || item.time || 'Recently updated',
    author: item.author,
    source: item.source,
    type: 'news',
    original: item,
  };
};

export const allArticles = (content: SiteContent): ArticleRecord[] => {
  const news = [
    ...(content.politicalNews || []).map(item => newsToArticle(item, 'Politics')),
    ...(content.localNews || []).map(item => newsToArticle(item, 'Local News')),
    ...(content.sportsNews || []).map(item => newsToArticle(item, 'Sports')),
    ...(content.scienceTechNews || []).map(item => newsToArticle(item, 'Technology')),
    ...(content.businessNews || []).map(item => newsToArticle(item, 'Business')),
    ...(content.entertainmentNews || []).map(item => newsToArticle(item, 'Entertainment')),
  ];
  const movies = (content.movies || []).map(movieToArticle);
  return [...movies, ...news].filter((article, index, list) => list.findIndex(item => item.id === article.id) === index);
};
