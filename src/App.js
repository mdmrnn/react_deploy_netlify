import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const API_URL = "http://localhost:3500/posts";
  const [posts, setPosts] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  function handleDelete(id) {}
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

  return (
    <Routes>
      <Route element={<Layout search={search} setSearch={setSearch} />}>
        <Route index element={<Home posts={posts} isLoading={isLoading} />} />
        <Route path="post">
          <Route index element={<NewPost setPosts={setPosts} />} />
          <Route
            path=":id"
            element={<PostPage posts={posts} />}
            handleDelete={handleDelete}
          />
        </Route>
        <Route path="about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}
