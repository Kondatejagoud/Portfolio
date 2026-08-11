export interface JourneyYear {
  year: string;
  episodeTitle: string;
  title: string;
  learned: string[];
  built: string[];
  objective: string;
  summary: string;
}

export const journeyData: JourneyYear[] = [
  {
    year: "2023",
    episodeTitle: "EPISODE 01",
    title: "THE BEGINNING",
    learned: [
      "Fundamentals of Computer Science",
      "Procedural Programming in C",
      "Data structures & algorithms (linked lists, binary trees)",
      "Basic version control using Git"
    ],
    built: [
      "Command-line utilities in C",
      "Terminal-based puzzle games",
      "Interactive data management scripts"
    ],
    objective: "Master the building blocks of computing and gain comfort writing structured code.",
    summary: "Entered computer science, learning to structure programs logically, debug low-level memory in C, and appreciate clean code syntax."
  },
  {
    year: "2024",
    episodeTitle: "EPISODE 02",
    title: "LEARNING TO BUILD",
    learned: [
      "Object-Oriented Programming (OOP) in Java",
      "Relational Databases and SQL syntax",
      "HTTP Protocol and basic web styling",
      "Asynchronous concepts"
    ],
    built: [
      "Desktop simulation programs",
      "Database-backed records systems",
      "Local helper automation scripts"
    ],
    objective: "Bridge the gap between simple console scripts and persistent, object-oriented applications.",
    summary: "Focused on transitioning into larger software design paradigms, data persistence, and managing complex systems through code structures."
  },
  {
    year: "2025",
    episodeTitle: "EPISODE 03",
    title: "MACHINE LEARNING",
    learned: [
      "Data manipulation using Pandas and NumPy",
      "Unsupervised clustering methods (DBSCAN, K-Means)",
      "Dimensionality Reduction (PCA)",
      "Feature engineering and evaluation metrics"
    ],
    built: [
      "Network packet classification model",
      "Linguistic style patterns analyzer",
      "Outlier alert dashboards"
    ],
    objective: "Understand how mathematical formulas translate into software models that learn from data patterns.",
    summary: "Explored predictive data science, cleaning network and semantic text logs, and training models to classify information without pre-defined rules."
  },
  {
    year: "2026",
    episodeTitle: "EPISODE 04",
    title: "AI SYSTEMS",
    learned: [
      "FastAPI asynchronous web APIs",
      "Large Language Models (LLMs) running locally via GGUF/Llama.cpp",
      "Memory systems (SQLite fact storage + ChromaDB semantic search)",
      "System integration and pipelines"
    ],
    built: [
      "Jarvis: Local AI Assistant with memory",
      "Fake News Detection: Veracity assessment platform",
      "Network Traffic Anomaly Detection system"
    ],
    objective: "Build more reliable, privacy-preserving intelligent systems integrated with local data stores.",
    summary: "Combined local AI models, database index systems, and async backends to create responsive tools that act autonomously while protecting data."
  },
  {
    year: "FUTURE",
    episodeTitle: "EPISODE 05",
    title: "COMING SOON",
    learned: [
      "Advanced AI agents coordination frameworks",
      "Large-scale distributed systems and consensus",
      "Hardware-accelerated parallel inference (CUDA)",
      "Rigorous evaluation methods for agent workflows"
    ],
    built: [
      "Multi-agent autonomous coding testbed",
      "High-throughput event-driven microservices grid",
      "Self-correcting data ingestion streams"
    ],
    objective: "Design and scale agent systems that handle non-deterministic tasks with high reliability and zero downtime.",
    summary: "Preparing to push the boundaries of AI agency, distributed communication consensus, and performance tuning for large deployments."
  }
];
