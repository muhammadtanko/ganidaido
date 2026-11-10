# MVP Gap Analysis — Built vs. Developer TOR

**Status:** Draft v1.0
**Compares:** `app/` (current Vite/React implementation) against `docs/...Developer TOR (1).xlsx` and `docs/PRD.md` §10 MVP scope.
**Bottom line:** What exists today is a **read-only, mock-data clickable prototype** covering all six module *views* and the full visual/design-system language. It is a strong front-end skeleton, but it has **no backend, no data persistence, no authentication/RBAC, no write paths, and none of the TOR's hard business-rule enforcement** — all of which are MVP-gating, not Phase 2, per the PRD.

---

## 1. What currently exists (verified from code)

| Area | Current state |
|---|---|
| Stack | Vite + React 19 + TypeScript, React Router, no backend/server, no database |
| Data | 100% static mock arrays in `src/data/mock/*.ts` — hardcoded sample records, not persisted anywhere |
| Service layer | `src/services/index.ts` has a `VITE_USE_MOCK` flag and real-API stubs (`fetch` GET calls only) — **no backend exists to point it at**, and no POST/PUT/PATCH functions are defined at all |
| Views built | Dashboard, Public Dashboard, Project Register (list + detail), Monthly Updates (list), Field Verification (list), Community Feedback (list), Commitments (list), Mobile Update wizard (demo only) |
| Forms | **None that persist data.** The Mobile Update wizard collects input in local component state and on "Submit" simply navigates to a static success screen — nothing is saved, posted, or added to any list |
| Auth / Login | None. No login screen, no session, no user identity anywhere in the app |
| Roles / RBAC | `UserRole` type exists in `types/index.ts` but is **never used** — no role switcher, no permission gating, no route protection. Every visitor sees every internal screen |
| File/evidence upload | None. `evidenceReference` is rendered as a filename string from mock data; there is no `<input type="file">` anywhere in the codebase |
| Export (Excel/PDF) | None. No export/download/print logic anywhere in the codebase |
| Publication workflow | Status badge renders Draft/Review/Approved/Published/Rejected visually, but there is **no action to move a record between these states** — it's a label, not a workflow |
| Business-rule enforcement | None enforced, because there is no write path to enforce rules on (see §3) |
| Design system | Implemented faithfully — tokens, type scale, badges, colors match `DESIGN_SYSTEM.md` |
| Offline/low-bandwidth | Explicitly labeled "Phase 2" inside the Mobile demo screen itself |
| Localization (Hausa) | Not implemented; no i18n layer, strings are hardcoded English |

---

## 2. Gap vs. Developer TOR (§4–§14 of the TOR sheet)

| TOR Requirement | Status | Gap |
|---|---|---|
| §4 Project register module | 🟡 Partial | Read-only list/detail view built; **no create/edit form** — cannot actually register a new project |
| §4 Monthly progress reporting module | 🟡 Partial | Read-only list built; mobile wizard is a **non-functional demo** — no real submission |
| §4 Field verification module | 🟡 Partial | Read-only list built; **no verifier workflow to create a verification record or attach evidence** |
| §4 Community feedback & referral module | 🟡 Partial | Read-only list built (safeguarding filtered from list, correctly); **no intake form, no referral/assignment workflow** |
| §4 Stakeholder commitment tracking | 🟡 Partial | Read-only list built; **no form to log a new commitment or record follow-up/closure** |
| §4 Simple dashboards | 🟢 Done | Internal + public dashboard built with stats, filters |
| §4 Downloadable Excel/PDF reports | 🔴 Missing | No export functionality exists |
| §4 Document/photo reference | 🔴 Missing | No upload capability; evidence is a text string only |
| §4 Filters by sector/type/LGA/status/period | 🟢 Done | Implemented on all list views |
| §5 Required user roles (Admin/Data Entry/Verifier/Approver/Public) | 🔴 Missing | Type defined but **completely unused** — no login, no role-based UI or data restriction |
| §6 Unique project ID enforcement | 🔴 Missing | No create form exists to enforce this against |
| §6 Distinct estimated/released/spent fields | 🟢 Done (display only) | Fields modeled correctly in types/mock data; not yet enforceable since there's no entry form |
| §6 No "Verified" without evidence + record | 🔴 Missing | No verification-creation flow exists to enforce this rule on |
| §6 No commitment "Completed" without closure evidence | 🔴 Missing | No commitment-creation/closure flow exists to enforce this rule on |
| §6 Safeguarding never public | 🟢 Done | Correctly filtered in `services/index.ts getFeedback()` |
| §9 Reporting/dashboard requirements | 🟢 Done | Totals, breakdowns, filters match spec |
| §10 Data protection: role-based access, activity logs, backups, consent controls | 🔴 Missing | No auth, no logs, no backend to back up, no consent capture UI |
| §11 Accessibility/mobile-first/plain English | 🟢 Done | Design system + components follow this |
| §11 Offline/save-and-sync | 🔴 Missing (explicitly deferred) | Labeled Phase 2 in-app |
| §11 Hausa-language readiness | 🔴 Missing | No i18n scaffolding yet |

