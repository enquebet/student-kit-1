import fs from 'fs';
import path from 'path';

const toolsFile = path.join(process.cwd(), 'src', 'data', 'tools.ts');
const routesFile = path.join(process.cwd(), 'src', 'pages', 'Routes.tsx');

let toolsContent = fs.readFileSync(toolsFile, 'utf8');
let routesContent = fs.readFileSync(routesFile, 'utf8');

const newTools = [
  { slug: 'scientific-calculator', name: 'Scientific Calculator', category: 'math', desc: 'Evaluate complex mathematical expressions.' },
  { slug: 'fraction-calculator', name: 'Fraction Calculator', category: 'math', desc: 'Add, subtract, multiply, and divide fractions.' },
  { slug: 'ratio-calculator', name: 'Ratio Calculator', category: 'math', desc: 'Solve ratios and proportions (A : B = C : D).' },
  { slug: 'average-calculator', name: 'Average Calculator', category: 'math', desc: 'Calculate the average (mean) of a dataset.' },
  { slug: 'standard-deviation', name: 'Standard Deviation Calculator', category: 'math', desc: 'Calculate population or sample standard deviation.' },
  { slug: 'variance-calculator', name: 'Variance Calculator', category: 'math', desc: 'Calculate variance (σ²) of a dataset.' },
  { slug: 'quadratic-equation', name: 'Quadratic Equation Solver', category: 'math', desc: 'Solve quadratic equations in the form ax² + bx + c = 0.' },
  { slug: 'simple-interest', name: 'Simple Interest Calculator', category: 'math', desc: 'Calculate simple interest and total amount.' },
  { slug: 'emi-calculator', name: 'EMI Calculator', category: 'math', desc: 'Calculate Equated Monthly Installments for loans.' }
];

const componentMap: Record<string, string> = {
  'scientific-calculator': 'ScientificCalculatorTool',
  'fraction-calculator': 'FractionCalculatorTool',
  'ratio-calculator': 'RatioCalculatorTool',
  'average-calculator': 'AverageCalculatorTool',
  'standard-deviation': 'StandardDeviationTool',
  'variance-calculator': 'VarianceCalculatorTool',
  'quadratic-equation': 'QuadraticEquationTool',
  'simple-interest': 'SimpleInterestTool',
  'emi-calculator': 'EmiCalculatorTool'
};

// 1. Add tools to tools.ts
const toolsMatch = toolsContent.match(/export const tools: Tool\[\] = \[\s*([\s\S]*?)\s*\];/);
if (toolsMatch) {
  const currentToolsStr = toolsMatch[1];
  
  // Find highest ID
  const idMatches = [...currentToolsStr.matchAll(/"id":\s*(\d+)/g)];
  let maxId = 0;
  for (const match of idMatches) {
    const id = parseInt(match[1]);
    if (id > maxId) maxId = id;
  }

  let toolsToAddStr = '';
  for (const tool of newTools) {
    if (!currentToolsStr.includes(`"slug": "${tool.slug}"`)) {
      maxId++;
      toolsToAddStr += `,\n  {\n    "id": ${maxId},\n    "slug": "${tool.slug}",\n    "name": "${tool.name}",\n    "category": "${tool.category}",\n    "desc": "${tool.desc}"\n  }`;
    }
  }

  if (toolsToAddStr) {
    const newToolsStr = currentToolsStr + toolsToAddStr;
    toolsContent = toolsContent.replace(toolsMatch[1], newToolsStr);
    fs.writeFileSync(toolsFile, toolsContent);
    console.log('Updated tools.ts');
  }
}

// 2. Add imports and routes to Routes.tsx
const importTarget = "import DataUnitConverterTool from '@/features/network/DataUnitConverterTool';";
let routesUpdated = false;

for (const tool of newTools) {
  const componentName = componentMap[tool.slug];
  
  if (!routesContent.includes(componentName)) {
    const importStr = `import ${componentName} from '@/features/math/${componentName}';\n`;
    routesContent = routesContent.replace(importTarget, importTarget + '\n' + importStr);
    
    const routeStr = `<Route path="/tool/${tool.slug}" element={<${componentName} />} />`;
    // Find where to insert route
    const routeTarget = '<Route path="/tool/data-unit-converter" element={<DataUnitConverterTool />} />';
    routesContent = routesContent.replace(routeTarget, routeTarget + '\n          ' + routeStr);
    routesUpdated = true;
  }
}

if (routesUpdated) {
  fs.writeFileSync(routesFile, routesContent);
  console.log('Updated Routes.tsx');
}
