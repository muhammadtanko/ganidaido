import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, getProjects } from '../../services';
import type { DashboardStats, Project } from '../../types';
import { Currency, fmt } from '../../components/ui/Currency';
import { ProjectStatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="stat-tile">
      <div className="stat-tile-label">{label}</div>
      <div className="stat-tile-value">{value}</div>
      {sub && <div className="stat-tile-sub">{sub}</div>}
    </div>
  );
}

function BreakdownBar({ data }: { data: { label: string; count: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  return (
    <div>
      <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 }}>
        {data.map((d) => (
          <div
            key={d.label}
            style={{ flex: d.count / total, background: d.color, minWidth: d.count ? 4 : 0 }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-12 mt-8">
        {data.map((d) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            {d.label} ({d.count})
          </div>
        ))}
      </div>
    </div>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getProjects().then((p) => setProjects(p.filter((x) => x.publicationStatus === 'Published')));
  }, []);

  if (!stats) return <div className="text-secondary">Loading…</div>;

  const utilisation = stats.totalEstimatedCost > 0
    ? Math.round((stats.totalReleased / stats.totalEstimatedCost) * 100)
    : 0;

  const statusColors: Record<string, string> = {
    'Completed': 'var(--green-500)',
    'Ongoing': 'var(--a-500)',
    'Delayed': 'var(--amber-500)',
    'Not Started': 'var(--n-400)',
    'Abandoned': 'var(--red-500)',
    'Stalled': 'var(--red-500)',
  };

  const sectorColors: Record<string, string> = {
    'Education': '#6366f1',
    'Health': '#06b6d4',
    'Environment': '#10b981',
    'Social Protection': '#f59e0b',
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-8" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Portfolio overview · PAF-GSE Kaduna Project</p>
          </div>
          <span className="badge badge-green">● Live data</span>
        </div>
      </div>

      {/* Key metrics */}
      <div className="stat-grid">
        <StatTile
          label="Total Projects"
          value={String(stats.totalProjects)}
          sub={`${stats.verifiedProjects} verified`}
        />
        <StatTile
          label="Total Budget"
          value={fmt(stats.totalEstimatedCost, true)}
          sub="Estimated cost"
        />
        <StatTile
          label="Amount Released"
          value={fmt(stats.totalReleased, true)}
          sub={`${utilisation}% of budget`}
        />
        <StatTile
          label="Amount Spent"
          value={fmt(stats.totalSpent, true)}
          sub={`${stats.totalReleased > 0 ? Math.round((stats.totalSpent / stats.totalReleased) * 100) : 0}% of released`}
        />
        <StatTile
          label="Avg Progress"
          value={`${stats.avgProgressPercent}%`}
          sub="Across all projects"
        />
        <StatTile
          label="Open Issues"
          value={String(stats.openFeedbackCount)}
          sub="Community feedback"
        />
      </div>

      {/* Breakdowns row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div className="card">
          <div className="card-title">By Status</div>
          <BreakdownBar
            data={Object.entries(stats.projectsByStatus).map(([label, count]) => ({
              label,
              count,
              color: statusColors[label] ?? 'var(--n-400)',
            }))}
          />
        </div>

        <div className="card">
          <div className="card-title">By Sector</div>
          <BreakdownBar
            data={Object.entries(stats.projectsBySector).map(([label, count]) => ({
              label,
              count,
              color: sectorColors[label] ?? 'var(--n-400)',
            }))}
          />
        </div>

        <div className="card">
          <div className="card-title">By Type</div>
          <BreakdownBar
            data={Object.entries(stats.projectsByType).map(([label, count]) => ({
              label,
              count,
              color: label === 'Capital Project' ? 'var(--a-500)' : label === 'Donor-Funded Project' ? '#6366f1' : '#10b981',
            }))}
          />
        </div>
      </div>

      {/* Projects table */}
      <div className="section-header">
        <div className="section-title">Recent Projects</div>
        <Link to="/projects" className="btn btn-secondary btn-sm">View all →</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Sector</th>
              <th>LGA</th>
              <th>Budget</th>
              <th>Released</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 6).map((p) => (
              <tr key={p.id}>
                <td><Link to={`/projects/${p.id}`} className="td-mono">{p.id}</Link></td>
                <td>
                  <div style={{ fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.projectType}</div>
                </td>
                <td>{p.sector}</td>
                <td>{p.lga}</td>
                <td><Currency amount={p.estimatedCost} compact /></td>
                <td><Currency amount={p.amountReleased} compact /></td>
                <td style={{ minWidth: 120 }}><ProgressBar value={p.progressPercent} /></td>
                <td><ProjectStatusBadge status={p.currentStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
