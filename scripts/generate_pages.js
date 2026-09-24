import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const pagesDir = path.join(rootDir, 'src', 'pages');

const templates = {
  'Home.tsx': `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { tools, categories } from '@/data/tools';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      <Helmet>
        <title>StudentKit – Free Online Tools for Students, Engineers & Developers</title>
        <meta name="description" content="StudentKit provides free browser-based calculators, engineering tools, developer utilities, converters and productivity tools." />
      </Helmet>

      <section className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Your digital toolbox for studying, engineering, and coding.</h1>
        <p className="text-xl text-gray-500 mb-10">Fast, free, privacy-first tools. Everything happens securely in your browser.</p>
        
        <div className="relative max-w-xl mx-auto">
          <input type="text" placeholder="Search for a tool..." className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none" />
          <Search className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.slice(0, 6).map(tool => (
            <Link key={tool.id} to={\`/tools/\${tool.slug}\`} className="block group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all h-full flex flex-col">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{tool.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-auto">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {categories.map(cat => {
        const catTools = tools.filter(t => t.category === cat.slug);
        if (catTools.length === 0) return null;
        return (
          <section key={cat.id}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{cat.name}</h2>
              <Link to={\`/categories/\${cat.slug}\`} className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {catTools.slice(0, 4).map(tool => (
                <Link key={tool.id} to={\`/tools/\${tool.slug}\`} className="block group">
                  <div className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-sm hover:border-blue-200 transition-all h-full">
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600">{tool.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
`,
  'CategoriesPage.tsx': `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { categories, tools } from '@/data/tools';

export default function CategoriesPage() {
  return (
    <div className="py-8">
      <Helmet>
        <title>All Tool Categories | StudentKit</title>
        <meta name="description" content="Browse all StudentKit tools by category." />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => {
          const count = tools.filter(t => t.category === cat.slug).length;
          return (
            <Link key={cat.id} to={\`/categories/\${cat.slug}\`} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{count} tools</p>
              </div>
              <span className="text-blue-600 font-medium">View &rarr;</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
`,
  'CategoryPage.tsx': `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { categories, tools } from '@/data/tools';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const catTools = tools.filter(t => t.category === slug);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="py-8">
      <Helmet>
        <title>{category.name} Tools | StudentKit</title>
        <meta name="description" content={\`Explore \${catTools.length} free tools in the \${category.name} category.\`} />
      </Helmet>
      
      <div className="mb-8">
        <Link to="/categories" className="text-sm text-blue-600 hover:underline mb-2 inline-block">&larr; Back to Categories</Link>
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600 mt-2">Explore {catTools.length} tools.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catTools.map(tool => (
          <Link key={tool.id} to={\`/tools/\${tool.slug}\`} className="block group">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all h-full flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
`,
  'ToolNotFound.tsx': `import React from 'react';
import { Link } from 'react-router-dom';

export default function ToolNotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
      <p className="text-gray-600 mb-8">Looks like this tool doesn't exist or has been moved.</p>
      <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
        Return Home
      </Link>
    </div>
  );
}
`,
  'About.tsx': `import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="py-8 max-w-3xl mx-auto prose prose-blue">
      <Helmet>
        <title>About StudentKit</title>
      </Helmet>
      <h1>About StudentKit</h1>
      <p>StudentKit is a collection of browser-based utilities designed to make everyday student, engineering, development and productivity tasks faster.</p>
      <p>Our tools are built with a privacy-first approach. Most tools run entirely in your browser, meaning your data never leaves your device.</p>
    </div>
  );
}
`,
  'Privacy.tsx': `import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="py-8 max-w-3xl mx-auto prose prose-blue">
      <Helmet>
        <title>Privacy Policy | StudentKit</title>
      </Helmet>
      <h1>Privacy Policy</h1>
      <p>StudentKit is built on a privacy-first architecture.</p>
      <h2>Browser-Side Processing</h2>
      <p>Almost all calculators, formatters, converters, and text tools process your inputs locally in your web browser. This means your data is not uploaded to our servers.</p>
      <h2>Local Storage</h2>
      <p>We may use local storage (localStorage) to save your preferences, such as favorites or recently used tools. This data stays on your device.</p>
    </div>
  );
}
`,
  'Terms.tsx': `import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <div className="py-8 max-w-3xl mx-auto prose prose-blue">
      <Helmet>
        <title>Terms of Service | StudentKit</title>
      </Helmet>
      <h1>Terms of Service</h1>
      <p>By using StudentKit, you agree to these terms.</p>
      <h2>Educational Use</h2>
      <p>The calculators and tools provided on this platform are for educational and informational purposes only. While we strive for accuracy, users should verify critical engineering, financial, or academic results independently.</p>
      <p>No warranty of professional suitability is provided.</p>
    </div>
  );
}
`
};

Object.entries(templates).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(pagesDir, filename), content);
});

console.log('Successfully generated utility pages!');
