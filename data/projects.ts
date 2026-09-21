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
    subtitle: "AI LEARNING ASSISTANT",
    description: "An AI-powered learning assistant that helps students organize study materials, generate notes, simplify complex concepts, and receive personalized academic support.",
    status: "COMPLETED",
    category: "AI Learning Assistant",
    technologies: ["Python", "Streamlit", "IBM watsonx", "Hugging Face", "FAISS"],
    objective: "Build an intelligent study companion that helps students understand, organize, and work with their learning materials more efficiently.",
    problem: "Students often spend significant time organizing study materials, creating notes, and trying to understand difficult concepts. Information may be scattered across different resources, while manually converting large study material into useful notes can be time-consuming.",
    approach: "StudyMate brings study organization and AI-assisted academic support together in a student-focused workflow.",
    results: "Built and uploaded a functional student-focused AI learning platform designed to support common study and learning tasks.",
    lessons: "Through StudyMate, I explored how AI can be integrated into a practical student-focused application rather than being used only as an isolated model or demonstration.",
    links: {
      sourceCode: "https://github.com/Kondatejagoud/studymate"
    },
    featured: true
  },
  {
    id: "network-anomaly",
    programNumber: "PROGRAM 003",
    title: "NETWORK TRAFFIC ANOMALY DETECTION",
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
    subtitle: "STUDENT ACTIVITY MONITORING / COMPUTER VISION",
    description: "An activity monitoring system designed to analyze student activity during online classes using computer vision.",
    status: "COMPLETED",
    category: "Student Activity Monitoring / Computer Vision",
    technologies: ["Python", "FastAPI", "OpenCV", "MediaPipe", "React", "WebSockets"],
    objective: "Build a computer-vision-based system that can monitor and analyze student activity during online classes.",
    problem: "Online classes make it harder for instructors to observe student activity compared with physical classrooms. A computer-vision-based system can analyze observable activity signals during online learning sessions and provide useful activity information.",
    approach: "SmartClass Room uses camera-based visual input and computer-vision techniques to analyze activity-related signals during online classes.",
    results: "Built a functional web-based student activity monitoring system featuring real-time visual analysis and live instructor dashboard controls.",
    lessons: "Through SmartClass Room, I explored computer vision, image/video processing, camera input, activity analysis, and designing practical software around a real-world online learning scenario.",
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
