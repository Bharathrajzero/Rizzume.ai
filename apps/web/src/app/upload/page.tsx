'use client';

import { useState } from 'react';
import Link from 'next/link';

// Inline premium Logo component matching the funky GenZ tech aesthetic
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

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate pipeline ingestion and background processing steps
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setProgress(100);
      clearInterval(interval);
      setTimeout(() => {
        window.location.href = '/dashboard?uploaded=true';
      }, 500);
    }, 3000);
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
              <Link href="/demo" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Demo
              </Link>
              <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Body */}
        <div className="container mx-auto px-4 py-20 flex-grow">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Feed the Pipeline
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
                Upload your raw master history. Our vector orchestration layer will parse metrics to make your CV entirely un-rejectable.
              </p>
            </div>

            {/* Upload Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-slate-100 transition-all">
              {!file ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50/50 shadow-inner' 
                      : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/40'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    Drop your resume here
                  </h3>
                  <p className="text-slate-500 font-medium mb-6 text-sm sm:text-base">
                    or click to browse from your device storage
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-all inline-block active:scale-95 select-none">
                      Choose PDF File
                    </span>
                  </label>
                  <p className="text-xs font-semibold text-slate-400 mt-5">
                    Supports compiled PDF formats up to 10MB
                  </p>
                </div>
              ) : (
                <div className="animate-in fade-in-50 duration-300">
                  {/* File Preview */}
                  <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 truncate max-w-xs sm:max-w-md">{file.name}</p>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-slate-400 hover:text-slate-600 bg-white border border-slate-100 shadow-sm hover:shadow p-2 rounded-xl transition-all"
                      disabled={uploading}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="mb-6 bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {progress < 30 && '🚀 Ingesting Matrix...'}
                          {progress >= 30 && progress < 60 && '📂 Extracting Node Strings...'}
                          {progress >= 60 && progress < 90 && '🧠 Running Vector Cosine Search...'}
                          {progress >= 90 && '⚡ Syncing Command State...'}
                        </span>
                        <span className="text-sm font-black text-blue-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md active:translate-y-0.5"
                  >
                    {uploading ? 'Processing Data Pipeline...' : 'Optimize Asset History'}
                  </button>
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/50">
                <div className="flex items-center space-x-2.5 mb-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-extrabold text-slate-900 text-sm">Secure Stack</span>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">Encrypted document payloads isolated from crawling.</p>
              </div>
              
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/50">
                <div className="flex items-center space-x-2.5 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="font-extrabold text-slate-900 text-sm">Async Celery Speed</span>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">Concurrent background extraction workflows.</p>
              </div>

              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/50">
                <div className="flex items-center space-x-2.5 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-extrabold text-slate-900 text-sm">RAG Engine Optimization</span>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">Structured text parsing backed by advanced LLM vectors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Redesigned Footer */}
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