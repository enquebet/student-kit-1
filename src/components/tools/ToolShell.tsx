import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Info, BookOpen, Share2, Check, Sparkles } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface RelatedTool {
  title: string;
  slug: string;
  desc?: string;
}

interface ToolShellProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  faqs?: FAQ[];
  article?: React.ReactNode;
  relatedTools?: RelatedTool[];
  seoTitle?: string;
  seoDescription?: string;
}

export function ToolShell({
  title,
  description,
  category,
  children,
  faqs,
  article,
  relatedTools,
  seoTitle,
  seoDescription,
}: ToolShellProps) {
  const metaTitle = seoTitle || `${title} – Free Online Tool | StudentKit`;
  const metaDesc = seoDescription || description;
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : `https://studentkit.dev/${category}`;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://studentkit.dev';

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "url": currentUrl,
    "description": metaDesc,
    "applicationCategory": category,
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.charAt(0).toUpperCase() + category.slice(1),
        "item": `${origin}/categories/${category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": currentUrl
      }
    ]
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: metaTitle, text: metaDesc, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-6 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="StudentKit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <script type="application/ld+json">
          {JSON.stringify(toolSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-4 overflow-x-auto">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link to={`/categories/${category}`} className="hover:text-blue-600 transition-colors capitalize">
            {category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate">{title}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2.5 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>{category.replace('-', ' ')} Tool</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{title}</h1>
            <p className="text-base text-gray-600 max-w-2xl leading-relaxed">{description}</p>
          </div>
          <button 
            onClick={handleShare} 
            className={`shrink-0 flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs border ${
              copied 
                ? 'google-neon-btn-green border-emerald-700' 
                : 'google-neon-btn-rgb text-slate-700 hover:text-slate-900 border-gray-300 hover:border-gray-400'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Share Tool</span>
              </>
            )}
          </button>
        </div>
      </div>

      <main className="mb-14">
        {children}
      </main>

      <div className="grid md:grid-cols-3 gap-10 mt-12 pt-10 border-t border-gray-200">
        <div className="md:col-span-2 space-y-10">
          
          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/80 flex items-start space-x-3.5">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 text-sm mb-1">Privacy Guarantee: 100% Client-Side</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Calculations, formatted inputs, and file data run strictly within your browser's V8 engine. Zero inputs or results are saved or transferred to external servers.
              </p>
            </div>
          </div>

          {article && (
            <article className="prose prose-blue prose-slate max-w-none text-sm text-gray-700 leading-relaxed bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              {article}
            </article>
          )}

          {faqs && faqs.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">{faq.q}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="md:col-span-1">
          {relatedTools && relatedTools.length > 0 && (
            <section className="sticky top-20">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Related Utilities</h3>
              </div>
              <div className="space-y-2.5">
                {relatedTools.map((rt, i) => (
                  <Link key={i} to={`/tools/${rt.slug}`} className="block group">
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                      <h4 className="font-bold text-xs text-gray-900 group-hover:text-blue-600 mb-0.5">{rt.title}</h4>
                      {rt.desc && <p className="text-[11px] text-gray-500 line-clamp-2">{rt.desc}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
