import type { Run } from "../../types/run";
import { Card } from "../card/Card";
import "./CardList.css";

type CardListProps = {
  runs: Run[];
  onRunClick: (run: Run) => void;
};

export const CardList = ({ runs, onRunClick }: CardListProps) => {
  return (
    <div className="runs-list">
      <div className="runs-list-scroll">
        <div className="runs-list-header">
          <span>RUN</span>
          <span>REPOSITORY</span>
          <span>BRANCH</span>
          <span>CREATED</span>
          <span>DURATION</span>
          <span>STATUS</span>
        </div>

        <div className="runs-list-items">
          {runs.map((run) => (
            <Card key={run.id} run={run} onClick={onRunClick} />
          ))}
        </div>
      </div>
    </div>
  );
};