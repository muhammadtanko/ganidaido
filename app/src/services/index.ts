/**
 * Service layer — the ONLY place that knows whether we're using mock data or a real API.
 *
 * To wire up a real backend:
 *  1. Set VITE_USE_MOCK=false in your .env
 *  2. Set VITE_API_BASE_URL=https://your-api.example.com in your .env
 *  3. Each function below already has the real-API stub — fill it in with fetch/axios calls.
 *
 * Nothing else in the app imports from data/mock directly.
 */

import type {
  Project,
  MonthlyUpdate,
  Verification,
  Feedback,
  Commitment,
  DashboardStats,
  ProjectStatus,
  Sector,
  ProjectType,
} from '../types';

import {
  mockProjects,
  mockUpdates,
  mockVerifications,
  mockFeedback,
  mockCommitments,
} from '../data/mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path}: ${res.status}`);
  return res.json();
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK) return Promise.resolve(mockProjects);
  return apiGet<Project[]>('/api/projects');
}

export async function getProject(id: string): Promise<Project | undefined> {
  if (USE_MOCK) return Promise.resolve(mockProjects.find((p) => p.id === id));
  return apiGet<Project>(`/api/projects/${id}`);
}

// ── Monthly Updates ───────────────────────────────────────────────────────────

export async function getUpdates(projectId?: string): Promise<MonthlyUpdate[]> {
  if (USE_MOCK) {
    const data = projectId
      ? mockUpdates.filter((u) => u.projectId === projectId)
      : mockUpdates;
    return Promise.resolve(data);
  }
  const q = projectId ? `?projectId=${projectId}` : '';
  return apiGet<MonthlyUpdate[]>(`/api/updates${q}`);
}

export async function getLatestUpdate(projectId: string): Promise<MonthlyUpdate | undefined> {
  if (USE_MOCK) {
    const updates = mockUpdates
      .filter((u) => u.projectId === projectId)
      .sort((a, b) => b.reportingMonth.localeCompare(a.reportingMonth));
    return Promise.resolve(updates[0]);
  }
  return apiGet<MonthlyUpdate>(`/api/updates/latest/${projectId}`);
}

// ── Verifications ─────────────────────────────────────────────────────────────

export async function getVerifications(projectId?: string): Promise<Verification[]> {
  if (USE_MOCK) {
    const data = projectId
      ? mockVerifications.filter((v) => v.projectId === projectId)
      : mockVerifications;
    return Promise.resolve(data);
  }
  const q = projectId ? `?projectId=${projectId}` : '';
  return apiGet<Verification[]>(`/api/verifications${q}`);
}

// ── Feedback ──────────────────────────────────────────────────────────────────

export async function getFeedback(projectId?: string): Promise<Feedback[]> {
  if (USE_MOCK) {
    // Safeguarding feedback is never served to the public — always filter it here
    const data = (projectId
      ? mockFeedback.filter((f) => f.projectId === projectId)
      : mockFeedback
    ).filter((f) => !f.isSafeguarding);
    return Promise.resolve(data);
  }
  const q = projectId ? `?projectId=${projectId}` : '';
  return apiGet<Feedback[]>(`/api/feedback${q}`);
}

// ── Commitments ───────────────────────────────────────────────────────────────

export async function getCommitments(projectId?: string): Promise<Commitment[]> {
  if (USE_MOCK) {
    const data = projectId
      ? mockCommitments.filter((c) => c.projectId === projectId)
      : mockCommitments;
    return Promise.resolve(data);
  }
  const q = projectId ? `?projectId=${projectId}` : '';
  return apiGet<Commitment[]>(`/api/commitments${q}`);
}

// ── Dashboard Stats ───────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  if (USE_MOCK) {
    const projects = mockProjects.filter((p) => p.publicationStatus === 'Published');
    const totalEstimatedCost = projects.reduce((s, p) => s + p.estimatedCost, 0);
    const totalReleased = projects.reduce((s, p) => s + p.amountReleased, 0);
    const totalSpent = projects.reduce((s, p) => s + p.amountSpent, 0);
    const avgProgress =
      projects.reduce((s, p) => s + p.progressPercent, 0) / (projects.length || 1);

    const openFeedback = mockFeedback.filter(
      (f) => !f.isSafeguarding && (f.caseStatus === 'Open' || f.caseStatus === 'In Progress')
    ).length;

    const verifiedIds = new Set(
      mockVerifications.filter((v) => v.result === 'Verified').map((v) => v.projectId)
    );
    const pendingIds = projects.filter(
      (p) => !mockVerifications.find((v) => v.projectId === p.id)
    ).length;

    const byStatus = {} as Record<ProjectStatus, number>;
    const bySector = {} as Record<Sector, number>;
    const byType = {} as Record<ProjectType, number>;
    const lgaMap = {} as Record<string, number>;

    for (const p of projects) {
      byStatus[p.currentStatus] = (byStatus[p.currentStatus] ?? 0) + 1;
      bySector[p.sector] = (bySector[p.sector] ?? 0) + 1;
      byType[p.projectType] = (byType[p.projectType] ?? 0) + 1;
      lgaMap[p.lga] = (lgaMap[p.lga] ?? 0) + 1;
    }

    return Promise.resolve({
      totalProjects: projects.length,
      totalEstimatedCost,
      totalReleased,
      totalSpent,
      avgProgressPercent: Math.round(avgProgress),
      openFeedbackCount: openFeedback,
      verifiedProjects: verifiedIds.size,
      pendingVerification: pendingIds,
      projectsByStatus: byStatus,
      projectsBySector: bySector,
      projectsByType: byType,
      projectsByLGA: Object.entries(lgaMap).map(([lga, count]) => ({ lga, count })),
    });
  }
  return apiGet<DashboardStats>('/api/dashboard/stats');
}
