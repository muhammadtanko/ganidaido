import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Camera, FileText, AlertCircle } from 'lucide-react';
import { mockProjects } from '../../data/mock';
import { mockVerifications } from '../../data/mock';

type Step = 'home' | 'select-project' | 'step1' | 'step2' | 'step3' | 'step4' | 'review' | 'success';

interface FormData {
  projectId: string;
  reportingMonth: string;
  activitiesCompleted: string;
  mainResult: string;
  currentStatus: string;
  progressPercent: number;
  amountSpentToDate: string;
  peopleReached: string;
  womenGirlsReached: string;
  pwdReached: string;
  mainChallenge: string;
  nextAction: string;
  evidenceNote: string;
}

const EMPTY: FormData = {
  projectId: '',
  reportingMonth: new Date().toISOString().slice(0, 7),
  activitiesCompleted: '',
  mainResult: '',
  currentStatus: 'Ongoing',
  progressPercent: 0,
  amountSpentToDate: '',
  peopleReached: '',
  womenGirlsReached: '',
  pwdReached: '',
  mainChallenge: '',
  nextAction: '',
  evidenceNote: '',
};

function MobileHeader({ title, step, totalSteps, onBack }: { title: string; step?: number; totalSteps?: number; onBack?: () => void }) {
  return (
    <div style={{
      padding: '44px 16px 12px',
      background: 'var(--a-500)',
      color: '#fff',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {onBack && (
          <button onClick={onBack} style={{ color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={18} />
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Gani da Ido</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>{title}</div>
        </div>
      </div>
      {step !== undefined && totalSteps !== undefined && (
        <div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: i <= step ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.2s',
              }} />
            ))}
          </div>
          <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>Step {step + 1} of {totalSteps}</div>
        </div>
      )}
    </div>
  );
}

function MobileBtn({ children, onClick, variant = 'primary', disabled = false }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'ghost'; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', minHeight: 52, borderRadius: 12,
        fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-ui)',
        cursor: disabled ? 'default' : 'pointer',
        background: variant === 'primary' ? (disabled ? 'var(--n-300)' : 'var(--a-500)') : 'transparent',
        color: variant === 'primary' ? '#fff' : 'var(--a-500)',
        border: variant === 'ghost' ? '2px solid var(--a-500)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'background 0.12s',
      }}
    >
      {children}
    </button>
  );
}

function MobileInput({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '14px 14px', border: '1.5px solid var(--border)',
          borderRadius: 10, fontSize: 15, background: 'var(--bg-card)', color: 'var(--text-primary)',
          minHeight: 52, fontFamily: 'var(--font-ui)',
        }}
      />
    </div>
  );
}

function MobileTextarea({ label, value, onChange, placeholder = '', rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)',
          borderRadius: 10, fontSize: 15, background: 'var(--bg-card)', color: 'var(--text-primary)',
          fontFamily: 'var(--font-ui)', resize: 'none', lineHeight: 1.5,
        }}
      />
    </div>
  );
}

function StatusPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = ['Not Started', 'Ongoing', 'Delayed', 'Completed', 'Stalled'];
  const colors: Record<string, string> = {
    'Completed': 'var(--green-500)',
    'Ongoing': 'var(--a-500)',
    'Delayed': 'var(--amber-500)',
    'Not Started': 'var(--n-500)',
    'Stalled': 'var(--red-500)',
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Current Status</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'var(--font-ui)',
              background: value === s ? colors[s] : 'var(--bg-card)',
              color: value === s ? '#fff' : 'var(--text-secondary)',
              border: `1.5px solid ${value === s ? colors[s] : 'var(--border)'}`,
              transition: 'all 0.12s',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProgressPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        <span>Progress %</span>
        <span style={{ fontFamily: 'var(--font-data)', fontSize: 20, fontWeight: 700, color: 'var(--a-500)' }}>{value}%</span>
      </div>
      <input
        type="range"
        min={0} max={100} step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', height: 6, accentColor: 'var(--a-500)' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export function MobileUpdateApp() {
  const [step, setStep] = useState<Step>('home');
  const [form, setForm] = useState<FormData>(EMPTY);

  const set = (key: keyof FormData, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  const selectedProject = mockProjects.find((p) => p.id === form.projectId);
  const projectVerification = form.projectId
    ? mockVerifications.filter((v) => v.projectId === form.projectId).sort((a, b) => b.verificationDate.localeCompare(a.verificationDate))[0]
    : null;

  const totalSteps = 4;
  const stepIndex = { step1: 0, step2: 1, step3: 2, step4: 3 }[step as string] ?? 0;

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 16px',
    background: 'var(--bg-page)',
  };

  const screenStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'var(--bg-page)',
  };

  // ── Home ──────────────────────────────────────────────────────────────────
  if (step === 'home') {
    return (
      <div style={screenStyle}>
        <div style={{ background: 'var(--a-500)', padding: '44px 20px 24px' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>e-CAPH · PAF-GSE Kaduna</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, color: '#fff', marginTop: 4 }}>Gani da Ido</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 }}>Monthly Update App</div>
        </div>
        <div style={{ padding: '24px 16px', flex: 1 }}>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
            Submit your monthly project progress report for review and publication.
          </div>
          <MobileBtn onClick={() => setStep('select-project')}>
            <FileText size={18} /> Submit Monthly Update <ChevronRight size={18} />
          </MobileBtn>

          {/* Quick links */}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'My Projects', sub: `${mockProjects.length} assigned` },
              { label: 'Draft Updates', sub: 'None saved' },
              { label: 'Submitted this month', sub: '1 pending review' },
            ].map(({ label, sub }) => (
              <div key={label} style={{ padding: '14px 16px', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{sub}</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--n-400)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Select Project ────────────────────────────────────────────────────────
  if (step === 'select-project') {
    return (
      <div style={screenStyle}>
        <MobileHeader title="Select Project" onBack={() => setStep('home')} />
        <div style={bodyStyle}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Choose the project you are reporting on:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mockProjects.map((p) => {
              const ver = mockVerifications.filter((v) => v.projectId === p.id).sort((a, b) => b.verificationDate.localeCompare(a.verificationDate))[0];
              const verColor = ver?.result === 'Verified' ? 'var(--green-500)' : ver?.result === 'Partly Verified' ? 'var(--amber-500)' : ver?.result === 'Not Verified' ? 'var(--red-500)' : 'var(--n-400)';
              return (
                <button
                  key={p.id}
                  onClick={() => { set('projectId', p.id); setStep('step1'); }}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px 14px',
                    border: form.projectId === p.id ? '2px solid var(--a-500)' : '1.5px solid var(--border)',
                    borderRadius: 10, background: form.projectId === p.id ? 'var(--a-50)' : 'var(--bg-card)',
                    cursor: 'pointer', fontFamily: 'var(--font-ui)',
                    transition: 'all 0.12s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-data)', color: 'var(--text-secondary)' }}>{p.id}</div>
                    {ver && <span style={{ fontSize: 11, fontWeight: 500, color: verColor }}>{ver.result}</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{p.sector} · {p.lga}</div>
                  <div style={{ marginTop: 8, height: 4, background: 'var(--n-200)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${p.progressPercent}%`, height: '100%', background: 'var(--a-500)', borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3 }}>{p.progressPercent}% complete</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Step 1: Activities & Results ──────────────────────────────────────────
  if (step === 'step1') {
    return (
      <div style={screenStyle}>
        <MobileHeader title="Activities & Results" step={stepIndex} totalSteps={totalSteps} onBack={() => setStep('select-project')} />
        <div style={bodyStyle}>
          {selectedProject && (
            <div style={{ padding: '10px 12px', background: 'var(--a-50)', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: 11, color: 'var(--a-500)' }}>{selectedProject.id}</span>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{selectedProject.name}</div>
            </div>
          )}

          <MobileInput
            label="Reporting Month"
            type="month"
            value={form.reportingMonth}
            onChange={(v) => set('reportingMonth', v)}
          />
          <MobileTextarea
            label="Activities Completed"
            value={form.activitiesCompleted}
            onChange={(v) => set('activitiesCompleted', v)}
            placeholder="Describe what was done this month…"
            rows={4}
          />
          <MobileTextarea
            label="Main Result / Output"
            value={form.mainResult}
            onChange={(v) => set('mainResult', v)}
            placeholder="What was achieved or produced?"
            rows={3}
          />
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <MobileBtn onClick={() => setStep('step2')} disabled={!form.activitiesCompleted || !form.mainResult}>
            Next <ChevronRight size={18} />
          </MobileBtn>
        </div>
      </div>
    );
  }

  // ── Step 2: Progress & Financials ─────────────────────────────────────────
  if (step === 'step2') {
    return (
      <div style={screenStyle}>
        <MobileHeader title="Progress & Financials" step={stepIndex} totalSteps={totalSteps} onBack={() => setStep('step1')} />
        <div style={bodyStyle}>
          <StatusPicker value={form.currentStatus} onChange={(v) => set('currentStatus', v)} />
          <ProgressPicker value={form.progressPercent} onChange={(v) => set('progressPercent', v)} />
          <MobileInput
            label="Amount Spent to Date (NGN)"
            type="number"
            value={form.amountSpentToDate}
            onChange={(v) => set('amountSpentToDate', v)}
            placeholder="e.g. 28000000"
          />
          {form.amountSpentToDate && (
            <div style={{ fontSize: 13, color: 'var(--a-500)', marginTop: -10, marginBottom: 12, fontFamily: 'var(--font-data)' }}>
              = ₦{Number(form.amountSpentToDate).toLocaleString('en-NG')}
            </div>
          )}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <MobileBtn onClick={() => setStep('step3')}>
            Next <ChevronRight size={18} />
          </MobileBtn>
        </div>
      </div>
    );
  }

  // ── Step 3: Beneficiaries & Challenges ───────────────────────────────────
  if (step === 'step3') {
    return (
      <div style={screenStyle}>
        <MobileHeader title="People & Challenges" step={stepIndex} totalSteps={totalSteps} onBack={() => setStep('step2')} />
        <div style={bodyStyle}>
          <MobileInput
            label="Total People Reached"
            type="number"
            value={form.peopleReached}
            onChange={(v) => set('peopleReached', v)}
            placeholder="0"
          />
          <MobileInput
            label="Women & Girls Reached"
            type="number"
            value={form.womenGirlsReached}
            onChange={(v) => set('womenGirlsReached', v)}
            placeholder="0"
          />
          <MobileInput
            label="Persons with Disabilities"
            type="number"
            value={form.pwdReached}
            onChange={(v) => set('pwdReached', v)}
            placeholder="0"
          />
          <MobileTextarea
            label="Main Challenge"
            value={form.mainChallenge}
            onChange={(v) => set('mainChallenge', v)}
            placeholder="What obstacles did you face?"
            rows={3}
          />
          <MobileTextarea
            label="Next Action"
            value={form.nextAction}
            onChange={(v) => set('nextAction', v)}
            placeholder="What will you do next month?"
            rows={3}
          />
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <MobileBtn onClick={() => setStep('step4')}>
            Next <ChevronRight size={18} />
          </MobileBtn>
        </div>
      </div>
    );
  }

  // ── Step 4: Evidence ──────────────────────────────────────────────────────
  if (step === 'step4') {
    return (
      <div style={screenStyle}>
        <MobileHeader title="Evidence" step={stepIndex} totalSteps={totalSteps} onBack={() => setStep('step3')} />
        <div style={bodyStyle}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
            Attach photos or documents to support your report. Evidence enables faster verification.
          </div>

          {/* Mock photo upload button */}
          <button style={{
            width: '100%', minHeight: 100, border: '2px dashed var(--border)', borderRadius: 12,
            background: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16,
          }}>
            <Camera size={28} style={{ color: 'var(--n-400)' }} />
            <span style={{ fontSize: 14 }}>Tap to add photos</span>
            <span style={{ fontSize: 12 }}>JPG, PNG · max 10MB each</span>
          </button>

          <MobileTextarea
            label="Evidence Note / Reference"
            value={form.evidenceNote}
            onChange={(v) => set('evidenceNote', v)}
            placeholder="e.g. 'Site photos Oct 2024 – 6 images' or document reference"
            rows={2}
          />

          {projectVerification && (
            <div style={{
              padding: '12px 14px', borderRadius: 10,
              background: projectVerification.result === 'Verified' ? 'var(--green-100)' : 'var(--amber-100)',
              fontSize: 13, marginTop: 8
            }}>
              <div style={{ fontWeight: 600, color: projectVerification.result === 'Verified' ? 'var(--green-500)' : 'var(--amber-500)' }}>
                Last verification: {projectVerification.result}
              </div>
              <div style={{ fontSize: 12, marginTop: 2, color: 'var(--text-secondary)' }}>
                {new Date(projectVerification.verificationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} by {projectVerification.verifierName}
              </div>
            </div>
          )}

          <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--n-100)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            Your report will be marked <strong>self-reported</strong> until a field verifier confirms it.
          </div>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <MobileBtn onClick={() => setStep('review')}>
            Review & Submit <ChevronRight size={18} />
          </MobileBtn>
        </div>
      </div>
    );
  }

  // ── Review ────────────────────────────────────────────────────────────────
  if (step === 'review') {
    return (
      <div style={screenStyle}>
        <MobileHeader title="Review Update" onBack={() => setStep('step4')} />
        <div style={bodyStyle}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Review your submission before sending.
          </div>

          {[
            { label: 'Project', value: `${form.projectId} · ${selectedProject?.name}` },
            { label: 'Reporting Month', value: new Date(form.reportingMonth + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) },
            { label: 'Activities Completed', value: form.activitiesCompleted },
            { label: 'Main Result', value: form.mainResult },
            { label: 'Status', value: form.currentStatus },
            { label: 'Progress', value: `${form.progressPercent}%` },
            { label: 'Amount Spent', value: form.amountSpentToDate ? `₦${Number(form.amountSpentToDate).toLocaleString('en-NG')}` : '—' },
            { label: 'People Reached', value: form.peopleReached || '0' },
            { label: 'Main Challenge', value: form.mainChallenge || '—' },
            { label: 'Next Action', value: form.nextAction || '—' },
            { label: 'Evidence', value: form.evidenceNote || 'None attached' },
          ].map(({ label, value }) => (
            <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
              <div style={{ fontSize: 14, marginTop: 2 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MobileBtn onClick={() => setStep('success')}>
            <Check size={18} /> Submit Update
          </MobileBtn>
          <MobileBtn variant="ghost" onClick={() => setStep('step1')}>
            Edit
          </MobileBtn>
        </div>
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div style={{ ...screenStyle, alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'var(--green-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Check size={36} style={{ color: 'var(--green-500)' }} strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>Update Submitted!</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.6 }}>
            Your monthly update for <strong>{selectedProject?.name}</strong> has been submitted for review. It will appear as <em>self-reported</em> until verified by a field verifier.
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: 'var(--n-100)', borderRadius: 10, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'left', width: '100%' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>What happens next:</div>
          <div>1. Approver reviews your submission</div>
          <div>2. Field verifier may schedule a site visit</div>
          <div>3. Report is published on the public dashboard</div>
        </div>
        <MobileBtn onClick={() => { setForm(EMPTY); setStep('home'); }}>
          Back to Home
        </MobileBtn>
      </div>
    );
  }

  return null;
}
