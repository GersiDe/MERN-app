import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { navigate } from "@reach/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { setUserData } = useContext(UserContext);

  let formSubmit = async (e) => {
    e.preventDefault();
    let data = {
      username,
      password,
      passwordCheck,
    };
    await Axios.post("/users/register", data)
      .then((response) => {
        alertMessage("success", "User registered successfully");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        alertMessage("danger", `${error.response.data.msg}`);
        setTimeout(() => {
          alertMessage("", "");
        }, 2500);
      });

    Axios.post("/users/login", {
      username,
      password,
    })
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
        console.log(error);
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
      <div className="pt-5 mt-5 col col-lg-6 text-center form-signin">
        <h2>Register</h2>
        <form onSubmit={formSubmit}>
          <div class="form-group pt-3">
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
              id="description-pass"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="description-repeat-pass"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
              placeholder="Repeat password"
            />
          </div>

          <button type="submit" class="btn btn-lg btn-primary btn-block">
            Register
          </button>
          <div className="post_message pt-3"></div>
        </form>
      </div>
    </div>
  );
};

export default Register;
