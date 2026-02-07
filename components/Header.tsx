
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">AutoFix<span className="text-indigo-400">Coding</span></h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <button onClick={() => setLang('en')} className={`text-sm font-medium ${lang === 'en' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>EN</button>
        <button onClick={() => setLang('id')} className={`text-sm font-medium ${lang === 'id' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>ID</button>
      </nav>
    </header>
  );
};
