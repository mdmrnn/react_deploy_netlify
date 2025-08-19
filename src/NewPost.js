export default function NewPost({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) {
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
