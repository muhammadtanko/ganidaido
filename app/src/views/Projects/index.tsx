import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getProjects } from '../../services';
import type { Project, Sector, ProjectType, ProjectStatus } from '../../types';
import { ProjectStatusBadge, PublicationBadge } from '../../components/ui/StatusBadge';
import { Currency } from '../../components/ui/Currency';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sector, setSector] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [lga, setLga] = useState<string>('');

  useEffect(() => { getProjects().then(setProjects); }, []);

  const lgas = [...new Set(projects.map((p) => p.lga))].sort();

  const filtered = projects.filter((p) => {
    if (sector && p.sector !== sector) return false;
    if (type && p.projectType !== type) return false;
    if (status && p.currentStatus !== status) return false;
    if (lga && p.lga !== lga) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Project Register</h1>
            <p className="page-subtitle">{filtered.length} projects · {projects.length} total</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">All Sectors</option>
          {(['Education', 'Health', 'Environment', 'Social Protection'] as Sector[]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          {(['Capital Project', 'Donor-Funded Project', 'Community-Supported Project'] as ProjectType[]).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {(['Not Started', 'Ongoing', 'Delayed', 'Completed', 'Abandoned', 'Stalled'] as ProjectStatus[]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select className="filter-select" value={lga} onChange={(e) => setLga(e.target.value)}>
          <option value="">All LGAs</option>
          {lgas.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        {(sector || type || status || lga) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setSector(''); setType(''); setStatus(''); setLga(''); }}>
            Clear filters
          </button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Sector</th>
              <th>Type</th>
              <th>LGA</th>
              <th>Budget (NGN)</th>
              <th>Released</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Publication</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: 32, color: 'var(--text-secondary)' }}>
                  No projects match the current filters.
                </td>
              </tr>
            ) : filtered.map((p) => (
              <tr key={p.id}>
                <td><Link to={`/projects/${p.id}`} className="td-mono">{p.id}</Link></td>
                <td>
                  <div style={{ fontWeight: 500, maxWidth: 220 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{p.leadInstitution}</div>
                </td>
                <td>{p.sector}</td>
                <td style={{ maxWidth: 140 }}>{p.projectType}</td>
                <td>{p.lga}</td>
                <td><Currency amount={p.estimatedCost} compact /></td>
                <td><Currency amount={p.amountReleased} compact /></td>
                <td style={{ minWidth: 120 }}><ProgressBar value={p.progressPercent} /></td>
                <td><ProjectStatusBadge status={p.currentStatus} /></td>
                <td><PublicationBadge status={p.publicationStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
