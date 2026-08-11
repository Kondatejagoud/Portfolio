export interface Skill {
  name: string;
  category: 'PROGRAMMING' | 'BACKEND' | 'MACHINE_LEARNING' | 'TOOLS';
  description: string;
  projectIds: string[]; // references project.id
}

export const skillsData: Skill[] = [
  // Programming
  {
    name: "Python",
    category: "PROGRAMMING",
    description: "Primary language used for machine learning pipelines, local AI execution scripts, Web APIs, and automation routines.",
    projectIds: ["jarvis", "network-anomaly", "fake-news"]
  },
  {
    name: "Java",
    category: "PROGRAMMING",
    description: "Used for object-oriented systems design, backend services, and university coursework in algorithms.",
    projectIds: ["studymate", "smartclass-room"]
  },
  {
    name: "C",
    category: "PROGRAMMING",
    description: "Low-level system programming, memory management, and understanding machine-level hardware interactions.",
    projectIds: []
  },
  // Backend
  {
    name: "FastAPI",
    category: "BACKEND",
    description: "Modern, high-performance web framework for building asynchronous Python APIs.",
    projectIds: ["jarvis"]
  },
  {
    name: "REST APIs",
    category: "BACKEND",
    description: "Architectural style for designing networked applications, mapping out endpoints, and communication payloads.",
    projectIds: ["jarvis", "studymate", "smartclass-room"]
  },
  {
    name: "SQLite",
    category: "BACKEND",
    description: "Self-contained, serverless relational database engine used for local application storage.",
    projectIds: ["jarvis", "studymate"]
  },
  {
    name: "SQL",
    category: "BACKEND",
    description: "Structured query language for managing data in relational databases, indexing, and optimizing queries.",
    projectIds: ["jarvis", "studymate", "smartclass-room"]
  },
  // Machine Learning
  {
    name: "Scikit-learn",
    category: "MACHINE_LEARNING",
    description: "Tools for predictive data analysis, model fitting, preprocessing, and classification pipelines.",
    projectIds: ["network-anomaly", "fake-news"]
  },
  {
    name: "Pandas",
    category: "MACHINE_LEARNING",
    description: "Data manipulation library for loading, cleaning, transforming, and analyzing tabular datasets.",
    projectIds: ["network-anomaly", "fake-news"]
  },
  {
    name: "NumPy",
    category: "MACHINE_LEARNING",
    description: "Scientific computing package for fast multidimensional array processing and mathematical operations.",
    projectIds: ["network-anomaly"]
  },
  {
    name: "PCA",
    category: "MACHINE_LEARNING",
    description: "Principal Component Analysis used to reduce dimensional space in packets while preserving variance.",
    projectIds: ["network-anomaly"]
  },
  {
    name: "DBSCAN",
    category: "MACHINE_LEARNING",
    description: "Density-Based Spatial Clustering of Applications with Noise, useful for finding anomaly clusters in network packets.",
    projectIds: ["network-anomaly"]
  },
  {
    name: "K-Means",
    category: "MACHINE_LEARNING",
    description: "Centroid-based clustering method used for partitioning datasets into clusters of similar density.",
    projectIds: []
  },
  // Tools
  {
    name: "Git",
    category: "TOOLS",
    description: "Distributed version control system to track changes in source code during software development.",
    projectIds: ["jarvis", "studymate", "network-anomaly", "smartclass-room", "fake-news"]
  },
  {
    name: "GitHub",
    category: "TOOLS",
    description: "Hosting service for Git repositories, facilitating collaboration, issue tracking, and CI/CD pipelines.",
    projectIds: ["jarvis", "studymate", "network-anomaly", "smartclass-room", "fake-news"]
  },
  {
    name: "VS Code",
    category: "TOOLS",
    description: "Primary editor for writing, debugging, and running full-stack software applications.",
    projectIds: ["jarvis", "studymate", "network-anomaly", "smartclass-room", "fake-news"]
  },
  {
    name: "Linux",
    category: "TOOLS",
    description: "Operating system environment used for local servers, deployment, shell scripting, and tooling setups.",
    projectIds: ["jarvis", "network-anomaly"]
  }
];
