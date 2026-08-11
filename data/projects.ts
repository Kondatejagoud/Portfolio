export interface Project {
  id: string;
  programNumber: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'LIVE' | 'ACTIVE' | 'COMPLETED' | 'EXPERIMENTAL' | 'ARCHIVED';
  category: string;
  technologies: string[];
  objective: string;
  problem: string;
  approach: string;
  architecture?: string;
  implementation?: string;
  results?: string;
  lessons: string;
  links: {
    sourceCode?: string;
    liveDemo?: string;
    technicalReport?: string;
  };
  featured: boolean;
  screenshots?: string[];
}

export const projectsData: Project[] = [
  {
    id: "jarvis",
    programNumber: "PROGRAM 001",
    title: "JARVIS",
    subtitle: "LOCAL AI ASSISTANT",
    description: "A privacy-focused, offline-first personal AI assistant designed around local inference, voice interaction, memory and tool execution.",
    status: "ACTIVE",
    category: "Artificial Intelligence",
    technologies: ["Python", "FastAPI", "SQLite", "Llama.cpp", "Whisper", "ChromaDB"],
    objective: "Build a privacy-preserving assistant running 100% locally on personal hardware.",
    problem: "Cloud-based AI assistants suffer from network latency and raise privacy concerns regarding personal data processing.",
    approach: "Utilize lightweight open-source Large Language Models running locally via Llama.cpp and expose them through a clean local REST API.",
    architecture: `VOICE
  ↓
SPEECH PROCESSING (Whisper)
  ↓
ORCHESTRATOR (FastAPI)
  ↓
MEMORY (SQLite + ChromaDB)
  ↓
LLM (Llama.cpp GGUF)
  ↓
TOOLS / ACTIONS`,
    lessons: "Local inference speed is highly dependent on memory bandwidth. Choosing appropriate model quantization (e.g. Q4_K_M) is critical for hardware speed.",
    links: {
      sourceCode: "https://github.com/Kondatejagoud/Jarvis"
    },
    featured: true
  },
  {
    id: "studymate",
    programNumber: "PROGRAM 002",
    title: "STUDYMATE",
    subtitle: "AI-ASSISTED STUDY SYSTEM",
    description: "An intelligent platform designed to assist students with schedule optimization, course load mapping, and automated flashcard generation.",
    status: "COMPLETED",
    category: "Software Systems",
    technologies: ["Java", "REST APIs", "SQLite", "SQL"],
    objective: "Provide structured planning and learning support interfaces for academic curriculums.",
    problem: "Students face academic fragmentation when managing schedules, tasks, and summarization tools in separate interfaces.",
    approach: "Designed a consolidated database-backed application that tracks course syllabi and utilizes text processing scripts to index notes.",
    lessons: "Relational indexing is critical when managing multi-table schedules and note associations to maintain prompt responses.",
    links: {
      sourceCode: "https://github.com/Kondatejagoud/studymate"
    },
    featured: true
  },
  {
    id: "network-anomaly",
    programNumber: "PROGRAM 003",
    title: "NETWORK ANOMALY DETECTION",
    subtitle: "UNSUPERVISED MACHINE LEARNING SYSTEM",
    description: "An unsupervised machine learning pipeline for identifying anomalous network traffic and outlier patterns.",
    status: "COMPLETED",
    category: "Machine Learning / Security",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "PCA", "DBSCAN"],
    objective: "Perform real-time clustering of incoming packets to flag outlier signatures.",
    problem: "Rule-based security systems cannot detect zero-day attacks that have no matching signatures in existing registries.",
    approach: "Apply Dimensionality Reduction (PCA) to normalize packet statistics, followed by DBSCAN clustering to isolate outlier packets.",
    architecture: `NETWORK TRAFFIC
  ↓
FEATURE EXTRACTION (Pandas)
  ↓
PCA (Dimensionality Reduction)
  ↓
DBSCAN (Clustering)
  ↓
ANOMALY ANALYSIS`,
    lessons: "Unsupervised models require extensive scaling of feature magnitudes. DBSCAN is sensitive to density scale parameters (eps).",
    links: {
      sourceCode: "https://github.com/Kondatejagoud/Network_anomaly_detection"
    },
    featured: true
  },
  {
    id: "smartclass-room",
    programNumber: "PROGRAM 004",
    title: "SMARTCLASS ROOM",
    subtitle: "STUDENT ACTIVITY MONITORING SYSTEM",
    description: "An aggregate tracking interface that displays environmental conditions and attendance status inside classrooms.",
    status: "COMPLETED",
    category: "Systems Engineering",
    technologies: ["Java", "REST APIs", "SQL", "Git"],
    objective: "Automate class metrics gathering and conditions tracking via a unified console.",
    problem: "Manual attendance reporting and environmental checks are time-consuming and prone to errors.",
    approach: "Built a secure client-server dashboard that aggregates student status flags and local classroom data.",
    lessons: "Lightweight network payloads are essential for maintaining dashboard responsiveness across multiple concurrent class sessions.",
    links: {
      sourceCode: "https://github.com/Kondatejagoud/Smartclass_room"
    },
    featured: true
  },
  {
    id: "fake-news",
    programNumber: "PROGRAM 005",
    title: "FAKE NEWS DETECTION",
    subtitle: "INFORMATION ANALYSIS SYSTEM",
    description: "A linguistic and database cross-referencing model designed to assess claims veracity and predict credibility indices of news articles.",
    status: "LIVE",
    category: "Natural Language Processing",
    technologies: ["Python", "Scikit-learn", "Pandas", "NLTK", "Wikidata API"],
    objective: "Assess credibility and flags stylometric patterns in news articles.",
    problem: "Detecting false claims requires checking actual facts in addition to analyzing writing patterns and linguistic style.",
    approach: "Construct a two-stage analysis pipeline verifying stylometrics and cross-checking claims with trusted public knowledge bases.",
    architecture: `INPUT (Article Text)
  ↓
PREPROCESSING (NLTK Tokenizer)
  ↓
LINGUISTIC ANALYSIS (Stylometrics)
  ↓
CLAIM EXTRACTION
  ↓
EVIDENCE RETRIEVAL (Wikidata API)
  ↓
DECISION ENGINE
  ↓
RESULT (Credibility Report)`,
    lessons: "Information indexing is highly dependent on factual query latency. Fallbacks are required for unindexed entities.",
    links: {
      sourceCode: "https://github.com/Kondatejagoud/Fake_news_detection",
      liveDemo: "https://kondatejagoud.github.io/Fake_news_detection" // Example live demo
    },
    featured: true
  }
];
