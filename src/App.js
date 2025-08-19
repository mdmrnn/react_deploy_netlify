import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function App() {
  const API_URL = "http://localhost:3500/posts";
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const postOpt = {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    };
    try {
      const response = await fetch(API_URL, postOpt);
      if (!response.ok) throw Error("Please reload the application");
      setFetchErr(null);
    } catch (err) {
      setFetchErr(err.message);
    }
    setPosts([...posts, newPost]);
    setPostTitle("");
    setPostBody("");
    navigate("/");
    //window.location.reload();
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw Error("Please delete the blog again");
      setFetchErr(null);
    } catch (err) {
      setFetchErr(err.message);
    }
    const newPosts = posts.filter((post) => post.id === id);
    setPosts(newPosts);
    navigate("/");
    //window.location.reload();
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Please Reload the Weblog");
        const initialPosts = await response.json();
        setPosts(initialPosts);
        setFetchErr(null);
      } catch (err) {
        setFetchErr(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      fetchPosts();
    }, 2000);
  }, []);

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
        <Route path="/post">
          <Route
            path="/post"
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
            path="/post/:id"
            element={
              <PostPage
                posts={posts}
                handleDelete={handleDelete}
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
