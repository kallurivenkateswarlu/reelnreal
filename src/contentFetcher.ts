import { SiteContent, WordPressConfig, Movie, NewsItem, BoxOfficeItem, FilmHistoryItem } from '../types';
import { fallbackData } from '../data/initialData';

const WP_CONFIG_KEY = 'reelnreal_wp_config';
const CONTENT_CACHE_KEY = 'reelnreal_site_content_cache';

export const getStoredWpConfig = (): WordPressConfig => {
  try {
    const saved = localStorage.getItem(WP_CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to read WP config', e);
  }
  return {
    baseUrl: 'https://demo.reelnreal.com',
    username: '',
    appPassword: '',
    contentSource: 'json',
    isConnected: false,
  };
};

export const saveWpConfig = (config: WordPressConfig): void => {
  try {
    localStorage.setItem(WP_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save WP config', e);
  }
};

export async function fetchLocalJsonContent(): Promise<SiteContent> {
  try {
    const res = await fetch('/site-content.json');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.movies) && data.movies.length > 0) {
        return {
          ...fallbackData,
          ...data,
        };
      }
    }
  } catch (e) {
    console.warn('Failed fetching /site-content.json, using initial dataset fallback', e);
  }
  return fallbackData;
}

export async function testWordPressConnection(config: WordPressConfig): Promise<{ success: boolean; message: string }> {
  if (!config.baseUrl || !config.baseUrl.startsWith('http')) {
    return { success: false, message: 'Please enter a valid WordPress URL starting with https://' };
  }

  const cleanBase = config.baseUrl.replace(/\/+$/, '');
  const testUrl = `${cleanBase}/wp-json/wp/v2/posts?per_page=1`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (config.username && config.appPassword) {
      const encoded = btoa(`${config.username}:${config.appPassword}`);
      headers['Authorization'] = `Basic ${encoded}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(testUrl, { method: 'GET', headers, signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      return { success: true, message: 'Successfully connected to WordPress REST API!' };
    } else {
      return { success: false, message: `WordPress returned HTTP status ${res.status}: ${res.statusText}` };
    }
  } catch (err: any) {
    return { success: false, message: err.name === 'AbortError' ? 'Connection timed out' : err.message || 'Network error connecting to WordPress' };
  }
}

export async function fetchWordPressContent(config: WordPressConfig): Promise<SiteContent> {
  const cleanBase = config.baseUrl.replace(/\/+$/, '');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (config.username && config.appPassword) {
    headers['Authorization'] = `Basic ${btoa(`${config.username}:${config.appPassword}`)}`;
  }

  try {
    const moviesRes = await fetch(`${cleanBase}/wp-json/wp/v2/movies?per_page=20`, { headers });
    const newsRes = await fetch(`${cleanBase}/wp-json/wp/v2/news?per_page=20`, { headers });

    let wpMovies: Movie[] = [];
    let wpNews: NewsItem[] = [];

    if (moviesRes.ok) {
      const rawMovies = await moviesRes.json();
      wpMovies = rawMovies.map((item: any) => ({
        id: item.id,
        title: item.title?.rendered || 'Untitled Movie',
        title_te: item.acf?.title_te,
        release: item.acf?.release || '2026',
        category: item.acf?.category || 'In theaters',
        genre: item.acf?.genre || 'Drama',
        genre_te: item.acf?.genre_te,
        status: item.acf?.status || 'Now playing',
        status_te: item.acf?.status_te,
        cast: item.acf?.cast || 'Starring Cast',
        director: item.acf?.director || 'Director',
        rating: item.acf?.rating || '8.5/10',
        description: item.excerpt?.rendered ? item.excerpt.rendered.replace(/<[^>]+>/g, '') : 'Cinema release',
        collections: item.acf?.collections || 'Top Box Office',
        industry: item.acf?.industry || 'Tollywood',
        image: item.acf?.image || 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80',
      }));
    }

    if (newsRes.ok) {
      const rawNews = await newsRes.json();
      wpNews = rawNews.map((item: any) => ({
        id: item.id,
        headline: item.title?.rendered || 'News Update',
        summary: item.excerpt?.rendered ? item.excerpt.rendered.replace(/<[^>]+>/g, '') : '',
        category: item.acf?.category || 'Political',
        time: 'Just now',
        image: item.acf?.image || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
      }));
    }

    return {
      ...fallbackData,
      movies: wpMovies.length > 0 ? wpMovies : fallbackData.movies,
      politicalNews: wpNews.length > 0 ? wpNews.filter(n => n.category === 'Political' || n.category === 'National') : fallbackData.politicalNews,
      localNews: wpNews.length > 0 ? wpNews.filter(n => n.category === 'Local' || n.category === 'Community') : fallbackData.localNews,
    };
  } catch (err) {
    console.error('Error fetching from WordPress API, falling back to local content', err);
    return fetchLocalJsonContent();
  }
}

export async function fetchSiteContent(config: WordPressConfig): Promise<SiteContent> {
  if (config.contentSource === 'wordpress' && config.baseUrl) {
    return fetchWordPressContent(config);
  }
  return fetchLocalJsonContent();
}
