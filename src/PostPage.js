import { useParams, Link } from "react-router-dom";

export default function PostPage({ posts, handleDelete }) {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="post-page">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="post-date">{post.datetime}</p>
            <p className="post-body">{post.body}</p>
            <button className="delete-btn" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>well thats disappointing</p>
            <Link to="/">Home</Link>
          </>
        )}
      </article>
    </main>
  );
}
