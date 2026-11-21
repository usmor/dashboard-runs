import { useEffect } from "react";
import "./Sidebar.css";

const navigationItems = [
  "Runs",
  "Projects",
  "Devboxes",
  "Previews",
  "Snapshots",
  "Settings",
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={onClose}
          aria-label="Close navigation menu"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <header className="sidebar-header">
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ×
          </button>
          <h2 className="sidebar-title">WORKSPACE</h2>
        </header>

        <nav className="sidebar-navigation" aria-label="Workspace navigation">
          {navigationItems.map((item) => (
            <div
              key={item}
              className={`sidebar-item ${
                item === "Runs" ? "sidebar-item-active" : ""
              }`}
              onClick={onClose}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
