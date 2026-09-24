import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

function toPascalCase(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

interface AuditResult {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  route: string;
  componentName: string;
  componentSize: number;
  usesGenericCalculator: boolean;
  hasCustomLogic: boolean;
  hasTest: boolean;
  isFakePlaceholder: boolean;
  status: 'COMPLETE' | 'NEEDS_WORK' | 'PLACEHOLDER' | 'MISSING';
}

const auditResults: AuditResult[] = [];

for (const tool of tools) {
  const componentName = toPascalCase(tool.slug) + 'Tool';
  
  // Try to find the component. It might be in tool.category, but let's check everywhere if not found.
  let componentPath = path.join(process.cwd(), 'src/features', tool.category, `${componentName}.tsx`);
  
  // converters is not in categories in tools.ts but it is in Routes.tsx? 
  // Let's just do a recursive search if it's not found.
  if (!fs.existsSync(componentPath)) {
     // try other folders
     const featuresDir = path.join(process.cwd(), 'src/features');
     const subdirs = fs.readdirSync(featuresDir);
     for (const sub of subdirs) {
        const testP = path.join(featuresDir, sub, `${componentName}.tsx`);
        if (fs.existsSync(testP)) {
           componentPath = testP;
           break;
        }
     }
  }

  const testPath = componentPath.replace('.tsx', '.test.tsx');
  
  let componentSize = 0;
  let usesGenericCalculator = false;
  let hasCustomLogic = false;
  let hasTest = fs.existsSync(testPath);
  let isFakePlaceholder = false;
  let exists = false;
  
  if (fs.existsSync(componentPath)) {
    exists = true;
    const content = fs.readFileSync(componentPath, 'utf8');
    componentSize = Buffer.byteLength(content, 'utf8');
    
    usesGenericCalculator = content.includes('GenericCalculator');
    isFakePlaceholder = content.includes('File API features are sandboxed') || content.includes('Coming soon') || componentSize < 900;
    
    hasCustomLogic = !usesGenericCalculator && !isFakePlaceholder;
  }
  
  let status: AuditResult['status'] = 'MISSING';
  if (exists) {
    if (isFakePlaceholder) {
      status = 'PLACEHOLDER';
    } else if (usesGenericCalculator && !['math'].includes(tool.category)) {
      status = 'NEEDS_WORK';
    } else if (usesGenericCalculator && ['math'].includes(tool.category) && componentSize < 1200) {
      status = 'NEEDS_WORK';
    } else {
      status = 'COMPLETE';
    }
  }
  
  if (status === 'COMPLETE' && componentSize < 1500 && !usesGenericCalculator) {
    status = 'NEEDS_WORK'; 
  }
  
  auditResults.push({
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    category: tool.category,
    route: `/tool/${tool.slug}`,
    componentName,
    componentSize,
    usesGenericCalculator,
    hasCustomLogic,
    hasTest,
    isFakePlaceholder,
    status
  });
}

let md = `# StudentKit Tool Audit\n\n`;
md += `## Summary\n\n`;
md += `- **Total Tools:** ${auditResults.length}\n`;
md += `- **COMPLETE:** ${auditResults.filter(r => r.status === 'COMPLETE').length}\n`;
md += `- **NEEDS WORK:** ${auditResults.filter(r => r.status === 'NEEDS_WORK').length}\n`;
md += `- **PLACEHOLDER:** ${auditResults.filter(r => r.status === 'PLACEHOLDER').length}\n`;
md += `- **MISSING:** ${auditResults.filter(r => r.status === 'MISSING').length}\n\n`;

md += `## Tool Details\n\n`;
md += `| Name | Category | Size | Status | GenericCalc | Custom Logic | Tests |\n`;
md += `|---|---|---|---|---|---|---|\n`;
for (const r of auditResults) {
  md += `| ${r.name} | ${r.category} | ${r.componentSize} | **${r.status}** | ${r.usesGenericCalculator ? 'Yes' : 'No'} | ${r.hasCustomLogic ? 'Yes' : 'No'} | ${r.hasTest ? 'Yes' : 'No'} |\n`;
}

fs.writeFileSync('STUDENTKIT_FINAL_AUDIT.md', md);
console.log(`Audit complete. Found ${auditResults.filter(r => r.status === 'COMPLETE').length} COMPLETE tools, ${auditResults.filter(r => r.status === 'PLACEHOLDER').length} placeholders, ${auditResults.filter(r => r.status === 'NEEDS_WORK').length} needs work, ${auditResults.filter(r => r.status === 'MISSING').length} missing.`);
