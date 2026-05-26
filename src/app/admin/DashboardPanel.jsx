"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, Globe, MapPin, Activity, CalendarDays, TrendingUp, Flag, Eye } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const PK_CITY_CONFIG = [
  { key: 'Lahore', color: '#00ffcc', bgColor: 'rgba(0,255,204,0.1)', borderColor: 'rgba(0,255,204,0.3)' },
  { key: 'Karachi', color: '#06b6d4', bgColor: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.3)' },
  { key: 'Islamabad', color: '#3b82f6', bgColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)' },
  { key: 'Other Pakistan', color: '#8b5cf6', bgColor: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)' },
];
const INTL_COLORS = ['#ec4899', '#f59e0b', '#10b981', '#f97316', '#a78bfa', '#fb7185', '#34d399'];

function categorizePkCity(city) {
  if (!city || city === 'Unknown') return 'Other Pakistan';
  const c = city.toLowerCase();
  if (c.includes('lahore')) return 'Lahore';
  if (c.includes('karachi')) return 'Karachi';
  if (c.includes('islamabad') || c.includes('rawalpindi')) return 'Islamabad';
  return 'Other Pakistan';
}

export default function DashboardPanel() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "visitors"), orderBy("visitedAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVisitors(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalVisits = visitors.length;
  const visitsPerDayMap = {};
  const visitsPerMonthMap = {};
  const pkCityMap = { 'Lahore': 0, 'Karachi': 0, 'Islamabad': 0, 'Other Pakistan': 0 };
  const intlCountryMap = {};

  visitors.forEach(v => {
    if (v.date) {
      try {
        const dateObj = parseISO(v.date);
        const dayStr = format(dateObj, 'MMM dd');
        const monthStr = format(dateObj, 'MMM yy');
        visitsPerDayMap[dayStr] = (visitsPerDayMap[dayStr] || 0) + 1;
        visitsPerMonthMap[monthStr] = (visitsPerMonthMap[monthStr] || 0) + 1;
      } catch (e) {}
    }
    const country = v.country || 'Unknown';
    const isPakistan = country === 'Pakistan' || country === 'PK';
    if (isPakistan) {
      const cityKey = categorizePkCity(v.city);
      pkCityMap[cityKey] = (pkCityMap[cityKey] || 0) + 1;
    } else if (country !== 'Unknown') {
      intlCountryMap[country] = (intlCountryMap[country] || 0) + 1;
    }
  });

  const visitsPerDayData = Object.keys(visitsPerDayMap).map(k => ({ name: k, visits: visitsPerDayMap[k] })).slice(-14);
  const visitsPerMonthData = Object.keys(visitsPerMonthMap).map(k => ({ name: k, visits: visitsPerMonthMap[k] })).slice(-12);

  const todayStr = format(new Date(), 'MMM dd');
  const thisMonthStr = format(new Date(), 'MMM yy');
  const todayVisits = visitsPerDayMap[todayStr] || 0;
  const thisMonthVisits = visitsPerMonthMap[thisMonthStr] || 0;
  const thisYearVisits = visitors.filter(v => v.date?.startsWith(new Date().getFullYear().toString())).length;
  const pkTotal = Object.values(pkCityMap).reduce((a, b) => a + b, 0);

  const intlData = Object.entries(intlCountryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  const maxIntl = intlData[0]?.count || 1;
  const maxPk = Math.max(...Object.values(pkCityMap), 1);

  const kpiCards = [
    { label: 'Total Views', value: totalVisits, icon: Eye, color: '#00ffcc', glow: 'shadow-[0_0_20px_rgba(0,255,204,0.15)]' },
    { label: "Today's Visits", value: todayVisits, icon: Activity, color: '#06b6d4', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]' },
    { label: 'This Month', value: thisMonthVisits, icon: CalendarDays, color: '#3b82f6', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
    { label: 'This Year', value: thisYearVisits, icon: TrendingUp, color: '#8b5cf6', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]' },
  ];

  return (
    <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
      <header>
        <h2 className="text-2xl font-display font-bold">Analytics Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">Real-time portfolio visits & geographic insights.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, color, glow }) => (
          <div key={label} className={`bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-all ${glow}`}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}20` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-black text-white">{value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <h3 className="font-bold mb-1 text-sm text-gray-300">Daily Visits</h3>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-5">Last 14 Days</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitsPerDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff30" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff30" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#00ffcc20', borderRadius: '12px', fontSize: '12px' }} itemStyle={{ color: '#00ffcc' }} />
                <Line type="monotone" dataKey="visits" stroke="#00ffcc" strokeWidth={2.5} dot={{ fill: '#000', stroke: '#00ffcc', strokeWidth: 2, r: 3 }} activeDot={{ r: 5, fill: '#00ffcc' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <h3 className="font-bold mb-1 text-sm text-gray-300">Monthly Visits</h3>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-5">Last 12 Months</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitsPerMonthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff30" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff30" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#06b6d420', borderRadius: '12px', fontSize: '12px' }} itemStyle={{ color: '#06b6d4' }} cursor={{ fill: '#ffffff05' }} />
                <Bar dataKey="visits" fill="#06b6d4" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pakistan Cities */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#00ff8820] flex items-center justify-center">
              <span className="text-lg">🇵🇰</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-200">Pakistan Visitors</h3>
              <p className="text-[10px] text-gray-500">{pkTotal.toLocaleString()} total from Pakistan</p>
            </div>
          </div>
          <div className="space-y-4">
            {PK_CITY_CONFIG.map(({ key, color, bgColor, borderColor }) => {
              const count = pkCityMap[key];
              const pct = pkTotal > 0 ? Math.round((count / pkTotal) * 100) : 0;
              const barWidth = maxPk > 0 ? (count / maxPk) * 100 : 0;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} style={{ color }} />
                      <span className="text-sm font-semibold text-gray-300">{key}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-500">{pct}%</span>
                      <span className="text-sm font-black text-white">{count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${barWidth}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* International */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#ec489920] flex items-center justify-center">
              <Globe size={18} className="text-[#ec4899]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-200">International Visitors</h3>
              <p className="text-[10px] text-gray-500">{intlData.length} countries reached</p>
            </div>
          </div>
          {intlData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Globe size={32} className="text-white/10 mb-3" />
              <p className="text-gray-600 text-xs">No international visitors yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
              {intlData.map(({ name, count }, idx) => {
                const barWidth = (count / maxIntl) * 100;
                const color = INTL_COLORS[idx % INTL_COLORS.length];
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-300 truncate max-w-[60%]">{name}</span>
                      <span className="text-sm font-black text-white">{count.toLocaleString()} <span className="text-[10px] font-normal text-gray-500">views</span></span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${barWidth}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
