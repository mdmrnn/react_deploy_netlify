import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});

export function DataProvider({ children }) {
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
  const { width } = useWindowSize();

  /* useAxiosFetch is a custom hook that created but didnt work properly so its commented for now
    const { data, fetchErr, isLoading } = useAxiosFetch(
      "http://localhost:3500/posts"
    );
    console.log(data);
    useEffect(() => {
      setPosts(data);
      console.log(data);
    }, [data]);
  */

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
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        handleSubmit,
        posts,
        handleDelete,
        isLoading,
        handleEdit,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
