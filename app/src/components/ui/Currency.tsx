interface Props {
  amount: number;
  compact?: boolean;
}

export function fmt(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(1)}B`;
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
    return `₦${amount.toLocaleString('en-NG')}`;
  }
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function Currency({ amount, compact = false }: Props) {
  return <span className="currency">{fmt(amount, compact)}</span>;
}
