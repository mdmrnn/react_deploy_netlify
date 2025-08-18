import Feed from "./Feed";
export default function Home({ posts, isLoading }) {
  return (
    <main className="home">
      {isLoading && <p style={{ marginTop: "2rem" }}>posts are Loading ...</p>}
      {!isLoading && posts.length && <Feed posts={posts} />}
      {!isLoading && !posts.length && (
        <p style={{ marginTop: "2rem" }}>No post to display.</p>
      )}
    </main>
  );
}
