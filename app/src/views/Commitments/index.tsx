import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, AlertCircle } from 'lucide-react';
import { getCommitments, getProjects } from '../../services';
import type { Commitment, Project, CommitmentStatus } from '../../types';
import { CommitmentStatusBadge } from '../../components/ui/StatusBadge';

export function CommitmentsList() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    getCommitments().then(setCommitments);
    getProjects().then(setProjects);
  }, []);

  const filtered = commitments.filter((c) => {
    if (statusFilter && c.status !== statusFilter) return false;
    return true;
  }).sort((a, b) => b.dateMade.localeCompare(a.dateMade));

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

  const overdueCount = commitments.filter((c) => c.status === 'Overdue').length;

  const isOverdue = (c: Commitment) =>
    c.status !== 'Completed' && c.status !== 'Cancelled' && c.dueDate < new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Commitment Tracker</h1>
            <p className="page-subtitle">{filtered.length} commitments · {overdueCount} overdue</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} /> Record Commitment
          </button>
        </div>
      </div>

      {overdueCount > 0 && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '12px 16px', borderRadius: 'var(--r-md)',
          background: 'var(--amber-100)', border: '1px solid var(--amber-500)',
          marginBottom: 24, fontSize: 13
        }}>
          <AlertCircle size={16} style={{ color: 'var(--amber-500)', flexShrink: 0, marginTop: 1 }} />
          <div>
            <strong style={{ color: 'var(--amber-500)' }}>{overdueCount} overdue commitment{overdueCount > 1 ? 's' : ''}.</strong>
            {' '}Follow up required. A commitment cannot be marked Completed without closure evidence.
          </div>
        </div>
      )}

      <div className="filter-bar">
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {(['Pending', 'In Progress', 'Completed', 'Overdue', 'Cancelled'] as CommitmentStatus[]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {statusFilter && (
          <button className="btn btn-ghost btn-sm" onClick={() => setStatusFilter('')}>Clear</button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date Made</th>
              <th>Project</th>
              <th>Institution</th>
              <th>Commitment</th>
              <th>Responsible</th>
              <th>Due Date</th>
              <th>Next Follow-up</th>
              <th>Status</th>
              <th>Closure Evidence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 32, color: 'var(--text-secondary)' }}>
                  No records match the current filters.
                </td>
              </tr>
            ) : filtered.map((c) => (
              <tr key={c.id} style={isOverdue(c) && c.status !== 'Overdue' ? { background: 'rgba(217,45,45,0.04)' } : undefined}>
                <td className="td-mono">
                  {new Date(c.dateMade).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td>
                  <Link to={`/projects/${c.projectId}`} style={{ fontWeight: 500 }}>{c.projectId}</Link>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{projectName(c.projectId)}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{c.institution}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.stakeholder}</div>
                </td>
                <td style={{ maxWidth: 260, fontSize: 13 }}>{c.commitmentMade}</td>
                <td>{c.responsiblePerson}</td>
                <td className="td-mono" style={{ color: isOverdue(c) ? 'var(--red-500)' : undefined }}>{c.dueDate}</td>
                <td className="td-mono">{c.nextFollowUp || '—'}</td>
                <td><CommitmentStatusBadge status={c.status} /></td>
                <td>
                  {c.closureEvidence
                    ? <span className="badge badge-green">✓ Evidence</span>
                    : c.status === 'Completed'
                    ? <span className="badge badge-red">! Missing</span>
                    : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
