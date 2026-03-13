import { useState, type FC } from "react";
import { signOut } from "aws-amplify/auth";

type CaseType = "Personal Injury" | "Medical Malpractice" | "Birth Injury";

interface Case {
  id: string;
  patientName: string;
  caseType: CaseType;
  dateOpened: string;
  status: "Active" | "Review" | "Closed";
  lastUpdated: string;
  events: number;
}

interface DashboardProps {
  user: { username: string; email: string };
  onLogout: () => void;
}

const DEMO_CASES: Case[] = [
  {
    id: "C-2024-001",
    patientName: "John A. Smith",
    caseType: "Personal Injury",
    dateOpened: "2024-01-15",
    status: "Active",
    lastUpdated: "2024-03-10",
    events: 12,
  },
  {
    id: "C-2024-002",
    patientName: "Maria L. Garcia",
    caseType: "Medical Malpractice",
    dateOpened: "2024-02-03",
    status: "Review",
    lastUpdated: "2024-03-08",
    events: 8,
  },
  {
    id: "C-2024-003",
    patientName: "Robert J. Thompson",
    caseType: "Birth Injury",
    dateOpened: "2023-11-20",
    status: "Active",
    lastUpdated: "2024-03-12",
    events: 21,
  },
  {
    id: "C-2024-004",
    patientName: "Linda K. Patel",
    caseType: "Medical Malpractice",
    dateOpened: "2024-01-28",
    status: "Closed",
    lastUpdated: "2024-02-28",
    events: 15,
  },
];

const TIMELINE_EVENTS = [
  { date: "2024-03-12", label: "Medical records reviewed", type: "record" },
  { date: "2024-03-08", label: "Expert consultation scheduled", type: "consult" },
  { date: "2024-02-25", label: "Radiology reports uploaded", type: "upload" },
  { date: "2024-02-14", label: "Initial case assessment completed", type: "assessment" },
  { date: "2024-01-30", label: "Case file created", type: "create" },
];

const caseTypeColors: Record<CaseType, string> = {
  "Personal Injury": "#4a9eff",
  "Medical Malpractice": "#a855f7",
  "Birth Injury": "#38bdf8",
};

const statusColors: Record<string, string> = {
  Active: "#22d3ee",
  Review: "#a78bfa",
  Closed: "#60a5fa",
};

const CASE_TYPES: CaseType[] = ["Personal Injury", "Medical Malpractice", "Birth Injury"];

const Dashboard: FC<DashboardProps> = ({ user, onLogout }) => {
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType | "All">("All");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const filteredCases =
    selectedCaseType === "All"
      ? DEMO_CASES
      : DEMO_CASES.filter((c) => c.caseType === selectedCaseType);

  const metrics = {
    total: DEMO_CASES.length,
    active: DEMO_CASES.filter((c) => c.status === "Active").length,
    review: DEMO_CASES.filter((c) => c.status === "Review").length,
    closed: DEMO_CASES.filter((c) => c.status === "Closed").length,
  };

  return (
    <div className="dashboard-container">
      {/* Top Nav */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="logo-h-sm">H</span>
          <span className="nav-brand-text">ybridAI</span>
          <span className="nav-separator">|</span>
          <span className="nav-subtitle">Medical Chronology &amp; Analyzer Intelligence</span>
        </div>
        <div className="nav-user">
          <span className="user-badge">{user.email || user.username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </nav>

      <div className="dashboard-body">
        {/* Metrics Bar */}
        <div className="metrics-bar">
          {[
            { label: "Total Cases", value: metrics.total, color: "#60a5fa" },
            { label: "Active", value: metrics.active, color: "#22d3ee" },
            { label: "In Review", value: metrics.review, color: "#a78bfa" },
            { label: "Closed", value: metrics.closed, color: "#818cf8" },
          ].map((m) => (
            <div className="metric-card" key={m.label}>
              <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-main">
          {/* Left Panel - Cases */}
          <div className="cases-panel">
            <div className="panel-header">
              <h2 className="panel-title gradient-text-inline">Case Management</h2>
              <div className="case-type-filters">
                <button
                  className={`filter-btn ${selectedCaseType === "All" ? "active" : ""}`}
                  onClick={() => setSelectedCaseType("All")}
                >
                  All
                </button>
                {CASE_TYPES.map((ct) => (
                  <button
                    key={ct}
                    className={`filter-btn ${selectedCaseType === ct ? "active" : ""}`}
                    onClick={() => setSelectedCaseType(ct)}
                    style={selectedCaseType === ct ? { borderColor: caseTypeColors[ct], color: caseTypeColors[ct] } : {}}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </div>

            <div className="cases-list">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className={`case-card ${selectedCase?.id === c.id ? "selected" : ""}`}
                  onClick={() => setSelectedCase(c)}
                >
                  <div className="case-card-top">
                    <span className="case-id">{c.id}</span>
                    <span
                      className="case-status-badge"
                      style={{ background: `${statusColors[c.status]}22`, color: statusColors[c.status], border: `1px solid ${statusColors[c.status]}44` }}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="case-patient">{c.patientName}</div>
                  <div className="case-meta">
                    <span
                      className="case-type-tag"
                      style={{ color: caseTypeColors[c.caseType] }}
                    >
                      {c.caseType}
                    </span>
                    <span className="case-events">{c.events} events</span>
                  </div>
                  <div className="case-dates">
                    <span>Opened: {c.dateOpened}</span>
                    <span>Updated: {c.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Timeline / Details */}
          <div className="timeline-panel">
            {selectedCase ? (
              <>
                <div className="panel-header">
                  <h2 className="panel-title gradient-text-inline">
                    Chronology Timeline — {selectedCase.id}
                  </h2>
                  <span className="case-patient-label">{selectedCase.patientName}</span>
                </div>
                <div className="timeline">
                  {TIMELINE_EVENTS.map((ev, i) => (
                    <div className="timeline-event" key={i}>
                      <div className="timeline-dot" />
                      <div className="timeline-line" />
                      <div className="timeline-content">
                        <span className="timeline-date">{ev.date}</span>
                        <span className="timeline-label">{ev.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="timeline-placeholder">
                <div className="placeholder-icon">📋</div>
                <p className="placeholder-text">Select a case to view its chronology timeline</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
