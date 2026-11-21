import type { Run } from "../../types/run";
import { formatDate } from "../../utils/FormatDate";
import { formatDuration } from "../../utils/FormatDuration";
import { StatusBadge } from "../statusBadge/StatusBadge";
import "./RunDetails.css";

type RunDetailsProps = {
  run: Run;
  onClose: () => void;
};

export const RunDetails = ({ run, onClose }: RunDetailsProps) => {
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="drawer-header">
          <div>
            <span className="drawer-subtitle">RUN DETAILS</span>
            <h2 id="drawer-title" className="drawer-title">
              {run.name}
            </h2>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close details"
          >
            ×
          </button>
        </header>
        <div className="drawer-content">
          <section className="drawer-section">
            <h3>Overview</h3>

            <div className="drawer-info">
              <span>Status</span>
              <div className="drawer-status">
                <StatusBadge status={run.status} />
              </div>
            </div>

            <div className="drawer-info">
              <span>Repository</span>
              <strong>{run.repository}</strong>
            </div>

            <div className="drawer-info">
              <span>Branch</span>
              <strong>{run.branch}</strong>
            </div>

            <div className="drawer-info">
              <span>Created</span>
              <strong>{formatDate(run.createdAt)}</strong>
            </div>

            <div className="drawer-info">
              <span>Duration</span>
              <strong>{formatDuration(run.durationSeconds)}</strong>
            </div>
          </section>
          <section className="drawer-section">
            <h3>Result</h3>
            <p className="drawer-result">
              {run.result || "No result available yet."}
            </p>
          </section>
          <section className="drawer-section">
            <h3>Logs</h3>
            {run.logs && run.logs.length > 0 ? (
              <ol>
                {run.logs.map((log, index) => (
                  <li key={index} className="drawer-log">
                    {log}
                  </li>
                ))}
              </ol>
            ) : (
              <p>No logs available.</p>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
};
