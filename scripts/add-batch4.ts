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
  { slug: "reynolds-number", name: "Reynolds Number Calculator", category: "engineering", desc: "Calculate Reynolds Number to determine if fluid flow is laminar or turbulent." },
  { slug: "flow-rate", name: "Pipe Flow Rate Calculator", category: "engineering", desc: "Calculate volumetric flow rate, velocity, or pipe diameter." },
  { slug: "beam-deflection", name: "Cantilever Beam Deflection Calculator", category: "engineering", desc: "Calculate maximum deflection for a cantilever beam with an end load." },
  { slug: "kinetic-energy", name: "Kinetic Energy Calculator", category: "engineering", desc: "Calculate the kinetic energy of a moving object." },
  { slug: "potential-energy", name: "Potential Energy Calculator", category: "engineering", desc: "Calculate gravitational potential energy based on mass and height." }
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

console.log("Registered batch 4 tools.");
