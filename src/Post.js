import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <article className="post">
      {post && (
        <>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className="post-date">{post.datetime}</p>
          </Link>
          <p className="post-body">{post.body.slice(0, 25) + "..."}</p>
        </>
      )}
      {!post && (
        <>
          <h2>Post Not Found</h2>
          <p>Disappointing</p>
          <Link to="/">Home</Link>
        </>
      )}
    </article>
  );
}
