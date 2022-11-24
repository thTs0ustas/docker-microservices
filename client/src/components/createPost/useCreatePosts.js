import { useEffect, useState } from "react";
import axios from "axios";

export const useCreatePosts = () => {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");

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
        .then(() => setPost(""));
  };
  return { handleChange, handleSubmit, post, error, setError };
};
