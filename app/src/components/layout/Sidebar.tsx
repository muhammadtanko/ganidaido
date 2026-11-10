import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  ShieldCheck,
  MessageSquare,
  Handshake,
  Smartphone,
  Globe,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/projects', icon: FolderOpen, label: 'Project Register' },
  { to: '/updates', icon: ClipboardList, label: 'Monthly Updates' },
  { to: '/verification', icon: ShieldCheck, label: 'Field Verification' },
  { to: '/feedback', icon: MessageSquare, label: 'Community Feedback' },
  { to: '/commitments', icon: Handshake, label: 'Commitments' },
];

const demoItems = [
  { to: '/mobile', icon: Smartphone, label: 'Monthly Update App' },
  { to: '/public', icon: Globe, label: 'Public Dashboard' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-name">Gani da Ido</div>
        <div className="sidebar-brand-sub">e-CAPH · PAF-GSE Kaduna</div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Internal</div>
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}

        <div className="sidebar-section-label mt-16">Demo</div>
        {demoItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '12px 16px 20px', borderTop: '1px solid var(--border)' }}>
        <ThemeToggle />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Mock data mode ·{' '}
          <span style={{ color: 'var(--a-500)' }}>Set VITE_USE_MOCK=false</span> to use API
        </div>
      </div>
    </aside>
  );
}
