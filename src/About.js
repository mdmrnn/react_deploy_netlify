import { Link } from "react-router-dom";
export default function About() {
  return (
    <main className="about">
      <h2>About</h2>
      <p style={{ marginTop: "1rem" }}> this is my first weblog </p>
      <p>
        <Link to="/">Home Page</Link>
      </p>
    </main>
  );
}
