import type {
  ProjectStatus,
  PublicationStatus,
  VerificationResult,
  FeedbackPriority,
  CommitmentStatus,
  CaseStatus,
} from '../../types';

type BadgeVariant = 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'outline-green';

function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const map: Record<ProjectStatus, BadgeVariant> = {
    'Completed': 'green',
    'Ongoing': 'blue',
    'Delayed': 'amber',
    'Not Started': 'gray',
    'Abandoned': 'red',
    'Stalled': 'red',
  };
  return <Badge variant={map[status]}>{status}</Badge>;
}

export function PublicationBadge({ status }: { status: PublicationStatus }) {
  const map: Record<PublicationStatus, BadgeVariant> = {
    'Published': 'green',
    'Approved': 'outline-green',
    'Review': 'blue',
    'Draft': 'gray',
    'Rejected': 'red',
  };
  return <Badge variant={map[status]}>{status}</Badge>;
}

export function VerificationBadge({ result }: { result: VerificationResult }) {
  const map: Record<VerificationResult, BadgeVariant> = {
    'Verified': 'green',
    'Partly Verified': 'amber',
    'Not Verified': 'red',
    'Pending': 'gray',
  };
  const icons: Record<VerificationResult, string> = {
    'Verified': '✓',
    'Partly Verified': '~',
    'Not Verified': '✕',
    'Pending': '◷',
  };
  return (
    <Badge variant={map[result]}>
      <span>{icons[result]}</span> {result}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: FeedbackPriority }) {
  const map: Record<FeedbackPriority, BadgeVariant> = {
    'Critical': 'red',
    'High': 'amber',
    'Medium': 'blue',
    'Low': 'gray',
  };
  return <Badge variant={map[priority]}>{priority}</Badge>;
}

export function CommitmentStatusBadge({ status }: { status: CommitmentStatus }) {
  const map: Record<CommitmentStatus, BadgeVariant> = {
    'Completed': 'green',
    'In Progress': 'blue',
    'Pending': 'gray',
    'Overdue': 'red',
    'Cancelled': 'gray',
  };
  return <Badge variant={map[status]}>{status}</Badge>;
}

export function CaseStatusBadge({ status }: { status: CaseStatus }) {
  const map: Record<CaseStatus, BadgeVariant> = {
    'Closed': 'green',
    'In Progress': 'blue',
    'Open': 'amber',
    'Referred': 'gray',
  };
  return <Badge variant={map[status]}>{status}</Badge>;
}
