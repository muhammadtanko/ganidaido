import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, ClipboardList, ShieldCheck, MessageSquare, Handshake, Smartphone, Globe } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { ThemeProvider, ThemeToggle } from './components/ui/ThemeToggle';
import { Dashboard } from './views/Dashboard';
import { PublicDashboard } from './views/Dashboard/PublicDashboard';
import { Projects } from './views/Projects';
import { ProjectDetail } from './views/Projects/ProjectDetail';
import { Updates } from './views/Updates';
import { VerificationList } from './views/Verification';
import { FeedbackList } from './views/Feedback';
import { CommitmentsList } from './views/Commitments';
import { MobileAppDemo } from './views/MobileApp';

const mobileNavItems = [
  { to: '/', icon: LayoutDashboard, end: true },
  { to: '/projects', icon: FolderOpen },
  { to: '/updates', icon: ClipboardList },
  { to: '/verification', icon: ShieldCheck },
  { to: '/feedback', icon: MessageSquare },
  { to: '/commitments', icon: Handshake },
  { to: '/mobile', icon: Smartphone },
  { to: '/public', icon: Globe },
];

function MobileNav() {
  return (
    <div style={{
      display: 'none',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border)',
      zIndex: 50,
    }}
    className="mobile-bottomnav">
      <div style={{ display: 'flex', overflowX: 'auto', padding: '8px 4px 12px' }}>
        {mobileNavItems.map(({ to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '4px 10px',
              color: isActive ? 'var(--a-500)' : 'var(--text-secondary)',
              textDecoration: 'none',
              flexShrink: 0,
            })}
          >
            <Icon size={22} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">
            {/* Mobile topbar with theme toggle */}
            <div className="topbar">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, flex: 1 }}>
                Gani da Ido
              </div>
              <ThemeToggle compact />
            </div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/verification" element={<VerificationList />} />
              <Route path="/feedback" element={<FeedbackList />} />
              <Route path="/commitments" element={<CommitmentsList />} />
              <Route path="/mobile" element={<MobileAppDemo />} />
              <Route path="/public" element={<PublicDashboard />} />
            </Routes>
          </main>
          <MobileNav />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
