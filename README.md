# 🎓 StudentKit

> **The All-in-One Open-Source Academic, Engineering, & Developer Utilities Suite**  
> 158 free, privacy-first, client-side tools with zero tracking, zero accounts, and zero server roundtrips.

[![React](https://img.shields.io/badge/React-19.0.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Tools Count](https://img.shields.io/badge/Tools-158_Production_Ready-brightgreen?style=flat-square)]()
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-blue?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📌 Overview

**StudentKit** is a unified, lightning-fast digital workstation created for students, developers, researchers, and engineers.

Most online utility sites are riddled with popups, invasive trackers, paywalls, slow server roundtrips, and bloated layouts. **StudentKit** does the opposite:
- **100% Client-Side**: All calculations, conversions, string manipulations, and file analyses happen directly in your browser.
- **Privacy-First**: No data leaves your machine. Your GPA marks, private code snippets, and calculations are never uploaded or tracked.
- **Instant Response**: Built on Vite and React 19 for instantaneous computation with zero network latency.
- **Accessible & Tactile Design**: Google Material-inspired UI with crisp visual hierarchy, tactile buttons, responsive layouts, and shareable permalinks.

---

## 🧰 Categorized Tool Directory (158 Tools)

For complete route paths, formulas, and detailed feature breakdowns, see **[TOOLS.md](TOOLS.md)**.

| Category | Count | Highlights |
|---|:---:|---|
| **🎓 Student & Academic** | 15 | CGPA Calculator with local semester saving, GPA/SGPA, Attendance Tracker, Bunk Planner, Exam Countdown, Study Timer, Grade Target Solver. |
| **⚡ Engineering & Electronics** | 55 | Ohm's Law, 4/5-Band Resistor Color Codes, Voltage & Current Dividers, RC/RL Time Constants, Decibels, Filter Cutoffs, Concrete & Rebar Estimators. |
| **💻 Developer & Programming** | 20 | JSON Formatter & Validator, Base64 Encoder/Decoder, JWT Inspector, UUID/GUID Generator, Regex Tester, URL Encoder, Hash Digester, CHMOD Permissions. |
| **🧮 Mathematics & Science** | 14 | Scientific Calculator, Quadratic Equation Solver, Matrix Operations, Statistical Variance & Standard Deviation, Pythagorean Solver. |
| **🔤 Text & Content Processing** | 10 | Word & Character Counter, Case Converter, Markdown Live Preview, Text Diff Checker, URL Slugifier, Lorem Ipsum Generator. |
| **📁 File & Image Utilities** | 8 | In-Browser Image Compressor, SVG Viewer, File Hash Verifier, Color Palette Extractor, EXIF Data Inspector. |
| **🔄 Unit Converters** | 7 | High-precision bidirectional converters for Length, Weight, Temperature, Area, Speed, Volume, and Time. |
| **💰 Finance & Commerce** | 9 | Loan EMI & Amortization, Profit Margin, VAT & Sales Tax, Inflation Simulator, Bill Split & Tip Calculator. |
| **🌐 Networking & SysAdmin** | 7 | CIDR Subnet Calculator, Bandwidth Download/Upload Time Estimator, MAC Address Generator, IPv4 to IPv6 Converter. |
| **🏃 Health & Fitness** | 5 | BMI Calculator, Total Daily Energy Expenditure (TDEE), Body Fat Estimator, Daily Water Intake Calculator. |
| **⏰ Everyday & Productivity** | 5 | Age Calculator, Percentage Difference, Decision Maker / Coin Flipper, Date Difference. |
| **📅 Time & Date** | 3 | Duration Calculator, Unix Epoch Timestamp Converter, World Time Offset Calculator. |

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [React 19](https://react.dev/) (Functional components, custom hooks)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/) (Strict type-safety)
- **Routing**: [React Router 7](https://reactrouter.com/) (Dynamic param routing `/:category/:slug`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom neon tactile button system
- **Icons**: [Lucide React](https://lucide.dev/)
- **Computation**: Native Web APIs (Canvas, Web Crypto API, FileReader) + [Math.js](https://mathjs.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/studentkit.git
cd studentkit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
```

The optimized static production assets will be output to the `dist/` directory.

### 5. Preview production build

```bash
npm run preview
```

---

## 🧪 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Runs the Vite local development server on port 3000 |
| `npm run build` | Compiles TypeScript and creates optimized production bundle in `dist/` |
| `npm run preview` | Spins up a local server to preview the built `dist/` directory |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) to verify zero errors |
| `npm test` | Executes the Vitest automated test suite |
| `npm run clean` | Removes `dist/` and build artifacts |

---

## 📂 Project Structure

```text
studentkit/
├── .env.example              # Documented client-side configuration guide
├── .gitignore                # Comprehensive Git ignore rules
├── index.html                # Application HTML entry point & OpenGraph metadata
├── metadata.json             # Applet descriptor & configuration
├── package.json              # Dependencies and build scripts
├── public/                   # Static assets, icons, and favicon
├── README.md                 # Primary project documentation
├── TOOLS.md                  # Complete 158-tool catalog & specifications
├── tsconfig.json             # TypeScript compiler settings
├── vite.config.ts            # Vite build configuration & plugins
└── src/
    ├── main.tsx              # App bootstrap entry point
    ├── App.tsx               # Main routing table & fallback routes
    ├── index.css             # Tailwind v4 theme & tactile button styles
    ├── components/
    │   ├── common/           # ErrorBoundary, EmptyState, PageHeader
    │   ├── layout/           # Navbar, Footer, Layout wrapper
    │   └── tools/            # ToolShell, GenericCalculator, QuickSearch
    ├── data/
    │   ├── tools.ts          # Master tool database (metadata, categories, slugs)
    │   └── ecosystem.ts      # Ecosystem companion apps directory
    ├── features/             # Domain-specific interactive tool components
    │   ├── student/          # GPA, CGPA, Attendance, Countdown, etc.
    │   ├── engineering/      # Ohm's law, Resistor color code, Capacitors, etc.
    │   ├── developer/        # JSON formatter, Base64, JWT, UUID, Hashes, etc.
    │   ├── math/             # Scientific calculator, Quadratic, Matrices, etc.
    │   ├── text/             # Word counter, Case converter, Markdown, etc.
    │   ├── file/             # Image compressor, Color palette, Hash verifier, etc.
    │   ├── converters/       # Length, Weight, Temperature, Area, etc.
    │   ├── finance/          # Loan EMI, Profit margin, VAT, Tip, etc.
    │   ├── network/          # Subnet, Bandwidth, MAC generator, etc.
    │   ├── health/           # BMI, TDEE, Body fat, Hydration, etc.
    │   ├── everyday/         # Age, Percentage, Decision maker, etc.
    │   └── time/             # Time duration, Epoch, Timezone converters
    └── pages/
        ├── Home.tsx          # Homepage with hero, search, category chips, tool cards
        ├── Categories.tsx    # Category explorer page
        ├── About.tsx         # Mission, privacy policy, and offline details
        ├── Ecosystem.tsx     # StudentKit companion apps & ecosystem showcase
        └── ToolNotFound.tsx  # 404 handler with suggestions
```

---

## ➕ Adding a New Tool

Contributing a new tool to StudentKit is straightforward:

1. **Create the Tool Component**:  
   Add a new component under `src/features/<category>/<ToolName>Tool.tsx`. Wrap your tool in `<ToolShell>` to inherit standard breadcrumbs, title, category tags, and the one-click share button:
   ```tsx
   import React, { useState } from 'react';
   import { ToolShell } from '../../components/tools/ToolShell';

   export const MyNewTool: React.FC = () => {
     // Your state and calculation logic here (100% client-side)
     return (
       <ToolShell
         title="My New Tool"
         description="Solves a specific problem instantly."
         category="developer"
       >
         {/* Custom input fields, sliders, visualizers, and copy buttons */}
       </ToolShell>
     );
   };
   ```

2. **Register the Tool in `src/data/tools.ts`**:  
   Add an entry into the `tools` array with a unique `id`, `slug`, `name`, `category`, and short `desc`.

3. **Register the Route in `src/App.tsx`**:  
   Import your component and add its route path under `/:category/:slug`.

4. **Verify Quality**:  
   ```bash
   npm run lint
   npm run build
   ```

---

## 🔒 Privacy & Offline Capability

- **Zero Analytics / Trackers**: We do not inject Google Analytics, Mixpanel, cookies, or marketing pixels.
- **Client-Side Persistence**: Where persistence is needed (like saving semesters in the CGPA calculator or maintaining study timer history), data is stored exclusively in your browser's `localStorage`.
- **Air-Gapped Friendly**: Once loaded, all calculators and utilities run without needing an internet connection.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🤝 Community & Support

- **Bug Reports & Feature Requests**: Open an issue on GitHub.
- **Contact**: `fluxedustart@gmail.com`
- **Ecosystem**: Check out the [Ecosystem Showcase](https://ais-dev-crspxjsbtu5zf6lrzejbui-836847920930.asia-east1.run.app/ecosystem) to see related companion projects.
