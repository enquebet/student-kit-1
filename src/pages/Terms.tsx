import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, AlertTriangle, CheckCircle, Scale, ShieldAlert, Award, Mail } from 'lucide-react';

export default function Terms() {
  const lastUpdated = "September 19, 2026";
  const pageTitle = "Terms and Conditions | StudentKit – Free Educational Utilities";
  const pageDesc = "StudentKit Terms of Service: Master user agreement, open-source licensing, educational disclaimers, and user privacy terms.";
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/terms` : 'https://studentkit.dev/terms';

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>

      {/* Header Banner */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-100">
          <Scale className="w-4 h-4 text-blue-600" />
          <span>User Agreement & Disclaimers</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Terms and Conditions
        </h1>
        <p className="text-base text-gray-600">
          Effective Date: <strong className="text-gray-900">{lastUpdated}</strong>. Please read these terms carefully before utilizing our tools and ecosystem services.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-3">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-gray-900 text-sm mb-1">Free & Open Utility</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Provided free of charge for students, educators, and software engineers worldwide.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit mb-3">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-gray-900 text-sm mb-1">Educational Purpose</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Calculations are mathematical aids and should be cross-verified for life-critical work.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-gray-900 text-sm mb-1">Zero Lock-in</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            You retain 100% intellectual ownership of all your generated data, text, files, and results.
          </p>
        </div>
      </div>

      {/* Legal Sections */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm space-y-10 text-gray-700 leading-relaxed">
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">1</span>
            Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or utilizing the StudentKit web portal, any of its 158+ interactive computational utilities, or related ecosystem web properties (collectively, the "Services"), you agree to be legally bound by these Terms and Conditions ("Terms"). If you do not accept these Terms in full, you are not authorized to use the Services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">2</span>
            Educational & Informational Disclaimers
          </h2>
          <p>
            The software calculators, mathematical formulas, conversion engines, financial estimators, and engineering simulations available on StudentKit are developed strictly for <strong>educational, instructional, academic, and general productivity assistance</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>Engineering & Hardware Calculations:</strong> Tools such as Ohm's Law, PCB Trace Width, Beam Deflection, Cable Voltage Drop, or Concrete Volume must not replace licensed professional engineering reviews, certified CAD simulations, or local municipal building codes.</li>
            <li><strong>Financial & Academic Estimates:</strong> Tools such as CGPA Calculator, Attendance Calculator, Salary Deductions, Auto Loans, and Mortgage Calculators provide mathematical approximations. Official institutional regulations, tax authorities, or university registrars hold primary authority.</li>
            <li><strong>Health & Fitness Metrics:</strong> BMI, TDEE, and macro calculators do not constitute clinical medical diagnosis or dietitian advice.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">3</span>
            Permitted Use & Acceptable Conduct
          </h2>
          <p>You agree to use StudentKit only for lawful purposes. You shall not:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Attempt to disrupt, overload, or impair the platform's infrastructure through denial-of-service attacks, automated malicious scraping, or excessive programmatic traffic.</li>
            <li>Exploit the platform to distribute computer viruses, malware, trojans, or unauthorized scripts.</li>
            <li>Attempt to reverse-engineer, decompile, or tamper with proprietary backend routing or infrastructure integrity.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">4</span>
            Intellectual Property & User Ownership
          </h2>
          <p>
            <strong>Your Output Belongs to You:</strong> All calculations, converted files, processed text, base64 strings, formatted JSON, resized graphics, and CSV records produced by your use of our tools are 100% your own property. StudentKit claims no ownership, copyright, or licensing rights over your inputs or generated outputs.
          </p>
          <p>
            <strong>Platform IP:</strong> The StudentKit name, logo, site design, visual layout, interactive user interface styling, and original computational code libraries are protected by intellectual property rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">5</span>
            Disclaimer of Warranties ("As-Is")
          </h2>
          <p className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 text-sm">
            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR UNINTERRUPTED AVAILABILITY.
          </p>
          <p>
            While we conduct rigorous tests on all mathematical and conversion algorithms, StudentKit does not warrant that calculations will be error-free, uninterrupted, or free from external browser variance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">6</span>
            Limitation of Liability
          </h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL STUDENTKIT, ITS CREATORS, CONTRIBUTORS, AFFILIATES, OR HOSTING PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF ACADEMIC MARKS, PROFITS, DATA, OR BUSINESS INTERRUPTION) ARISING FROM OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE OUR SERVICES.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">7</span>
            Governing Law & Severability
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with standard international internet practices and applicable local jurisdictions. If any provision of these Terms is found to be invalid or unenforceable, that provision shall be severed, and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="space-y-4 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Contact Information
          </h2>
          <p>
            If you have any questions or require legal clarification regarding these Terms and Conditions, please contact:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-900">StudentKit Legal & Development Operations</p>
            <p className="text-gray-600">Email: <a href="mailto:fluxedustart@gmail.com" className="text-blue-600 hover:underline">fluxedustart@gmail.com</a></p>
            <p className="text-gray-600">Ecosystem Network: StudentKit Open Utility Initiative</p>
          </div>
        </section>

      </div>
    </div>
  );
}
