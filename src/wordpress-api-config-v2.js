/**
 * WordPress API Configuration v2
 * Fixed for Application Password Authentication
 */

// ============================================
// CONFIGURATION
// ============================================

const WP_API_CONFIG = {
  // WordPress site URL (MUST start with https://)
  baseUrl: process.env.WP_API_URL || 'https://your-wordpress-domain.com',
  
  // API endpoints
  endpoints: {
    movies: '/wp-json/wp/v2/movies',
    news: '/wp-json/wp/v2/news',
    boxoffice: '/wp-json/wp/v2/boxoffice',
  },
  
  // Authentication
  auth: {
    type: process.env.WP_AUTH_TYPE || 'application-password', // 'application-password' or 'basic'
    username: process.env.WP_USERNAME || '',
    password: process.env.WP_APP_PASSWORD || '',
  },
  
  // Cache settings (in minutes)
  cacheDuration: 15,
  
  // Request timeout (in milliseconds)
  timeout: 10000,
};

// ============================================
// VALIDATION
// ============================================

function validateConfig() {
  if (!WP_API_CONFIG.baseUrl || WP_API_CONFIG.baseUrl === 'https://your-wordpress-domain.com') {
    console.warn('⚠️  WordPress URL not configured. Update WP_API_URL environment variable.');
    return false;
  }
  
  if (!WP_API_CONFIG.baseUrl.startsWith('https://')) {
    console.error('❌ ERROR: WordPress URL must start with https:// (not http://)');
    return false;
  }
  
  if (!WP_API_CONFIG.auth.username || !WP_API_CONFIG.auth.password) {
    console.warn('⚠️  Authentication credentials not configured. API may be rate-limited.');
  }
  
  return true;
}

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
// AUTHENTICATION HEADER BUILDER
// ============================================

function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (WP_API_CONFIG.auth.username && WP_API_CONFIG.auth.password) {
    if (WP_API_CONFIG.auth.type === 'application-password') {
      // For Application Passwords, use Basic Auth with credentials
      const credentials = `${WP_API_CONFIG.auth.username}:${WP_API_CONFIG.auth.password}`;
      const encoded = btoa(credentials); // Browser
      headers['Authorization'] = `Basic ${encoded}`;
    } else if (WP_API_CONFIG.auth.type === 'basic') {
      // Direct Basic Auth
      const credentials = `${WP_API_CONFIG.auth.username}:${WP_API_CONFIG.auth.password}`;
      const encoded = typeof btoa !== 'undefined' 
        ? btoa(credentials) 
        : Buffer.from(credentials).toString('base64');
      headers['Authorization'] = `Basic ${encoded}`;
    }
  }

  return headers;
}

// ============================================
// API FETCH FUNCTION
// ============================================

async function fetchFromWordPress(endpoint, params = {}) {
  // Validate config
  if (!validateConfig()) {
    throw new Error('WordPress configuration incomplete. Check environment variables.');
  }

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
      if (!['per_page', 'page'].includes(key)) {
        url.searchParams.append(key, params[key]);
      }
    });

    // Get authentication headers
    const headers = getAuthHeaders();

    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WP_API_CONFIG.timeout);

    console.log(`🔄 Fetching from: ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ WordPress API error: ${response.status} ${response.statusText}`);
      console.error(`Response: ${errorText}`);
      
      if (response.status === 401) {
        throw new Error('Authentication failed. Check WordPress credentials and Application Passwords.');
      } else if (response.status === 404) {
        throw new Error('Endpoint not found. Check if custom post types are registered.');
      }
      
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the result
    cache.set(cacheKey, data, WP_API_CONFIG.cacheDuration);
    
    console.log(`✅ Fetched ${Array.isArray(data) ? data.length : 1} items from ${endpoint}`);
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
    return Array.isArray(movies) ? movies : [];
  } catch (error) {
    console.error('Error fetching movies:', error.message);
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
    return Array.isArray(news) ? news : [];
  } catch (error) {
    console.error('Error fetching news:', error.message);
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
    return Array.isArray(boxoffice) ? boxoffice : [];
  } catch (error) {
    console.error('Error fetching box office:', error.message);
    return [];
  }
}

// ============================================
// DATA TRANSFORMATION
// ============================================

function transformMovieData(wpMovie) {
  return {
    id: wpMovie.id,
    title: wpMovie.title?.rendered || '',
    description: wpMovie.content?.rendered || '',
    // ACF fields (custom fields from WordPress)
    genre: wpMovie.acf?.genre || '',
    rating: wpMovie.acf?.rating || 'N/A',
    cast: wpMovie.acf?.cast || '',
    director: wpMovie.acf?.director || '',
    collections: wpMovie.acf?.collections || '',
    image: wpMovie.acf?.image_url || wpMovie._links?.['wp:featuredmedia']?.[0]?.href || '',
    status: wpMovie.acf?.status || '',
    release: wpMovie.acf?.release_date || '',
    language: wpMovie.acf?.language || 'Telugu',
  };
}

function transformNewsData(wpNews) {
  return {
    id: wpNews.id,
    headline: wpNews.title?.rendered || '',
    summary: wpNews.content?.rendered || '',
    category: wpNews.acf?.category || 'General',
    time: wpNews.acf?.time || new Date(wpNews.date).toLocaleDateString(),
    language: wpNews.acf?.language || 'Telugu',
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
  validateConfig,
  getAuthHeaders,
};
