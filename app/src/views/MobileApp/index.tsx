import { useState } from 'react';
import { MobileUpdateApp } from './MobileUpdateApp';

export function MobileAppDemo() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isFullscreen) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-page)', zIndex: 1000, overflow: 'auto' }}>
        <div style={{ padding: 16, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setIsFullscreen(false)}>← Back to desktop</button>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Viewing: Monthly Update App (phone mode)</span>
        </div>
        <MobileUpdateApp />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Monthly Update App</h1>
        <p className="page-subtitle">Mobile-first update submission for field officers and LGA focal persons</p>
      </div>

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Phone frame */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, textAlign: 'center' }}>
            Phone preview · 390×844px
          </div>
          <div style={{
            width: 390,
            height: 760,
            background: '#1a1a1a',
            borderRadius: 44,
            padding: '12px 8px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.3), inset 0 0 0 1px #333',
            position: 'relative',
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
              width: 120, height: 32, background: '#1a1a1a',
              borderRadius: '0 0 18px 18px', zIndex: 10,
            }} />
            {/* Screen */}
            <div style={{
              height: '100%',
              background: 'var(--bg-page)',
              borderRadius: 36,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <MobileUpdateApp />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsFullscreen(true)}>
              Open fullscreen
            </button>
          </div>
        </div>

        {/* Description */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div className="card mb-16">
            <div className="card-title">About this app</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The Monthly Update App is a simplified, mobile-first interface designed for:
            </p>
            <ul style={{ marginTop: 12, paddingLeft: 20, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 2 }}>
              <li>Field officers submitting progress reports from site</li>
              <li>LGA focal persons updating projects during community visits</li>
              <li>Low-bandwidth, one-handed operation on Android phones</li>
              <li>Offline-ready architecture (Phase 2)</li>
            </ul>
          </div>

          <div className="card mb-16">
            <div className="card-title">Key design choices</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green-500)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                <span>Large touch targets (min 44×44px) for outdoor use</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green-500)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                <span>Step-by-step form wizard (one concept per screen)</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green-500)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                <span>Progress indicator shows how far through the form</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green-500)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                <span>Saves draft automatically on each step</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green-500)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                <span>Currency fields auto-format with NGN / thousands separators</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green-500)', fontWeight: 600, flexShrink: 0 }}>✓</span>
                <span>Verification badge shown if project has been field-verified</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Backend integration note</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              This demo submits to a mock handler. In production:
              <br /><br />
              <code style={{ background: 'var(--n-100)', padding: '2px 6px', borderRadius: 4 }}>POST /api/updates</code>
              <br />
              with the form payload. The service layer in{' '}
              <code style={{ background: 'var(--n-100)', padding: '2px 6px', borderRadius: 4 }}>src/services/index.ts</code>
              {' '}handles the swap — just set{' '}
              <code style={{ background: 'var(--n-100)', padding: '2px 6px', borderRadius: 4 }}>VITE_USE_MOCK=false</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
