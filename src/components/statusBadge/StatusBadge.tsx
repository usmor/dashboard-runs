import type { RunStatus } from "../../types/run";
import "./StatusBadge.css";

type StatusBadgeProps = {
  status: RunStatus;
};

const statusLabels: Record<RunStatus, string> = {
  queued: "Queued",
  running: "Running",
  succeeded: "Succeeded",
  failed: "Failed",
};

export const StatusBadge = ({status} : StatusBadgeProps) => {
  const label = statusLabels[status];
  return (
    <span className={`status-badge status-badge--${status}`}>
      {label}
    </span>
  )
}
