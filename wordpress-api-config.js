/**
 * WordPress API Configuration
 * This file handles all communication with WordPress REST API
 */

// ============================================
// CONFIGURATION
// ============================================

// Update these URLs once you set up WordPress hosting
const WP_API_CONFIG = {
  // WordPress site URL (change when your WordPress is live)
  baseUrl: process.env.WP_API_URL || 'https://your-wordpress-domain.com',
  
  // API endpoints
  endpoints: {
    movies: '/wp-json/wp/v2/movies',
    news: '/wp-json/wp/v2/news',
    boxoffice: '/wp-json/wp/v2/boxoffice',
  },
  
  // Cache settings (in minutes)
  cacheDuration: 15,
  
  // Request timeout (in milliseconds)
  timeout: 10000,
};

// ============================================
// CACHE MANAGEMENT
// ============================================

class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, durationMinutes = 15) {
    const expiresAt = Date.now() + (durationMinutes * 60 * 1000);
    this.cache.set(key, {
      value,
      expiresAt,
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new CacheManager();

// ============================================
// API FETCH FUNCTION
// ============================================

async function fetchFromWordPress(endpoint, params = {}) {
  // Generate cache key
  const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`📦 Using cached data for ${endpoint}`);
    return cachedData;
  }

  try {
    // Build URL with query parameters
    const url = new URL(`${WP_API_CONFIG.baseUrl}${endpoint}`);
    
    // Add default parameters
    url.searchParams.append('per_page', params.per_page || 100);
    url.searchParams.append('page', params.page || 1);
    
    // Add custom parameters
    Object.keys(params).forEach(key => {
      if (![' per_page', 'page'].includes(key)) {
        url.searchParams.append(key, params[key]);
      }
    });

    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WP_API_CONFIG.timeout);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the result
    cache.set(cacheKey, data, WP_API_CONFIG.cacheDuration);
    
    console.log(`✅ Fetched ${data.length || 1} items from ${endpoint}`);
    return data;

  } catch (error) {
    console.error(`❌ Error fetching from WordPress (${endpoint}):`, error.message);
    throw error;
  }
}

// ============================================
// SPECIFIC FETCH FUNCTIONS
// ============================================

async function fetchMovies(filters = {}) {
  try {
    const movies = await fetchFromWordPress(WP_API_CONFIG.endpoints.movies, {
      per_page: filters.per_page || 20,
      page: filters.page || 1,
      ...filters,
    });
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

async function fetchNews(filters = {}) {
  try {
    const news = await fetchFromWordPress(WP_API_CONFIG.endpoints.news, {
      per_page: filters.per_page || 20,
      page: filters.page || 1,
      ...filters,
    });
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function fetchBoxOffice(filters = {}) {
  try {
    const boxoffice = await fetchFromWordPress(WP_API_CONFIG.endpoints.boxoffice, {
      per_page: filters.per_page || 50,
      page: filters.page || 1,
      ...filters,
    });
    return boxoffice;
  } catch (error) {
    console.error('Error fetching box office:', error);
    return [];
  }
}

// ============================================
// DATA TRANSFORMATION
// ============================================

/**
 * Transform WordPress REST API response to match your current site-content.json structure
 */
function transformMovieData(wpMovie) {
  return {
    id: wpMovie.id,
    title: wpMovie.title.rendered,
    description: wpMovie.content.rendered,
    // ACF fields (custom fields from WordPress)
    genre: wpMovie.acf?.genre || '',
    rating: wpMovie.acf?.rating || 'N/A',
    cast: wpMovie.acf?.cast || '',
    director: wpMovie.acf?.director || '',
    collections: wpMovie.acf?.collections || '',
    image: wpMovie.acf?.image_url || wpMovie._links?.['wp:featuredmedia']?.[0]?.href || '',
    status: wpMovie.acf?.status || '',
    release: wpMovie.acf?.release_date || '',
    // Add more fields as needed based on your current structure
  };
}

function transformNewsData(wpNews) {
  return {
    id: wpNews.id,
    headline: wpNews.title.rendered,
    summary: wpNews.content.rendered,
    category: wpNews.acf?.category || 'General',
    time: wpNews.acf?.time || new Date(wpNews.date).toLocaleDateString(),
    // Add more fields as needed
  };
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

export {
  WP_API_CONFIG,
  fetchFromWordPress,
  fetchMovies,
  fetchNews,
  fetchBoxOffice,
  transformMovieData,
  transformNewsData,
  cache,
};