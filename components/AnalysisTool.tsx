
import React, { useState } from 'react';
import { analyzeAndFixCode } from '../geminiService';
import { TranslationSchema, AnalysisResult, RiskLevel } from '../types';

export const AnalysisTool: React.FC<{ t: TranslationSchema }> = ({ t }) => {
  const [code, setCode] = useState('');
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalysis = async () => {
    if (!code || !issue) return;
    setLoading(true);
    try {
      const res = await analyzeAndFixCode(code, issue);
      setResult(res);
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Check your API key or code size.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-emerald-400 bg-emerald-400/10';
      case RiskLevel.MEDIUM: return 'text-amber-400 bg-amber-400/10';
      case RiskLevel.HIGH: return 'text-rose-400 bg-rose-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className="bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700 bg-slate-800/50">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.321a6 6 0 01-3.86.517l-2.388-.477a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 00.556 3.212 9.035 9.035 0 007.146 0 2 2 0 00.556-3.212l-1.168-1.168z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.964 10.3c.3.3.7.5 1.1.6l2.7.4c.5.1 1 .5 1.1 1l.4 2.7c.1.4.3.8.6 1.1l1.9 1.9c.4.4.4 1.1 0 1.5l-1.9 1.9c-.3.3-.7.5-1.1.6l-2.7.4c-.5.1-1 .5-1.1 1l-.4 2.7c-.1.4-.3.8-.6 1.1l-1.9 1.9c-.4.4-1.1.4-1.5 0l-1.9-1.9c-.3-.3-.5-.7-.6-1.1l-.4-2.7c-.1-.5-.5-1-1-1.1l-2.7-.4c-.4-.1-.8-.3-1.1-.6l-1.9-1.9c-.4-.4-.4-1.1 0-1.5l1.9-1.9c.3-.3.7-.5 1.1-.6l2.7-.4c.5-.1 1-.5 1.1-1l.4-2.7c.1-.4.3-.8.6-1.1l1.9-1.9c.4-.4 1.1-.4 1.5 0l1.9 1.9z" />
          </svg>
          {t.analyzeIssue}
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t.fixCode}</label>
            <textarea
              className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm text-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder={t.placeholderCode}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t.analyzeIssue}</label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder={t.placeholderIssue}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>
          <button
            onClick={handleAnalysis}
            disabled={loading || !code || !issue}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
          >
            {loading ? t.loading : t.runAnalysis}
          </button>
        </div>

        {/* Output Side */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6 min-h-[400px]">
          {result ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">AI Diagnosis</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getRiskColor(result.riskLevel)}`}>
                  {result.riskLevel} Risk
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-indigo-400">Root Cause:</p>
                <p className="text-sm text-slate-300 leading-relaxed">{result.rootCause}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-indigo-400">Fixed Code:</p>
                <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800 text-emerald-400">
                  {result.fixedCode}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Impact</p>
                  <p className="text-sm text-slate-300">{result.impact}</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Risk Notes</p>
                  <p className="text-sm text-slate-300">{result.riskAssessment}</p>
                </div>
              </div>

              <button className="w-full py-3 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl text-sm font-semibold transition-all">
                Submit Pull Request
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.674a1 1 0 00.951-.682l1.397-4.192H5.315l1.397 4.192a1 1 0 00.951.682z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
              </svg>
              <p className="text-sm italic">AI Analysis results will appear here after execution</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
