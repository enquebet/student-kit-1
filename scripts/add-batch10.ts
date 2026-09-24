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
  { slug: "subnet-calculator", name: "Subnet Calculator", category: "network", desc: "Calculate network, broadcast, and host ranges from an IP and CIDR." },
  { slug: "bandwidth-calculator", name: "Bandwidth Calculator", category: "network", desc: "Calculate file transfer times based on file size and connection speed." },
  { slug: "mac-generator", name: "MAC Address Generator", category: "network", desc: "Generate random MAC addresses with custom formatting." },
  { slug: "chmod-calculator", name: "CHMOD Calculator", category: "network", desc: "Calculate Linux file permissions in octal and symbolic formats." },
  { slug: "data-unit-converter", name: "Data Unit Converter", category: "network", desc: "Convert between Bits, Bytes, Kilobytes, Megabytes, Gigabytes, etc." },
  { slug: "url-encoder", name: "URL Encoder / Decoder", category: "network", desc: "Encode or decode strings for safe URL transmission." },
  { slug: "base64-converter", name: "Base64 Converter", category: "network", desc: "Encode and decode text to and from Base64 format." },
  { slug: "jwt-decoder", name: "JWT Decoder", category: "network", desc: "Decode JSON Web Tokens (JWT) to inspect header and payload claims." },
  { slug: "password-generator", name: "Password Generator", category: "network", desc: "Generate secure, random passwords with customizable parameters." },
  { slug: "ipv4-to-ipv6", name: "IPv4 to IPv6 Converter", category: "network", desc: "Convert an IPv4 address to a mapped IPv6 address." }
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

console.log("Registered batch 10 tools (Network & IT).");
