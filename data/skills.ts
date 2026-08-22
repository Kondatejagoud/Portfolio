export type SkillStatus = "used" | "familiar" | "exploring";

export interface Skill {
  id: string;
  name: string;
  category: "Programming" | "AI & Machine Learning" | "Data & ML Methods" | "Backend & APIs" | "Web Development" | "Development Tools" | "Exploring";
  status: SkillStatus;
  description?: string;
  projects?: string[]; // references project IDs
}

export const skillsData: Skill[] = [
  // Programming
  {
    id: "python",
    name: "Python",
    category: "Programming",
    status: "used",
    description: "Primary language used for machine learning pipelines, local AI execution scripts, web APIs, and automation routines.",
    projects: ["jarvis", "network-anomaly", "fake-news"]
  },
  {
    id: "java",
    name: "Java",
    category: "Programming",
    status: "used",
    description: "Used for object-oriented systems design, backend services, and structured algorithms code.",
    projects: ["studymate", "smartclass-room"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming",
    status: "familiar",
    description: "Used for scripting, DOM interactions, client-side validation logic, and basic dynamic behaviors.",
    projects: []
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming",
    status: "used",
    description: "Structured query language for managing relational data, indexing, and optimizing queries.",
    projects: ["jarvis", "studymate", "smartclass-room"]
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Programming",
    status: "familiar",
    description: "Standard markup language used to structure web pages and local application views.",
    projects: []
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Programming",
    status: "familiar",
    description: "Style sheets used to format layouts, configure colors, and design user-friendly page flows.",
    projects: []
  },

  // AI & Machine Learning
  {
    id: "ml",
    name: "Machine Learning",
    category: "AI & Machine Learning",
    status: "used",
    description: "Concepts and applications of learning algorithms, statistical modeling, and data-driven pattern prediction.",
    projects: ["network-anomaly", "fake-news"]
  },
  {
    id: "nlp",
    name: "Natural Language Processing (NLP)",
    category: "AI & Machine Learning",
    status: "used",
    description: "Processing and cleaning natural text sequences using tokenizers, regex filters, and corpus parsers.",
    projects: ["fake-news"]
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    category: "AI & Machine Learning",
    status: "exploring",
    description: "Studying artificial neural networks architectures and parameters for complex data patterns.",
    projects: []
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    category: "AI & Machine Learning",
    status: "used",
    description: "Unsupervised clustering algorithms, feature scaling tools, and classification evaluations.",
    projects: ["network-anomaly", "fake-news"]
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Machine Learning",
    status: "exploring",
    description: "Open-source machine learning library used for developing deep learning models.",
    projects: []
  },
  {
    id: "huggingface",
    name: "Hugging Face Transformers",
    category: "AI & Machine Learning",
    status: "exploring",
    description: "Exploring pre-trained model APIs, pipelines, and transformer checkpoints for NLP tasks.",
    projects: []
  },
  {
    id: "distilbert",
    name: "DistilBERT",
    category: "AI & Machine Learning",
    status: "exploring",
    description: "Exploring lightweight, fast transformer architectures for sentiment and sequence tasks.",
    projects: []
  },
  {
    id: "cnn",
    name: "CNN",
    category: "AI & Machine Learning",
    status: "exploring",
    description: "Exploring Convolutional Neural Networks for grid-like topology inputs and pattern extraction.",
    projects: []
  },
  {
    id: "openai-clip",
    name: "OpenAI CLIP",
    category: "AI & Machine Learning",
    status: "exploring",
    description: "Exploring contrastive language-image pre-training models for multimodal associations.",
    projects: []
  },

  // Data & ML Methods
  {
    id: "pandas",
    name: "Pandas",
    category: "Data & ML Methods",
    status: "used",
    description: "Tabular data structures used for loading, cleaning, and preprocessing input vectors.",
    projects: ["network-anomaly", "fake-news"]
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "Data & ML Methods",
    status: "used",
    description: "Multidimensional array operations and scientific mathematical routines for processing numerical packets.",
    projects: ["network-anomaly"]
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    category: "Data & ML Methods",
    status: "used",
    description: "Visualization toolkit used to plot clusters, variance metrics, and packet flow anomalies.",
    projects: ["network-anomaly"]
  },
  {
    id: "pca",
    name: "PCA",
    category: "Data & ML Methods",
    status: "used",
    description: "Principal Component Analysis used to compress high-dimensional packet parameters.",
    projects: ["network-anomaly"]
  },
  {
    id: "dbscan",
    name: "DBSCAN",
    category: "Data & ML Methods",
    status: "used",
    description: "Density-Based Spatial Clustering algorithm used to identify outlier packet bursts without labels.",
    projects: ["network-anomaly"]
  },
  {
    id: "k-means",
    name: "K-Means",
    category: "Data & ML Methods",
    status: "used",
    description: "Centroid-based clustering used for partitioning spatial datasets into dense centers.",
    projects: []
  },
  {
    id: "preprocessing",
    name: "Data Preprocessing",
    category: "Data & ML Methods",
    status: "used",
    description: "Normalizing, scaling, tokenizing, and filtering raw text or packet logs before modeling.",
    projects: ["network-anomaly", "fake-news"]
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    category: "Data & ML Methods",
    status: "used",
    description: "Inspecting data schemas, evaluating statistics, and finding patterns in collected datasets.",
    projects: ["network-anomaly", "fake-news"]
  },

  // Backend & APIs
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend & APIs",
    status: "used",
    description: "Asynchronous Python web framework used to configure low-latency local rest endpoints.",
    projects: ["jarvis"]
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend & APIs",
    status: "familiar",
    description: "JavaScript runtime environment used for executing server-side scripts and package management.",
    projects: []
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Backend & APIs",
    status: "used",
    description: "Designing structured REST endpoints and request/response payloads.",
    projects: ["jarvis", "studymate", "smartclass-room"]
  },
  {
    id: "sqlalchemy",
    name: "SQLAlchemy",
    category: "Backend & APIs",
    status: "used",
    description: "SQL Toolkit and Object-Relational Mapper for Python database operations.",
    projects: ["jarvis"]
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "Backend & APIs",
    status: "used",
    description: "Self-contained, local database engine used for application data persistence.",
    projects: ["jarvis", "studymate"]
  },
  {
    id: "async-python",
    name: "Async Python",
    category: "Backend & APIs",
    status: "used",
    description: "Using async/await loops in Python to prevent execution blocking during heavy inference calls.",
    projects: ["jarvis"]
  },
  {
    id: "api-dev",
    name: "API Development",
    category: "Backend & APIs",
    status: "used",
    description: "Designing, mapping, testing, and debugging interface pathways connecting backend features.",
    projects: ["jarvis", "studymate", "smartclass-room"]
  },

  // Web Development
  {
    id: "html",
    name: "HTML",
    category: "Web Development",
    status: "familiar",
    description: "Writing semantic nodes and layout parameters to render portfolio page assets.",
    projects: []
  },
  {
    id: "css",
    name: "CSS",
    category: "Web Development",
    status: "familiar",
    description: "Styling grids, flex displays, animations, and scanline overlay layouts.",
    projects: []
  },
  {
    id: "web-js",
    name: "JavaScript",
    category: "Web Development",
    status: "familiar",
    description: "Handling client-side events, channel transitions, and interactive components.",
    projects: []
  },
  {
    id: "web-rest-apis",
    name: "REST APIs",
    category: "Web Development",
    status: "used",
    description: "Consuming API services to display dynamic telemetry dashboard widgets.",
    projects: ["jarvis", "studymate", "smartclass-room"]
  },

  // Development Tools
  {
    id: "git",
    name: "Git",
    category: "Development Tools",
    status: "used",
    description: "Distributed version control system to track changes in source code repositories.",
    projects: ["jarvis", "studymate", "network-anomaly", "smartclass-room", "fake-news"]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development Tools",
    status: "used",
    description: "Hosting platform for Git repositories, pipelines, and online documentation.",
    projects: ["jarvis", "studymate", "network-anomaly", "smartclass-room", "fake-news"]
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Development Tools",
    status: "used",
    description: "Primary source code editor used for full-stack programming, local tests, and execution.",
    projects: ["jarvis", "studymate", "network-anomaly", "smartclass-room", "fake-news"]
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    category: "Development Tools",
    status: "used",
    description: "Interactive documents environment used for prototyping algorithms, cleaning tables, and modeling.",
    projects: ["network-anomaly", "fake-news"]
  },
  {
    id: "anaconda",
    name: "Anaconda",
    category: "Development Tools",
    status: "used",
    description: "Package manager and environment setup tool for managing Python version packages.",
    projects: ["network-anomaly", "fake-news"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Development Tools",
    status: "used",
    description: "Containerization software used for deploying consistent local REST endpoints.",
    projects: ["jarvis"]
  },
  {
    id: "uvicorn",
    name: "Uvicorn",
    category: "Development Tools",
    status: "used",
    description: "Lightning-fast ASGI server implementation used to host FastAPI backends.",
    projects: ["jarvis"]
  },
  {
    id: "npm",
    name: "npm",
    category: "Development Tools",
    status: "used",
    description: "Package manager for JavaScript runtimes used to install next.js dependencies.",
    projects: []
  },

  // Exploring (Section 3 topics)
  {
    id: "ai-agents",
    name: "AI Agent Architecture",
    category: "Exploring",
    status: "exploring",
    description: "Studying how models connect with tools, memory stores, and self-correction loops to coordinate tasks.",
  },
  {
    id: "system-design",
    name: "System Design",
    category: "Exploring",
    status: "exploring",
    description: "Understanding horizontal scaling, relational mapping, thread pooling, and high-availability patterns.",
  },
  {
    id: "advanced-backend",
    name: "Advanced Backend Architecture",
    category: "Exploring",
    status: "exploring",
    description: "Designing low-latency distributed microservices, event queues, and database optimization algorithms.",
  },
  {
    id: "vector-search",
    name: "Vector Search",
    category: "Exploring",
    status: "exploring",
    description: "Studying semantic similarity search, vector indexing (HNSW), and database retrieval algorithms.",
  },
  {
    id: "async-systems",
    name: "Asynchronous Systems",
    category: "Exploring",
    status: "exploring",
    description: "Understanding non-blocking event loops, message brokers, concurrency, and async tasks queueing.",
  }
];
