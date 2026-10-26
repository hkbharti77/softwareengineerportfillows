import type { DispatchArticle } from '../types';

export interface BlogFilterOptions {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface BlogCategoryItem {
  name: string;
  count: number;
}

export interface PostsResponse {
  posts: DispatchArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

import { getApiUrl } from './apiConfig';

async function executeApiRequest<T>(endpointPath: string): Promise<T> {
  const targetUrl = getApiUrl(endpointPath);

  const res = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API call to ${targetUrl} failed with HTTP status ${res.status}`);
  }

  return (await res.json()) as T;
}

/**
 * Fetch published portfolio dispatches directly from MongoDB database via /api/public/posts
 * Strictly filtered by channel: 'portfolio'
 */
export async function fetchPortfolioPosts(options: BlogFilterOptions = {}): Promise<PostsResponse> {
  const queryParams = new URLSearchParams();
  queryParams.set('channel', 'portfolio');

  if (options.page) queryParams.set('page', String(options.page));
  if (options.limit) queryParams.set('limit', String(options.limit));
  else queryParams.set('limit', '50'); // Load all portfolio studies by default

  if (options.category && options.category !== 'all' && options.category !== 'All') {
    queryParams.set('category', options.category);
  }

  if (options.tag && options.tag !== 'all') {
    queryParams.set('tag', options.tag);
  }

  if (options.search && options.search.trim()) {
    queryParams.set('search', options.search.trim());
  }

  if (options.featured) {
    queryParams.set('featured', 'true');
  }

  const endpoint = `/api/public/posts?${queryParams.toString()}`;
  const data = await executeApiRequest<PostsResponse>(endpoint);

  // Format and enrich each article with display fallbacks
  const enrichedPosts: DispatchArticle[] = (data.posts || []).map((post, index) => {
    const issueNum = post.issueNumber || `DISPATCH № ${String(index + 1).padStart(2, '0')}`;
    const cleanCategory = post.category || 'Engineering';

    return {
      ...post,
      id: post.slug || post.id,
      slug: post.slug || post.id,
      issueNumber: issueNum,
      category: cleanCategory,
      categoryLabel: cleanCategory,
      date: post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'),
      readTime: post.readTime || `${post.readingTimeMinutes || 5} min read`,
      author: post.author || 'Himanshu Bharti — Systems & AI Engineer',
      tags: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : [cleanCategory],
      imageUrl: post.coverImage || post.imageUrl || '',
      coverImage: post.coverImage || post.imageUrl || '',
    };
  });

  return {
    posts: enrichedPosts,
    pagination: data.pagination || {
      page: 1,
      limit: enrichedPosts.length,
      total: enrichedPosts.length,
      totalPages: 1,
    },
  };
}

/**
 * Fetch full dynamic article by slug or ID with full HTML content, prev/next navigation, schemas
 */
export async function fetchPostBySlug(slugOrId: string): Promise<DispatchArticle | null> {
  try {
    const endpoint = `/api/public/posts/${encodeURIComponent(slugOrId)}?channel=portfolio`;
    const res = await executeApiRequest<{ post: DispatchArticle }>(endpoint);
    if (!res || !res.post) return null;

    const post = res.post;
    return {
      ...post,
      id: post.slug || post.id,
      slug: post.slug || post.id,
      category: post.category || 'Engineering',
      categoryLabel: post.category || 'Engineering',
      date: post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'),
      readTime: post.readTime || `${post.readingTimeMinutes || 5} min read`,
      author: post.author || 'Himanshu Bharti — Systems & AI Engineer',
      tags: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : [post.category || 'Engineering'],
      imageUrl: post.coverImage || post.imageUrl || '',
      coverImage: post.coverImage || post.imageUrl || '',
    };
  } catch (err) {
    console.error(`[BlogService] Failed to fetch article ${slugOrId}:`, err);
    return null;
  }
}

/**
 * Fetch dynamic categories for the portfolio channel directly from database
 */
export async function fetchPortfolioCategories(): Promise<BlogCategoryItem[]> {
  try {
    const endpoint = `/api/public/categories?channel=portfolio`;
    const data = await executeApiRequest<{ categories: BlogCategoryItem[] }>(endpoint);
    return data.categories || [];
  } catch (err) {
    console.warn('[BlogService] Failed to fetch portfolio categories, using fallback', err);
    return [];
  }
}

/**
 * Fetch dynamic tags for the portfolio channel directly from database
 */
export async function fetchPortfolioTags(): Promise<string[]> {
  try {
    const endpoint = `/api/public/tags?channel=portfolio`;
    const data = await executeApiRequest<{ tags: string[] }>(endpoint);
    return data.tags || [];
  } catch (err) {
    console.warn('[BlogService] Failed to fetch portfolio tags', err);
    return [];
  }
}
