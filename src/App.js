import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import Post from "./Post";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<Post />} />
        </Route>
        <Route path="about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}
