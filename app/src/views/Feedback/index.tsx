import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, AlertTriangle } from 'lucide-react';
import { getFeedback, getProjects } from '../../services';
import type { Feedback, Project, FeedbackCategory, CaseStatus } from '../../types';
import { PriorityBadge, CaseStatusBadge } from '../../components/ui/StatusBadge';

export function FeedbackList() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    getFeedback().then(setFeedback);
    getProjects().then(setProjects);
  }, []);

  const filtered = feedback.filter((f) => {
    if (categoryFilter && f.category !== categoryFilter) return false;
    if (statusFilter && f.caseStatus !== statusFilter) return false;
    if (priorityFilter && f.priority !== priorityFilter) return false;
    return true;
  }).sort((a, b) => b.dateReceived.localeCompare(a.dateReceived));

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

  const categoryColors: Record<FeedbackCategory, string> = {
    'Complaint': 'badge-red',
    'Information Request': 'badge-blue',
    'Suggestion': 'badge-blue',
    'Safeguarding Concern': 'badge-red',
    'Service Gap': 'badge-amber',
    'Positive Feedback': 'badge-green',
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Community Feedback</h1>
            <p className="page-subtitle">{filtered.length} records · Safeguarding cases handled separately</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} /> Log Feedback
          </button>
        </div>
      </div>

      {/* Safeguarding notice */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '12px 16px', borderRadius: 'var(--r-md)',
        background: 'var(--red-100)', border: '1px solid var(--red-500)',
        marginBottom: 24, fontSize: 13
      }}>
        <AlertTriangle size={16} style={{ color: 'var(--red-500)', flexShrink: 0, marginTop: 1 }} />
        <div>
          <strong style={{ color: 'var(--red-500)' }}>Safeguarding cases are excluded from this view.</strong>
          {' '}They are routed to a restricted workflow and are never visible here, regardless of consent settings.
          Authorised users access them through a separate protected pathway.
        </div>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {(['Information Request', 'Complaint', 'Suggestion', 'Service Gap', 'Positive Feedback'] as FeedbackCategory[]).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {(['Open', 'In Progress', 'Closed', 'Referred'] as CaseStatus[]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select className="filter-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          {['Critical', 'High', 'Medium', 'Low'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {(categoryFilter || statusFilter || priorityFilter) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setCategoryFilter(''); setStatusFilter(''); setPriorityFilter(''); }}>Clear</button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Community</th>
              <th>Category</th>
              <th>Summary</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--text-secondary)' }}>
                  No records match the current filters.
                </td>
              </tr>
            ) : filtered.map((f) => (
              <tr key={f.id}>
                <td className="td-mono">
                  {new Date(f.dateReceived).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td>
                  <Link to={`/projects/${f.projectId}`} style={{ fontWeight: 500 }}>{f.projectId}</Link>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{projectName(f.projectId)}</div>
                </td>
                <td>{f.community}, {f.lga}</td>
                <td><span className={`badge ${categoryColors[f.category]}`}>{f.category}</span></td>
                <td style={{ maxWidth: 300 }}>
                  <div style={{ fontSize: 13 }}>{f.summary}</div>
                  {f.consentToUseAnonymously && (
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                      Consent to use anonymously
                    </div>
                  )}
                </td>
                <td><PriorityBadge priority={f.priority} /></td>
                <td>{f.assignedTo}</td>
                <td><CaseStatusBadge status={f.caseStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
