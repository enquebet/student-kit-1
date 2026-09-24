import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { categories, tools } from '@/data/tools';
import { 
  GraduationCap, 
  Cpu, 
  Calculator, 
  Code2, 
  FileText, 
  Database, 
  ArrowRightLeft, 
  Clock, 
  Activity, 
  DollarSign, 
  Wifi, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  student: <GraduationCap className="w-6 h-6 text-blue-600" />,
  engineering: <Cpu className="w-6 h-6 text-indigo-600" />,
  math: <Calculator className="w-6 h-6 text-emerald-600" />,
  developer: <Code2 className="w-6 h-6 text-purple-600" />,
  text: <FileText className="w-6 h-6 text-rose-600" />,
  file: <Database className="w-6 h-6 text-amber-600" />,
  converters: <ArrowRightLeft className="w-6 h-6 text-cyan-600" />,
  everyday: <Clock className="w-6 h-6 text-teal-600" />,
  health: <Activity className="w-6 h-6 text-red-600" />,
  finance: <DollarSign className="w-6 h-6 text-green-600" />,
  network: <Wifi className="w-6 h-6 text-blue-500" />,
  time: <Clock className="w-6 h-6 text-amber-500" />
};

export default function CategoriesPage() {
  const pageTitle = "All 12 Tool Categories | StudentKit Digital Toolbox";
  const pageDesc = "Browse 158 free, privacy-first online tools across 12 disciplines: Academic, Engineering, Math, Developer, Text, File, Converters, Finance, Networking, Health, Time, and Productivity.";
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/categories` : 'https://studentkit.dev/categories';

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
      
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>12 Specialized Disciplines</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
          All Tool Categories
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Select a category below to explore our 158+ calculators, conversion engines, code formatters, and academic utilities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => {
          const count = tools.filter(t => t.category === cat.slug).length;
          const icon = CATEGORY_ICONS[cat.slug] || <GraduationCap className="w-6 h-6 text-blue-600" />;

          return (
            <Link 
              key={cat.id} 
              to={`/categories/${cat.slug}`} 
              className="google-rgb-card p-6 border border-gray-200 shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <span className="text-xs font-bold text-gray-600 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {count} {count === 1 ? 'tool' : 'tools'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5">
                  {cat.name}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Specialized utilities and high-precision calculators engineered for {cat.name.toLowerCase()} coursework and projects.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Explore {cat.name}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
