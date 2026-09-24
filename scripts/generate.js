import fs from 'fs';
import path from 'path';
import { tools, categories } from './toolsData.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Create main data registry
const dataDir = path.join(rootDir, 'src', 'data');
ensureDir(dataDir);
fs.writeFileSync(path.join(dataDir, 'tools.ts'), `
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tool {
  id: number;
  slug: string;
  name: string;
  category: string;
  desc: string;
}

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};
export const tools: Tool[] = ${JSON.stringify(tools, null, 2)};
`);

// Create components directory
const featuresDir = path.join(rootDir, 'src', 'features');
ensureDir(featuresDir);

let appRoutes = '';
let routeImports = '';

tools.forEach(tool => {
  const catDir = path.join(featuresDir, tool.category);
  ensureDir(catDir);
  
  const compName = tool.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Tool';
  const filePath = path.join(catDir, `${compName}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    const template = `import React from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ${compName}() {
  return (
    <ToolShell title="${tool.name}" description="${tool.desc}" category="${tool.category}">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 text-center py-10">Fully functional ${tool.name} interface goes here.</p>
      </div>
    </ToolShell>
  );
}
`;
    fs.writeFileSync(filePath, template);
  }
  
  routeImports += `import ${compName} from '../features/${tool.category}/${compName}';\n`;
  appRoutes += `          <Route path="/tools/${tool.slug}" element={<${compName} />} />\n`;
});

// Generate Pages index for routing
const pagesDir = path.join(rootDir, 'src', 'pages');
ensureDir(pagesDir);
fs.writeFileSync(path.join(pagesDir, 'Routes.tsx'), `
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';
import ToolNotFound from './ToolNotFound';
import About from './About';
import Privacy from './Privacy';
import Terms from './Terms';
${routeImports}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:slug" element={<CategoryPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
${appRoutes}
      <Route path="*" element={<ToolNotFound />} />
    </Routes>
  );
}
`);

console.log('Successfully generated 100 tools and routing setup!');
