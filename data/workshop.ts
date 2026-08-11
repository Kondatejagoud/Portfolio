export interface WorkshopActivity {
  id: string;
  projectId: string; // 'jarvis' | 'studymate' | 'network-anomaly' | 'smartclass-room' | 'fake-news'
  date?: string;
  category:
    | "development"
    | "technical-note"
    | "lesson"
    | "problem"
    | "learning";
  title: string;
  description: string;
  status?: string;
}

export const workshopActivities: WorkshopActivity[] = [
  // 1. Development Logs (Category: 'development')
  {
    id: "dev-1",
    projectId: "jarvis",
    date: "10 AUG 2026",
    category: "development",
    title: "Memory retrieval architecture improved",
    description: "Integrated SQLite relational database and ChromaDB semantic context matching to resolve retrieval query speed and accuracy issues.",
    status: "COMPLETED"
  },
  {
    id: "dev-2",
    projectId: "fake-news",
    date: "08 AUG 2026",
    category: "development",
    title: "Evidence retrieval and preprocessing refined",
    description: "Refined pre-processing text pipelines using NLTK and added Wikidata verification caching fallback routes.",
    status: "COMPLETED"
  },
  {
    id: "dev-3",
    projectId: "network-anomaly",
    date: "05 AUG 2026",
    category: "development",
    title: "PCA/DBSCAN processing reviewed",
    description: "Evaluated feature compression scaling factors and DBSCAN hyper-parameters to minimize packet detection latency under heavy load.",
    status: "COMPLETED"
  },

  // 2. Technical Notes (Category: 'technical-note')
  {
    id: "note-1",
    projectId: "jarvis",
    category: "technical-note",
    title: "WHY FASTAPI?",
    description: "Exposes asynchronous routes so the single-threaded python engine is never blocked during long-running local LLM inference operations.",
  },
  {
    id: "note-2",
    projectId: "network-anomaly",
    category: "technical-note",
    title: "WHY DBSCAN?",
    description: "Clusters incoming data by spatial density without requiring you to pre-define the target cluster count, marking anomalies as noise.",
  },
  {
    id: "note-3",
    projectId: "network-anomaly",
    category: "technical-note",
    title: "WHY PCA?",
    description: "Compresses raw high-dimensional packet data down to key principal components to speed up spatial distance calculations.",
  },
  {
    id: "note-4",
    projectId: "fake-news",
    category: "technical-note",
    title: "EVIDENCE RETRIEVAL",
    description: "Synthesizes stylistic features with factual checking using the Wikidata API to assess article veracity.",
  },
  {
    id: "note-5",
    projectId: "smartclass-room",
    category: "technical-note",
    title: "STUDENT MONITORING",
    description: "Organizes environmental packets and activity signals in real-time to track session participation rates.",
  },
  {
    id: "note-6",
    projectId: "studymate",
    category: "technical-note",
    title: "STUDY WORKFLOW DESIGN",
    description: "Optimizes multi-table indexing to connect course details, schedules, and flashcard queues dynamically.",
  },

  // 3. Lessons (Category: 'lesson')
  {
    id: "lesson-1",
    projectId: "jarvis",
    category: "lesson",
    title: "Memory Systems",
    description: "Memory systems require careful retrieval and context management.",
  },
  {
    id: "lesson-2",
    projectId: "network-anomaly",
    category: "lesson",
    title: "Feature Preparation",
    description: "Feature preparation and clustering parameters strongly affect unsupervised anomaly detection.",
  },
  {
    id: "lesson-3",
    projectId: "fake-news",
    category: "lesson",
    title: "Text Analysis",
    description: "Text analysis alone is not enough for reliable information verification; contextual evidence matters.",
  },
  {
    id: "lesson-4",
    projectId: "studymate",
    category: "lesson",
    title: "User-Focused Design",
    description: "User-focused systems need a simple workflow in addition to technical functionality.",
  },
  {
    id: "lesson-5",
    projectId: "smartclass-room",
    category: "lesson",
    title: "Monitoring Signals",
    description: "Monitoring systems require careful handling of events, activity signals and data flow.",
  },

  // 4. Broken Things / Troubleshooting logs (Category: 'problem')
  {
    id: "problem-1",
    projectId: "jarvis",
    category: "problem",
    title: "Memory retrieval returned irrelevant context",
    description: "Simple keyword queries were pulling unrelated facts from the vector DB. Resolved by calibrating similarity thresholds and pre-filtering meta-keys.",
    status: "RESOLVED"
  },
  {
    id: "problem-2",
    projectId: "network-anomaly",
    category: "problem",
    title: "Clustering behavior changed significantly with preprocessing",
    description: "DBSCAN spatial density calculations timed out. Resolved by running PCA dimensionality reduction prior to clustering.",
    status: "RESOLVED"
  },
  {
    id: "problem-3",
    projectId: "fake-news",
    category: "problem",
    title: "Evidence retrieval needed fallback handling",
    description: "Remote Wikidata queries timed out. Resolved by caching Wikidata responses in a lightweight cache database.",
    status: "RESOLVED"
  },
  {
    id: "problem-4",
    projectId: "smartclass-room",
    category: "problem",
    title: "Activity monitoring required more careful event handling",
    description: "Heavy aggregate attendance packets choked WebSocket connections. Resolved by using differential updates.",
    status: "RESOLVED"
  },
  {
    id: "problem-5",
    projectId: "studymate",
    category: "problem",
    title: "Workflow design needed simplification",
    description: "Database queries suffered from high latency. Resolved by redesigning index structures.",
    status: "RESOLVED"
  },

  // 5. Technologies being explored / currently learning (Category: 'learning')
  {
    id: "learn-1",
    projectId: "jarvis",
    category: "learning",
    title: "AI AGENT ARCHITECTURE",
    description: "IN PROGRESS",
  },
  {
    id: "learn-2",
    projectId: "fake-news",
    category: "learning",
    title: "SYSTEM DESIGN",
    description: "EXPLORING",
  },
  {
    id: "learn-3",
    projectId: "network-anomaly",
    category: "learning",
    title: "BACKEND ENGINEERING",
    description: "EXPLORING",
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
