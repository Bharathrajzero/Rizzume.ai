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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 antialiased selection:bg-blue-500/20">
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
            <Link 
              href="/upload" 
              className="bg-slate-900 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 transform hover:scale-[1.02] transition-transform">
            <span className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200/60 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide">
              An AI-powered application pipeline giving your CV unhinged corporate rizz.
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.15] px-2">
            Ghost the recruiters 
            <span className="block mt-2 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 animate-gradient">
              before they ghost you.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop getting cooked by corporate hiring bots. Optimize your resume dynamically with vector embeddings, clear the ATS vibe check, and secure the bag.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/upload"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
            >
              Upload Resume
            </Link>
            <Link 
              href="/demo"
              className="w-full sm:w-auto bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all border border-slate-200 shadow-sm hover:shadow"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Vector-Search Matching</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
              No basic keyword stuffing here. We chunk and map your experience into a pgvector space to align semantically with real manager intent.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Hardcore Gap Breakdown</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
              Get an absolute zero-nonsense 0-100 profile match evaluation. Instantly pinpoint critical missing components before submitting applications.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">1-Click Chrome Ingestion</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
              A high-performing Manifest V3 browser agent scrapes requirements from job boards instantly, streaming them direct to your FastAPI worker.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20 bg-slate-100/50 rounded-[3rem] my-12 border border-slate-200/50 max-w-6xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-16 tracking-tight">The Pipeline Protocol</h2>
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                1
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Ingest & Vectorize</h3>
                <p className="text-slate-600 font-medium">Upload your core history file. System triggers real-time text extraction pipelines and indexes the semantic structure natively into pgvector.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                2
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Scrape Targets</h3>
                <p className="text-slate-600 font-medium">Use our automated browser companion script across modern platform roles to capture rich context schemas in one tap.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                3
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Asynchronous Tailoring</h3>
                <p className="text-slate-600 font-medium">Redis triggers distributed workers to optimize bullet layouts via dynamic multi-agent evaluation setups. Pure results, instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-950 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Ready to Out-Vibe the Algorithm?
          </h2>
          <p className="text-indigo-200/80 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium">
            Deploy your assets securely. Join engineers taking advantage of automated architecture pipelines today.
          </p>
          <Link 
            href="/upload"
            className="inline-block bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl hover:scale-[1.02]"
          >
            Start Free Now →
          </Link>
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