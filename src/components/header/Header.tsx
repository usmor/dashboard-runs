import "./Header.css";

type HeaderProps = {
  onMenuClick: () => void;
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="header-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <span aria-hidden="true">☰</span>
        </button>
        <h1 className="header-title">My Application</h1>
      </div>
      <span className="header-project">PROJECT / web-platform</span>
    </header>
  );
};
