import { AuthProvider, useAuth } from './auth';
import Landing from './Landing';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';
import { useState } from 'react';

function Router() {
  const { session, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <span className="text-zinc-700 text-xs" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
          loading<span className="caret">|</span>
        </span>
      </div>
    );
  }

  if (session) return <Dashboard />;
  if (showAuth) return <AuthPage />;
  return <Landing onLogin={() => setShowAuth(true)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
