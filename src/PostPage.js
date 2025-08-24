import { useParams, Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function PostPage({ isLoading }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  async function handleDelete(id) {
    deletePost(id);
    navigate("/");
  }

  return (
    <main className="post-page">
      <article className="post">
        {isLoading && (
          <>
            <h2>Post is Loading ...</h2>
            <p>please wait</p>
            <Link to="/">Home</Link>
          </>
        )}
        {!isLoading && post && (
          <>
            <h2>{post.title}</h2>
            <p className="post-date">{post.datetime}</p>
            <p className="post-body">{post.body}</p>
            <Link to={`/posts/edit/${post.id}`}>
              <button className="edit-btn">Edit Post</button>
            </Link>
            <button className="delete-btn" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </>
        )}
        {!post && !isLoading && (
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
