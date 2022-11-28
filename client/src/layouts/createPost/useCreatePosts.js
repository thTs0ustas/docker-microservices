import { useEffect, useState } from "react";
import axios from "axios";
import { useProvider } from "../../context/Provider";

export const useCreatePosts = () => {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const [state, dispatch] = useProvider();

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 2000);
  }, [error]);

  useEffect(() => {
    if (error || !state.refresh) return;
    axios
      .get("http://localhost:4002/posts")
      .then(({ data }) => {
        dispatch((prev) => ({ ...prev, data: { ...prev.data, data } }));
      })
      .then(() => dispatch((prev) => ({ ...prev, refresh: false })))
      .catch((err) => setError(err.message));
  }, [state.refresh]);

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
        .then(() => setPost(""))
        .then(() => dispatch((prev) => ({ ...prev, refresh: true })))
        .catch((err) => setError(err.message));
  };
  return { handleChange, handleSubmit, post, error, setError };
};
