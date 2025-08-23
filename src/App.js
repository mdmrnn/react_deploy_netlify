import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import axios from "axios";

export default function App() {
  const API_URL = "http://localhost:3500";
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        // From axios documentation
        if (err.response) {
          // Not in the 200 resposne range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // No resposne and all the other errors
          console.log(`Error : ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      fetchPosts();
    }, 2000);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const id = (
      posts.length ? parseInt(posts[posts.length - 1].id) + 1 : 1
    ).toString();
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
  }

  async function handleEdit(id) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`${API_URL}/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) =>
          post.id.toString() === id.toString() ? { ...response.data } : post
        )
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
  }

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <Routes>
      <Route element={<Layout search={search} setSearch={setSearch} />}>
        <Route
          path="/"
          element={<Home posts={searchResults} isLoading={isLoading} />}
        />
        <Route path="/posts">
          <Route
            path="/posts"
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PostPage
                posts={posts}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <EditPost
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
                handleEdit={handleEdit}
                posts={posts}
                isLoading={isLoading}
              />
            }
          />
        </Route>
        <Route path="about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}
