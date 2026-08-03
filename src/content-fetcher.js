/**
 * Content Fetcher
 * Handles fetching content from either local JSON or WordPress API
 * Can switch between sources via environment variable
 */

import {
  fetchMovies,
  fetchNews,
  fetchBoxOffice,
  transformMovieData,
  transformNewsData,
} from './wordpress-api-config.js';

// ============================================
// CONFIGURATION
// ============================================

// Set to 'wordpress' to use WordPress CMS, 'json' for local site-content.json
const CONTENT_SOURCE = process.env.CONTENT_SOURCE || 'json';

console.log(`📡 Using content source: ${CONTENT_SOURCE.toUpperCase()}`);

// ============================================
// FETCH FROM LOCAL JSON
// ============================================

async function fetchFromJSON() {
  try {
    const response = await fetch('./site-content.json');
    if (!response.ok) throw new Error('Failed to fetch site-content.json');
    return await response.json();
  } catch (error) {
    console.error('Error fetching JSON content:', error);
    return null;
  }
}

// ============================================
// UNIFIED CONTENT FETCHER
// ============================================

async function getContentData() {
  let contentData = {};

  if (CONTENT_SOURCE === 'wordpress') {
    console.log('🔄 Fetching from WordPress...');
    
    try {
      // Fetch all data in parallel
      const [movies, news, boxoffice] = await Promise.all([
        fetchMovies({ per_page: 50 }),
        fetchNews({ per_page: 50 }),
        fetchBoxOffice({ per_page: 50 }),
      ]);

      // Transform WordPress data to match current structure
      contentData = {
        movies: movies.map(transformMovieData),
        politicalNews: news.filter(n => n.acf?.category === 'Political' || n.acf?.category === 'National')
          .map(transformNewsData),
        localNews: news.filter(n => n.acf?.category === 'Local' || n.acf?.category === 'Community')
          .map(transformNewsData),
        boxOfficeLive: boxoffice.map(b => ({
          id: b.id,
          title: b.title.rendered,
          total: b.acf?.total || '',
          status: b.acf?.status || 'Live',
          url: b.link,
        })),
        featuredStories: movies.filter(m => m.acf?.featured === true)
          .map(m => ({
            title: m.title.rendered,
            tag: m.acf?.tag || 'Movie',
            summary: m.excerpt.rendered,
          })),
        teluguFilmHistory: movies.filter(m => m.acf?.is_history === true)
          .map(transformMovieData),
      };

      console.log('✅ Successfully fetched from WordPress');

    } catch (error) {
      console.error('❌ Failed to fetch from WordPress, falling back to JSON:', error);
      contentData = await fetchFromJSON();
    }

  } else {
    // Default: fetch from local JSON
    console.log('📄 Fetching from local JSON...');
    contentData = await fetchFromJSON();
  }

  return contentData;
}

// ============================================
// SPECIFIC CONTENT GETTERS
// ============================================

async function getMovies() {
  const data = await getContentData();
  return data.movies || [];
}

async function getNews() {
  const data = await getContentData();
  return {
    political: data.politicalNews || [],
    local: data.localNews || [],
  };
}

async function getBoxOfficeData() {
  const data = await getContentData();
  return {
    live: data.boxOfficeLive || [],
    updates: data.boxOfficeUpdates || [],
    topStories: data.topStories || [],
    top5: data.boxOfficeTop5 || [],
  };
}

async function getFeaturedStories() {
  const data = await getContentData();
  return data.featuredStories || [];
}

async function getTeluguFilmHistory() {
  const data = await getContentData();
  return data.teluguFilmHistory || [];
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

export {
  getContentData,
  getMovies,
  getNews,
  getBoxOfficeData,
  getFeaturedStories,
  getTeluguFilmHistory,
  CONTENT_SOURCE,
};