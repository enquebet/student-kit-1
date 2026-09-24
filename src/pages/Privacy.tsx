import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Lock, EyeOff, ServerOff, Database, FileCheck, RefreshCw, Mail } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = "September 19, 2026";
  const pageTitle = "Privacy Policy | StudentKit – Zero-Knowledge Guarantee";
  const pageDesc = "StudentKit Privacy Policy: Learn how our zero-knowledge, client-side processing architecture protects your data with zero trackers and zero server uploads.";
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/privacy` : 'https://studentkit.dev/privacy';

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
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

      {/* Header Banner */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero-Knowledge & Client-Side First</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-base text-gray-600">
          Effective Date: <strong className="text-gray-900">{lastUpdated}</strong>. Your privacy is not a compromise—it is the foundational premise of StudentKit.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <ServerOff className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-1">Zero Cloud Processing</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Calculators, image tools, code minifiers, and text analyzers execute purely in your browser's JavaScript memory.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <EyeOff className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-1">No Sensitive Telemetry</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We never record your calculations, financial figures, grades, code snippets, tokens, or uploaded image files.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-1">Local Browser Storage</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Saved semester courses or tool settings reside strictly in your device's browser <code>localStorage</code>.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-1">No Account Mandate</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every tool on StudentKit is accessible immediately without registration, logins, passwords, or credit cards.
            </p>
          </div>
        </div>
      </div>

      {/* Main Legal Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm space-y-10 text-gray-700 leading-relaxed">
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">1</span>
            Introduction & Scope
          </h2>
          <p>
            This Privacy Policy describes how StudentKit ("we", "our", or "the platform") handles information when you visit and utilize our suite of over 158 online calculators, developer converters, text manipulators, and student tools accessible via our website and ecosystem applications.
          </p>
          <p>
            By accessing or using StudentKit, you acknowledge and agree to the data management practices described herein. If you do not agree with any aspect of this policy, you should discontinue using our services immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">2</span>
            Information We Do NOT Collect (Zero-Knowledge Architecture)
          </h2>
          <p>
            Unlike traditional web platforms that transmit user inputs to remote databases or AI inference queues, StudentKit is engineered with a strict <strong>Client-Side Execution Paradigm</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>No Academic or Financial Data:</strong> Your inputs into the CGPA Calculator, Attendance Calculator, Salary Calculator, Mortgage Calculator, and Bunk Calculator remain volatile inside your browser session and are never sent across network APIs.</li>
            <li><strong>No Uploaded Files or Images:</strong> Files processed through our Image Compressor, Image Resizer, Image Cropper, or Base64 Converter are decoded directly by the HTML5 Canvas and File API on your CPU/GPU. No images are ever saved, stored, or sent to backend storage buckets.</li>
            <li><strong>No Code or Credentials:</strong> Developer inputs into our JSON Formatter, JWT Decoder, Regex Tester, or Password Generator are processed strictly in memory. We never inspect, store, or log your proprietary tokens or passwords.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">3</span>
            Information That May Be Collected Automatically
          </h2>
          <p>
            When you navigate our website, basic, non-personally identifiable technical logs may be collected by our hosting infrastructure and Content Delivery Network (CDN) to ensure platform uptime and security:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>Network & Device Diagnostics:</strong> Standard HTTP request headers, browser type and version, operating system, preferred language, and rough geographical location (country or region-level).</li>
            <li><strong>Performance & Error Logs:</strong> Anonymized crash metrics, CDN cache latency, and HTTP response codes (e.g., 200 OK, 404 Not Found) used exclusively to maintain platform reliability.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">4</span>
            Cookies and Client-Side Storage
          </h2>
          <p>
            StudentKit does not use invasive cross-site tracking cookies. We utilize native browser storage technologies (such as <code>Window.localStorage</code>) solely for functional user convenience:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>Local State Persistence:</strong> Preserving your entered semesters in the CGPA calculator, active countdown targets, or recent unit conversions across page reloads.</li>
            <li><strong>User Interface Preferences:</strong> Remembering display themes, recent tool history, or collapsed layout states.</li>
          </ul>
          <p className="text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
            You can clear this data at any moment simply by clearing your browser's site data and cookies or using Private / Incognito browsing mode.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">5</span>
            Third-Party Services & External Links
          </h2>
          <p>
            Our website and ecosystem directory may provide external links to third-party web services, open-source repositories, or external applications. StudentKit is not responsible for the privacy policies, data practices, or content of those external domains. We encourage users to review the privacy notices of any external site they visit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">6</span>
            Children's Online Privacy Protection
          </h2>
          <p>
            StudentKit is designed for general student and educational utility. We do not knowingly collect, solicit, or store personal information from individuals under the age of 13. Since our platform requires no user registration, no personal identities are gathered or maintained.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">7</span>
            Policy Revisions & Updates
          </h2>
          <p>
            We may periodically update this Privacy Policy to reflect enhancements in platform functionality, new ecosystem releases, or legal developments. When revisions occur, the updated effective date at the top of this page will be refreshed immediately.
          </p>
        </section>

        <section className="space-y-4 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Contact & Privacy Inquiries
          </h2>
          <p>
            If you have questions, feedback, or privacy inquiries regarding our zero-knowledge architecture, please contact our team:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-900">StudentKit Legal & Development Operations</p>
            <p className="text-gray-600">Email: <a href="mailto:fluxedustart@gmail.com" className="text-blue-600 hover:underline">fluxedustart@gmail.com</a></p>
            <p className="text-gray-600">Website: StudentKit Platform Ecosystem</p>
          </div>
        </section>

      </div>
    </div>
  );
}
