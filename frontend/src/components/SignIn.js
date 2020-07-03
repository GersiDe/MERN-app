import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { navigate } from "@reach/router";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData } = useContext(UserContext);

  let formSubmit = (e) => {
    e.preventDefault();
    let data = {
      username,
      password,
    };
    Axios.post("http://localhost:5000/users/login", data)
      .then((res) => {
        setUserData({
          token: res.data.token,
          user: res.data.user.username,
        });

        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("user", res.data.user.username);
        navigate("/");
      })
      .catch((error) => {
        alertMessage("danger", `${error.response.data.msg}`);
        setTimeout(() => {
          alertMessage("", "");
        }, 2500);
      });
  };

  let alertMessage = (type, message) => {
    document.querySelector(
      ".post_message"
    ).innerHTML = ` <div class="alert alert-${type}" role="alert">
    ${message}
   </div>`;
  };

  return (
    <div className="row justify-content-md-center">
      <div className="pt-5 col col-lg-6 text-center form-signin mt-5">
        <h2>Sign In</h2>
        <form onSubmit={formSubmit} className="form-signin">
          <div class="form-group pt-2">
            <input
              type="text"
              class="form-control"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="description"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>

          <button type="submit" class="btn btn-lg btn-primary btn-block">
            Sign in
          </button>
          <div className="post_message pt-3"></div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
