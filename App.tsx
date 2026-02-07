
import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { AnalysisTool } from './components/AnalysisTool';
import { translations } from './translations';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500/30">
      <Header lang={lang} setLang={setLang} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
            Beta v0.1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {t.tagline}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </section>

        {/* Dashboard Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
            {t.dashboard}
          </h2>
          <DashboardStats t={t} />
        </section>

        {/* Core AI Logic Simulation */}
        <section id="analyze" className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
            {t.fixCode}
          </h2>
          <AnalysisTool t={t} />
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-700 hover:border-indigo-500/50 transition-all group">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{lang === 'id' ? 'Pemantauan Berkelanjutan' : 'Continuous Monitoring'}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {lang === 'id' 
                ? 'AI memantau repositori Anda 24/7 untuk mendeteksi kegagalan CI/CD atau issue baru secara real-time.' 
                : 'AI watches your repo 24/7 to detect CI/CD failures or new issues in real-time.'}
            </p>
          </div>

          <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{lang === 'id' ? 'Kode Mandiri (Self-Healing)' : 'Self-Healing Code'}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {lang === 'id' 
                ? 'Secara otomatis menghasilkan patch untuk bug yang terdeteksi tanpa perlu campur tangan manusia.' 
                : 'Automatically generates patches for detected bugs without requiring manual intervention.'}
            </p>
          </div>

          <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{lang === 'id' ? 'Integrasi Pull Request' : 'Pull Request Integration'}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {lang === 'id' 
                ? 'Mengajukan PR dengan deskripsi teknis lengkap dan analisis risiko untuk ditinjau oleh maintainer.' 
                : 'Submits PRs with complete technical descriptions and risk analysis for maintainer review.'}
            </p>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-gradient-to-br from-indigo-900/20 to-slate-800/50 rounded-3xl p-12 border border-indigo-500/10 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">{t.problemStatement}</h2>
            <div className="space-y-4 text-slate-300">
              <p className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                {lang === 'id' ? 'Banyak repository open-source mati karena maintainer tidak aktif.' : 'Many open-source repositories die because maintainers are inactive.'}
              </p>
              <p className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                {lang === 'id' ? 'Bug kritis menumpuk dan technical debt terus meningkat.' : 'Critical bugs pile up and technical debt keeps increasing.'}
              </p>
              <p className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                {lang === 'id' ? 'User kehilangan kepercayaan pada proyek yang tidak terawat.' : 'Users lose trust in unmaintained projects.'}
              </p>
            </div>
            
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">{t.solution}</h2>
              <p className="text-slate-400 mb-8">
                {lang === 'id' 
                  ? 'AutoFix Coding bertindak sebagai perawat kode otomatis yang mendukung dan mempercepat kerja Maintainer, bukan menggantikan mereka.' 
                  : 'AutoFix Coding acts as an automated code nurse that supports and accelerates Maintainer work, not replaces them.'}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <footer className="text-center py-12 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            © 2024 AutoFix Coding. Built with Gemini AI for a better Open Source ecosystem.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
