import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./Context/DataContext";

export default function Home() {
  const { searchResults, isLoading } = useContext(DataContext);

  return (
    <main className="home">
      {isLoading && (
        <p className="status-msg" style={{ marginTop: "2rem" }}>
          posts are Loading ...
        </p>
      )}
      {!isLoading && !searchResults.length && (
        <p className="status-msg" style={{ marginTop: "2rem" }}>
          No post to display
        </p>
      )}
      {!isLoading && <Feed posts={searchResults} />}
    </main>
  );
}
