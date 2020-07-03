import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import UserContext from "../context/UserContext";

const ExercisesList = () => {
  const [posts, SetPosts] = useState([]);
  const author = localStorage.getItem("user");
  const { userData, setUserData } = useContext(UserContext);
  const [id, SetId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/author/${author}`).then((res) => {
      SetPosts(res.data);
    });
  }, []);

  function deleteItem(e) {
    e.preventDefault();
    axios.delete(`http://localhost:5000/posts/${id}`);

    SetPosts(posts.filter((exe) => exe._id !== id));
  }

  return (
    <div className="pt-4">
      {userData.user ? (
        <div>
          <div>
            {posts.length == 0 ? (
              <div>
                <h2>You dont have any posts</h2>
                <h4 class="font-weight-normal pt-2">
                  To create one go to{" "}
                  <a href="http://localhost:3000/create"> Create Posts</a>
                </h4>
              </div>
            ) : (
              <div>
                <h2>Post List</h2>
                {posts.map((post) => {
                  return (
                    <div className="pt-2">
                      <ul class="list-group list-group-horizontal-md pt-3">
                        <li class="list-group-item">{post.title}</li>
                        <li class="list-group-item">{post.body}</li>

                        <li class="list-group-item">
                          <Link to={`edit/${post._id}`}>Edit</Link>
                        </li>
                        <li class="list-group-item">
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            id={post._id}
                            onClick={(e) => {
                              SetId(e.target.getAttribute("id"));
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                      <div>
                        <div
                          class="modal fade"
                          id="exampleModalCenter"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  class="modal-title"
                                  id="exampleModalLongTitle"
                                >
                                  Are you sure you want to delete this ?
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>

                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  No
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  id={post._id}
                                  onClick={deleteItem}
                                  data-dismiss="modal"
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <h2>
            Please <Link to="/login">Log in</Link> or{" "}
            <Link to="/register"> Register</Link> to view your posts
          </h2>
        </>
      )}
    </div>
  );
};

export default ExercisesList;
