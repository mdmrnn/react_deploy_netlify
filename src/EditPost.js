import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditPost({
  handleEdit,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
  posts,
  isLoading,
}) {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [posts, setEditTitle, setEditBody]);

  return (
    <main className="new-post">
      <h2>Edit Post</h2>
      {isLoading && (
        <>
          <h2>Post is Loading ...</h2>
          <p>please wait</p>
          <Link to="/">Home</Link>
        </>
      )}
      {!isLoading && editTitle && (
        <form className="new-post-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="post-title">Title:</label>
          <input
            type="text"
            id="newPostTitle"
            placeholder="New Post Title"
            className="new-post-title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="post-body">Post Body:</label>
          <textarea
            id="newPostBody"
            className="new-post-body"
            placeholder="Your New Post"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button
            type="submit"
            className="edit-post"
            onClick={() => handleEdit(id)}
          >
            Submit
          </button>
        </form>
      )}
      {!isLoading && !editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>well thats disappointing</p>
          <Link to="/">Home</Link>
        </>
      )}
    </main>
  );
}
