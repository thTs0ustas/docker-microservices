import { useEffect, useState } from "react";
import axios from "axios";

export const useCreatePosts = (setPosts) => {
  const [post, setPost] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!refresh) return;
    axios.get("http://localhost:4000/posts").then(({ data }) => setPosts(data));
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 2000);
  }, [error]);

  const handleChange = (event) => {
    event.preventDefault();
    setPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!post) setError("Have to set a title.");
    else
      axios
        .post("http://localhost:4000/posts", { title: post })
        .then(() => {
          setRefresh(true);
        })
        .then(() => setPost(""));
  };
  return { handleChange, handleSubmit, post, error, setError };
};
