import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tools } from '@/data/tools';
import { Search, Wrench, Menu, X, Globe, ShieldCheck, SearchX, Sparkles } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const filteredTools = search.trim() 
    ? tools.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.desc.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-gray-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Google RGB Accent Line */}
      <div className="google-rgb-line fixed top-0 left-0 right-0 z-[60]" />

      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 transition-shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo with Google Quad-Color Accent and Glow */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
              <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div className="flex items-baseline">
              <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">Student</span>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent ml-0.5">Kit</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <Link 
              to="/categories" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors hover:bg-gray-100/70 px-3 py-1.5 rounded-full"
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors hover:bg-gray-100/70 px-3 py-1.5 rounded-full"
            >
              About Us
            </Link>
            <Link 
              to="/ecosystem" 
              className="google-neon-btn-rgb px-3.5 py-1.5 text-xs text-slate-800 font-semibold gap-1.5 border border-gray-200 hover:border-gray-300"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Our Ecosystem</span>
            </Link>
          </nav>
          
          <div className="hidden md:block relative w-72">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Quick search 158+ tools... (/)" 
                className="w-full pl-10 pr-4 py-2 bg-gray-100/90 hover:bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-full text-xs font-medium transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5 group-focus-within:text-blue-600 transition-colors" />
            </div>
            
            {search && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-200/90 max-h-96 overflow-y-auto z-50 p-1.5 animate-in fade-in-50 zoom-in-95">
                {filteredTools.length > 0 ? (
                  filteredTools.map(t => (
                    <button 
                      key={t.id}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50/70 rounded-xl transition-colors group flex flex-col"
                      onClick={() => {
                        setSearch('');
                        navigate(`/tools/${t.slug}`);
                      }}
                    >
                      <div className="font-bold text-xs text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{t.desc}</div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <SearchX className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-gray-700">No matching tools</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Try 'gpa', 'json', or 'ohm'</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 absolute top-16 w-full z-40 shadow-xl animate-in slide-in-from-top-2">
          <input 
            type="text" 
            placeholder="Search all 158+ tools..." 
            className="w-full pl-10 pr-4 py-2.5 mb-3 bg-gray-100 rounded-xl text-sm border border-transparent focus:border-blue-500 focus:bg-white outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.trim() && (
            <div className="bg-gray-50 rounded-xl p-2 mb-4 max-h-60 overflow-y-auto border border-gray-200">
              {filteredTools.length > 0 ? (
                filteredTools.slice(0, 5).map(t => (
                  <button
                    key={t.id}
                    className="w-full text-left p-2.5 hover:bg-white rounded-lg text-xs font-semibold text-gray-800 flex justify-between items-center"
                    onClick={() => {
                      setSearch('');
                      setMobileMenuOpen(false);
                      navigate(`/tools/${t.slug}`);
                    }}
                  >
                    <span>{t.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase">{t.category}</span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-2">No tools match your query</p>
              )}
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <Link to="/categories" className="text-gray-800 font-medium px-3 py-2 rounded-xl hover:bg-gray-100 border border-transparent hover:border-gray-200" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
            <Link to="/about" className="text-gray-800 font-medium px-3 py-2 rounded-xl hover:bg-gray-100 border border-transparent hover:border-gray-200" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/ecosystem" className="google-neon-btn-rgb px-3.5 py-2 text-xs font-semibold flex items-center justify-center gap-2 border border-gray-200" onClick={() => setMobileMenuOpen(false)}>
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Our Ecosystem</span>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200/90 py-12 mt-auto relative overflow-hidden">
        {/* Subtle decorative bottom RGB line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 via-red-500/30 via-yellow-500/30 via-green-500/40 to-transparent"></div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2 text-gray-900 group">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold tracking-tight text-lg text-gray-900">StudentKit</span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              The premier zero-knowledge digital toolbox for students, engineers, and developers. 158+ high-performance tools running 100% in your browser.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client-Side & Zero-Tracking</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-3 text-slate-700">Explore</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link to="/categories" className="hover:text-blue-600 transition-colors">All 11 Categories</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About StudentKit</Link></li>
              <li>
                <Link to="/ecosystem" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1.5 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Our Ecosystem</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-3 text-slate-700">Legal & Trust</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-3 text-slate-700">Inquiries</h4>
            <p className="text-xs text-gray-500 mb-2 leading-relaxed">
              Have suggestions or want to feature an application in our ecosystem?
            </p>
            <a 
              href="mailto:fluxedustart@gmail.com" 
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              fluxedustart@gmail.com
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} StudentKit Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link to="/ecosystem" className="hover:underline">Ecosystem</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
