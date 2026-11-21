import type { Run } from "../../types/run";
import { formatDate } from "../../utils/FormatDate";
import { formatDuration } from "../../utils/FormatDuration";
import { StatusBadge } from "../statusBadge/StatusBadge";
import "./Card.css";

type CardProps = {
  run: Run;
  onClick: (run: Run) => void;
};

export const Card = ({ run, onClick }: CardProps) => {
  return (
    <article
      className="card"
      onClick={() => onClick(run)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(run);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <h3 className="card-name">{run.name}</h3>

      <span data-label="Repository">{run.repository}</span>
      <span data-label="Branch">{run.branch}</span>
      <span data-label="Created">{formatDate(run.createdAt)}</span>
      <span data-label="Duration">{formatDuration(run.durationSeconds)}</span>

      <div className="card-status">
        <StatusBadge status={run.status} />
      </div>
    </article>
  );
};