---

## 3. Gap vs. PRD §10 MVP table (the 14 "must-have" items)

| # | PRD MVP Feature | Status | Notes |
|---|---|---|---|
| 1 | Project Register module (full CRUD) | 🔴 **Not done** | List/detail only — **no Create, Update, or Delete** |
| 2 | Monthly Progress Reporting module | 🔴 **Not done** | List only; wizard is a non-persisting demo |
| 3 | Field Verification module w/ evidence enforcement | 🔴 **Not done** | List only; no creation flow, so the enforcement rule has nothing to attach to |
| 4 | Community Feedback module w/ safeguarding restriction & consent | 🟡 **Partial** | Safeguarding filtering logic works at the read layer; no intake form or consent-capture UI |
| 5 | Commitment Tracker w/ closure-evidence enforcement | 🔴 **Not done** | List only; no creation/closure flow |
| 6 | Role-based access control | 🔴 **Not done** | No auth system at all |
| 7 | Publication workflow (Draft→Review→Approved→Published/Rejected) | 🔴 **Not done** | Status is a static display badge, not an actionable workflow |
| 8 | Internal dashboard | 🟢 **Done** | |
| 9 | Public dashboard | 🟢 **Done** | |
| 10 | Filters (sector/type/LGA/status/period) | 🟢 **Done** | |
| 11 | Evidence/document upload | 🔴 **Not done** | No file input anywhere |
| 12 | Excel/PDF export | 🔴 **Not done** | No export logic |
| 13 | Audit log (Created/Updated By) | 🔴 **Not done** | Fields exist in types (`createdBy`, `createdAt`, `updatedAt`) but are never populated or displayed from real user actions |
| 14 | Mobile-responsive UI, plain-English forms | 🟢 **Done** | Responsive layout + mobile nav implemented |

**Score: 5 of 14 MVP items fully done, 1 partial, 8 not started.** Everything "not started" is a write-path/backend concern — the entire read/display/visual layer of the MVP is essentially complete.

---

## 4. Consolidated list — features yet to be developed

### Blocking (nothing else in the MVP works correctly without these)
1. **Backend API + database** — the service layer's real-API stubs have nowhere to call; this is the single largest gap.
2. **Authentication & session management** — no login exists for any role.
3. **Role-based access control** — enforce Admin / Data Entry / Verifier / Approver / Public per TOR §5, including hiding internal routes/data from Public Users and restricting write actions by role.

### Core MVP write paths (currently read-only lists only)
4. **Create/Edit Project form** (Project Register) with unique-ID enforcement.
5. **Create Monthly Update form** that actually persists (replace the non-functional mobile wizard with a real submission flow).
6. **Create Field Verification form**, with the hard rule: cannot set result = "Verified" without an attached evidence reference.
7. **Create Community Feedback intake form**, with consent capture (default No) and safeguarding-category auto-routing to a restricted workflow.
8. **Create/Update Commitment form**, with the hard rule: cannot set status = "Completed" without closure evidence.
9. **Publication workflow actions** — real Draft → Review → Approved → Published/Rejected transitions (currently just a static label), gated by Approver role.

### Supporting MVP features
10. **Evidence/document upload** — file input, type/size validation, storage, and retrieval; strip identifying metadata (e.g. image EXIF/GPS) before anything is published.
11. **Excel/PDF export** for authorized roles.
12. **Audit logging** — populate and surface `createdBy`/`updatedAt` from real authenticated actions, plus an activity log view for Admins.
13. **Data validation layer** enforcing the Data Specification sheet's field-level rules (string lengths, required fields, non-negative currency, 0–100% progress, etc.) at the form level — not just typed in TypeScript interfaces.

### Explicitly Phase 2 (per PRD §10 — not MVP gaps, listed for completeness)
- Hausa-language UI / i18n layer
- True offline-first save-and-sync
- Automated media-metadata stripping pipeline
- Advanced analytics/trend charts
- External government system integrations

---

## 5. Recommended next build sequence

Given the "blocking" items above, the fastest path to a real MVP is:

1. Stand up backend + database (schema should mirror `types/index.ts` + the Data Specification sheet 1:1).
2. Add authentication + role-based route/action guards.
3. Build the five create/edit forms (Project, Update, Verification, Feedback, Commitment), wiring each to the backend and enforcing the four hard business rules inline (unique ID, verified-needs-evidence, completed-needs-closure-evidence, safeguarding-never-public).
4. Wire the publication workflow as real state transitions gated by Approver role.
5. Add evidence upload, then export, then audit log surfacing — these depend on steps 1–3 being real.

---
*Source comparison: `app/src/**`, `docs/PRD.md` §10, and `docs/Copy of e-CAPH Gani da Ido Accountability Tracker Prototypeand Developer TOR (1).xlsx` (Developer TOR sheet).*
