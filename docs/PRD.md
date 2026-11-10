# Product Requirements Document (PRD)
## Gani da Ido — Government & Public Project Accountability Tracker

**Status:** Draft v1.0
**Author:** Derived from e-CAPH Excel Prototype & Developer TOR
**Implementing Org:** e-CAPH
**Program:** PAF-GSE Kaduna Project
**Funding Partner:** Malala Fund

---

## 1. Background

Gani da Ido ("Eyes on the Ground") is a public-project tracking and social-accountability platform built under the PAF-GSE Kaduna Project. Its core purpose is to let citizens, government partners, and civil society track **government-funded (capital) and donor-funded public projects** end-to-end: what was budgeted, what was released, what was actually built or delivered, and whether it matches what was promised. It currently exists as an Excel prototype (project register, monthly updates, field verification, feedback, commitments, dashboard). This PRD defines the requirements for converting that prototype into a secure, accessible, web-and-mobile-responsive platform.

The tracker is sector-agnostic by design and is applied across **education, health, environment, and social protection** projects — the same tracking logic (register → budget/release → verify → report) applies regardless of sector, since the underlying problem is government project accountability, not any single sector.

## 2. Problem Statement

Government-funded and donor-funded public infrastructure and service projects in Kaduna State lack a shared, verifiable system for tracking what was budgeted, what was released and spent, what was actually delivered on the ground, and whether implementation matches official claims. Progress and completion claims are not consistently checked against field evidence, procurement and budget-release timelines are opaque to the public, community feedback on project quality is not systematically captured, and stakeholder/government commitments on projects go untracked. This creates public accountability gaps and limits evidence-based oversight of public spending.

## 3. Goals & Objectives

- Give e-CAPH, government partners, and communities one system to register public projects, track budgets and releases, report implementation progress, verify evidence, capture feedback, and track official commitments to closure.
- Provide a transparent, public-facing record of government and donor-funded project status, budgets, and delivery — the core public-accountability objective.
- Make the system usable by non-technical users (government focal persons, field officers, citizens) in low-bandwidth settings.
- Ensure claims of progress or completion on public projects are backed by field evidence, not self-report alone.
- Protect sensitive and safeguarding information while still enabling public transparency on aggregated, approved project and budget data.
- Produce a platform that supports oversight, advocacy, and decision-making with reliable, exportable data on public project performance.

### Non-Goals (explicitly out of scope for this PRD)
- Full case-management system for safeguarding cases (only a referral/tracking record, not investigation workflow).
- Financial disbursement or payment processing.
- Automated data collection from third-party government systems (manual entry only, v1).

## 4. Target Users & Roles

| Role | Description | Primary Actions |
|---|---|---|
| **Administrator** | e-CAPH system owner | Manage users, roles, reference lists (sectors, LGAs, statuses) |
| **Data Entry** (M&E / Project Officer, LGA focal person) | Creates/updates assigned records | Register projects, submit monthly updates |
| **Verifier** (authorized field verifier) | Confirms claims against evidence | Conduct and record field/document verification |
| **Approver** (M&E Officer / management) | Quality and publication gatekeeper | Review, approve, publish, or reject records |
| **Community Focal / Helpdesk** | Receives and triages community input | Log community feedback, route safeguarding referrals |
| **Advocacy / Management Lead** | Tracks institutional accountability | Record and follow up on stakeholder commitments |
| **Public User** | Citizens, taxpayers, media, oversight bodies, donors | View approved, aggregated, non-sensitive dashboards on public project status and spending |

## 5. User Workflow (end-to-end)

1. **Register** — Data Entry creates a project profile once, with a unique Project ID.
2. **Report** — Responsible officer submits a monthly progress update (one row per project per month).
3. **Verify** — Authorized verifier visits/checks evidence before any "Verified" status is applied.
4. **Listen** — Community focal records feedback or complaints; safeguarding concerns are referred through a protected pathway.
5. **Follow Up** — Advocacy lead tracks stakeholder commitments until closed with evidence.

