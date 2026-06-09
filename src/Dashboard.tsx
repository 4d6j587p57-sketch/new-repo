import { useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from './auth';
import {
  Eye, Mic, MessageSquare, User, Search,
  Bell, BarChart2, Shield, Radio, LogOut,
  ChevronRight, Clock, Activity,
} from 'lucide-react';

const NAV = [
  { icon: Activity,     label: 'overview'  },
  { icon: Eye,          label: 'tracking'  },
  { icon: Mic,          label: 'voice'     },
  { icon: MessageSquare,label: 'messages'  },
  { icon: User,         label: 'identities'},
  { icon: Search,       label: 'search'    },
  { icon: Radio,        label: 'watchers'  },
  { icon: BarChart2,    label: 'analytics' },
  { icon: Shield,       label: 'settings'  },
];

const RECENT = [
  { event: 'voice join',       user: 'kira',     detail: '#general-vc',                time: '2m ago' },
  { event: 'username change',  user: 'xeno_',    detail: 'xeno_ → phantom',            time: '11m ago' },
  { event: 'message logged',   user: 'dusk',     detail: '"you still up?"',            time: '18m ago' },
  { event: 'avatar updated',   user: 'kira',     detail: 'new avatar detected',        time: '34m ago' },
  { event: 'voice recording',  user: 'phantom',  detail: 'session ended · 00:12:04',   time: '1h ago' },
];

const dot: Record<string, string> = {
  'voice join':      'bg-emerald-500',
  'username change': 'bg-amber-500',
  'message logged':  'bg-zinc-500',
  'avatar updated':  'bg-blue-500',
  'voice recording': 'bg-red-500',
};

export default function Dashboard() {
  const { session } = useAuth();
  const [active, setActive] = useState('overview');

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 border-r border-white/[0.04] flex flex-col py-5">
        <div className="px-5 mb-8">
          <span className="text-white font-bold text-sm">trace</span>
        </div>

        <nav className="flex-1 px-2 space-y-0.5">
          {NAV.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs transition-colors text-left ${
                active === label
                  ? 'bg-white/[0.06] text-white'
                  : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.03]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-2 pt-4 border-t border-white/[0.04] mt-4">
          <div className="px-3 mb-2">
            <p className="text-[10px] text-zinc-700 truncate">{session?.user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs text-zinc-700 hover:text-zinc-300 hover:bg-white/[0.03] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white font-semibold text-lg capitalize">{active}</h1>
            <p className="text-[11px] text-zinc-600 mt-0.5">trace intelligence platform</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot inline-block" />
            <span className="text-[11px] text-zinc-600">live</span>
          </div>
        </div>

        {active === 'overview' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'targets tracked', value: '—',   sub: 'add a target to start' },
                { label: 'messages logged', value: '0',   sub: 'last 30 days' },
                { label: 'voice sessions',  value: '0',   sub: 'total recorded' },
                { label: 'active watchers', value: '0',   sub: 'auto-follow slots' },
              ].map(s => (
                <div key={s.label} className="bg-[#0f0f0f] border border-white/[0.04] rounded-sm p-4">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-white mb-0.5">{s.value}</p>
                  <p className="text-[10px] text-zinc-700">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-sm overflow-hidden mb-6">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-700" />
                  <span className="text-xs text-zinc-400 font-medium">recent activity</span>
                </div>
                <span className="text-[10px] text-zinc-700">demo data</span>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {RECENT.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot[r.event]}`} />
                    <span className="text-[11px] text-zinc-600 w-32 flex-shrink-0">{r.event}</span>
                    <span className="text-[11px] text-zinc-400 w-24 flex-shrink-0">{r.user}</span>
                    <span className="text-[11px] text-zinc-600 flex-1 truncate" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{r.detail}</span>
                    <span className="text-[10px] text-zinc-700 flex-shrink-0">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick start */}
            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-sm p-5">
              <p className="text-xs font-medium text-zinc-400 mb-4">quick start</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { icon: User,          label: 'add a target',      desc: 'start tracking a user' },
                  { icon: Mic,           label: 'monitor voice',      desc: 'join a voice channel' },
                  { icon: Search,        label: 'search messages',    desc: 'search logged messages' },
                ].map(({ icon: Icon, label, desc }) => (
                  <button
                    key={label}
                    className="flex items-center justify-between p-3 border border-white/[0.04] rounded-sm hover:bg-white/[0.03] hover:border-white/[0.08] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                      <div>
                        <p className="text-[11px] text-zinc-300">{label}</p>
                        <p className="text-[10px] text-zinc-700">{desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {active !== 'overview' && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-zinc-600 text-sm mb-1 capitalize">{active}</p>
            <p className="text-[11px] text-zinc-700">coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
