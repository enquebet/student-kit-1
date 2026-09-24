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
  { slug: "mortgage-calculator", name: "Mortgage Calculator", category: "finance", desc: "Calculate monthly mortgage payments, including principal and interest." },
  { slug: "compound-interest", name: "Compound Interest Calculator", category: "finance", desc: "Calculate future value of investments with compound interest." },
  { slug: "salary-calculator", name: "Salary Calculator", category: "finance", desc: "Convert salary between hourly, weekly, monthly, and annual rates." },
  { slug: "roi-calculator", name: "ROI Calculator", category: "finance", desc: "Calculate the Return on Investment and net profit." },
  { slug: "tip-calculator", name: "Tip Calculator", category: "finance", desc: "Calculate tip amounts and split bills evenly among friends." },
  { slug: "discount-calculator", name: "Discount Calculator", category: "finance", desc: "Calculate final price and savings after a percentage discount." },
  { slug: "auto-loan", name: "Auto Loan Calculator", category: "finance", desc: "Calculate monthly car payments, total interest, and loan amortization." },
  { slug: "profit-margin", name: "Profit Margin Calculator", category: "finance", desc: "Calculate gross profit, margin percentage, and markup percentage." },
  { slug: "inflation-calculator", name: "Inflation Calculator", category: "finance", desc: "Estimate the future or past value of money based on inflation rates." },
  { slug: "vat-calculator", name: "VAT / Sales Tax Calculator", category: "finance", desc: "Easily add or extract VAT/Sales Tax from a given amount." }
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

console.log("Registered batch 9 tools (Finance).");
