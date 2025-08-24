import { useStoreActions, useStoreState } from "easy-peasy";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const navigate = useNavigate();
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const savePost = useStoreActions((actions) => actions.savePost);

  function handleSubmit(e) {
    e.preventDefault();
    const id = (
      posts.length ? parseInt(posts[posts.length - 1].id) + 1 : 1
    ).toString();
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate("/");
  }

  return (
    <main className="new-post">
      <h2>New Post</h2>
      <form className="new-post-form">
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="newPostTitle"
          placeholder="New Post Title"
          className="new-post-title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="post-body">Post Body:</label>
        <textarea
          id="newPostBody"
          className="new-post-body"
          placeholder="Your New Post"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit" className="submit-post" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </main>
  );
}
