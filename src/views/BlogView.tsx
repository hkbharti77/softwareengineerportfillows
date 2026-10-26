import { useState, useMemo, useEffect, useCallback } from 'react';
import type { TabType, DispatchArticle } from '../types';
import {
  BookOpen,
  Search,
  ArrowRight,
  ArrowLeft,
  X,
  Clock,
  Calendar,
  Tag,
  Copy,
  Check,
  Terminal,
  Share2,
  RefreshCw,
  FileText,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  Sparkles,
  ArrowUp,
  User,
} from 'lucide-react';
import {
  fetchPortfolioPosts,
  fetchPostBySlug,
  type BlogCategoryItem,
} from '../services/blogService';

interface BlogViewProps {
  onTabChange: (tab: TabType) => void;
  onTriggerToast: (msg: string) => void;
}

export default function BlogView({ onTabChange, onTriggerToast }: BlogViewProps) {
  const [articles, setArticles] = useState<DispatchArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<DispatchArticle | null>(null);
  const [loadingFullArticle, setLoadingFullArticle] = useState<boolean>(false);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const [hasCopiedShare, setHasCopiedShare] = useState(false);

  // Load portfolio channel articles from MongoDB database via API
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPortfolioPosts({ limit: 50 });
      setArticles(response.posts);
    } catch (err: any) {
      console.error('[BlogView] Failed to retrieve portfolio articles from API:', err);
      setError(err?.message || 'Failed to establish connection to database portfolio endpoint.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // URL Hash Synchronisation:
  // Listens to #blog?article=slug or #blog/slug, rendering full page article view without popup modal
  useEffect(() => {
    const syncFromHash = async () => {
      const hash = window.location.hash.replace('#', '');
      let slug = '';

      if (hash.includes('article=')) {
        const match = hash.match(/[?&]article=([^&]+)/);
        if (match && match[1]) slug = decodeURIComponent(match[1]);
      } else if (hash.startsWith('blog/') && hash.length > 5) {
        slug = decodeURIComponent(hash.substring(5));
      }

      if (slug) {
        const existing = articles.find((a) => a.slug === slug || a.id === slug);
        if (existing && existing.content && typeof existing.content === 'string' && existing.content.length > 150) {
          setActiveArticle(existing);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setLoadingFullArticle(true);
          const full = await fetchPostBySlug(slug);
          setActiveArticle(full || existing || null);
          setLoadingFullArticle(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setActiveArticle(null);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [articles]);

  // Dynamic category pills gathered from portfolio articles
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    articles.forEach((art) => {
      const cat = art.category?.trim() || 'Engineering';
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    const list: { id: string; label: string; count: number }[] = [
      { id: 'all', label: 'All Dispatches', count: articles.length },
    ];

    map.forEach((count, cat) => {
      list.push({ id: cat, label: cat, count });
    });

    return list;
  }, [articles]);

  // Filtered articles based on category and search query
  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return articles.filter((art) => {
      const matchesCat =
        selectedCategory === 'all' ||
        art.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        query === '' ||
        art.title.toLowerCase().includes(query) ||
        (art.subtitle && art.subtitle.toLowerCase().includes(query)) ||
        (art.excerpt && art.excerpt.toLowerCase().includes(query)) ||
        (art.category && art.category.toLowerCase().includes(query)) ||
        art.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Related articles for the active article (same category or others in portfolio)
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return articles
      .filter((a) => a.slug !== activeArticle.slug && a.id !== activeArticle.id)
      .slice(0, 3);
  }, [articles, activeArticle]);

  // Navigate to full-page article view via URL
  const handleOpenArticle = (art: DispatchArticle) => {
    window.location.hash = `blog?article=${encodeURIComponent(art.slug || art.id)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to dispatches catalog via URL
  const handleBackToList = () => {
    window.location.hash = 'blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdjacent = (targetSlug: string) => {
    window.location.hash = `blog?article=${encodeURIComponent(targetSlug)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setHasCopiedCode(true);
    onTriggerToast('Code snippet copied to clipboard');
    setTimeout(() => setHasCopiedCode(false), 2500);
  };

  const handleShareArticle = (art: DispatchArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/#blog?article=${encodeURIComponent(art.slug || art.id)}`;
    navigator.clipboard?.writeText(url);
    setHasCopiedShare(true);
    onTriggerToast(`Article link copied: "${art.title}"`);
    setTimeout(() => setHasCopiedShare(false), 2500);
  };

  /* ========================================================================
     VIEW 1: DEDICATED FULL-PAGE ARTICLE VIEW (NO POPUP / NO MODAL)
     ======================================================================== */
  if (activeArticle) {
    return (
      <div className="w-full flex flex-col broadsheet-view-transition bg-surface">
        {/* Top Breadcrumb & Action Toolbar */}
        <div className="w-full border-b border-surface-variant/40 bg-surface-container-low/60 sticky top-20 z-30 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-margin-mobile lg:px-margin py-3.5 flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 font-label-mono text-xs uppercase text-on-surface hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">All Dispatches</span>
              <span className="text-on-surface-variant hidden sm:inline">/</span>
              <span className="text-on-surface-variant hidden sm:inline">{activeArticle.category}</span>
            </button>

            <div className="flex items-center gap-2">
              {activeArticle.pdfUrl && (
                <a
                  href={activeArticle.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-xs font-label-mono text-on-surface transition-colors border border-surface-variant/50"
                  title="Download / View Monograph PDF"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">Monograph PDF</span>
                </a>
              )}

              <button
                onClick={(e) => handleShareArticle(activeArticle, e)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-xs font-label-mono text-on-surface transition-colors border border-surface-variant/50 cursor-pointer"
                title="Copy permanent share link"
              >
                {hasCopiedShare ? <Check className="w-3.5 h-3.5 text-tertiary" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{hasCopiedShare ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Page Article Main Container */}
        <main className="w-full max-w-4xl mx-auto px-margin-mobile lg:px-margin py-10 sm:py-14 flex flex-col gap-8">
          {/* Article Header & Editorial Masthead */}
          <header className="border-b border-surface-variant/50 pb-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-label-mono text-on-surface-variant">
              <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container uppercase font-bold tracking-wider">
                {activeArticle.issueNumber || 'DISPATCH'}
              </span>
              <span className="px-2 py-0.5 bg-surface-container-high text-on-surface font-semibold">
                {activeArticle.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h1 className="font-headline-lg text-3xl sm:text-5xl text-on-surface font-serif leading-tight">
              {activeArticle.title}
            </h1>

            {activeArticle.subtitle && (
              <p className="font-title-editorial text-lg sm:text-xl text-on-surface-variant italic leading-relaxed">
                {activeArticle.subtitle}
              </p>
            )}

            {/* Author Byline */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-variant/30 text-xs font-label-mono text-on-surface-variant">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-none bg-surface-container-high border border-surface-variant/80 flex items-center justify-center font-serif font-bold text-on-surface">
                  HB
                </div>
                <div>
                  <span className="text-on-surface font-semibold block">
                    {activeArticle.author || 'Himanshu Bharti'}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Systems &amp; AI Engineer
                  </span>
                </div>
              </div>

              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5">
                  {activeArticle.tags.map((t) => (
                    <span key={t} className="text-[11px] font-label-mono text-on-surface-variant bg-surface-container px-2 py-0.5">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Featured Cover Image (if available & not a raw google drive link) */}
          {activeArticle.imageUrl && !activeArticle.imageUrl.includes('drive.google.com') && (
            <div className="w-full max-h-[460px] overflow-hidden border border-surface-variant/60 bg-surface-container-high shadow-xs">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.coverImageAlt || activeArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Loading Full Article Content Spinner */}
          {loadingFullArticle && (
            <div className="py-12 flex items-center justify-center gap-3 text-on-surface-variant font-label-mono text-xs">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              <span>Fetching full study from MongoDB database...</span>
            </div>
          )}

          {/* Rich Body Content Rendered Directly in Page */}
          {!loadingFullArticle && activeArticle.content && (
            <article className="blog-prose-content">
              {typeof activeArticle.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
              ) : Array.isArray(activeArticle.content) ? (
                activeArticle.content.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p>{activeArticle.excerpt}</p>
              )}
            </article>
          )}

          {/* Excerpt Fallback */}
          {!loadingFullArticle && !activeArticle.content && (
            <div className="space-y-4 font-body-md text-base text-on-surface leading-relaxed">
              <p>{activeArticle.excerpt}</p>
            </div>
          )}

          {/* Interactive Code Snippet (if explicitly defined on article object) */}
          {activeArticle.codeSnippet && (
            <div className="my-6 bg-surface-container-lowest border border-surface-variant/60 shadow-sm overflow-hidden">
              <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-surface-variant/40">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-tertiary" />
                  <span className="font-label-mono text-xs text-on-surface font-bold">
                    {activeArticle.codeSnippet.filename}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyCode(activeArticle.codeSnippet!.code)}
                  className="inline-flex items-center gap-1 font-label-mono text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  {hasCopiedCode ? <Check className="w-3.5 h-3.5 text-tertiary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto text-on-surface leading-relaxed bg-surface-container-low/50">
                <code>{activeArticle.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Article Footer Tags */}
          {activeArticle.tags && activeArticle.tags.length > 0 && (
            <div className="pt-6 border-t border-surface-variant/40 flex flex-wrap items-center gap-2">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider flex items-center gap-1 mr-2">
                <Tag className="w-3 h-3" />
                Index Tags:
              </span>
              {activeArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-label-mono text-xs text-on-surface bg-surface-container-high px-2.5 py-1 border border-surface-variant/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Previous & Next Article Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-surface-variant/40">
            {activeArticle.prevPost ? (
              <button
                onClick={() => handleNavigateAdjacent(activeArticle.prevPost!.slug)}
                className="p-4 bg-surface-container-low border border-surface-variant/50 hover:border-primary/60 text-left flex flex-col gap-1 transition-all cursor-pointer group"
              >
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  Previous Dispatch
                </span>
                <span className="font-serif text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {activeArticle.prevPost.title}
                </span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {activeArticle.nextPost && (
              <button
                onClick={() => handleNavigateAdjacent(activeArticle.nextPost!.slug)}
                className="p-4 bg-surface-container-low border border-surface-variant/50 hover:border-primary/60 text-right flex flex-col items-end gap-1 transition-all cursor-pointer group"
              >
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase flex items-center gap-1">
                  Next Dispatch
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="font-serif text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {activeArticle.nextPost.title}
                </span>
              </button>
            )}
          </div>

          {/* Author Monograph Card */}
          <div className="p-6 sm:p-8 bg-surface-container-low border border-surface-variant/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
            <div>
              <span className="font-label-mono text-xs text-primary font-bold uppercase tracking-wider block">
                AUTHOR MONOGRAPH
              </span>
              <div className="font-serif text-xl text-on-surface font-semibold mt-1">
                {activeArticle.author || 'Himanshu Bharti — Systems & AI Engineer'}
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed max-w-xl">
                Specializing in autonomous agent state-graphs, real-time WebRTC audio engines, high-throughput microservices, and enterprise full-stack systems.
              </p>
            </div>
            <button
              onClick={() => onTabChange('pricing')}
              className="px-5 py-2.5 bg-secondary-container text-on-secondary-container font-label-technical text-xs uppercase tracking-wider font-semibold cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
            >
              Explore Engagements
            </button>
          </div>

          {/* Related Articles from Portfolio Channel */}
          {relatedArticles.length > 0 && (
            <div className="pt-10 border-t border-surface-variant/40 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-xl font-serif text-on-surface">
                  Related Technical Studies
                </h3>
                <button
                  onClick={handleBackToList}
                  className="font-label-mono text-xs text-primary hover:underline cursor-pointer"
                >
                  View All ({articles.length})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleOpenArticle(rel)}
                    className="p-5 bg-surface-container-low border border-surface-variant/40 hover:border-primary/60 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-label-mono text-secondary font-bold">
                        {rel.issueNumber || rel.category}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-surface-variant/30 flex items-center justify-between text-[10px] font-label-mono text-on-surface-variant">
                      <span>{rel.readTime}</span>
                      <span className="flex items-center gap-1 group-hover:text-primary font-bold">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to top & Back to all dispatches action bar */}
          <div className="pt-6 border-t border-surface-variant/40 flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 px-4 py-2 bg-on-surface text-surface font-label-technical text-xs uppercase tracking-wider font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Dispatches</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-xs font-label-mono text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* ========================================================================
     VIEW 2: EDITORIAL CATALOG STREAM (DEFAULT #blog VIEW)
     ======================================================================== */
  return (
    <div className="w-full flex flex-col">
      {/* Editorial Masthead */}
      <section className="w-full border-b border-surface-variant/40 bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-12 pb-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-variant/40 pb-4">
            <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant uppercase tracking-widest">
              <span className="w-2 h-2 bg-secondary-container" />
              <span>TECHNICAL DISPATCHES &amp; MONOGRAPHS</span>
              <span>·</span>
              <span>VOL. 2026 // ED. 04</span>
            </div>
            <div className="flex items-center gap-3 font-label-mono text-xs text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                {loading ? 'Querying Database...' : `${articles.length} Published Technical Studies`}
              </span>
              <button
                onClick={loadArticles}
                disabled={loading}
                title="Refresh from MongoDB database"
                className="p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-headline-lg text-4xl sm:text-6xl text-on-surface font-serif tracking-tight leading-tight">
                The Systems Engineering Journal
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
                Empirical benchmarks, production post-mortems, and architectural blueprints for low-latency voice pipelines, deterministic multi-agent graphs, and scalable neural systems.
              </p>
            </div>

            {/* Keyword Search */}
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search dispatches & tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/60 focus:outline-none focus:border-primary placeholder:text-outline"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-surface-variant/30">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 font-label-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-on-surface text-surface font-bold shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded-xs ${
                    selectedCategory === cat.id
                      ? 'bg-surface/20 text-surface'
                      : 'bg-surface-variant/50 text-on-surface-variant'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Stream */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-12 flex flex-col gap-10">
        {/* Loading Skeleton */}
        {loading && (
          <div className="flex flex-col gap-8 animate-pulse">
            <div className="bg-surface-container-low p-6 sm:p-10 border border-surface-variant/60 flex flex-col gap-5">
              <div className="h-4 bg-surface-variant/60 w-1/3 rounded-xs" />
              <div className="h-10 bg-surface-variant/70 w-3/4 rounded-xs" />
              <div className="h-5 bg-surface-variant/50 w-1/2 rounded-xs" />
              <div className="space-y-2 pt-2">
                <div className="h-3.5 bg-surface-variant/40 w-full rounded-xs" />
                <div className="h-3.5 bg-surface-variant/40 w-5/6 rounded-xs" />
                <div className="h-3.5 bg-surface-variant/40 w-4/6 rounded-xs" />
              </div>
              <div className="h-9 bg-surface-variant/60 w-40 mt-4 rounded-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-surface-container-low p-6 border border-surface-variant/50 flex flex-col gap-4">
                  <div className="h-3 bg-surface-variant/60 w-1/2 rounded-xs" />
                  <div className="h-6 bg-surface-variant/70 w-5/6 rounded-xs" />
                  <div className="space-y-2">
                    <div className="h-3 bg-surface-variant/40 w-full rounded-xs" />
                    <div className="h-3 bg-surface-variant/40 w-4/5 rounded-xs" />
                  </div>
                  <div className="h-4 bg-surface-variant/50 w-24 mt-4 rounded-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-10 text-center bg-surface-container-low border border-secondary/40 flex flex-col items-center gap-4">
            <AlertCircle className="w-10 h-10 text-secondary" />
            <div className="max-w-md">
              <h3 className="font-serif text-xl text-on-surface font-semibold">Unable to Load Portfolio Dispatches</h3>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1.5">{error}</p>
            </div>
            <button
              onClick={loadArticles}
              className="px-5 py-2.5 bg-primary text-on-primary font-label-technical text-xs uppercase tracking-wider font-semibold cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Database Query</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="p-12 text-center bg-surface-container-low border border-surface-variant/40 flex flex-col items-center gap-3">
            <BookOpen className="w-8 h-8 text-on-surface-variant" />
            <p className="font-title-editorial text-lg text-on-surface">No portfolio dispatches match your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-primary text-on-primary text-xs font-label-technical uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Articles Stream */}
        {!loading && !error && filteredArticles.length > 0 && (
          <div className="flex flex-col gap-8">
            {/* Lead Featured Article (First article in filtered list) */}
            {filteredArticles[0] && (
              <article className="bg-surface-container-low p-6 sm:p-10 border border-surface-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-label-mono text-on-surface-variant border-b border-surface-variant/40 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-secondary font-bold">{filteredArticles[0].issueNumber}</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 bg-surface-container-high text-on-surface font-semibold">
                        {filteredArticles[0].category}
                      </span>
                      {filteredArticles[0].isFeatured && (
                        <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-bold text-[10px] tracking-wider uppercase">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {filteredArticles[0].date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {filteredArticles[0].readTime}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className={`${filteredArticles[0].imageUrl && !filteredArticles[0].imageUrl.includes('drive.google.com') ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-3`}>
                      <h2
                        onClick={() => handleOpenArticle(filteredArticles[0])}
                        className="font-headline-md text-2xl sm:text-4xl text-on-surface font-serif group-hover:text-primary transition-colors leading-tight cursor-pointer"
                      >
                        {filteredArticles[0].title}
                      </h2>

                      {filteredArticles[0].subtitle && (
                        <p className="font-title-editorial text-lg text-on-surface-variant italic">
                          {filteredArticles[0].subtitle}
                        </p>
                      )}

                      <p className="font-body-md text-sm sm:text-base text-on-surface/85 leading-relaxed">
                        {filteredArticles[0].excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {filteredArticles[0].tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-label-mono text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Featured Cover Image preview (if valid) */}
                    {filteredArticles[0].imageUrl && !filteredArticles[0].imageUrl.includes('drive.google.com') && (
                      <div
                        onClick={() => handleOpenArticle(filteredArticles[0])}
                        className="lg:col-span-4 overflow-hidden border border-surface-variant/60 bg-surface-container-high h-48 sm:h-56 cursor-pointer"
                      >
                        <img
                          src={filteredArticles[0].imageUrl}
                          alt={filteredArticles[0].coverImageAlt || filteredArticles[0].title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-surface-variant/40">
                  <button
                    onClick={() => handleOpenArticle(filteredArticles[0])}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-on-surface text-surface font-label-technical text-xs uppercase tracking-wider font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer shadow-xs"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {filteredArticles[0].pdfUrl && (
                      <a
                        href={filteredArticles[0].pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-xs font-label-mono text-on-surface transition-colors"
                        title="View Monograph PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        <span>PDF</span>
                      </a>
                    )}
                    <button
                      onClick={(e) => handleShareArticle(filteredArticles[0], e)}
                      className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      title="Share dispatch link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Remaining Articles Grid */}
            {filteredArticles.slice(1).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {filteredArticles.slice(1).map((art) => (
                  <article
                    key={art.id}
                    className="bg-surface-container-low p-6 border border-surface-variant/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="flex flex-col gap-3">
                      {art.imageUrl && !art.imageUrl.includes('drive.google.com') && (
                        <div
                          onClick={() => handleOpenArticle(art)}
                          className="w-full h-36 overflow-hidden border border-surface-variant/40 bg-surface-container-high mb-1 cursor-pointer"
                        >
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                            onError={(e) => {
                              (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between font-label-mono text-xs text-on-surface-variant">
                        <span className="text-secondary font-bold">{art.issueNumber}</span>
                        <span>{art.readTime}</span>
                      </div>

                      <span className="text-[11px] font-label-mono text-primary uppercase font-semibold">
                        {art.category}
                      </span>

                      <h3
                        onClick={() => handleOpenArticle(art)}
                        className="font-headline-sm text-xl font-serif text-on-surface group-hover:text-primary transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {art.title}
                      </h3>

                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>

                      {art.tags && art.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {art.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-4 border-t border-surface-variant/30 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenArticle(art)}
                        className="inline-flex items-center gap-1.5 font-label-technical text-xs uppercase tracking-wider text-on-surface font-bold hover:text-primary transition-colors cursor-pointer"
                      >
                        <span>Open Essay</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-label-mono text-[10px] text-on-surface-variant">
                        {art.date}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
