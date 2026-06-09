import { useState, useEffect } from 'react';
import {
  Mic, MessageSquare, User, Code2, Search,
  Shield, ArrowRight, Check, Radio, Eye,
  Bell, BarChart2, Zap, ExternalLink,
} from 'lucide-react';

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const target = words[idx % words.length];
    const ms = del ? 32 : 75;
    const t = setTimeout(() => {
      if (!del) {
        setTxt(target.slice(0, txt.length + 1));
        if (txt.length + 1 === target.length) setTimeout(() => setDel(true), 2000);
      } else {
        setTxt(target.slice(0, txt.length - 1));
        if (txt.length - 1 === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, ms);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);

  return (
    <span className="text-white">
      {txt}<span className="caret text-zinc-500">|</span>
    </span>
  );
}

// ─── Live feed ────────────────────────────────────────────────────────────────
const FEED = [
  { t: 'join',   node: <><span className="text-zinc-300">kira</span><span className="text-zinc-600"> joined voice · #general</span></> },
  { t: 'msg',    node: <><span className="text-zinc-300">kira</span><span className="text-zinc-600">: "hey did u see what he posted"</span></> },
  { t: 'change', node: <><span className="text-zinc-600 line-through">user9182</span><span className="text-zinc-600"> → </span><span className="text-zinc-300">kira</span><span className="text-zinc-600"> · username changed</span></> },
  { t: 'rec',    node: <><span className="text-zinc-300">session_041</span><span className="text-zinc-600"> recording · 00:04:21</span></> },
];

const dotColor: Record<string, string> = {
  join:   'bg-emerald-500',
  msg:    'bg-zinc-500',
  change: 'bg-amber-500',
  rec:    'bg-red-500',
};

function Feed() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= FEED.length) return;
    const t = setTimeout(() => setN(v => v + 1), 700 + n * 450);
    return () => clearTimeout(t);
  }, [n]);

  return (
    <div className="border border-white/[0.06] bg-[#0f0f0f] rounded-sm w-full max-w-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
        <span className="text-[10px] text-zinc-700" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
          live feed
        </span>
        <div className="flex items-center gap-1.5">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-zinc-600">active</span>
        </div>
      </div>
      <div className="p-3 space-y-2.5 min-h-[110px]">
        {FEED.slice(0, n).map((line, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 fade-up text-[11px] text-zinc-500"
            style={{ fontFamily: "'JetBrains Mono',monospace" }}
          >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor[line.t]}`} />
            {line.node}
          </div>
        ))}
        {n < FEED.length && (
          <div className="text-[11px] text-zinc-800" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            <span className="caret">|</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ onLogin }: { onLogin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0c0c0c]/90 backdrop-blur-sm border-b border-white/[0.04]' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-white font-bold text-base tracking-tight">trace</span>

        <nav className="hidden md:flex items-center gap-8 text-xs text-zinc-600">
          {[['features', '#features'], ['pricing', '#pricing']].map(([l, h]) => (
            <a key={l} href={h} className="hover:text-zinc-300 transition-colors">{l}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onLogin}
            className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors px-3 py-1.5"
          >
            login
          </button>
          <button
            onClick={onLogin}
            className="text-xs bg-white text-black font-semibold px-3.5 py-1.5 rounded-sm hover:bg-zinc-200 transition-colors"
          >
            get started
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-14">
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-16">
        <div className="flex-1">
          <p className="fade-up d1 text-[11px] text-zinc-600 mb-5 tracking-widest uppercase">
            intelligence platform
          </p>
          <h1 className="fade-up d2 text-5xl md:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
            track anyone.<br />
            catch{' '}
            <Typewriter words={['everything.', 'every voice.', 'every message.', 'every move.']} />
          </h1>
          <p className="fade-up d3 text-sm text-zinc-500 leading-relaxed max-w-sm mb-8">
            real-time voice monitoring, message logging, identity tracking,
            and social lookups — all from one dashboard.
          </p>
          <div className="fade-up d4 flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-sm hover:bg-zinc-200 transition-colors"
            >
              get started <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a href="#features" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">
              see features →
            </a>
          </div>

          <div className="fade-up d5 flex gap-8 mt-12 pt-8 border-t border-white/[0.04]">
            {[['2.4B+', 'messages logged'], ['890K+', 'users tracked'], ['14M+', 'voice sessions']].map(([v, l]) => (
              <div key={l}>
                <div className="text-white font-bold text-lg">{v}</div>
                <div className="text-[11px] text-zinc-600 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up d6 flex-shrink-0 w-full lg:w-auto">
          <Feed />
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Mic,
    title: 'voice monitoring',
    desc: 'listen live and record sessions in real-time. full playback and export from the dashboard.',
    points: ['live audio stream', 'session recording', 'playback & export', 'silent — undetectable'],
  },
  {
    icon: User,
    title: 'identity tracking',
    desc: 'every username, nickname, and avatar change logged permanently across all servers.',
    points: ['username timeline', 'avatar history', 'per-server nicknames', 'cross-server linking'],
  },
  {
    icon: MessageSquare,
    title: 'message logging',
    desc: 'every message captured, indexed, and searchable. recover deleted messages. track edits.',
    points: ['full-text search', 'deleted message recovery', 'edit history', 'cross-server filter'],
  },
  {
    icon: Search,
    title: 'social lookups',
    desc: 'pull linked social profiles from a user. instagram, tiktok, x — no extra steps.',
    points: ['instagram lookup', 'tiktok lookup', 'x / twitter lookup', 'linked account graph'],
  },
  {
    icon: Radio,
    title: 'voice fingerprinting',
    desc: 'detect alternate accounts by matching voice patterns. stop alts from hiding.',
    points: ['alt account detection', 'voice pattern analysis', 'cross-account linking', 'watcher alerts'],
  },
  {
    icon: Code2,
    title: 'rest api',
    desc: 'full api with per-request credits. build anything on top of trace data.',
    points: ['user lookup endpoints', 'message search api', 'voice session queries', 'webhook events'],
  },
];

function Features() {
  return (
    <section id="features" className="py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-[11px] text-zinc-600 tracking-widest uppercase mb-3">capabilities</p>
          <h2 className="text-3xl font-bold text-white tracking-tight">everything you need.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-[#0c0c0c] p-6 hover:bg-[#0f0f0f] transition-colors group">
              <f.icon className="w-4 h-4 text-zinc-600 mb-4 group-hover:text-zinc-400 transition-colors" />
              <h3 className="text-white text-sm font-semibold mb-2">{f.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">{f.desc}</p>
              <ul className="space-y-1">
                {f.points.map(p => (
                  <li key={p} className="text-[11px] text-zinc-700 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'free',
    price: '$0', per: '',
    desc: 'get started.',
    highlight: false,
    features: ['user tracking', 'message logging', 'basic search', 'username history'],
    cta: 'get started',
  },
  {
    name: 'tracker',
    price: '$3', per: '/mo',
    desc: 'full dashboard access.',
    highlight: false,
    features: ['everything in free', 'voice session tracking', 'avatar history', 'advanced search & analytics'],
    cta: 'get started',
  },
  {
    name: 'pro',
    price: '$6', per: '/mo',
    desc: 'everything, unlocked.',
    highlight: true,
    features: ['everything in tracker', 'live voice listening', 'voice recording & playback', 'watchers — auto-follow', 'voice fingerprint detection', 'rest api access', 'multi-target monitoring'],
    cta: 'get started',
  },
];

function Pricing({ onStart }: { onStart: () => void }) {
  return (
    <section id="pricing" className="py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <p className="text-[11px] text-zinc-600 tracking-widest uppercase mb-3">pricing</p>
          <h2 className="text-3xl font-bold text-white tracking-tight">simple plans.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-4">
          {PLANS.map(p => (
            <div
              key={p.name}
              className={`rounded-sm p-5 flex flex-col border ${
                p.highlight ? 'bg-white text-black border-white' : 'bg-[#0f0f0f] border-white/[0.06]'
              }`}
            >
              <div className="mb-4">
                <div className={`text-xs font-semibold mb-3 ${p.highlight ? 'text-black' : 'text-zinc-400'}`}>{p.name}</div>
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className={`text-3xl font-bold ${p.highlight ? 'text-black' : 'text-white'}`}>{p.price}</span>
                  {p.per && <span className={`text-xs ${p.highlight ? 'text-zinc-500' : 'text-zinc-600'}`}>{p.per}</span>}
                </div>
                <p className={`text-[11px] ${p.highlight ? 'text-zinc-600' : 'text-zinc-600'}`}>{p.desc}</p>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map(f => (
                  <li key={f} className={`flex items-start gap-2 text-[11px] ${p.highlight ? 'text-zinc-700' : 'text-zinc-600'}`}>
                    <Check className={`w-3 h-3 mt-0.5 flex-shrink-0 ${p.highlight ? 'text-black' : 'text-zinc-600'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onStart}
                className={`text-center text-xs font-semibold py-2 rounded-sm transition-colors ${
                  p.highlight
                    ? 'bg-black text-white hover:bg-zinc-900'
                    : 'bg-white/[0.06] text-zinc-300 hover:bg-white/10'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            { name: 'watcher slot', price: '$2.50', unit: '/slot', desc: 'auto-follow a target into voice. automatic recording + alerts.', note: 'requires pro' },
            { name: 'blacklist key', price: '$15', unit: '/key', desc: 'permanently hide a profile from the platform. up to 50 in bulk.', note: 'one-time purchase' },
          ].map(item => (
            <div key={item.name} className="bg-[#0f0f0f] border border-white/[0.04] rounded-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-300 mb-0.5">{item.name}</p>
                <p className="text-[11px] text-zinc-600 mb-1">{item.desc}</p>
                <p className="text-[10px] text-zinc-700">{item.note}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white font-bold">{item.price}<span className="text-zinc-600 text-xs font-normal">{item.unit}</span></p>
                <button onClick={onStart} className="text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors mt-1 block">purchase →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust ────────────────────────────────────────────────────────────────────
function Trust() {
  return (
    <section className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04]">
          {[
            { icon: Shield, title: 'no ip logging',  desc: 'we never collect or store ip addresses.' },
            { icon: Eye,    title: 'no analytics',   desc: 'no tracking cookies. no fingerprinting. no third parties.' },
            { icon: Zap,    title: 'always online',  desc: 'redundant infrastructure. 99.9% uptime.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#0c0c0c] px-6 py-7">
              <Icon className="w-4 h-4 text-zinc-700 mb-3" />
              <p className="text-sm font-medium text-zinc-300 mb-1">{title}</p>
              <p className="text-[11px] text-zinc-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-3">start now.</h2>
        <p className="text-sm text-zinc-600 mb-8">free to start. no credit card. cancel anytime.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-sm hover:bg-zinc-200 transition-colors"
          >
            create account <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="https://t.me/traceintel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            contact us <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onLogin }: { onLogin: () => void }) {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-white font-bold text-sm">trace</span>
          <span className="text-zinc-700 text-xs ml-3">intelligence platform</span>
        </div>
        <p className="text-[11px] text-zinc-700">© {new Date().getFullYear()} trace. all rights reserved.</p>
        <div className="flex items-center gap-5 text-[11px] text-zinc-700">
          {['terms', 'privacy', 'docs'].map(l => (
            <a key={l} href="#" className="hover:text-zinc-400 transition-colors">{l}</a>
          ))}
          <button onClick={onLogin} className="hover:text-zinc-400 transition-colors">login</button>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing ──────────────────────────────────────────────────────────────────
export default function Landing({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Nav onLogin={onLogin} />
      <main>
        <Hero onStart={onLogin} />
        <Features />
        <Pricing onStart={onLogin} />
        <Trust />
        <CTA onStart={onLogin} />
      </main>
      <Footer onLogin={onLogin} />
    </div>
  );
}
