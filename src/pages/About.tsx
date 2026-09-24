import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Wrench, Heart, Code2, ShieldCheck, Zap, Sparkles, Users, Cpu, ArrowRight } from 'lucide-react';

export default function About() {
  const pageTitle = "About StudentKit | The Free All-in-One Digital Toolbox";
  const pageDesc = "Discover the mission, philosophy, and architectural vision behind StudentKit—empowering students, developers, and engineers with free, private, client-side tools.";
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/about` : 'https://studentkit.dev/about';

  return (
    <div className="py-8 max-w-5xl mx-auto px-4">
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

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Empowering Learners, Engineers & Creators Everywhere
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          StudentKit was built to eliminate the frustration of ad-infested, slow, and paywalled web tools. We provide a single, blazingly fast, privacy-first hub for 158+ high-utility calculators and software converters.
        </p>
      </div>

      {/* Core Numbers / Milestones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <div className="text-4xl font-extrabold text-blue-600 mb-1">158+</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Functional Tools</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <div className="text-4xl font-extrabold text-emerald-600 mb-1">100%</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Client-Side Private</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <div className="text-4xl font-extrabold text-indigo-600 mb-1">11</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Specialized Disciplines</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <div className="text-4xl font-extrabold text-amber-600 mb-1">$0</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Free Forever</div>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Principles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Zero-Knowledge Privacy</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We never inspect or upload your marks, calculations, credentials, or photos. Everything computes instantly inside your device's browser sandbox.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Sub-Millisecond Speed</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              No server round-trips or cold starts. Instant reactivity as you type, designed to save valuable time during late-night exam preps or sprint deadlines.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Paywalls or Clutter</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Education should not be gated behind subscription popups or deceptive download buttons. StudentKit is clean, respectful, and free for all.
            </p>
          </div>
        </div>
      </div>

      {/* Broad Discipline Coverage */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm mb-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Built for Multi-Disciplinary Workflows
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Whether you are calculating your cumulative grade points to qualify for an internship, sizing PCB traces for an embedded hardware capstone, or formatting JSON payloads for a backend API, StudentKit unites all your tools under one coherent roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="font-semibold text-gray-800 text-sm">Academic & GPA Management</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="font-semibold text-gray-800 text-sm">Electrical & Circuit Design</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="font-semibold text-gray-800 text-sm">Mechanical & Civil Engineering</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="font-semibold text-gray-800 text-sm">Software & Developer Debuggers</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="font-semibold text-gray-800 text-sm">Financial & Loan Calculations</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <span className="font-semibold text-gray-800 text-sm">File Optimization & Images</span>
          </div>
        </div>
      </div>

      {/* Ecosystem Callout */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Expanding Universe</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Explore the StudentKit Ecosystem
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            StudentKit is part of an interconnected family of developer tools, study companions, and specialized web apps designed by our team to accelerate education and technical excellence.
          </p>
        </div>
        <Link 
          to="/ecosystem" 
          className="px-6 py-3.5 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl shrink-0"
        >
          <span>View Our Ecosystem</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
