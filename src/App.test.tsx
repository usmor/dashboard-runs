import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";
import App from "./App";
import * as runsService from "./services/runsService";
import type { Run } from "./types/run";

const mockData: Run[] = [
  {
    id: "1",
    name: "Auth refactor",
    repository: "web-platform",
    branch: "feature/auth",
    status: "running",
    createdAt: "2026-11-21T12:30:00Z",
    logs: ["Log 1", "Log 2"],
  },
  {
    id: "2",
    name: "Fix checkout tests",
    repository: "payments",
    branch: "fix/checkout",
    status: "succeeded",
    createdAt: "2026-11-21T11:15:00Z",
    durationSeconds: 245,
    logs: ["Log 3"],
    result: "All tests passed",
  },
  {
    id: "3",
    name: "Update dependencies",
    repository: "api-service",
    branch: "chore/update",
    status: "queued",
    createdAt: "2026-11-21T13:00:00Z",
    logs: ["Waiting in queue"],
  },
];

describe("App", () => {
  beforeEach(() => {
    vi.spyOn(runsService, "getRuns").mockResolvedValue(mockData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderApp = () => {
    return render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

  it("filters runs by status", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Auth refactor");

    await user.click(
      screen.getByRole("button", { name: "Succeeded" })
    );

    expect(screen.getByText("Fix checkout tests")).toBeInTheDocument();
    expect(screen.queryByText("Auth refactor")).not.toBeInTheDocument();
    expect(screen.queryByText("Update dependencies")).not.toBeInTheDocument();
  });

  it("opens run details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Auth refactor");

    const card = screen.getByRole("button", {
      name: /Auth refactor/i,
    });

    await user.click(card);

    expect(await screen.findByText("Logs")).toBeInTheDocument();
    expect(screen.getByText("Log 1")).toBeInTheDocument();
    expect(screen.getByText("Log 2")).toBeInTheDocument();
  });

  it("shows an empty state when no runs match and resets filters", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Auth refactor");

    await user.click(
      screen.getByRole("button", { name: "Failed" })
    );

    expect(
      screen.getByText("Nothing found")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Try changing your search or filters.")
    ).toBeInTheDocument();

    const resetButton = screen.getByRole("button", {
      name: "Reset search and filters",
    });

    await user.click(resetButton);

    expect(await screen.findByText("Auth refactor")).toBeInTheDocument();
    expect(screen.getByText("Fix checkout tests")).toBeInTheDocument();
    expect(screen.getByText("Update dependencies")).toBeInTheDocument();
  });

  it("sorts runs by date in ascending and descending order", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Auth refactor");

    const getRunOrder = () => {
      const runNames = [
        "Auth refactor",
        "Fix checkout tests",
        "Update dependencies",
      ];

      return runNames
        .map((name) => ({
          name,
          element: screen.getByText(name),
        }))
        .sort((a, b) => {
          return a.element.compareDocumentPosition(b.element) &
            Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1;
        })
        .map((run) => run.name);
    };

    expect(getRunOrder()).toEqual([
      "Update dependencies",
      "Auth refactor",
      "Fix checkout tests",
    ]);

    await user.click(
      screen.getByRole("button", { name: /Newest first/ })
    );

    await user.click(
      screen.getByRole("button", { name: "Oldest first" })
    );

    expect(getRunOrder()).toEqual([
      "Fix checkout tests",
      "Auth refactor",
      "Update dependencies",
    ]);
  });
});