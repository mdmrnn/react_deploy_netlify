import Feed from "./Feed";
export default function Home({ posts, isLoading }) {
  return (
    <main className="home">
      {isLoading && (
        <p className="status-msg" style={{ marginTop: "2rem" }}>
          posts are Loading ...
        </p>
      )}
      {!isLoading && !posts.length && (
        <p className="status-msg" style={{ marginTop: "2rem" }}>
          No post to display
        </p>
      )}
      {!isLoading && <Feed posts={posts} />}
    </main>
  );
}
