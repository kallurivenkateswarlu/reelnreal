export type Language = 'en' | 'te';

export type NavTab = 'movies' | 'boxoffice' | 'news' | 'history' | 'bookmarks';

export interface Movie {
  id?: string | number;
  title: string;
  title_te?: string;
  release: string;
  category: string;
  genre: string;
  genre_te?: string;
  status: string;
  status_te?: string;
  reportType?: string;
  reportType_te?: string;
  platform?: string;
  cast: string;
  cast_te?: string;
  director: string;
  director_te?: string;
  rating: string;
  description: string;
  description_te?: string;
  content?: string;
  content_te?: string;
  collections: string;
  collections_te?: string;
  industry: string;
  image?: string;
  trailerUrl?: string;
  featured?: boolean;
  source?: string;
  timestamp?: string;
}

export interface NewsItem {
  id?: string | number;
  headline?: string;
  headline_te?: string;
  title?: string;
  title_te?: string;
  summary?: string;
  summary_te?: string;
  description?: string;
  description_te?: string;
  content?: string;
  content_te?: string;
  category: string;
  time?: string;
  timestamp?: string;
  image?: string;
  readTime?: string;
  source?: string;
  author?: string;
  featured?: boolean;
}

export interface ArticleRecord {
  id: string;
  title: string;
  title_te?: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  excerpt_te?: string;
  content: string;
  content_te?: string;
  image?: string;
  publishedAt: string;
  author?: string;
  source?: string;
  type: 'movie' | 'news';
  original: Movie | NewsItem;
}

export interface BoxOfficeItem {
  id?: string | number;
  title: string;
  title_te?: string;
  total: string;
  status: string;
  tag?: string;
  url?: string;
  apTsCollection?: string;
  wwCollection?: string;
  label?: string;
}

export interface FilmHistoryItem {
  title: string;
  title_te?: string;
  release: string;
  year: number;
  category?: string;
  genre: string;
  genre_te?: string;
  status?: string;
  cast: string;
  director: string;
  rating: string;
  description: string;
  description_te?: string;
  collections: string;
  collections_te?: string;
  image: string;
  industry?: string;
}

export interface SiteContent {
  movies: Movie[];
  politicalNews: NewsItem[];
  localNews: NewsItem[];
  sportsNews?: NewsItem[];
  scienceTechNews?: NewsItem[];
  businessNews?: NewsItem[];
  entertainmentNews?: NewsItem[];
  featuredStories: { title: string; tag: string; summary: string; image?: string }[];
  boxOfficeLive: BoxOfficeItem[];
  boxOfficeUpdates: { title: string; tag: string; summary: string }[];
  topStories: { title: string; tag: string; summary: string }[];
  boxOfficeTop5: { rank: number; title: string; collections: string; trend: string }[];
  teluguFilmHistory: FilmHistoryItem[];
}

export interface WordPressConfig {
  baseUrl: string;
  username: string;
  appPassword: string;
  contentSource: 'json' | 'wordpress';
  isConnected: boolean;
  lastTested?: string;
  error?: string;
}
