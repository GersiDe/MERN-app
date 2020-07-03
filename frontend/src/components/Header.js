import React, { useContext } from "react";
import { Link } from "@reach/router";
import UserContext from "../context/UserContext";
import { navigate } from "@reach/router";
import logo from "../images/blog.png";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);
  let logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user", "");
    navigate("/");
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link class="navbar-brand" to="/">
          <img src={logo} width="30" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <Link class="nav-link" to="/myposts">
                My Posts
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/create">
                Create Post
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            {userData.user ? (
              <li class="nav-item">
                <Link class="nav-link" onClick={logOut} to="">
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
