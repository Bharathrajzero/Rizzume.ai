'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewJobPage() {
  const [mode, setMode] = useState<'manual' | 'scrape'>('manual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleManualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      jobTitle: formData.get('jobTitle'),
      company: formData.get('company'),
      jobDescription: formData.get('jobDescription'),
      jobUrl: formData.get('jobUrl'),
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const url = formData.get('url');

    try {
      const res = await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await res.json();
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to scrape job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 antialiased">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-black text-slate-900">
            Rizzume<span className="text-blue-600">.ai</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Add Job Posting</h1>
        <p className="text-slate-500 font-medium mb-8">Track a new job opportunity</p>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                mode === 'manual'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setMode('scrape')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                mode === 'scrape'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Scrape URL
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {mode === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tech Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
                <textarea
                  name="jobDescription"
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Paste the full job description here..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job URL (Optional)</label>
                <input
                  type="url"
                  name="jobUrl"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? 'Adding...' : 'Add Job'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleScrape} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Posting URL</label>
                <input
                  type="url"
                  name="url"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/jobs/..."
                />
                <p className="text-xs text-slate-500 mt-2">
                  Paste a URL from LinkedIn, Indeed, or other job boards
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? 'Scraping...' : 'Scrape & Add Job'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
