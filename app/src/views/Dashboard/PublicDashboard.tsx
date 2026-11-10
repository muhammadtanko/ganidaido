import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Shield, Eye } from 'lucide-react';
import { getDashboardStats, getProjects } from '../../services';
import type { DashboardStats, Project } from '../../types';
import { Currency, fmt } from '../../components/ui/Currency';
import { ProjectStatusBadge, VerificationBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { mockVerifications } from '../../data/mock';

export function PublicDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sectorFilter, setSectorFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [lgaFilter, setLgaFilter] = useState('');

  useEffect(() => {
    getDashboardStats().then(setStats);
    getProjects().then((all) => setProjects(all.filter((p) => p.publicationStatus === 'Published')));
  }, []);

  if (!stats) return null;

  const lgas = [...new Set(projects.map((p) => p.lga))].sort();

  const filtered = projects.filter((p) => {
    if (sectorFilter && p.sector !== sectorFilter) return false;
    if (typeFilter && p.projectType !== typeFilter) return false;
    if (lgaFilter && p.lga !== lgaFilter) return false;
    return true;
  });

  const latestVerification = (projectId: string) =>
    mockVerifications
      .filter((v) => v.projectId === projectId)
      .sort((a, b) => b.verificationDate.localeCompare(a.verificationDate))[0];

  const utilisation = stats.totalEstimatedCost > 0
    ? Math.round((stats.totalReleased / stats.totalEstimatedCost) * 100)
    : 0;

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Public header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 16,
        padding: '20px 24px', borderRadius: 'var(--r-md)',
        background: 'var(--a-50)', border: '1px solid var(--a-100)',
        marginBottom: 32
      }}>
        <Globe size={24} style={{ color: 'var(--a-500)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Public Accountability Dashboard</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            This dashboard shows only <strong>published and approved</strong> project data for public oversight.
            Sensitive personal data, safeguarding cases, and draft records are not shown.
            Figures are as reported and verified by e-CAPH field staff.
          </div>
        </div>
      </div>

      <div className="page-header">
        <h1 className="page-title">Kaduna Public Project Tracker</h1>
        <p className="page-subtitle">Government & donor-funded projects · PAF-GSE Kaduna Project · Powered by e-CAPH</p>
      </div>

      {/* Key numbers */}
      <div className="stat-grid">
        <div className="stat-tile" style={{ borderTop: '3px solid var(--a-500)' }}>
          <div className="stat-tile-label">Projects Tracked</div>
          <div className="stat-tile-value">{stats.totalProjects}</div>
          <div className="stat-tile-sub">Published & approved</div>
        </div>
        <div className="stat-tile" style={{ borderTop: '3px solid #6366f1' }}>
          <div className="stat-tile-label">Total Budget</div>
          <div className="stat-tile-value">{fmt(stats.totalEstimatedCost, true)}</div>
          <div className="stat-tile-sub">Combined estimated cost</div>
        </div>
        <div className="stat-tile" style={{ borderTop: '3px solid var(--green-500)' }}>
          <div className="stat-tile-label">Released to Contractors</div>
          <div className="stat-tile-value">{fmt(stats.totalReleased, true)}</div>
          <div className="stat-tile-sub">{utilisation}% of total budget</div>
        </div>
        <div className="stat-tile" style={{ borderTop: '3px solid var(--amber-500)' }}>
          <div className="stat-tile-label">Spent / Disbursed</div>
          <div className="stat-tile-value">{fmt(stats.totalSpent, true)}</div>
          <div className="stat-tile-sub">Reported spend to date</div>
        </div>
      </div>

      {/* Verification trust notice */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'flex-start',
        padding: '12px 16px', borderRadius: 'var(--r-sm)',
        background: 'var(--n-100)', fontSize: 13, marginBottom: 24
      }}>
        <Shield size={16} style={{ color: 'var(--a-500)', flexShrink: 0, marginTop: 1 }} />
        <span>
          Progress figures marked <strong>Verified</strong> have been confirmed by an independent e-CAPH field verifier against physical evidence.
          Figures without a verification badge are <em>self-reported</em> by the responsible officer.
        </span>
        <Eye size={16} style={{ color: 'var(--a-500)', flexShrink: 0, marginTop: 1 }} />
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <select className="filter-select" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
          <option value="">All Sectors</option>
          {['Education', 'Health', 'Environment', 'Social Protection'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          {['Capital Project', 'Donor-Funded Project', 'Community-Supported Project'].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="filter-select" value={lgaFilter} onChange={(e) => setLgaFilter(e.target.value)}>
          <option value="">All LGAs</option>
          {lgas.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        {(sectorFilter || typeFilter || lgaFilter) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setSectorFilter(''); setTypeFilter(''); setLgaFilter(''); }}>Clear</button>
        )}
      </div>

      {/* Project cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map((p) => {
          const ver = latestVerification(p.id);
          const utilPct = p.estimatedCost > 0 ? Math.round((p.amountReleased / p.estimatedCost) * 100) : 0;
          return (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                  <span className="td-mono" style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{p.id}</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <ProjectStatusBadge status={p.currentStatus} />
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.sector} · {p.lga} · {p.projectType}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Budget</div>
                  <Currency amount={p.estimatedCost} compact />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Released ({utilPct}%)</div>
                  <Currency amount={p.amountReleased} compact />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Delivery progress</span>
                  <span style={{ fontWeight: 500 }}>{p.progressPercent}%</span>
                </div>
                <ProgressBar value={p.progressPercent} showLabel={false} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {ver
                  ? <VerificationBadge result={ver.result} />
                  : <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>No verification yet</span>}
                <Link to={`/projects/${p.id}`} style={{ fontSize: 13, color: 'var(--a-500)', fontWeight: 500 }}>View details →</Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-title">No projects match these filters</div>
          <div className="empty-state-desc">Try adjusting the sector, type, or LGA filter.</div>
        </div>
      )}
    </div>
  );
}
