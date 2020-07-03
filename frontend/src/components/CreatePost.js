import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import UserContext from "../context/UserContext";
import { navigate, Link } from "@reach/router";

const CreateExercise = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const author = localStorage.getItem("user");

  const data = {
    title,
    body,
    author,
  };

  let alertMessage = (type, message) => {
    document.querySelector(
      ".post_message"
    ).innerHTML = ` <div class="alert alert-${type}" role="alert">
    ${message}
   </div>`;
  };

  function formSubmited(e) {
    e.preventDefault();
    Axios.post("http://localhost:5000/posts/add", data)
      .then((response) => {
        alertMessage("success", "Post added successfully");
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
  }

  return (
    <div className="pt-4">
      {userData.user ? (
        <div>
          <h2>
            {author.charAt(0).toUpperCase() + author.slice(1)}, here you can
            create a post!
          </h2>

          <form onSubmit={formSubmited}>
            <div class="form-group pt-2">
              <label for="exampleInputPassword1">Post title</label>
              <input
                type="text"
                class="form-control"
                id="username"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Content</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            <div className="post_message pt-3"></div>
          </form>
        </div>
      ) : (
        <h2>
          Please <Link to="/login">Log in</Link> or{" "}
          <Link to="/register"> Register</Link> to create a post
        </h2>
      )}
    </div>
  );
};

export default CreateExercise;
