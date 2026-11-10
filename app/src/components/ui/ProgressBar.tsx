interface Props {
  value: number; // 0–100
  showLabel?: boolean;
}

function barColor(v: number) {
  if (v >= 90) return 'fill-green';
  if (v >= 50) return '';  // accent blue (default)
  if (v >= 25) return 'fill-amber';
  return 'fill-red';
}

export function ProgressBar({ value, showLabel = true }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div className="progress-bar-wrap" style={{ flex: 1 }}>
        <div
          className={`progress-bar-fill ${barColor(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span style={{ fontSize: 12, fontFamily: 'var(--font-data)', fontWeight: 500, color: 'var(--text-secondary)', minWidth: 32, textAlign: 'right' }}>
          {pct}%
        </span>
      )}
    </div>
  );
}
