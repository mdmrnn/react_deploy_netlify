import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import Post from "./Post";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post" element={<NewPost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