## 6. Functional Requirements by Module

### 6.1 Project Register
- Create/edit project profile: Project ID (unique, auto-generated, immutable), Project Name, Short Description, Sector, Project Type, Lead Institution/Funder, LGA/Level (supports State and multiple LGAs), Location/Ward, Estimated Cost, Amount Released, Start/Expected End Date, Current Status, Primary Beneficiaries, Public Contact/Focal Point, Source/Document Reference, Last Updated.
- Enforce one unique ID per project; ID format convention (e.g., `GDI-EDU-001`).
- Sector: single-select dropdown — Education, Health, Environment, Social Protection (sector is a classification tag, not a feature gate — tracking logic is identical across sectors).
- **Project Type / funding classification (primary government-tracking field):** single-select dropdown — **Capital Project** (government-funded infrastructure/equipment recorded in a public budget), **Donor-Funded Project**, **Community-Supported Project** — plus a required funding institution field. This classification is what lets the platform separate public-budget spending from donor and community contributions for oversight purposes.

### 6.2 Monthly Progress Reporting
- One record per Project ID per reporting month (versioned if resubmitted, with audit history retained).
- Fields: Update ID, Project ID, Reporting Month, Officer/Reporter, Activities Completed, Main Result/Output, Current Status, Progress % (0–100, cumulative), Amount Released to Date, Amount Spent to Date (cumulative), People Reached, Women/Girls Reached, Persons with Disabilities Reached, Main Challenge, Next Action, Evidence Reference/Link.
- Reported progress is flagged as self-reported until verified.

### 6.3 Field Verification
- Triggered after a site visit, document check, or structured call.
- Fields: Verification ID, Project ID, Verification Date, Verifier Name, Verification Method, Expected vs. Observed, Physical Progress %, Financial Information Sighted (Y/N), Quality Acceptable (Y/N), Community Members Consulted, Verification Result (Verified / Partly Verified / Not Verified / Pending), Key Gap/Concern, Corrective Action Required, Evidence Reference/Photo File.
- **Hard rule:** a project cannot be marked "Verified" without an attached evidence reference.

### 6.4 Community Feedback & Referral
- Fields: Feedback ID, Date Received, Project ID, LGA/Community, Source Group, Feedback Category (Information Request, Complaint, Suggestion, Safeguarding Concern, Service Gap, Positive Feedback), Summary, Priority, Consent to Use Anonymously (default **No**), Assigned To, Action/Referral Taken, Case Status, Date Closed, Public Response.
- Safeguarding-category feedback auto-routes to a restricted workflow and is excluded from any public view, regardless of consent.
- Consent ≠ permission to disclose identity — identity fields are never shown publicly even with consent.

### 6.5 Stakeholder Commitment Tracker
- Fields: Commitment ID, Date Made, Project ID/Issue, Institution/Stakeholder, Commitment Made, Responsible Person/Office, Due Date, Evidence of Commitment, Status, Progress Note, Last/Next Follow-up Date, Closure Evidence, Public Update.
- **Hard rule:** a commitment cannot be marked "Completed"/closed without closure evidence attached.

### 6.6 Dashboards & Reporting — Public Spending Transparency
- Internal dashboard: registered projects count, total estimated cost, amount released/spent (budget utilization), average progress %, open community issues, breakdowns by sector/project type/LGA/status.
- Public dashboard: aggregated/approved data only — government and donor budgets, releases, spend-to-date, and delivery status per project — no individual safeguarding cases, no personal identifiers. This is the platform's primary public-accountability deliverable: a citizen-facing view of whether public money committed to a project was released and whether the project was actually delivered.
- Filters: sector, project type (capital / donor-funded / community-supported), LGA, status, reporting period.
- Exports: downloadable Excel/PDF reports for authorized roles, and for public summary reports to support oversight and advocacy.

