export interface EcosystemProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'web-app' | 'mobile-app' | 'developer-tool' | 'ai-utility' | 'education' | 'productivity';
  status: 'live' | 'beta' | 'coming-soon';
  url: string;
  githubUrl?: string;
  icon: string; // Lucide icon identifier
  badge?: string;
  featured?: boolean;
  technologies: string[];
}

export const ecosystemProjects: EcosystemProject[] = [
  {
    id: 'studentkit-web',
    name: 'StudentKit Online',
    tagline: 'The all-in-one digital toolbox for students, engineers, and developers.',
    description: 'A blazingly fast suite of 158+ client-side calculators, conversion engines, code formatters, and academic utilities built for everyday productivity.',
    category: 'education',
    status: 'live',
    url: 'https://ais-dev-crspxjsbtu5zf6lrzejbui-836847920930.asia-east1.run.app',
    icon: 'Wrench',
    badge: 'Flagship Platform',
    featured: true,
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Client-Side Engine']
  },
  {
    id: 'exam-master',
    name: 'PrepPulse & ExamMaster',
    tagline: 'Smart study scheduler and mock exam tracker for university finals.',
    description: 'An intelligent study companion that synchronizes your syllabus, dynamically calculates revision cycles, and alerts you before critical semester deadlines.',
    category: 'productivity',
    status: 'beta',
    url: '#',
    icon: 'GraduationCap',
    badge: 'Popular',
    featured: true,
    technologies: ['React', 'Local Database', 'PWA', 'Tailwind']
  },
  {
    id: 'code-forge-ide',
    name: 'CodeForge Scratchpad',
    tagline: 'Instant zero-setup online sandbox and code snippet playground.',
    description: 'A lightweight browser code editor supporting instant HTML/CSS/JS prototyping, regex test benches, and client-side AST inspection.',
    category: 'developer-tool',
    status: 'beta',
    url: '#',
    icon: 'Code2',
    badge: 'New',
    featured: true,
    technologies: ['TypeScript', 'Monaco Editor', 'Web Workers']
  },
  {
    id: 'circuit-sim-lab',
    name: 'CircuitLab Web',
    tagline: 'Interactive circuit analysis and component parameter visualizer.',
    description: 'Companion simulator for electrical engineering students to visualize RC/RL transients, 555 timer waveforms, and filter frequency responses.',
    category: 'education',
    status: 'coming-soon',
    url: '#',
    icon: 'Cpu',
    badge: 'In Development',
    technologies: ['Canvas API', 'WebGL', 'Math Engine']
  },
  {
    id: 'formula-vault',
    name: 'FormulaVault',
    tagline: 'Interactive cheat-sheet library for physics, math, and mechanical engineering.',
    description: 'Quick-reference equation bank featuring dynamic variable substitution, unit unification, and step-by-step formula derivations.',
    category: 'education',
    status: 'coming-soon',
    url: '#',
    icon: 'BookOpen',
    badge: 'Coming Soon',
    technologies: ['KaTeX', 'React', 'Full-Text Search']
  },
  {
    id: 'secure-vault-tools',
    name: 'CryptaKey & KeyGen',
    tagline: 'Privacy-focused cryptographic generator and token inspection toolkit.',
    description: 'Zero-knowledge browser utility for generating high-entropy cryptographic keys, passphrases, hashing digests, and offline JSON web token diagnostics.',
    category: 'developer-tool',
    status: 'live',
    url: '#',
    icon: 'ShieldCheck',
    badge: 'Zero-Knowledge',
    technologies: ['Web Crypto API', 'TypeScript', 'Tailwind']
  }
];
