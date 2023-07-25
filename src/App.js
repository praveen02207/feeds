import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import SignUpForm from "./signUpForm";
import LoginForm from "./login";
import NewPosts from "./posts";
import PostForm from "./addPost";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
       
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/posts" element={<NewPosts />} />
          <Route path="/addform" element={<PostForm />} />
       
      </Routes>
    </div>
  );
};

export default App;
