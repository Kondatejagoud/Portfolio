export interface Experiment {
  id: string;
  title: string;
  hypothesis: string;
  status: 'ACTIVE' | 'TESTING' | 'FAILED' | 'PLANNED';
  method: string;
  result: string;
  retiredDate?: string;
  reason?: string;
  lesson?: string;
}

export const experimentsData: Experiment[] = [
  {
    id: "EXP-001",
    title: "LONG-TERM CONTEXT PERSISTENCE",
    hypothesis: "Can an offline LLM maintain long-term memory using hybrid retrieval?",
    status: "ACTIVE",
    method: "LLM + VectorDB (ChromaDB) + SQLite Metadata Retrieval loops.",
    result: "PARTIAL SUCCESS. Retrieved facts accurately, but formatting constraints occasionally failed."
  },
  {
    id: "EXP-002",
    title: "REAL-TIME PACKET ANALYZER PIPELINE",
    hypothesis: "Will a light DBSCAN model classify network anomalies under 50ms latency?",
    status: "TESTING",
    method: "Stream packets through local socket -> PCA filter -> Scikit-learn DBSCAN -> Alert CLI.",
    result: "PENDING. Initial runs indicate <35ms latency, but requires long-term memory stability testing."
  },
  {
    id: "EXP-003",
    title: "MULTI-MODEL CROSS ENCODER SEARCH",
    hypothesis: "Can we use a cross-encoder model to re-rank facts in local context search?",
    status: "PLANNED",
    method: "Embed bi-encoder candidates -> Feed query-document pairs to cross-encoder -> Re-rank.",
    result: "PLANNED. Scheduled for system iteration next season."
  },
  {
    id: "EXP-004",
    title: "REDUNDANT LLM RETRY AGENT",
    hypothesis: "Can self-correcting prompt templates resolve JSON validation errors without cloud API support?",
    status: "ACTIVE",
    method: "Try/Catch loop parsing output -> Feed errors back into local model as instruction -> Retry.",
    result: "STABLE. Successfully reduces JSON parsing errors by 82% over single-shot local attempts."
  },
  {
    id: "EXP-005",
    title: "MONOLITHIC CHATBOT WRAPPER",
    hypothesis: "Can a single python script coordinate Whisper, LLM, TTS, and database operations simultaneously without threads?",
    status: "FAILED",
    method: "Sequential loop parsing voice commands, writing database entries, and playing TTS audio.",
    result: "RETIRED",
    retiredDate: "2025-06-12",
    reason: "The first working version was extremely slow. Speech playback locked inference and the architecture was not scalable.",
    lesson: "The first working version is rarely the final architecture. Split components into separate services and use async task managers."
  },
  {
    id: "EXP-006",
    title: "STATIC CLOUD VECTOR CACHING",
    hypothesis: "Can we cache vector embeddings in a shared static web folder to speed up retrieval?",
    status: "FAILED",
    method: "Upload pickled numpy indices to cloud store -> Client fetches and runs cosine similarity.",
    result: "RETIRED",
    retiredDate: "2025-11-04",
    reason: "Inefficient memory usage and bandwidth overhead for clients downloading the whole file.",
    lesson: "Use proper lightweight database servers. Client-side vector search is only viable for very small datasets."
  }
];
