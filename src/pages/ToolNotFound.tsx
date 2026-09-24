import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { tools } from '@/data/tools';
import { 
  FileQuestion, 
  Search, 
  Home, 
  ArrowRight, 
  Compass, 
  Wrench,
  Sparkles
} from 'lucide-react';

export default function ToolNotFound() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Suggest popular or related tools
  const popularTools = tools.slice(0, 6);

  const searchResults = searchTerm.trim()
    ? tools.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/tools/${searchResults[0].slug}`);
    }
  };

  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      <Helmet>
        <title>Page / Tool Not Found (404) | StudentKit</title>
        <meta name="description" content="The requested tool or page could not be found on StudentKit. Search across our 158+ available calculators and utilities." />
      </Helmet>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm text-center">
        {/* 404 Badge */}
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 ring-8 ring-blue-50/50 shadow-inner">
          <FileQuestion className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
          Error 404 • Resource Not Found
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Tool or Page Not Found
        </h1>
        <p className="text-base text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          The link you followed may be broken, renamed, or currently undergoing maintenance. Try searching our directory of 158+ tools below.
        </p>

        {/* Live Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all 158+ tools (e.g. CGPA, JSON, Ohm's law)..."
            className="w-full pl-11 pr-24 py-3.5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl text-sm transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-4" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Search
          </button>

          {/* Quick Dropdown for Search Matches */}
          {searchResults.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-20 text-left">
              {searchResults.map((t) => (
                <Link
                  key={t.id}
                  to={`/tools/${t.slug}`}
                  className="p-3.5 hover:bg-blue-50/70 border-b border-gray-100 last:border-0 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{t.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold rounded-xl transition-all"
          >
            <Compass className="w-4 h-4 text-gray-600" />
            <span>Browse Categories</span>
          </Link>
        </div>

        {/* Popular Tools Suggestions */}
        <div className="border-t border-gray-100 pt-8 text-left">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Popular Student & Developer Tools</span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {popularTools.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.slug}`}
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 truncate mb-1">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
