export interface ArchiveItem {
  id: string;
  title: string;
  category: 'PROJECTS' | 'CERTIFICATES' | 'OLD_BUILDS' | 'EXPERIMENTS' | 'MILESTONES';
  date: string;
  status: 'RETIRED' | 'REPLACED' | 'ARCHIVED';
  replacedBy?: string;
  lesson: string;
  details: string;
}

export const archiveData: ArchiveItem[] = [
  {
    id: "arc-001",
    title: "JARVIS VERSION 1.0 (CLI)",
    category: "OLD_BUILDS",
    date: "2024-12-15",
    status: "REPLACED",
    replacedBy: "JARVIS VERSION 2.0 (FastAPI API + Web UI)",
    lesson: "First versions exist to teach you what the second version needs. The terminal interface worked, but it was hard for others to interact with it.",
    details: "The original command-line implementation of the local AI assistant. Implemented basic LLM query loops using stdin/stdout and basic Python scripts."
  },
  {
    id: "arc-002",
    title: "PYTHON FOR DATA ANALYSIS CERTIFICATE",
    category: "CERTIFICATES",
    date: "2024-08-20",
    status: "ARCHIVED",
    lesson: "Certificates validate early learning milestones, but actual projects are the true proof of skill execution.",
    details: "Verified coursework detailing numpy manipulation, data cleaning, pandas series, plotting tools, and statistics foundations."
  },
  {
    id: "arc-003",
    title: "THREADED TCP SERVER IN C",
    category: "OLD_BUILDS",
    date: "2023-11-05",
    status: "RETIRED",
    lesson: "Manual thread pooling in C is error-prone. It taught me how computers schedule work and avoid race conditions under the hood.",
    details: "An experimental concurrent multi-client server in C using POSIX threads. Designed to handle basic echo requests over raw sockets."
  },
  {
    id: "arc-004",
    title: "INTRUSION DETECTION WITH SVM",
    category: "PROJECTS",
    date: "2025-04-10",
    status: "REPLACED",
    replacedBy: "NETWORK TRAFFIC ANOMALY DETECTION (PCA + DBSCAN)",
    lesson: "Supervised models (SVM) fail to adapt to unseen threat signatures. Unsupervised clustering models are better suited for zero-day anomalies.",
    details: "Supervised classification model trained on public network intrusion dataset logs. Achieved 94% accuracy but was slow and brittle to new packet types."
  },
  {
    id: "arc-005",
    title: "UNIVERSITY PROGRAMMING TOURNAMENT",
    category: "MILESTONES",
    date: "2024-03-30",
    status: "ARCHIVED",
    lesson: "Rapid prototyping is important, but readable code is what survives long term.",
    details: "Placed in top 10 during the university coding challenges. Solved complex algorithmic problems in runtime-constrained environments."
  }
];
