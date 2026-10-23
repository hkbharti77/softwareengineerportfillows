import { useState, useMemo } from 'react';
import type { TabType, BlogCategory, DispatchArticle } from '../types';
import { BookOpen, Search, ArrowRight, X, Clock, Calendar, Tag, Copy, Check, Terminal, Share2, Sparkles } from 'lucide-react';

interface BlogViewProps {
  onTabChange: (tab: TabType) => void;
  onTriggerToast: (msg: string) => void;
}

const articles: DispatchArticle[] = [
  {
    id: 'webrtc-voice-latency',
    issueNumber: 'DISPATCH № 04',
    category: 'voice-ai',
    categoryLabel: 'Voice & Multimodal AI',
    title: 'Sub-400ms Voice Orchestration: Taming Audio Buffers over WebRTC',
    subtitle: 'How we bypassed sentence-level LLM completion via speculative first-token chunking and zero-jitter audio playback.',
    date: 'October 18, 2026',
    readTime: '7 min read',
    excerpt: 'Natural conversation collapses the moment turnaround latency exceeds 600ms. In this technical deep dive, we detail the complete engineering mechanics behind sub-400ms full-duplex conversational voice agents: from raw Silero VAD frame slicing to WebRTC datachannel transport and streaming Opus synthesis.',
    content: [
      'In human conversation, turn-taking intervals average approximately 250 milliseconds. The moment an automated voice agent introduces latencies exceeding 600ms, users perceive unnatural hesitation, interrupt the synthesizer, or assume the connection has degraded.',
      'Traditional voice bots execute a sequential, blocking waterfall: record audio -> await full sentence pause -> transcribe STT -> submit complete prompt to LLM -> await complete completion -> synthesize full audio file -> stream back. This naive sequence inevitably accumulates between 1,200ms and 2,500ms of end-to-end latency.',
      'Our architecture breaks this sequential bottleneck by treating speech as an uninterrupted, concurrent pipeline of sliding 30ms PCM audio frames over WebSockets and WebRTC.',
      'Phase 1 relies on client-side Silero Voice Activity Detection (VAD) running on ONNX Runtime. When user speech energy drops below threshold for just 120ms, an endpoint boundary signal is emitted to the server. Rather than waiting for full punctuation, our FastAPI event loop dispatches interim transcript chunks to Deepgram Nova-2.',
      'Phase 2 leverages speculative token yield. As Anthropic Claude 3.5 or GPT-4o begins emitting tokens via Server-Sent Events, we do not wait for the entire sentence. The first 4 to 6 tokens are immediately routed to ElevenLabs Turbo streaming API over an open TLS socket.',
      'Finally, received MP3/PCM audio chunks are injected directly into a custom Web Audio API circular ring buffer with drift compensation. This ensures playback begins while the subsequent half of the agent response is still being reasoned by the model, pulling total turn-taking latency down to 340ms to 420ms consistently.'
    ],
    codeSnippet: {
      language: 'python',
      filename: 'voice_pipeline_router.py',
      code: `async def stream_speculative_tts(token_stream: AsyncIterator[str], audio_sink: WebRTCAudioSink):
    """Intercepts first-token burst to begin audio synthesis before sentence completion."""
    buffer = []
    chunk_index = 0
    async for token in token_stream:
        buffer.append(token)
        # Flush initial burst early on 5 tokens or punctuation boundary
        if (chunk_index == 0 and len(buffer) >= 5) or any(p in token for p in {".", ",", "?", "!"}):
            clause = "".join(buffer)
            buffer.clear()
            chunk_index += 1
            # Dispatch directly to persistent ElevenLabs WebSocket connection
            asyncio.create_task(eleven_client.stream_chunk(clause, audio_sink))`
    },
    tags: ['WebRTC', 'FastAPI', 'Deepgram', 'ElevenLabs', 'Low-Latency']
  },
  {
    id: 'deterministic-agent-graphs',
    issueNumber: 'DISPATCH № 03',
    category: 'distributed',
    categoryLabel: 'Distributed Systems',
    title: 'Deterministic State Graphs in Multi-Agent Swarms',
    subtitle: 'Why stochastic agent loops fail in production, and how Redis checkpointing guarantees state recovery.',
    date: 'September 24, 2026',
    readTime: '9 min read',
    excerpt: 'Autonomous multi-agent systems built with free-form while-loops produce catastrophic non-deterministic failure modes in production. We explore graph-based state-machine architectures with transactional state checkpoints, tool idempotency guards, and automatic rollback reconciliation.',
    content: [
      'The early wave of LLM agent frameworks treated agentic workflows as infinite prompting loops: give the model a scratchpad, let it generate tool calls, and hope it terminates. In production, this approach yields cascading token consumption, infinite circular tool calls, and unrecoverable deadlocks.',
      'Enterprise environments demand determinism. If an agent initiates a financial transfer or modifies an ERP order, that step must be idempotent, strictly auditable, and resilient to worker node restarts.',
      'We designed our agent runtime on top of LangGraph-inspired directed acyclic state graphs (DAGs). Every state transition is modeled as a pure function: State_n+1 = Node_f(State_n).',
      'Before any tool with external side-effects (e.g., database writes, webhook dispatches) is triggered, the execution engine writes a state snapshot to Redis with an idempotency key. If a Kubernetes pod is terminated midway through execution, the replacement worker resumes from the exact checkpoint without re-executing completed operations.',
      'Furthermore, human-in-the-loop gates are treated as first-class asynchronous pause states. An agent can pause its thread for 48 hours awaiting executive review, while its state persists serialized in PostgreSQL JSONB with zero memory overhead on active server workers.'
    ],
    codeSnippet: {
      language: 'python',
      filename: 'state_checkpoint.py',
      code: `@dataclass
class AgentState:
    session_id: str
    step_id: int
    context_tokens: int
    scratchpad: list[dict]
    checkpoint_hash: str

async def execute_guarded_node(state: AgentState, tool_fn: Callable) -> AgentState:
    # 1. Verify idempotency lock in Redis
    lock_key = f"agent_lock:{state.session_id}:{state.step_id}"
    if not await redis_pool.set(lock_key, "ACTIVE", nx=True, ex=60):
        return await recover_from_checkpoint(state.session_id)
    # 2. Execute deterministic transition
    next_state = await tool_fn(state)
    await persist_checkpoint(next_state)
    return next_state`
    },
    tags: ['LangGraph', 'Redis', 'Python', 'Agentic Systems', 'Idempotency']
  },
  {
    id: 'hybrid-vector-retrieval',
    issueNumber: 'DISPATCH № 02',
    category: 'rag-search',
    categoryLabel: 'RAG & Vector Search',
    title: 'Hybrid Dense-Sparse Vector Retrieval: Combining pgvector HNSW with BM25',
    subtitle: 'Eliminating semantic hallucination in regulatory compliance queries with reciprocal rank fusion.',
    date: 'August 14, 2026',
    readTime: '6 min read',
    excerpt: 'Dense vector embeddings alone often miss precise acronyms, contract clauses, and SKU numbers. By combining pgvector HNSW semantic search with BM25 inverted lexical indexing and cross-encoder re-ranking, we achieved 99.4% citation verity across 2.4 million regulatory documents.',
    content: [
      'Dense vector embeddings (like OpenAI text-embedding-3 or Cohere Embed v3) excel at semantic similarity — recognizing that "automobile" and "car" represent equivalent concepts. However, they struggle with exact lexical matches: ISO standard numbers, legal clause citations (e.g., "Section 14.2(b)"), and specialized acronyms.',
      'Conversely, classical lexical search (BM25) guarantees precision for exact token lookups but fails when users phrase inquiries using alternative terminology.',
      'Our solution implements a dual-stage hybrid retrieval mesh. Incoming queries are simultaneously executed against an HNSW index in PostgreSQL using pgvector, and a PostgreSQL full-text search tsvector column indexed via GIN.',
      'The top 50 candidates from each retrieval channel are merged using Reciprocal Rank Fusion (RRF). RRF calculates a combined score: Score = Sum(1 / (60 + rank_i)), which gracefully balances dense and sparse positions without requiring complex score normalization.',
      'Finally, the top 15 fused chunks pass through a Cohere Rerank v3 cross-encoder model. The cross-encoder analyzes full query-passage interaction rather than separate vector dot-products, discarding irrelevant context and delivering verified source grounding.'
    ],
    codeSnippet: {
      language: 'sql',
      filename: 'hybrid_search.sql',
      code: `-- Reciprocal Rank Fusion of Dense Embeddings & BM25 Sparse Search
WITH semantic_search AS (
    SELECT id, document_id, ROW_NUMBER() OVER (ORDER BY embedding <=> $1) AS rank
    FROM document_chunks
    ORDER BY embedding <=> $1 LIMIT 50
),
lexical_search AS (
    SELECT id, document_id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(tsv_content, plainto_tsquery('english', $2)) DESC) AS rank
    FROM document_chunks
    WHERE tsv_content @@ plainto_tsquery('english', $2) LIMIT 50
)
SELECT COALESCE(s.id, l.id) AS chunk_id,
       COALESCE(1.0 / (60 + s.rank), 0.0) + COALESCE(1.0 / (60 + l.rank), 0.0) AS rrf_score
FROM semantic_search s
FULL OUTER JOIN lexical_search l ON s.id = l.id
ORDER BY rrf_score DESC LIMIT 15;`
    },
    tags: ['pgvector', 'PostgreSQL', 'BM25', 'RAG', 'Cohere Rerank']
  },
  {
    id: 'llm-latency-economics',
    issueNumber: 'DISPATCH № 01',
    category: 'architecture',
    categoryLabel: 'Systems Architecture',
    title: 'The Latency Economics of Modern LLM Deployments',
    subtitle: 'Balancing Time-to-First-Token, PagedAttention chunked prefill, and GPU memory saturation.',
    date: 'June 30, 2026',
    readTime: '8 min read',
    excerpt: 'Optimizing open-weights inference isn\'t just about purchasing faster GPUs; it\'s about KV-cache memory management, continuous batching, and chunked prefill strategies that prevent interactive chat streams from choking under batch ingestion workloads.',
    content: [
      'In high-throughput LLM deployments, two distinct metrics govern user satisfaction: Time to First Token (TTFT), which determines perceived conversational snappiness, and Inter-Token Latency (ITL), which dictates reading fluency.',
      'A common architectural failure occurs when a large batch document processing job enters the cluster while real-time users are chatting. Long prompt evaluation (prefill phase) monopolizes GPU compute cores, causing interactive user generation steps to stutter.',
      'Using vLLM and TensorRT-LLM with chunked prefill, we split massive 8,000-token prompt evaluations into 512-token chunks. This enables the scheduler to interleave decode tokens for real-time users between prompt evaluation slices, keeping TTFT sub-200ms even at 85% cluster load.',
      'We also examine the impact of prompt-caching architecture in production. For structured agent swarms sharing a static 2,000-token system prompt containing schemas and tools, KV-cache reuse cuts input compute costs by up to 70% while dropping prefill latency to single-digit milliseconds.'
    ],
    codeSnippet: {
      language: 'bash',
      filename: 'vllm_cluster_launch.sh',
      code: `# Production vLLM deployment with chunked prefill and speculative decoding
python3 -m vllm.entrypoints.openai.api_server \\
  --model meta-llama/Llama-3.1-70B-Instruct \\
  --tensor-parallel-size 4 \\
  --max-num-seqs 256 \\
  --enable-chunked-prefill \\
  --max-num-batched-tokens 2048 \\
  --gpu-memory-utilization 0.92 \\
  --kv-cache-dtype auto \\
  --port 8000`
    },
    tags: ['vLLM', 'GPU Inference', 'PagedAttention', 'Llama 3.1', 'KV Cache']
  }
];

