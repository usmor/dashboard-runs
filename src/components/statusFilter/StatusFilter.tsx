import type { RunStatus } from "../../types/run";
import "./StatusFilter.css";

export type FilterValue = RunStatus | "all";
type StatusFilterProps = {
  currentFilter: FilterValue;
  onChange: (value: FilterValue) => void;
};

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "queued", label: "Queued" },
  { value: "running", label: "Running" },
  { value: "succeeded", label: "Succeeded" },
  { value: "failed", label: "Failed" },
];

export const StatusFilter = ({ currentFilter, onChange }: StatusFilterProps) => {
  return (<div className="status-filter">
    {FILTER_OPTIONS.map((option) => (
      <button
        key={option.value}
        type="button"
        className={`status-filter-button ${
          currentFilter === option.value ? "status-filter-button-active" : ""
        }`}
        onClick={() => onChange(option.value)}
      >{option.label}</button>
    ))}
  </div>)
};
