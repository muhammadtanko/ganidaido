import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProject, getUpdates, getVerifications } from '../../services';
import type { Project, MonthlyUpdate, Verification } from '../../types';
import { ProjectStatusBadge, PublicationBadge, VerificationBadge } from '../../components/ui/StatusBadge';
import { Currency } from '../../components/ui/Currency';
import { ProgressBar } from '../../components/ui/ProgressBar';

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="detail-field-label">{label}</div>
      <div className="detail-field-value">{value || '—'}</div>
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<MonthlyUpdate[]>([]);
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [tab, setTab] = useState<'overview' | 'updates' | 'verification'>('overview');

  useEffect(() => {
    if (!id) return;
    getProject(id).then((p) => setProject(p ?? null));
    getUpdates(id).then(setUpdates);
    getVerifications(id).then(setVerifications);
  }, [id]);

  if (!project) return <div className="text-secondary">Loading…</div>;

  const utilisation = project.estimatedCost > 0
    ? Math.round((project.amountReleased / project.estimatedCost) * 100) : 0;

  const latestVerification = verifications[verifications.length - 1];

  return (
    <div>
      <Link to="/projects" className="btn btn-ghost btn-sm mb-16" style={{ display: 'inline-flex' }}>
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <div className="page-header">
        <div className="flex gap-8 flex-wrap items-center" style={{ justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="td-mono text-secondary">{project.id}</span>
              <PublicationBadge status={project.publicationStatus} />
            </div>
            <h1 className="page-title">{project.name}</h1>
            <p className="page-subtitle">{project.shortDescription}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ProjectStatusBadge status={project.currentStatus} />
            {latestVerification && <VerificationBadge result={latestVerification.result} />}
          </div>
        </div>
      </div>

      {/* Quick stat strip */}
      <div className="stat-grid mb-24">
        <div className="stat-tile">
          <div className="stat-tile-label">Estimated Cost</div>
          <div className="stat-tile-value" style={{ fontSize: 22 }}><Currency amount={project.estimatedCost} /></div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile-label">Released ({utilisation}%)</div>
          <div className="stat-tile-value" style={{ fontSize: 22 }}><Currency amount={project.amountReleased} /></div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile-label">Spent</div>
          <div className="stat-tile-value" style={{ fontSize: 22 }}><Currency amount={project.amountSpent} /></div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile-label">Progress</div>
          <div className="stat-tile-value" style={{ fontSize: 22 }}>{project.progressPercent}%</div>
          <div className="mt-8"><ProgressBar value={project.progressPercent} showLabel={false} /></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {(['overview', 'updates', 'verification'] as const).map((t) => (
          <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'overview' ? 'Project Details' : t === 'updates' ? `Monthly Updates (${updates.length})` : `Verification (${verifications.length})`}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="card">
          <div className="detail-grid">
            <Field label="Sector" value={project.sector} />
            <Field label="Project Type" value={project.projectType} />
            <Field label="Lead Institution" value={project.leadInstitution} />
            <Field label="Funder" value={project.funder} />
            <Field label="LGA" value={project.lga} />
            <Field label="Ward" value={project.ward} />
            <Field label="Start Date" value={project.startDate} />
            <Field label="Expected End Date" value={project.expectedEndDate} />
            <Field label="Primary Beneficiaries" value={project.primaryBeneficiaries} />
            <Field label="Public Contact" value={project.publicContact} />
            <Field label="Source / Reference" value={
              project.sourceReference ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {project.sourceReference} <ExternalLink size={12} />
                </span>
              ) : null
            } />
            <Field label="Last Updated" value={new Date(project.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
          </div>
        </div>
      )}

      {tab === 'updates' && (
        <div>
          {updates.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">No updates yet</div>
              <div className="empty-state-desc">Monthly progress reports will appear here once submitted.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[...updates].reverse().map((u) => (
                <div key={u.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {new Date(u.reportingMonth + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Reported by {u.officer}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <ProjectStatusBadge status={u.currentStatus} />
                      {u.isVerified
                        ? <span className="badge badge-green">✓ Verified</span>
                        : <span className="badge badge-gray" style={{ fontStyle: 'italic' }}>self-reported</span>}
                    </div>
                  </div>
                  <div className="detail-grid">
                    <Field label="Activities Completed" value={u.activitiesCompleted} />
                    <Field label="Main Result / Output" value={u.mainResult} />
                    <Field label="Progress %" value={<><ProgressBar value={u.progressPercent} /></>} />
                    <Field label="Amount Released to Date" value={<Currency amount={u.amountReleasedToDate} />} />
                    <Field label="Amount Spent to Date" value={<Currency amount={u.amountSpentToDate} />} />
                    <Field label="People Reached" value={u.peopleReached.toLocaleString()} />
                    <Field label="Women & Girls Reached" value={u.womenGirlsReached.toLocaleString()} />
                    <Field label="Persons with Disabilities" value={u.pwdReached.toLocaleString()} />
                    <Field label="Main Challenge" value={u.mainChallenge} />
                    <Field label="Next Action" value={u.nextAction} />
                  </div>
                  {u.evidenceReference && (
                    <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--n-100)', borderRadius: 'var(--r-sm)', fontSize: 13 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Evidence: </span>
                      {u.evidenceReference}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'verification' && (
        <div>
          {verifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">No verifications yet</div>
              <div className="empty-state-desc">Field verification records will appear here once submitted.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {verifications.map((v) => (
                <div key={v.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{new Date(v.verificationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{v.verifierName} · {v.method}</div>
                    </div>
                    <VerificationBadge result={v.result} />
                  </div>
                  <div className="detail-grid">
                    <Field label="Expected vs. Observed" value={v.expectedVsObserved} />
                    <Field label="Physical Progress Observed" value={`${v.physicalProgressPercent}%`} />
                    <Field label="Financial Info Sighted" value={v.financialInfoSighted ? '✓ Yes' : '✕ No'} />
                    <Field label="Quality Acceptable" value={v.qualityAcceptable ? '✓ Yes' : '✕ No'} />
                    <Field label="Community Members Consulted" value={String(v.communityMembersConsulted)} />
                    <Field label="Key Gap / Concern" value={v.keyGapConcern} />
                    <Field label="Corrective Action Required" value={v.correctiveActionRequired} />
                  </div>
                  {v.evidenceReference && (
                    <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--n-100)', borderRadius: 'var(--r-sm)', fontSize: 13 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Evidence: </span>
                      {v.evidenceReference}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
