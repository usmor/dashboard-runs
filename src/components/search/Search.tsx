import './Search.css';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Search = ({value, onChange}: SearchProps) => {
  return (
    <div className='search'>
      <input
        type="search"
        className="search-input"
        placeholder="Search by run or repository..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search by run name or repository"
      />
    </div>
  )
}