export interface CurrentlyBuilding {
  project: string;
  subtitle: string;
  status: 'ACTIVE' | 'IDLE';
  focus: string[];
}

export interface DevelopmentLog {
  date: string;
  project: string;
  change: string;
  status: 'COMPLETED' | 'IN PROGRESS';
}

export interface TechnicalNote {
  title: string;
  explanation: string;
  relatedProject: string;
}

export interface LearningTopic {
  topic: string;
  status: 'IN PROGRESS' | 'EXPLORING' | 'COMPLETED';
}

export interface BrokenThing {
  project: string;
  problem: string;
  cause: string;
  lesson: string;
  status: 'RESOLVED' | 'INVESTIGATING';
}

export const currentlyBuilding: CurrentlyBuilding[] = [
  {
    project: "JARVIS",
    subtitle: "Local AI Assistant",
    status: "ACTIVE",
    focus: [
      "Memory retrieval logic",
      "FastAPI backend architecture",
      "Local voice processing integration",
      "Asynchronous background tool execution"
    ]
  }
];

export const developmentLogs: DevelopmentLog[] = [
  {
    date: "11 AUG 2026",
    project: "TEJA NETWORK",
    change: "Refined the portfolio architecture, replaced the episode-based project structure with a program-based system, and redesigned the Workshop around real development activity.",
    status: "COMPLETED"
  },
  {
    date: "08 AUG 2026",
    project: "FAKE NEWS DETECTION",
    change: "Refined preprocessing and evidence retrieval components.",
    status: "COMPLETED"
  },
  {
    date: "05 AUG 2026",
    project: "NETWORK ANOMALY DETECTION",
    change: "Improved the anomaly detection pipeline and reviewed PCA/DBSCAN processing.",
    status: "COMPLETED"
  }
];

export const technicalNotes: TechnicalNote[] = [
  {
    title: "WHY FASTAPI?",
    explanation: "FastAPI provides native support for asynchronous routing. This prevents the single-threaded Python runtime from blocking during heavy local LLM inference queries.",
    relatedProject: "JARVIS"
  },
  {
    title: "WHY DBSCAN?",
    explanation: "DBSCAN is ideal for anomaly detection because it clusters data based on density and handles arbitrary shapes. It automatically labels sparse packet variations as noise without requiring a pre-specified number of clusters.",
    relatedProject: "NETWORK ANOMALY DETECTION"
  },
  {
    title: "WHY PCA?",
    explanation: "Principal Component Analysis reduces high-dimensional packet parameters down to key components, preserving variance while minimizing the computational cost of spatial clustering algorithms.",
    relatedProject: "NETWORK ANOMALY DETECTION"
  },
  {
    title: "HOW MEMORY WORKS IN JARVIS",
    explanation: "Jarvis uses a hybrid memory system. Chat context is vectorized in ChromaDB for semantic search retrieval, while structural parameters are queried directly from an SQLite relational backend.",
    relatedProject: "JARVIS"
  }
];

export const learning: LearningTopic[] = [
  { topic: "AI Agent Workflows & Coordination", status: "IN PROGRESS" },
  { topic: "Advanced Systems Design & Scaling", status: "EXPLORING" },
  { topic: "CUDA Hardware-Accelerated Inference", status: "EXPLORING" }
];

export const problems: BrokenThing[] = [
  {
    project: "NETWORK ANOMALY DETECTION",
    problem: "Packet clustering processing latency exceeded 500ms.",
    cause: "DBSCAN was calculating spatial density distance over too many raw packet feature dimensions.",
    lesson: "Dimensionality reduction (PCA) must precede density clustering on high-frequency network streams.",
    status: "RESOLVED"
  },
  {
    project: "FAKE NEWS DETECTION",
    problem: "Wikidata verification API queries timed out under load.",
    cause: "Concurrent network checks on claims triggered remote API rate limits.",
    lesson: "Caching query results locally in a lightweight store is essential to prevent rate limit blocks during claims matching.",
    status: "RESOLVED"
  }
];

export const buildProcess = [
  "IDEA",
  "UNDERSTAND",
  "BUILD",
  "TEST",
  "DEBUG",
  "IMPROVE",
  "DEPLOY"
];
