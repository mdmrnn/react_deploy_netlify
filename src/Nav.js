import { Link } from "react-router-dom";

export default function Nav({ search, setSearch }) {
  return (
    <nav className="nav">
      <form
        className="search-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
