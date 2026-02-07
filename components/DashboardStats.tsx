
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TranslationSchema } from '../types';

const data = [
  { name: 'Healthy', value: 85, color: '#10b981' },
  { name: 'Needs Attention', value: 15, color: '#f59e0b' },
];

const activityData = [
  { day: 'Mon', fixes: 12 },
  { day: 'Tue', fixes: 19 },
  { day: 'Wed', fixes: 15 },
  { day: 'Thu', fixes: 22 },
  { day: 'Fri', fixes: 30 },
  { day: 'Sat', fixes: 8 },
  { day: 'Sun', fixes: 5 },
];

export const DashboardStats: React.FC<{ t: TranslationSchema }> = ({ t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-slate-400 text-sm font-medium mb-4">{t.repoHealth}</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold text-emerald-400">85%</span>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Average Integrity Score</p>
        </div>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 md:col-span-2">
        <h3 className="text-slate-400 text-sm font-medium mb-4">{t.recentActivity} (Fixes / Week)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: '#334155' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="fixes" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <span className="block text-xl font-bold">112</span>
            <span className="text-xs text-slate-500">Fixed Issues</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">45</span>
            <span className="text-xs text-slate-500">Auto PRs</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">14h</span>
            <span className="text-xs text-slate-500">Dev Time Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
