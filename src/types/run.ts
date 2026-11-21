export type RunStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed";

export type Run = {
  id: string;
  name: string;
  repository: string;
  status: RunStatus;
  branch: string;
  createdAt: string;
  durationSeconds?: number;
  logs: string[];
  result?: string;
}