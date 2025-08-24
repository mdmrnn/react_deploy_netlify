import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useStoreActions, useStoreState } from "easy-peasy";
export default function EditPost({ isLoading }) {
  const { id } = useParams();
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
  const posts = useStoreState((state) => state.posts);
  const getPostById = useStoreState((state) => state.getPostById);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const post = getPostById(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [posts, setEditTitle, setEditBody]);

  function handleEdit(id) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatedPost);
    navigate(`/posts/${id}`);
  }

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
            type="button"
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
