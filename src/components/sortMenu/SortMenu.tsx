import { useState } from "react";
import "./SortMenu.css";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "shortest", label: "Shortest duration" },
  { value: "longest", label: "Longest duration" },
];

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

type SortMenuProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

export const SortMenu = ({ value, onChange }: SortMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentOption = SORT_OPTIONS.find((option) => option.value === value);

  const handleSelect = (newValue: SortValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="sort-menu">
      <button
        type="button"
        className="sort-menu-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="sort-menu-list"
      >
        <span aria-hidden="true">↕</span>
        <span>{currentOption?.label}</span>
      </button>

      {isOpen && (
        <ul
          id="sort-menu-list"
          className="sort-menu-dropdown"
          aria-label="Sort runs"
        >
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`sort-menu-option ${
                  value === option.value ? "sort-menu-option--active" : ""
                }`}
                onClick={() => handleSelect(option.value)}
                aria-current={value === option.value ? "true" : undefined}
              >
                <span>{option.label}</span>
                {value === option.value && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
