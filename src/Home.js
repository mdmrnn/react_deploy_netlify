import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

export default function Home({ isLoading }) {
  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <main className="home">
      {isLoading && (
        <p className="status-msg" style={{ marginTop: "2rem" }}>
          posts are Loading ...
        </p>
      )}
      {!isLoading && !searchResults && (
        <p className="status-msg" style={{ marginTop: "2rem" }}>
          No post to display
        </p>
      )}
      {!isLoading && <Feed posts={searchResults} />}
    </main>
  );
}
