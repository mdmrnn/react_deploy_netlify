import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3500/posts");
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
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    }
    fetchPosts();
  }, [setPosts]);

  useEffect(() => {
    if (posts) {
      const filteredResults = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    }
  }, [posts, search, setSearchResults]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/posts">
          <Route path="/posts" element={<NewPost />} />
          <Route
            path="/posts/edit/:id"
            element={<EditPost isLoading={isLoading} />}
          />
          <Route
            path="/posts/:id"
            element={<PostPage isLoading={isLoading} />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
