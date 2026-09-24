import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsFile = fs.readFileSync(path.join(__dirname, '../src/data/tools.ts'), 'utf-8');
const regex = /{\s*"?id"?:\s*(\d+),\s*"?slug"?:\s*"([^"]+)",\s*"?name"?:\s*"([^"]+)",\s*"?category"?:\s*"([^"]+)"/g;

let tools = [];
let m;
while ((m = regex.exec(toolsFile)) !== null) {
  tools.push({
    id: parseInt(m[1]),
    slug: m[2],
    name: m[3],
    category: m[4]
  });
}

let md = `# Tool Completion Matrix\n\n| ID | Name | Category | Status |\n|---|---|---|---|\n`;

tools.forEach(t => {
  let parts = t.slug.split('-');
  let compName = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Tool.tsx';
  
  if (t.slug === 'json-to-csv') compName = 'JsonToCsvTool.tsx';
  else if (t.slug === 'csv-to-json') compName = 'CsvToJsonTool.tsx';
  else if (t.slug === 'image-to-base64') compName = 'ImageToBase64Tool.tsx';
  else if (t.slug === 'cgpa-to-percentage') compName = 'CgpaToPercentageTool.tsx';
  else if (t.slug === 'percentage-to-cgpa') compName = 'PercentageToCgpaTool.tsx';
  else if (t.slug === 'ohms-law-calculator') compName = 'OhmsLawCalculatorTool.tsx';
  
  // engineering custom names
  if (t.slug === 'adc-resolution-calculator') compName = 'AdcResolutionTool.tsx';
  else if (t.slug === 'dac-resolution-calculator') compName = 'DacResolutionTool.tsx';
  else if (t.slug === 'battery-runtime-calculator') compName = 'BatteryRuntimeTool.tsx';
  else if (t.slug === 'op-amp-calculator') compName = 'OpampCalculatorTool.tsx';
  else if (t.slug === 'frequency-to-period-calculator') compName = 'FrequencyPeriodTool.tsx';
  else if (t.slug === 'period-to-frequency-calculator') compName = 'PeriodFrequencyTool.tsx';
  else if (t.slug === 'rc-time-constant-calculator') compName = 'RcTimeConstantTool.tsx';
  else if (t.slug === 'rl-time-constant-calculator') compName = 'RlTimeConstantTool.tsx';
  else if (t.slug === 'resistor-color-code-calculator') compName = 'ResistorColorCodeTool.tsx';
  
  let p = path.join(__dirname, '../src/features', t.category, compName);
  let status = 'MISSING';
  
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf-8');
    if (content.includes('PlaceholderTool') || content.includes('GenericProxy') || content.includes('Fully functional') || content.includes('Sandboxed') || content.includes('drag-and-drop processing enabled locally')) {
      status = 'PLACEHOLDER';
    } else {
      status = 'COMPLETE';
    }
  } else {
    // try exact name if not matching
    let rawP = path.join(__dirname, '../src/features', t.category, t.slug.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'CalculatorTool.tsx');
    if (fs.existsSync(rawP)) {
       const content = fs.readFileSync(rawP, 'utf-8');
       status = (content.includes('Fully functional')) ? 'PLACEHOLDER' : 'COMPLETE';
    }
  }
  md += `| ${t.id} | ${t.name} | ${t.category} | ${status} |\n`;
});

fs.writeFileSync(path.join(__dirname, '../TOOL_COMPLETION_MATRIX.md'), md);