### 6.7 Evidence & Document Handling
- Attach photos/documents to verification, feedback (where applicable), and commitment-closure records.
- Enforce allowed file types and size limits.
- Strip unsafe/identifying metadata (e.g., GPS EXIF data) from images before any publication.

### 6.8 Publication Workflow
- Every record carries a Publication Status: **Draft → Review → Approved → Published / Rejected.**
- Only "Published" status is visible on the public-facing dashboard.

## 7. Data Model Summary

| Module | Key Fields | Public? | Sensitive? |
|---|---|---|---|
| Project | ID, Name, Sector, Type, LGA, Cost, Released | Yes | No |
| Update | Month, Progress %, Spend to Date | Yes | No |
| Verification | Result, Evidence Reference | Yes (result) | Evidence potentially sensitive |
| Feedback | Category, Consent, Assigned To | Restricted summary only | Potentially (identity) |
| Commitment | Commitment, Closure Evidence | Yes once approved | Potentially |
| System | Created/Updated By, Publication Status | No / workflow-gated | Audit log is restricted |

Full field-level validation rules (type, required/optional, format) are defined in the source workbook's **Data Specification** sheet and must be preserved 1:1 in the database schema.

## 8. Business Rules (must-enforce)

1. Every project has a unique, immutable ID.
2. Financial fields are always separated into Estimated Cost / Amount Released / Amount Spent — never conflated.
3. No "Verified" status without a verification record + evidence reference.
4. No commitment "Completed" without closure evidence.
5. Safeguarding-flagged feedback never appears on any public-facing view, under any consent setting.
6. Only records with Publication Status = Published are visible to Public Users.
7. One monthly update per project per month, with full audit/version history retained on resubmission.

## 9. Non-Functional Requirements

- **Accessibility/Usability:** plain English UI; mobile-first and mobile-responsive; large touch targets; simple forms; clear error messages; accessible color contrast.
- **Localization:** architecture must allow future Hausa-language translation (not required for MVP UI copy, but no hard-coded English strings — use a translatable string layer).
- **Performance:** low-data page weight suitable for constrained mobile networks in Kaduna LGAs.
- **Resilience:** offline or save-and-sync capability where feasible for field data entry.
- **Security & Data Protection:**
  - Role-based access control matching Section 4 roles.
  - Collect the minimum personal data necessary.
  - Never publish names of children, complainants, survivors, patients, or vulnerable beneficiaries.
  - Secure password policy, activity/audit logs, regular backups, consent capture and enforcement.
- **Auditability:** immutable Created/Updated By log on every record.

## 10. MVP Scope — What Ships First

The MVP is the smallest system that lets e-CAPH fully replace the Excel workbook for one working pilot cycle (register → report → verify → listen → follow up) without breaking any of the hard business rules in Section 8.

### ✅ MVP — Must Have

