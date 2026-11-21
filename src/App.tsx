import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";
import type { Run } from "./types/run";
import { getRuns } from "./services/runsService";
import { CardList } from "./components/cardList/CardList";
import { RunDetails } from "./components/runDetails/RunDetails";
import {
  StatusFilter,
  type FilterValue,
} from "./components/statusFilter/StatusFilter";
import { Search } from "./components/search/Search";
import { SortMenu, type SortValue } from "./components/sortMenu/SortMenu";
import { useSearchParams } from "react-router-dom";

export const App = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortValue>("newest");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const statusParam = searchParams.get("status");

  const statusFilter: FilterValue =
    statusParam === "queued" ||
    statusParam === "running" ||
    statusParam === "succeeded" ||
    statusParam === "failed"
      ? statusParam
      : "all";

  const handleStatusChange = (value: FilterValue) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "all") {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }

    setSearchParams(newParams);
  };

  const fetchRuns = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const data = await getRuns();
      setRuns(data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  const filteredRuns = runs.filter((run) => {
    const matchesStatus = statusFilter === "all" || run.status === statusFilter;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      run.name.toLowerCase().includes(query) ||
      run.repository.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const sortedRuns = [...filteredRuns].sort((a, b) => {
    if (sortBy === "newest" || sortBy === "oldest") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    }

    if (a.durationSeconds === undefined) return 1;
    if (b.durationSeconds === undefined) return -1;

    return sortBy === "shortest"
      ? a.durationSeconds - b.durationSeconds
      : b.durationSeconds - a.durationSeconds;
  });

  return (
    <div className="app">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="app-content">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="app-main">
          <header className="main-header">
            <span className="main-subtitle">WORKSPACE / RUNS</span>
            <p className="main-description">
              Manage and monitor your AI agent runs.
            </p>
          </header>
          {!isLoading && !error && (
            <section className="runs-settings">
              <Search value={searchQuery} onChange={setSearchQuery} />
              <StatusFilter
                currentFilter={statusFilter}
                onChange={handleStatusChange}
              />
              <SortMenu value={sortBy} onChange={setSortBy} />
            </section>
          )}

          <section className="runs">
            {isLoading && <p>Loading runs...</p>}

            {error && (
              <div>
                <p>Something went wrong while loading runs.</p>
                <button onClick={fetchRuns}>Try again</button>
              </div>
            )}

            {!isLoading && !error && runs.length === 0 && <p>No runs found.</p>}

            {!isLoading &&
              !error &&
              runs.length > 0 &&
              (filteredRuns.length > 0 ? (
                <CardList runs={sortedRuns} onRunClick={setSelectedRun} />
              ) : (
                <div className="empty-state">
                  <h3>Nothing found</h3>
                  <p>Try changing your search or filters.</p>
                  <button
                    type="button"
                    className="empty-state-button"
                    onClick={() => {
                      setSearchQuery("");
                      handleStatusChange("all");
                    }}
                  >
                    Reset search and filters
                  </button>
                </div>
              ))}
          </section>
        </main>
      </div>
      {selectedRun && (
        <RunDetails run={selectedRun} onClose={() => setSelectedRun(null)} />
      )}
    </div>
  );
};
export default App;
