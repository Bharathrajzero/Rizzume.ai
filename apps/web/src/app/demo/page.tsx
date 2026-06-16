'use client';

import { useState } from 'react';
import Link from 'next/link';

// Premium Logo Component matching the system aesthetic
function Logo() {
  return (
    <div className="flex items-center space-x-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:6px_6px]" />
        <svg
          className="w-5 h-5 text-white relative z-10 transform transition-transform duration-500 group-hover:rotate-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
          Rizz<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-cyan-500 transition-all">ume</span>
          <span className="text-xs font-bold text-blue-600/80 ml-0.5">.ai</span>
        </span>
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const sampleJob = `Senior Full Stack Engineer

We are seeking an experienced Full Stack Engineer to join our team.

Requirements:
- 5+ years of experience with React, Node.js, and TypeScript
- Strong knowledge of PostgreSQL and database design
- Experience with AWS (S3, Lambda, EC2)
- Proficiency in RESTful API design
- Experience with CI/CD pipelines and Docker
- Strong problem-solving skills and attention to detail
- Excellent communication skills

Nice to have:
- Experience with Next.js and Tailwind CSS
- Knowledge of Python and FastAPI
- Experience with vector databases (Pinecone, pgvector)
- Understanding of AI/ML concepts`;

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a target payload or job description');
      return;
    }

    setAnalyzing(true);

    // Simulate AI LLM node matching context routing
    setTimeout(() => {
      setResults({
        matchScore: 78,
        missingKeywords: ['Docker', 'CI/CD', 'AWS Lambda', 'PostgreSQL optimization'],
        strengths: ['React', 'TypeScript', 'Node.js', 'Next.js', 'API Design'],
        suggestions: [
          {
            section: 'Technical Skills Matrix',
            original: 'React, TypeScript, Node.js',
            improved: 'React (5+ years), TypeScript, Node.js, Docker containerization, CI/CD with GitHub Actions',
            reason: 'Add Docker and CI/CD parameters explicitly required by the target schema.'
          },
          {
            section: 'Experience Architecture',
            original: 'Built full-stack applications',
            improved: 'Architected and deployed distributed full-stack infrastructures on AWS (S3, Lambda, EC2) integrated with high-availability PostgreSQL layers',
            reason: 'Emphasize cloud deployment topologies and explicit database configurations.'
          },
          {
            section: 'Core Product Projects',
            original: 'E-commerce platform',
            improved: 'E-commerce transactional layer leveraging secure RESTful APIs, containerized with multi-stage Docker builds, deployed via auto-scaling workflows',
            reason: 'Highlight DevOps orchestrations and structural architecture design patterns.'
          }
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  const loadSampleJob = () => {
    setJobDescription(sampleJob);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 antialiased flex flex-col justify-between selection:bg-blue-500/20">
      
      <div>
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80">
          <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/upload" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Upload Resume
              </Link>
              <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Body */}
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <span className="bg-blue-500/10 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border border-blue-500/10">
                ⚡ Simulation Sandbox
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-4 tracking-tight">
                Simulate Vector Node Alignment
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Paste a prospective core requirement model to test cross-token matching weights and optimization structures instantly.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              
              {/* Input Section */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-slate-900">Target Schema Profile</h2>
                  <button
                    onClick={loadSampleJob}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Load Standard Paradigm
                  </button>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste raw target specifications context here..."
                  className="w-full h-[400px] p-4 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none font-mono text-xs leading-relaxed bg-slate-50/50 text-slate-800"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full mt-4 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md active:translate-y-0.5 text-sm"
                >
                  {analyzing ? (
                    <span className="flex items-center justify-center tracking-wide">
                      <svg className="animate-spin h-4 w-4 mr-2 text-blue-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Orchestrating Token Search Weight...
                    </span>
                  ) : 'Compute Similarity Vector'}
                </button>
              </div>

              {/* Results Section */}
              <div className="h-full">
                {!results ? (
                  <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200 h-[516px] flex flex-col items-center justify-center text-center p-8">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-1">
                      Awaiting Data Flow Payload
                    </h3>
                    <p className="text-xs font-medium text-slate-400 max-w-xs">
                      Provide standard parameter entries on the left interface layer to generate weights and structural advice.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in-50 duration-400">
                    
                    {/* Match Score */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5 border border-slate-100">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Calculated Target Alignment</h3>
                      <div className="flex items-center space-x-5">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="#f1f5f9"
                              strokeWidth="10"
                              fill="none"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="#2563eb"
                              strokeWidth="10"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${2 * Math.PI * 40 * (1 - results.matchScore / 100)}`}
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black text-slate-900">{results.matchScore}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900 mb-0.5">{results.matchScore}% Vector Alignment</p>
                          <p className="text-sm font-medium text-slate-500">Passing index reached. Additional target keys required for top tier routing.</p>
                        </div>
                      </div>
                    </div>

                    {/* Missing Keywords */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5 border border-slate-100">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Identified Missing Key Nodes</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.missingKeywords.map((keyword: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-red-500/10 text-red-700 border border-red-500/10 px-3 py-1 rounded-xl text-xs font-bold"
                          >
                            🚨 {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5 border border-slate-100">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Validated Strong Matched Inclusions</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.strengths.map((strength: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/10 px-3 py-1 rounded-xl text-xs font-bold"
                          >
                            ✓ {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5 border border-slate-100 max-h-[360px] overflow-y-auto custom-scrollbar">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Structural Optimization Advice</h3>
                      <div className="space-y-5">
                        {results.suggestions.map((suggestion: any, idx: number) => (
                          <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1">
                            <p className="text-xs font-black text-slate-900 uppercase tracking-wide mb-2">{suggestion.section}</p>
                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl mb-2 text-xs">
                              <p className="text-slate-400 font-bold mb-0.5">Input State:</p>
                              <p className="text-slate-600 font-medium font-mono">{suggestion.original}</p>
                            </div>
                            <div className="bg-blue-500/5 border border-blue-500/10 p-2.5 rounded-xl mb-2 text-xs">
                              <p className="text-blue-600 font-black mb-0.5">Optimized Target State:</p>
                              <p className="text-slate-800 font-bold font-mono">{suggestion.improved}</p>
                            </div>
                            <p className="text-[11px] font-semibold text-slate-400 italic">Context Reason: {suggestion.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            {results && (
              <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-indigo-600/20 mix-blend-overlay" />
                <h3 className="text-2xl font-black text-white mb-2 relative z-10">
                  Ready to deploy these structural fixes to your actual profile?
                </h3>
                <p className="text-slate-400 font-medium text-sm sm:text-base mb-6 max-w-xl mx-auto relative z-10">
                  Upload your primary static document into our orchestration funnel for absolute end-to-end alignment.
                </p>
                <Link
                  href="/upload"
                  className="inline-block bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-md relative z-10 active:scale-95 select-none"
                >
                  Ingest Resume File Now →
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Premium Redesigned Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Left Brand Column */}
            <div className="md:col-span-2 space-y-4">
              <Logo />
              <p className="text-slate-500 text-sm font-medium max-w-sm leading-relaxed">
                An advanced enterprise-ready orchestration framework matching core applicant engineering experiences with hyper-targeted vector optimization metrics.
              </p>
            </div>

            {/* Middle Nav Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Application Flow</h4>
              <ul className="space-y-2.5">
                <li><Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Dashboard UI</Link></li>
                <li><Link href="/demo" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Interactive Sandbox</Link></li>
                <li><Link href="/upload" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Upload Ingestion</Link></li>
              </ul>
            </div>

            {/* Right Architecture Info Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Architecture</h4>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Next.js 14, PostgreSQL + pgvector, Redis Queue Layer, Python FastAPI Async Services.
              </p>
            </div>
          </div>

          {/* Sub-Footer Divider & Copyright Group */}
          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-slate-500 text-center sm:text-left">
              © 2025 <span className="font-semibold text-slate-800">AlphaGroup Ltd.</span> All rights reserved.
            </div>
            <div className="text-sm font-medium text-slate-400 text-center sm:text-right">
              Architected & Built by <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-cyan-500 transition-all cursor-pointer">Bharath Raj</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}