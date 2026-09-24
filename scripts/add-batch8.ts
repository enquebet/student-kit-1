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
  { slug: "days-between-dates", name: "Days Between Dates", category: "time", desc: "Calculate the exact number of days, months, and years between two dates." },
  { slug: "age-calculator", name: "Age Calculator", category: "time", desc: "Calculate exact age in years, months, and days from date of birth." },
  { slug: "business-days", name: "Business Days Calculator", category: "time", desc: "Calculate the number of working days between two dates, excluding weekends." },
  { slug: "unix-timestamp", name: "Unix Timestamp Converter", category: "time", desc: "Convert Unix epoch timestamps to human-readable dates and vice versa." },
  { slug: "time-calculator", name: "Time Calculator", category: "time", desc: "Add or subtract hours and minutes to/from a specific time." },
  { slug: "triangle-calculator", name: "Right Triangle Calculator", category: "math", desc: "Calculate area, perimeter, hypotenuse, and angles of a right triangle." },
  { slug: "circle-calculator", name: "Circle Calculator", category: "math", desc: "Calculate the area, circumference, and diameter of a circle." },
  { slug: "pythagorean-theorem", name: "Pythagorean Theorem", category: "math", desc: "Solve for the hypotenuse or a missing side of a right triangle." },
  { slug: "percentage-calculator", name: "Percentage Calculator", category: "math", desc: "Easily calculate percentages, such as finding X% of Y." },
  { slug: "percentage-change", name: "Percentage Change", category: "math", desc: "Calculate the percentage increase or decrease between two numbers." }
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

console.log("Registered batch 8 tools.");
