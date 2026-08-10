export interface Episode {
  id: string;
  title: string;
  objective: string;
  problem: string;
  approach: string;
  technologies: string[];
  architecture?: string;
  status: 'ACTIVE' | 'DEVELOPMENT' | 'COMPLETE' | 'RETIRED';
  lessonsLearned: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: 'ACTIVE' | 'DEVELOPMENT' | 'COMPLETE' | 'RETIRED';
  season: string;
  summary: string;
  demoUrl?: string;
  reportUrl?: string;
  sourceCodeUrl?: string;
  episodes: Episode[];
}

export const projectsData: Project[] = [
  {
    id: "jarvis",
    title: "JARVIS",
    tagline: "LOCAL AI ASSISTANT",
    status: "ACTIVE",
    season: "SEASON 01",
    summary: "An autonomous offline-first AI assistant integrated with local files, speech-to-text, and conversational memory.",
    demoUrl: "#",
    reportUrl: "#",
    sourceCodeUrl: "https://github.com",
    episodes: [
      {
        id: "ep-01",
        title: "EP 01 — INITIAL IDEA",
        objective: "Build a privacy-preserving assistant running 100% locally.",
        problem: "Cloud-based AI assistants suffer from network latency and privacy concerns regarding personal data processing.",
        approach: "Utilize lightweight open-source Large Language Models running locally via Llama.cpp and expose them through a clean local REST API.",
        technologies: ["Python", "Llama.cpp", "GGUF Models"],
        architecture: "User -> local CLI -> Llama.cpp backend -> Local model inference",
        status: "COMPLETE",
        lessonsLearned: "Local inference is highly dependent on hardware memory bandwidth. Choosing the right quantization level (e.g. Q4_K_M) is critical for speed."
      },
      {
        id: "ep-02",
        title: "EP 02 — VOICE INTERFACE",
        objective: "Enable hands-free natural voice interaction.",
        problem: "Standard wake-word systems are resource-intensive or require external API connections.",
        approach: "Implement OpenAI's Whisper model locally for transcription and combined it with an offline Text-to-Speech engine.",
        technologies: ["Python", "Whisper", "Pyttsx3", "SoundDevice"],
        architecture: "Audio Input -> SoundDevice capture -> Whisper Transcribe -> LLM -> Pyttsx3 TTS -> Audio Out",
        status: "COMPLETE",
        lessonsLearned: "Handling audio silence detection and buffering correctly avoids clipping words at the beginning and end of sentences."
      },
      {
        id: "ep-03",
        title: "EP 03 — MEMORY SYSTEM",
        objective: "Allow the assistant to remember details across sessions.",
        problem: "LLM context windows are limited and lose details when restarts or long periods occur.",
        approach: "Implement a hybrid memory architecture combining semantic retrieval (Vector Database) and structured metadata stores.",
        technologies: ["Python", "SQLite", "ChromaDB", "SentenceTransformers"],
        architecture: "User Input -> Vector Search (ChromaDB) + Sqlite metadata -> Embed into LLM Context -> Response",
        status: "COMPLETE",
        lessonsLearned: "Direct database storage is great for facts, but vector search is necessary to retrieve concepts based on conversational semantic intent."
      },
      {
        id: "ep-04",
        title: "EP 04 — BACKEND ARCHITECTURE",
        objective: "Expose assistant functions to multiple frontend client interfaces.",
        problem: "Monolithic scripts were hard to test, scale, and connect to other UI clients (like web pages or terminal widgets).",
        approach: "Refactor the assistant as a modular FastAPI web service with asynchronous routing, WebSocket support for streaming, and clean JSON endpoints.",
        technologies: ["FastAPI", "Uvicorn", "WebSockets", "Pydantic"],
        architecture: "HTTP Client / WebSocket CLI -> FastAPI Controller -> Core Orchestration Layer -> (Whisper / SQLite / LLM Engine)",
        status: "COMPLETE",
        lessonsLearned: "Async request handling in FastAPI prevents UI blocking during heavy model inference runs."
      },
      {
        id: "ep-05",
        title: "EP 05 — CURRENT VERSION",
        objective: "Synchronize all systems and run continuous local agents.",
        problem: "The system runs sequentially; we need active agents that can perform periodic tasks like checking calendar entries and alerting the user.",
        approach: "Establish background task loops utilizing asyncio in python, integrated with local SQLite scheduler tables.",
        technologies: ["Python", "FastAPI", "SQLite", "Asyncio"],
        architecture: "Async Event Loop -> Scheduler -> Agent Task Queue -> Execution -> Speech Notification",
        status: "ACTIVE",
        lessonsLearned: "Careful locks are required when writing to SQLite databases from concurrent background tasks."
      }
    ]
  },
  {
    id: "hybrid-detector",
    title: "HYBRID DETECTOR",
    tagline: "FAKE NEWS / INFORMATION ANALYSIS",
    status: "DEVELOPMENT",
    season: "SEASON 01",
    summary: "A machine learning pipeline that analyzes news articles, cross-references statements with trusted databases, and flags credibility indices.",
    demoUrl: "#",
    reportUrl: "#",
    sourceCodeUrl: "https://github.com",
    episodes: [
      {
        id: "hd-ep-01",
        title: "EP 01 — SYSTEM ARCHITECTURE",
        objective: "Design a scalable credibility pipeline.",
        problem: "Analyzing text style is insufficient to detect fake news; verification must cross-reference actual facts.",
        approach: "Created a two-stage pipeline: (1) Linguistic stylometry checks, and (2) Contextual claims verification against trusted knowledge bases.",
        technologies: ["Python", "Scikit-Learn", "NLTK", "Wikidata API"],
        architecture: "Article Text -> Stylometric Feature Vectorizer -> NLP Claims Extractor -> Knowledge Graph Query -> Final Prediction",
        status: "DEVELOPMENT",
        lessonsLearned: "Sourcing verified claims in real-time is difficult. API rate limits and structural inconsistencies require robust sanitizers."
      }
    ]
  },
  {
    id: "network-anomaly",
    title: "NETWORK ANOMALY",
    tagline: "MACHINE LEARNING SYSTEM",
    status: "COMPLETE",
    season: "SEASON 01",
    summary: "An intrusion detection model using unsupervised machine learning to classify outliers and detect malicious network packets.",
    demoUrl: "#",
    reportUrl: "#",
    sourceCodeUrl: "https://github.com",
    episodes: [
      {
        id: "na-ep-01",
        title: "EP 01 — PIPELINE & ML METHODS",
        objective: "Perform real-time categorization of packet anomalies.",
        problem: "Rule-based security systems cannot detect zero-day attacks that have no matching signatures.",
        approach: "Apply Dimensionality Reduction (PCA) to normalize packet statistics, followed by DBSCAN clustering to identify anomalous outlier packets.",
        technologies: ["Scikit-Learn", "Pandas", "NumPy", "PCA", "DBSCAN"],
        architecture: "Network Stream -> Packet Feature Extractor -> PCA reduction -> DBSCAN clustering -> Anomaly alert console",
        status: "COMPLETE",
        lessonsLearned: "Unsupervised models require careful scaling of packet size and time delta features. DBSCAN is sensitive to the eps hyperparameter."
      }
    ]
  }
];