export default function BlogView({ onTabChange, onTriggerToast }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<DispatchArticle | null>(null);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        art.title.toLowerCase().includes(query) ||
        art.subtitle.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: { id: BlogCategory; label: string }[] = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'voice-ai', label: 'Voice & Multimodal' },
    { id: 'distributed', label: 'Distributed Systems' },
    { id: 'rag-search', label: 'RAG & Vector Search' },
    { id: 'architecture', label: 'Systems Architecture' },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setHasCopiedCode(true);
    onTriggerToast('Code snippet copied to clipboard');
    setTimeout(() => setHasCopiedCode(false), 2500);
  };

  const handleShareArticle = (art: DispatchArticle) => {
    const url = `${window.location.origin}/#blog?article=${art.id}`;
    navigator.clipboard?.writeText(url);
    onTriggerToast(`Article share link copied: "${art.title}"`);
  };

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
            <div className="font-label-mono text-xs text-tertiary">
              4 Published Technical Studies
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
                className="w-full pl-9 pr-4 py-2 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/60 focus:outline-none focus:border-primary placeholder:text-outline"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-surface-variant/30">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 font-label-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-on-surface text-surface font-bold shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Stream */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-12 flex flex-col gap-10">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-low border border-surface-variant/40 flex flex-col items-center gap-3">
            <BookOpen className="w-8 h-8 text-on-surface-variant" />
            <p className="font-title-editorial text-lg text-on-surface">No dispatches match your search criteria.</p>
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
        ) : (
          <div className="flex flex-col gap-8">
            {/* Lead Featured Article (First article in filtered list) */}
            {filteredArticles[0] && (
              <article className="bg-surface-container-low p-6 sm:p-10 border border-surface-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-label-mono text-on-surface-variant border-b border-surface-variant/40 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-secondary font-bold">{filteredArticles[0].issueNumber}</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 bg-surface-container-high text-on-surface">
                        {filteredArticles[0].categoryLabel}
                      </span>
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

                  <h2 className="font-headline-md text-2xl sm:text-4xl text-on-surface font-serif group-hover:text-primary transition-colors leading-tight">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="font-title-editorial text-lg text-on-surface-variant italic">
                    {filteredArticles[0].subtitle}
                  </p>

                  <p className="font-body-md text-sm text-on-surface/85 leading-relaxed">
                    {filteredArticles[0].excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {filteredArticles[0].tags.map((tag) => (
                      <span key={tag} className="font-label-mono text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-surface-variant/40">
                  <button
                    onClick={() => setActiveArticle(filteredArticles[0])}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-on-surface text-surface font-label-technical text-xs uppercase tracking-wider font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer shadow-xs"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleShareArticle(filteredArticles[0])}
                    className="p-2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                    title="Share dispatch link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
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
                      <div className="flex items-center justify-between font-label-mono text-xs text-on-surface-variant">
                        <span className="text-secondary font-bold">{art.issueNumber}</span>
                        <span>{art.readTime}</span>
                      </div>

                      <span className="text-[11px] font-label-mono text-primary uppercase">
                        {art.categoryLabel}
                      </span>

                      <h3 className="font-headline-sm text-xl font-serif text-on-surface group-hover:text-primary transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-surface-variant/30 flex items-center justify-between">
                      <button
                        onClick={() => setActiveArticle(art)}
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

      {/* Full-Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-inverse-surface/70 backdrop-blur-md animate-fade-in overflow-hidden">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-surface text-on-surface shadow-2xl flex flex-col border border-surface-variant overflow-hidden">
            {/* Modal Sticky Header */}
            <div className="px-6 py-4 bg-surface-container-high border-b border-surface-variant/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-xs uppercase font-bold">
                  {activeArticle.issueNumber}
                </span>
                <span className="font-label-mono text-xs text-on-surface-variant hidden sm:inline">
                  {activeArticle.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShareArticle(activeArticle)}
                  className="p-2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                  title="Share dispatch link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors cursor-pointer"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-12 space-y-6">
              {/* Article Topline */}
              <div className="border-b border-surface-variant/40 pb-6">
                <div className="flex items-center gap-4 text-xs font-label-mono text-on-surface-variant mb-2">
                  <span>Published {activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                <h1 className="font-headline-lg text-2xl sm:text-4xl text-on-surface font-serif leading-tight">
                  {activeArticle.title}
                </h1>
                <p className="font-title-editorial text-lg text-on-surface-variant italic mt-2">
                  {activeArticle.subtitle}
                </p>
              </div>

              {/* Body Prose Paragraphs */}
              <div className="space-y-4 font-body-md text-sm sm:text-base text-on-surface leading-relaxed max-w-none">
                {activeArticle.content.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Embedded Code Snippet (if available) */}
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

              {/* Author Monograph Card */}
              <div className="p-6 bg-surface-container-low border border-surface-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
                <div>
                  <span className="font-label-mono text-xs text-primary font-bold uppercase tracking-wider block">
                    AUTHOR MONOGRAPH
                  </span>
                  <div className="font-serif text-lg text-on-surface font-semibold mt-0.5">
                    Himanshu Bharti — Systems &amp; AI Engineer
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Specializing in autonomous agent state-graphs, real-time WebRTC audio engines, and high-throughput microservices.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onTabChange('pricing');
                  }}
                  className="px-4 py-2 bg-secondary-container text-on-secondary-container font-label-technical text-xs uppercase tracking-wider font-semibold cursor-pointer shrink-0"
                >
                  Explore Engagements
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
