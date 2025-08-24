import { createStore, action, thunk, computed } from "easy-peasy";
import axios from "axios";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  search: [],
  setSearch: action((state, payload) => {
    state.setSearch = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  postTitle: [],
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: [],
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: [],
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: [],
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  isLoading: [],
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id === id);
  }),
  savePost: thunk(async (action, newPost, helpers) => {
    const { posts } = helpers.getState();
    try {
      const response = await axios.post("http://localhost:3500/posts", newPost);
      action.setPosts([...posts, response.data]);
      action.setPostTitle("");
      action.setPostBody("");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  }),
  deletePost: thunk(async (action, id, helpers) => {
    const { posts } = helpers.getState();
    try {
      await axios.delete(`http://localhost:3500/posts/${id}`);
      action.setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  }),
  editPost: thunk(async (action, updatedPost, helpers) => {
    const { posts } = helpers.getState();
    try {
      const response = await axios.put(
        `http://localhost:3500/posts/${updatedPost.id}`,
        updatedPost
      );
      action.setPosts(
        posts.map((post) =>
          post.id === updatedPost.id ? { ...response.data } : post
        )
      );
      action.setEditTitle("");
      action.setEditBody("");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  }),
});
