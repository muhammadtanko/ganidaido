import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getUpdates, getProjects } from '../../services';
import type { MonthlyUpdate, Project } from '../../types';
import { ProjectStatusBadge } from '../../components/ui/StatusBadge';
import { Currency } from '../../components/ui/Currency';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function Updates() {
  const [updates, setUpdates] = useState<MonthlyUpdate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFilter, setProjectFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');

  useEffect(() => {
    getUpdates().then(setUpdates);
    getProjects().then(setProjects);
  }, []);

  const months = [...new Set(updates.map((u) => u.reportingMonth))].sort().reverse();

  const filtered = updates.filter((u) => {
    if (projectFilter && u.projectId !== projectFilter) return false;
    if (monthFilter && u.reportingMonth !== monthFilter) return false;
    return true;
  }).sort((a, b) => b.reportingMonth.localeCompare(a.reportingMonth));

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Monthly Updates</h1>
            <p className="page-subtitle">{filtered.length} records · {updates.length} total</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} /> Submit Update
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.id} – {p.name}</option>)}
        </select>
        <select className="filter-select" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {new Date(m + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>
        {(projectFilter || monthFilter) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setProjectFilter(''); setMonthFilter(''); }}>Clear</button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Project</th>
              <th>Officer</th>
              <th>Progress</th>
              <th>Spent to Date</th>
              <th>People Reached</th>
              <th>Status</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--text-secondary)' }}>
                  No records match the current filters.
                </td>
              </tr>
            ) : filtered.map((u) => (
              <tr key={u.id}>
                <td className="td-mono">
                  {new Date(u.reportingMonth + '-01').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                </td>
                <td>
                  <Link to={`/projects/${u.projectId}`} style={{ fontWeight: 500 }}>
                    {u.projectId}
                  </Link>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{projectName(u.projectId)}</div>
                </td>
                <td>{u.officer}</td>
                <td style={{ minWidth: 120 }}><ProgressBar value={u.progressPercent} /></td>
                <td><Currency amount={u.amountSpentToDate} compact /></td>
                <td className="td-mono">{u.peopleReached.toLocaleString()}</td>
                <td><ProjectStatusBadge status={u.currentStatus} /></td>
                <td>
                  {u.isVerified
                    ? <span className="badge badge-green">✓ Verified</span>
                    : <span className="badge badge-gray" style={{ fontSize: 11, fontStyle: 'italic' }}>Self-reported</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
