import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { categories, tools } from '@/data/tools';
import { EmptyState } from '@/components/common/EmptyState';
import { ArrowLeft, Layers, Compass, ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const catTools = tools.filter(t => t.category === slug);

  if (!category) {
    return (
      <div className="py-16 max-w-xl mx-auto px-4 text-center">
        <Helmet>
          <title>Category Not Found | StudentKit</title>
        </Helmet>
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <EmptyState
            title="Category Not Found"
            description="The category you are trying to browse does not exist or has been moved."
            actionText="View All Categories"
            actionHref="/categories"
            icon={<Compass className="w-8 h-8 text-blue-600" />}
          />
        </div>
      </div>
    );
  }

  const pageTitle = `${category.name} Tools & Calculators | StudentKit`;
  const pageDesc = `Explore ${catTools.length} free, privacy-first browser tools in the ${category.name} category on StudentKit. Fast, zero tracking, and instant results.`;
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/categories/${category.slug}` : `https://studentkit.dev/categories/${category.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": typeof window !== 'undefined' ? window.location.origin : 'https://studentkit.dev'
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://studentkit.dev'}/categories`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": canonicalUrl
      }
    ]
  };

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
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="mb-8">
        <Link 
          to="/categories" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-3 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Categories</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {category.name}
          </h1>
          <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
            {catTools.length} {catTools.length === 1 ? 'Tool' : 'Tools'}
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-base max-w-2xl">
          High-performance, privacy-first utilities for {category.name.toLowerCase()} workflows, running 100% in your browser.
        </p>
      </div>
      
      {catTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catTools.map(tool => (
            <Link key={tool.id} to={`/tools/${tool.slug}`} className="block group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md hover:border-blue-400 transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Open Tool</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <EmptyState
            title="No tools currently in this category"
            description="We are continuously expanding our suite. Check back soon for new utilities in this category."
            actionText="Browse Other Categories"
            actionHref="/categories"
          />
        </div>
      )}
    </div>
  );
}
