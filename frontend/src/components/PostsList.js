import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import moment from "moment";

const ExercisesList = () => {
  const [posts, SetPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((res) => {
      SetPosts(res.data);
    });
  }, []);

  return (
    <div className="pt-4">
      <h2 className="text-center">Post List</h2>
      <div class="card-columns">
        <div>
          {posts === "" ? (
            <p>Loading Exercises </p>
          ) : (
            posts.map((post) => {
              return (
                <div className="pt-4">
                  <div class="card text-center">
                    <div class="card-header">{post.title}</div>
                    <div class="card-body">
                      <blockquote class="blockquote mb-0">
                        <p>{post.body}</p>
                        <footer class="blockquote-footer">
                          <cite title="Source Title">
                            Author{" "}
                            {post.author.charAt(0).toUpperCase() +
                              post.author.slice(1)}
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                    <div class="card-footer text-muted">
                      {moment(post.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesList;
