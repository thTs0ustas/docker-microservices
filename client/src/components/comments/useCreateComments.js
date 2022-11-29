import { useEffect, useState } from "react";
import axios from "axios";
import { useProvider } from "../../context/Provider";

export const useCreateComments = (post) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [, dispatch] = useProvider();

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 2000);
  }, [error]);

  // const handleFiltering = (text) => /orange/gi.test(text);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment) setError("Comment cant be empty");
    // else if (handleFiltering(comment)) setError("Orange is not allowed");
    else
      axios
        .post(`http://localhost:4001/posts/${post.id}/comments`, {
          content: comment,
        })
        .then(() => dispatch((prev) => ({ ...prev, refresh: true })))
        .catch(setError);
  };
  return { comment, setComment, error, handleCommentSubmit };
};
