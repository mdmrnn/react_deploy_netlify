import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <article className="post">
      <>
        <Link to={`/post/${post.id}`}>
          <h2>{post.title}</h2>
          <p className="post-date">{post.datetime}</p>
        </Link>
        <p className="post-body">
          {post.body.length >= 25 ? post.body.slice(0, 25) + "..." : post.body}
        </p>
      </>
    </article>
  );
}
