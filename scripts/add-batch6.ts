import fs from 'fs';
import path from 'path';

function toPascalCase(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

interface NewTool {
  slug: string;
  name: string;
  category: string;
  desc: string;
}

const newTools: NewTool[] = [
  { slug: "concrete-volume", name: "Concrete Volume Calculator", category: "engineering", desc: "Calculate concrete volume and bags required for a pour." },
  { slug: "rebar-weight", name: "Rebar Weight Calculator", category: "engineering", desc: "Calculate total weight of steel rebar based on diameter and length." },
  { slug: "column-buckling", name: "Column Buckling Calculator", category: "engineering", desc: "Calculate critical buckling load using Euler's formula." },
  { slug: "brick-estimator", name: "Brick & Block Estimator", category: "engineering", desc: "Estimate the number of bricks or blocks needed for a wall." },
  { slug: "roof-pitch", name: "Roof Pitch Calculator", category: "engineering", desc: "Calculate roof pitch angle and rafter length." }
];

const toolsFile = path.join(process.cwd(), 'src/data/tools.ts');
let toolsContent = fs.readFileSync(toolsFile, 'utf8');

const maxIdMatch = [...toolsContent.matchAll(/"id": (\d+)/g)];
let nextId = Math.max(...maxIdMatch.map(m => parseInt(m[1]))) + 1;

for (const tool of newTools) {
  if (toolsContent.includes(`"slug": "${tool.slug}"`)) continue;
  
  const toolEntry = `  {
    "id": ${nextId++},
    "slug": "${tool.slug}",
    "name": "${tool.name}",
    "category": "${tool.category}",
    "desc": "${tool.desc}"
  },`;
  
  toolsContent = toolsContent.replace(/export const tools: Tool\[\] = \[\n/, `export const tools: Tool[] = [\n${toolEntry}\n`);
}
fs.writeFileSync(toolsFile, toolsContent);

const routesFile = path.join(process.cwd(), 'src/pages/Routes.tsx');
let routesContent = fs.readFileSync(routesFile, 'utf8');

for (const tool of newTools) {
  const componentName = toPascalCase(tool.slug) + 'Tool';
  const importStr = `import ${componentName} from '../features/${tool.category}/${componentName}';`;
  
  if (!routesContent.includes(importStr)) {
    routesContent = routesContent.replace(/import React from 'react';/, `import React from 'react';\n${importStr}`);
  }
  
  const routeStr = `<Route path="/tool/${tool.slug}" element={<${componentName} />} />`;
  if (!routesContent.includes(routeStr)) {
    routesContent = routesContent.replace(/<Route path="\*" element=\{<ToolNotFound \/>\} \/>/, `  ${routeStr}\n        <Route path="*" element={<ToolNotFound />} />`);
  }
}
fs.writeFileSync(routesFile, routesContent);

console.log("Registered batch 6 tools.");
