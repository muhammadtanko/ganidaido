import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getVerifications, getProjects } from '../../services';
import type { Verification, Project, VerificationResult } from '../../types';
import { VerificationBadge, PublicationBadge } from '../../components/ui/StatusBadge';

export function VerificationList() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFilter, setProjectFilter] = useState('');
  const [resultFilter, setResultFilter] = useState('');

  useEffect(() => {
    getVerifications().then(setVerifications);
    getProjects().then(setProjects);
  }, []);

  const filtered = verifications.filter((v) => {
    if (projectFilter && v.projectId !== projectFilter) return false;
    if (resultFilter && v.result !== resultFilter) return false;
    return true;
  }).sort((a, b) => b.verificationDate.localeCompare(a.verificationDate));

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

  const summary = {
    total: verifications.length,
    verified: verifications.filter((v) => v.result === 'Verified').length,
    partly: verifications.filter((v) => v.result === 'Partly Verified').length,
    not: verifications.filter((v) => v.result === 'Not Verified').length,
    pending: verifications.filter((v) => v.result === 'Pending').length,
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Field Verification</h1>
            <p className="page-subtitle">{filtered.length} records · {verifications.length} total</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} /> New Verification
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="stat-grid mb-24">
        <div className="stat-tile">
          <div className="stat-tile-label">Total Records</div>
          <div className="stat-tile-value">{summary.total}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile-label">Verified</div>
          <div className="stat-tile-value" style={{ color: 'var(--green-500)' }}>{summary.verified}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile-label">Partly Verified</div>
          <div className="stat-tile-value" style={{ color: 'var(--amber-500)' }}>{summary.partly}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile-label">Not Verified</div>
          <div className="stat-tile-value" style={{ color: 'var(--red-500)' }}>{summary.not}</div>
        </div>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.id}</option>)}
        </select>
        <select className="filter-select" value={resultFilter} onChange={(e) => setResultFilter(e.target.value)}>
          <option value="">All Results</option>
          {(['Verified', 'Partly Verified', 'Not Verified', 'Pending'] as VerificationResult[]).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {(projectFilter || resultFilter) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setProjectFilter(''); setResultFilter(''); }}>Clear</button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Verifier</th>
              <th>Method</th>
              <th>Physical %</th>
              <th>Fin. Sighted</th>
              <th>Quality OK</th>
              <th>Community</th>
              <th>Result</th>
              <th>Publication</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: 32, color: 'var(--text-secondary)' }}>
                  No records match the current filters.
                </td>
              </tr>
            ) : filtered.map((v) => (
              <tr key={v.id}>
                <td className="td-mono">
                  {new Date(v.verificationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td>
                  <Link to={`/projects/${v.projectId}`} style={{ fontWeight: 500 }}>{v.projectId}</Link>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{projectName(v.projectId)}</div>
                </td>
                <td>{v.verifierName}</td>
                <td>{v.method}</td>
                <td className="td-mono">{v.physicalProgressPercent}%</td>
                <td>{v.financialInfoSighted ? <span className="badge badge-green">✓</span> : <span className="badge badge-red">✕</span>}</td>
                <td>{v.qualityAcceptable ? <span className="badge badge-green">✓</span> : <span className="badge badge-amber">✕</span>}</td>
                <td className="td-mono">{v.communityMembersConsulted}</td>
                <td><VerificationBadge result={v.result} /></td>
                <td><PublicationBadge status={v.publicationStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
