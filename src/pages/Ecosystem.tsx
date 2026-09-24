import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ecosystemProjects, EcosystemProject } from '@/data/ecosystem';
import { 
  Globe, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  Code2, 
  Cpu, 
  BookOpen, 
  ShieldCheck, 
  Wrench, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Rocket, 
  Filter,
  ArrowUpRight
} from 'lucide-react';

export default function Ecosystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'education', label: 'Education & Study' },
    { id: 'developer-tool', label: 'Developer Tools' },
    { id: 'productivity', label: 'Productivity' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? ecosystemProjects
    : ecosystemProjects.filter(p => p.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      default: return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: EcosystemProject['status']) => {
    switch (status) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Beta
          </span>
        );
      case 'coming-soon':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500 border border-gray-200">
            <Clock className="w-3 h-3" />
            In Dev
          </span>
        );
    }
  };

  const pageTitle = "Our Digital Ecosystem | StudentKit Labs";
  const pageDesc = "Discover companion applications and platforms built by our team. Explore tools for academic management, algorithmic study, and hardware simulation.";
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/ecosystem` : 'https://studentkit.dev/ecosystem';

  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>

      {/* Hero */}
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>The StudentKit Ecosystem</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Integrated Digital Network
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Explore the network of sister applications, study platforms, and developer playgrounds created by our team. Each project is engineered with high speed, zero tracking, and intuitive craft.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === cat.id
                ? 'google-neon-btn-primary border-blue-700'
                : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div>
              {/* Top Bar: Icon & Status */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  {getIcon(project.icon)}
                </div>
                <div className="flex items-center gap-2">
                  {project.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-wide border border-blue-100">
                      {project.badge}
                    </span>
                  )}
                  {getStatusBadge(project.status)}
                </div>
              </div>

              {/* Project Details */}
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-1">
                {project.name}
              </h2>
              <p className="text-xs font-semibold text-blue-600 mb-2.5">
                {project.tagline}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full border border-slate-200/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              {project.status === 'coming-soon' ? (
                <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Rolling out soon
                </span>
              ) : (
                <a
                  href={project.url}
                  target={project.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="google-neon-btn-rgb px-3.5 py-1.5 text-xs font-bold gap-1 text-slate-800 border border-gray-200 hover:border-gray-300"
                >
                  <span>Launch Application</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Developer Collaboration Callout */}
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center space-y-4 border border-gray-200 shadow-sm max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 border border-blue-100">
          <Code2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Have an App or Idea for Our Ecosystem?
        </h2>
        <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          We are constantly building and expanding specialized student and developer utilities. If you are developing an open-source tool, API, or companion app and want to feature it in our ecosystem, we'd love to connect.
        </p>
        <div className="pt-3">
          <a 
            href="mailto:fluxedustart@gmail.com?subject=Ecosystem%20Collaboration%20Inquiry" 
            className="google-neon-btn-primary px-6 py-2.5 text-xs font-bold gap-2 cursor-pointer border border-blue-700 hover:border-blue-800"
          >
            <span>Propose a Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
