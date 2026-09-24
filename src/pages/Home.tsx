import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  Zap, 
  Code, 
  Calculator, 
  FileText, 
  Smartphone, 
  PenTool, 
  Database, 
  Clock, 
  BookOpen, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { categories, tools } from '@/data/tools';
import { EmptyState } from '@/components/common/EmptyState';

const ICONS: Record<string, React.ReactNode> = {
  student: <BookOpen className="w-6 h-6" />,
  engineering: <Zap className="w-6 h-6" />,
  math: <Calculator className="w-6 h-6" />,
  developer: <Code className="w-6 h-6" />,
  text: <FileText className="w-6 h-6" />,
  file: <Database className="w-6 h-6" />,
  converters: <Clock className="w-6 h-6" />,
  everyday: <Clock className="w-6 h-6" />,
  health: <Smartphone className="w-6 h-6" />,
  finance: <PenTool className="w-6 h-6" />,
  network: <Database className="w-6 h-6" />
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSearching = searchTerm.trim().length > 0;

  const pageTitle = "StudentKit – Free Academic, Engineering & Developer Utilities";
  const pageDesc = "158 free, privacy-first online tools for students, engineers, and developers. Free GPA/CGPA calculators, Ohm's law, JSON formatters, unit converters, and attendance trackers.";
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://studentkit.dev/';

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "StudentKit",
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://studentkit.dev',
    "description": pageDesc,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${typeof window !== 'undefined' ? window.location.origin : 'https://studentkit.dev'}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "StudentKit",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": pageDesc,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="StudentKit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(appSchema)}
        </script>
      </Helmet>

      {/* Hero Section with Google Quad-Color Accent and Animated RGB Glow */}
      <section className="relative overflow-hidden bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 md:p-16 mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 via-red-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/10 via-yellow-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Google Style Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
              <span className="text-[#4285F4]">G-Engine</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">158+ Client-Side Tools</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
            The Intelligent Toolbox <br />
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent">
              Engineered for Everyone.
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Instant academic calculators, engineering solvers, code formatters, and cryptographic tools running with zero-latency inside your browser.
          </p>
          
          {/* Google RGB Neon Search Container */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="google-rgb-border p-1 shadow-lg group-hover:shadow-2xl transition-all">
              <div className="relative flex items-center bg-white rounded-[0.85rem]">
                <Search className="absolute left-4 text-blue-500 w-5 h-5" />
                <input 
                  id="global-search"
                  type="text" 
                  placeholder="Search 158+ tools... (Press '/' to focus)" 
                  className="w-full pl-12 pr-32 py-4 bg-transparent border-none rounded-xl text-base text-gray-800 placeholder-gray-400 focus:ring-0 outline-none font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2.5 google-neon-btn-primary px-5 py-2 text-xs"
                  onClick={() => document.getElementById('global-search')?.focus()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Quick-pill shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-gray-400 font-medium mr-1">Popular:</span>
            {[
              { name: 'CGPA Calc', slug: 'cgpa-calculator' },
              { name: "Ohm's Law", slug: 'ohms-law-calculator' },
              { name: 'JSON Prettifier', slug: 'json-formatter' },
              { name: 'Attendance', slug: 'attendance-calculator' },
              { name: 'UUID Generator', slug: 'uuid-generator' },
            ].map(pill => (
              <Link
                key={pill.slug}
                to={`/tools/${pill.slug}`}
                className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                {pill.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div>
        {isSearching ? (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Search Results ({filteredTools.length})</h2>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <EmptyState
                  title={`No tools found for "${searchTerm}"`}
                  description="We couldn't locate any tools matching that keyword. Try searching by category like 'math', 'developer', or 'engineering'."
                  actionText="Clear Search"
                  onAction={() => setSearchTerm('')}
                />
              </div>
            )}
          </section>
        ) : (
          <div className="space-y-16">
            
            {/* Featured / Spotlight Tools with RGB hover cards */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Selected Tools</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Featured Power Utilities</h2>
                  <p className="text-gray-500 text-sm mt-1">High-traffic calculators and developer tools used daily.</p>
                </div>
                <Link 
                  to="/categories" 
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <span>View full catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'cgpa-calculator', 
                  'attendance-calculator', 
                  'ohms-law-calculator', 
                  'image-compressor', 
                  'json-formatter',
                  'password-generator'
                ].map(slug => {
                  const tool = tools.find(t => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <Link key={tool.id} to={`/tools/${tool.slug}`} className="block group h-full">
                      <div className="google-rgb-card p-6 h-full flex flex-col justify-between border border-gray-200 shadow-xs hover:shadow-xl">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-100/60">
                              {tool.category.replace('-', ' ')}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Client-Side
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-gray-500 text-xs leading-relaxed mb-4">
                            {tool.desc}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                          <span>Open Tool</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Categories Hub */}
            <section>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Explore 11 Disciplines</h2>
                <p className="text-gray-500 text-sm">Organized for university coursework, electrical labs, development sprints, and productivity.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/categories/${cat.slug}`} 
                    className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-center group flex flex-col items-center justify-between"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-gray-600 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all mb-3 border border-gray-100">
                      {ICONS[cat.slug] || <Code className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-0.5">{cat.name}</h3>
                      <p className="text-[11px] font-semibold text-gray-400">{tools.filter(t => t.category === cat.slug).length} utilities</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Ecosystem Showcase Section with Google Style Neon CTA */}
            <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>The StudentKit Ecosystem</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Explore Our Companion Developer & STEM Apps
                </h2>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  Discover companion exam planners, browser developer scratchpads, circuit simulators, and formula libraries built by our development team.
                </p>
              </div>

              <Link 
                to="/ecosystem" 
                className="google-neon-btn-rgb px-6 py-3 text-xs md:text-sm font-bold shrink-0 relative z-10 gap-2"
              >
                <span>Browse Entire Ecosystem</span>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </Link>
            </section>
            
          </div>
        )}
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: any; key?: React.Key }) {
  return (
    <Link to={`/tools/${tool.slug}`} className="block group h-full">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
              {tool.category}
            </span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">{tool.desc}</p>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center text-[11px] font-semibold text-blue-600 group-hover:text-blue-700">
          <span>Launch Tool</span>
          <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