| # | Feature | Why it's MVP |
|---|---|---|
| 1 | **Project Register module** (full CRUD, unique ID enforcement, sector/type/LGA dropdowns) | Nothing else in the system functions without a project record to attach to. |
| 2 | **Monthly Progress Reporting module** (one row per project/month, cumulative financial & progress fields) | Core recurring workflow; replaces the workbook's primary use case. |
| 3 | **Field Verification module with evidence-attachment enforcement** | The TOR's central accountability promise — self-reported progress must be checkable. This is a non-negotiable business rule, not an enhancement. |
| 4 | **Community Feedback module** incl. safeguarding category auto-restriction and consent handling | Core "Listen" step; safeguarding protection is a legal/ethical requirement, not optional polish. |
| 5 | **Commitment Tracker module with closure-evidence enforcement** | Core "Follow up" step; mirrors the verification rule — no status change without evidence. |
| 6 | **Role-based access control** (Admin, Data Entry, Verifier, Approver, Public User) | Required to safely separate draft/internal data from public data from day one. |
| 7 | **Publication workflow** (Draft → Review → Approved → Published/Rejected) | The only mechanism that keeps sensitive data off the public dashboard — required before any public view can exist. |
| 8 | **Internal dashboard** (portfolio totals, by sector/type/LGA/status, open feedback count) | Lets admins/management actually use the data without exporting to Excel. |
| 9 | **Public dashboard** (approved, aggregated data only) | Delivers on the "public-accountability platform" objective — the point of the whole project. |
| 10 | **Filters** by sector, project type, LGA, status, period | Required for the dashboards above to be usable at all. |
| 11 | **Evidence/document upload** (photos, files) with type/size limits | Verification and commitment closure are meaningless without attachable proof. |
| 12 | **Excel/PDF export** for authorized roles | Explicitly listed as a minimum functional module in the TOR; needed for existing reporting/donor obligations. |
| 13 | **Audit log** (Created/Updated By, timestamps) | Required for the accountability/trust model to hold up; also a safeguarding requirement. |
| 14 | **Mobile-responsive UI, plain-English forms** | Stated as mandatory for field officers and LGA focal persons using phones. |

### 🚫 Explicitly Deferred Past MVP (Phase 2+)

| Feature | Reason deferred |
|---|---|
| Hausa-language UI | TOR lists this as "future support," not a launch requirement — architect for it, don't build it now. |
| True offline-first sync (conflict resolution, local storage sync) | High engineering cost; "where feasible" language in TOR signals it's a stretch goal, not a gate. |
| Automated metadata stripping pipeline for all uploaded media | Can start as a manual/semi-automated check in MVP; full automation is an optimization. |
| Advanced analytics / trend charts beyond totals and breakdowns | Dashboard requirement is satisfied by simple aggregates first. |
| Integration with external government data systems | Not mentioned in TOR; no current data source to integrate with. |
| Multi-language content beyond Hausa, SMS/USSD channels | Not in scope of current TOR. |

## 11. Suggested Implementation Stages (per TOR §13)

1. Confirm requirements and data fields (this PRD + sign-off).
2. Design wireframes and approval workflow.
3. Build MVP (Section 10 scope).
4. Test with e-CAPH and LGA users.
5. Correct issues, train users, launch controlled pilot.
6. Review pilot evidence before public expansion.

## 12. Acceptance Criteria (per TOR §14)

- All agreed modules function as specified.
- Financial and progress calculations reconcile correctly across Register, Updates, and Verification.
- Validation rules prevent saving incomplete critical records (e.g., Verified without evidence).
- Sensitive/safeguarding content is provably hidden from all public views.
- Authorized roles can export reports in Excel/PDF.
- Forms function correctly on common mobile devices.
- System passes user acceptance testing with e-CAPH and LGA users.
- Full documentation (user guide, admin guide) and source code are handed over.

## 13. Risks & Open Questions

| Risk/Question | Notes |
|---|---|
| Who hosts/maintains the system post-handover? | TOR asks developer to state hosting/maintenance assumptions — needs decision before build. |
| Offline capability feasibility in target LGAs | Depends on actual connectivity conditions; needs field validation. |
| Volume of safeguarding referrals | Determines whether a lightweight referral record (MVP) is sufficient or a fuller case-management tool is eventually needed. |
| Data ownership & developer confidentiality | Per TOR §18, all data/configs/source belong to e-CAPH; contract must reflect this. |

## 14. Ownership & Governance

- Developer reports to the e-CAPH Project Coordinator.
- Technical review: M&E Officer.
- Approval oversight: authorized e-CAPH management.
- Any change to scope, fields, or publication rules requires written approval.
- All data, configurations, documentation, and source code belong to e-CAPH.

---
*Source: e-CAPH "Gani da Ido" Excel prototype and Developer Terms of Reference (`docs/Copy of e-CAPH Gani da Ido Accountability Tracker Prototypeand Developer TOR (1).xlsx`).*
