import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const EditExercise = (props) => {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios.get(`/posts/${props.id}`).then((res) => {
      setData(res.data);
      setTitle(res.data.title);
      setBody(res.data.body);
    });
  }, []);

  const dataa = {
    title,
    body,
  };

  function formSubmited(e) {
    e.preventDefault();
    axios
      .post(`/posts/update/${props.id}`, dataa)
      .then((res) => {
        navigate("/myposts");
      })
      .catch((error) => {
        alertMessage("danger", `${error.response.data.msg}`);
        setTimeout(() => {
          alertMessage("", "");
        }, 2500);
      });
  }

  let alertMessage = (type, message) => {
    document.querySelector(
      ".post_message"
    ).innerHTML = ` <div class="alert alert-${type}" role="alert">
    ${message}
   </div>`;
  };

  return (
    <div className="pt-4">
      <form onSubmit={formSubmited}>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputbody">Content</label>
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
  );
};

export default EditExercise;
