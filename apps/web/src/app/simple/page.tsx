'use client';

import { useState, useEffect } from 'react';

export default function SimpleDemoPage() {
  const [userId, setUserId] = useState('demo-user');
  const [resumes, setResumes] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resumesRes, appsRes] = await Promise.all([
        fetch('/api/resumes/list'),
        fetch('/api/applications'),
      ]);
      const resumesData = await resumesRes.json();
      const appsData = await appsRes.json();
      
      if (resumesData.success) setResumes(resumesData.data);
      if (appsData.success) setApplications(appsData.data);
    } catch (err) {
      console.error('Load error:', err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const res = await fetch('/api/resumes/upload-simple', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert('Resume uploaded! Processing...');
        setTimeout(loadData, 2000);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAddJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      jobTitle: formData.get('jobTitle'),
      company: formData.get('company'),
      jobDescription: formData.get('jobDescription'),
      jobUrl: formData.get('jobUrl'),
      resumeId: formData.get('resumeId'),
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert('Job added!');
        loadData();
        e.currentTarget.reset();
      }
    } catch (err) {
      alert('Failed to add job');
    }
  };

  const handleAnalyze = async (appId: string) => {
    setAnalyzing(appId);
    try {
      await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: appId }),
      });
      alert('Analysis started! Refresh in 10 seconds...');
      setTimeout(loadData, 10000);
    } catch (err) {
      alert('Analysis failed');
    } finally {
      setAnalyzing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-2">
          Resume ATS Optimizer <span className="text-blue-600">Demo</span>
        </h1>
        <p className="text-slate-600 mb-8">Simple SQLite-based implementation</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Resume */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">📄 Upload Resume</h2>
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              disabled={uploading}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 cursor-pointer"
            />
            {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}

            <div className="mt-6">
              <h3 className="font-bold text-sm text-slate-700 mb-2">Your Resumes:</h3>
              {resumes.length === 0 ? (
                <p className="text-sm text-slate-500">No resumes yet</p>
              ) : (
                <div className="space-y-2">
                  {resumes.map((r) => (
                    <div key={r.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-semibold text-slate-700">{r.name}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        r.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        r.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-700' :
                        r.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Job */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">💼 Add Job</h2>
            <form onSubmit={handleAddJob} className="space-y-3">
              <input
                name="jobTitle"
                placeholder="Job Title"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
              <input
                name="company"
                placeholder="Company"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
              <textarea
                name="jobDescription"
                placeholder="Job Description"
                required
                rows={4}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
              <input
                name="jobUrl"
                placeholder="Job URL (optional)"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
              <select
                name="resumeId"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              >
                <option value="">Select Resume (optional)</option>
                {resumes.filter(r => r.status === 'COMPLETED').map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
              >
                Add Job
              </button>
            </form>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">🎯 Job Applications</h2>
          {applications.length === 0 ? (
            <p className="text-slate-500">No applications yet</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{app.jobTitle}</h3>
                      <p className="text-sm text-slate-600">{app.company}</p>
                    </div>
                    {app.matchScore !== null && (
                      <div className="text-right">
                        <div className={`text-3xl font-black ${
                          app.matchScore >= 80 ? 'text-green-600' :
                          app.matchScore >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {app.matchScore}%
                        </div>
                        <p className="text-xs text-slate-500">Match Score</p>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-slate-700 mb-3 line-clamp-2">{app.jobDescription}</p>

                  {app.missingKeywords && (
                    <div className="mb-3">
                      <p className="text-xs font-bold text-slate-700 mb-1">Missing Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {JSON.parse(app.missingKeywords).map((kw: string, i: number) => (
                          <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {app.tailoredResume && (
                    <details className="mb-3">
                      <summary className="text-sm font-bold text-blue-600 cursor-pointer">
                        View Tailored Resume
                      </summary>
                      <pre className="text-xs text-slate-700 mt-2 whitespace-pre-wrap bg-slate-50 p-3 rounded-xl max-h-64 overflow-auto">
                        {app.tailoredResume}
                      </pre>
                    </details>
                  )}

                  {app.resumeId && !app.matchScore && (
                    <button
                      onClick={() => handleAnalyze(app.id)}
                      disabled={analyzing === app.id}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300"
                    >
                      {analyzing === app.id ? 'Analyzing...' : '🔍 Analyze Match'}
                    </button>
                  )}

                  {!app.resumeId && (
                    <p className="text-xs text-amber-600">⚠️ No resume attached</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
