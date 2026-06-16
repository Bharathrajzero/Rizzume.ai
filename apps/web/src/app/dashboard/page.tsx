'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Premium Interactive Logo Component
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

export default function DashboardPage() {
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('uploaded') === 'true') {
      setShowUploadSuccess(true);
      setTimeout(() => setShowUploadSuccess(false), 5000);
    }
  }, []);

  const mockApplications = [
    {
      id: '1',
      jobTitle: 'Senior Full Stack Engineer',
      company: 'Tech Corp',
      status: 'MATCHED_ROUTED',
      matchScore: 85,
      appliedDate: '2024-01-15',
      source: 'LinkedIn API'
    },
    {
      id: '2',
      jobTitle: 'Frontend Developer',
      company: 'StartupXYZ',
      status: 'INTERVIEWING',
      matchScore: 92,
      appliedDate: '2024-01-12',
      source: 'Indeed Node'
    },
    {
      id: '3',
      jobTitle: 'Software Engineer',
      company: 'Big Company Inc',
      status: 'STAGED',
      matchScore: 78,
      appliedDate: '2024-01-10',
      source: 'Manual Intake'
    },
  ];

  const mockResumes = [
    {
      id: '1',
      name: 'Resume_2024_General.pdf',
      status: 'OPTIMIZED',
      createdAt: '2024-01-01',
      applications: 5
    },
    {
      id: '2',
      name: 'Resume_Frontend_Focused.pdf',
      status: 'OPTIMIZED',
      createdAt: '2024-01-08',
      applications: 2
    },
  ];

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
              <Link href="/demo" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Demo Sandbox
              </Link>
              <Link href="/upload" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
                Upload Resume
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Body */}
        <div className="container mx-auto px-4 py-12 flex-grow">
          
          {/* Success Alert */}
          {showUploadSuccess && (
            <div className="max-w-6xl mx-auto mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-emerald-900 text-sm">Vector Payload Ingested Successfully!</p>
                <p className="text-xs text-emerald-700 font-medium">Your resume nodes have been fully tokenized and compiled against the core matching engine.</p>
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Orchestration Control Layer</h1>
              <p className="text-slate-500 font-medium text-sm sm:text-base">Track, analyze, and map optimized vector matches against real-time pipeline nodes.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Mappings</p>
                  <div className="w-9 h-9 bg-blue-500/5 rounded-xl flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">{mockApplications.length}</p>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">+2 structural nodes added</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Routes</p>
                  <div className="w-9 h-9 bg-indigo-500/5 rounded-xl flex items-center justify-center text-indigo-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">1</p>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">Awaiting remote loop response</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Evaluations</p>
                  <div className="w-9 h-9 bg-purple-500/5 rounded-xl flex items-center justify-center text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">1</p>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">Live interaction structured</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Mean Vector Accuracy</p>
                  <div className="w-9 h-9 bg-emerald-500/5 rounded-xl flex items-center justify-center text-emerald-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">85%</p>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">High configuration compatibility</p>
                </div>
              </div>
            </div>

            {/* Main Mappings Block */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-slate-100 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-slate-900">Recent Target Alignments</h2>
                <Link href="/jobs/new" className="text-xs font-bold text-blue-600 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-all">
                  + Add Live Node
                </Link>
              </div>
              <div className="space-y-4">
                {mockApplications.map((app) => (
                  <div key={app.id} className="border border-slate-100 bg-slate-50/30 rounded-2xl p-4 sm:p-5 hover:border-blue-500/30 hover:bg-white transition-all duration-200 group cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors">{app.jobTitle}</h3>
                          <span className={`px-2.5 py-0.5 rounded-xl text-[10px] font-black tracking-wide uppercase border ${
                            app.status === 'MATCHED_ROUTED' ? 'bg-blue-500/10 text-blue-700 border-blue-500/10' :
                            app.status === 'INTERVIEWING' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/10' :
                            'bg-slate-500/10 text-slate-700 border-slate-500/10'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-500 mb-2.5">{app.company}</p>
                        <div className="flex items-center space-x-4 text-xs font-medium text-slate-400">
                          <span className="flex items-center">
                            <span className="mr-1">📅</span> {app.appliedDate}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">🔗</span> {app.source}
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                        <div>
                          <div className={`text-2xl sm:text-3xl font-black tracking-tight ${
                            app.matchScore >= 80 ? 'text-emerald-600' :
                            app.matchScore >= 60 ? 'text-amber-500' :
                            'text-rose-600'
                          }`}>
                            {app.matchScore}%
                          </div>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Similarity Vector</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumes Ingestion Panel */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-slate-900">Compiled Target Profiles</h2>
                <Link href="/upload" className="text-xs font-bold text-blue-600 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-all">
                  + Compile New Vector
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {mockResumes.map((resume) => (
                  <div key={resume.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-600 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-extrabold text-sm sm:text-base text-slate-900">{resume.name}</p>
                        <p className="text-xs font-medium text-slate-400 mt-0.5">
                          Compiled {resume.createdAt} • Embedded across {resume.applications} unique node structures
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end">
                      <span className="px-2.5 py-0.5 rounded-xl text-[10px] font-black tracking-wide uppercase bg-emerald-500/10 text-emerald-700 border border-emerald-500/10">
                        {resume.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Premium Unified Corporate Footer */}
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