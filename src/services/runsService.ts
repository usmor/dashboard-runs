import { mockRuns } from "../data/mocks";
import type { Run } from "../types/run";

export const getRuns = (): Promise<Run[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRuns);
    }, 600);
  });
};
