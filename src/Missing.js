import { Link } from "react-router-dom";
export default function Missing() {
  return (
    <main className="missing">
      <h2>404 Error</h2>
      <p>The web page not found</p>
      <p> well, thats disappointing</p>
      <Link to="/">Visit The Home Page</Link>
    </main>
  );
}
