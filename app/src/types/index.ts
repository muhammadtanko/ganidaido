export type Sector = 'Education' | 'Health' | 'Environment' | 'Social Protection';
export type ProjectType = 'Capital Project' | 'Donor-Funded Project' | 'Community-Supported Project';
export type ProjectStatus = 'Not Started' | 'Ongoing' | 'Delayed' | 'Completed' | 'Abandoned' | 'Stalled';
export type PublicationStatus = 'Draft' | 'Review' | 'Approved' | 'Published' | 'Rejected';
export type VerificationResult = 'Verified' | 'Partly Verified' | 'Not Verified' | 'Pending';
export type VerificationMethod = 'Site Visit' | 'Document Check' | 'Structured Call';
export type FeedbackCategory = 'Information Request' | 'Complaint' | 'Suggestion' | 'Safeguarding Concern' | 'Service Gap' | 'Positive Feedback';
export type FeedbackPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type CaseStatus = 'Open' | 'In Progress' | 'Closed' | 'Referred';
export type CommitmentStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue' | 'Cancelled';
export type UserRole = 'Administrator' | 'Data Entry' | 'Verifier' | 'Approver' | 'Community Focal' | 'Advocacy Lead' | 'Public User';

export interface LGA {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  sector: Sector;
  projectType: ProjectType;
  leadInstitution: string;
  funder: string;
  lga: string;
  ward: string;
  estimatedCost: number;
  amountReleased: number;
  amountSpent: number;
  startDate: string;
  expectedEndDate: string;
  currentStatus: ProjectStatus;
  primaryBeneficiaries: string;
  publicContact: string;
  sourceReference: string;
  publicationStatus: PublicationStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  progressPercent: number;
}

export interface MonthlyUpdate {
  id: string;
  projectId: string;
  reportingMonth: string; // YYYY-MM
  officer: string;
  activitiesCompleted: string;
  mainResult: string;
  currentStatus: ProjectStatus;
  progressPercent: number;
  amountReleasedToDate: number;
  amountSpentToDate: number;
  peopleReached: number;
  womenGirlsReached: number;
  pwdReached: number;
  mainChallenge: string;
  nextAction: string;
  evidenceReference: string;
  publicationStatus: PublicationStatus;
  submittedAt: string;
  isVerified: boolean;
}

export interface Verification {
  id: string;
  projectId: string;
  verificationDate: string;
  verifierName: string;
  method: VerificationMethod;
  expectedVsObserved: string;
  physicalProgressPercent: number;
  financialInfoSighted: boolean;
  qualityAcceptable: boolean;
  communityMembersConsulted: number;
  result: VerificationResult;
  keyGapConcern: string;
  correctiveActionRequired: string;
  evidenceReference: string;
  publicationStatus: PublicationStatus;
  createdAt: string;
}

export interface Feedback {
  id: string;
  dateReceived: string;
  projectId: string;
  lga: string;
  community: string;
  sourceGroup: string;
  category: FeedbackCategory;
  summary: string;
  priority: FeedbackPriority;
  consentToUseAnonymously: boolean;
  assignedTo: string;
  actionTaken: string;
  caseStatus: CaseStatus;
  dateClosed: string | null;
  publicResponse: string;
  isSafeguarding: boolean;
  createdAt: string;
}

export interface Commitment {
  id: string;
  dateMade: string;
  projectId: string;
  institution: string;
  stakeholder: string;
  commitmentMade: string;
  responsiblePerson: string;
  dueDate: string;
  evidenceOfCommitment: string;
  status: CommitmentStatus;
  progressNote: string;
  lastFollowUp: string;
  nextFollowUp: string;
  closureEvidence: string;
  publicUpdate: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalEstimatedCost: number;
  totalReleased: number;
  totalSpent: number;
  avgProgressPercent: number;
  openFeedbackCount: number;
  verifiedProjects: number;
  pendingVerification: number;
  projectsByStatus: Record<ProjectStatus, number>;
  projectsBySector: Record<Sector, number>;
  projectsByType: Record<ProjectType, number>;
  projectsByLGA: { lga: string; count: number }[];
}
