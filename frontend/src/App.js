import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "../src/components/Header";
import { Router, Link } from "@reach/router";
import CreatePost from "../src/components/CreatePost";

import EditPost from "./components/EditPost";
import PostsList from "./components/PostsList";
import SignIn from "../src/components/SignIn";
import Register from "../src/components/Register";
import UserContext from "./context/UserContext";
import Axios from "axios";
import MyPosts from "../src/components/MyPosts";
import Footer from "../src/components/Footer";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    Axios.post("http://localhost:5000/users/tokenIsValid", null, {
      headers: { "x-auth-token": token },
    }).then((tokenRes) => {
      if (tokenRes) {
        Axios.get("http://localhost:5000/users", {
          headers: { "x-auth-token": token },
        }).then((res) => {
          setUserData({
            token,
            user: res.data,
          });
        });
      }
    });
  }, []);
  return (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="container">
          <Router>
            <PostsList path="/" />
            <EditPost path="myposts/edit/:id" />
            <CreatePost path="/create" />

            <SignIn path="/login" />
            <Register path="/register" />
            <MyPosts path="/myposts" />
          </Router>
        </div>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
