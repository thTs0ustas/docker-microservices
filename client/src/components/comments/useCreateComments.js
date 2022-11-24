import { useState } from "react";
import axios from "axios";

export const useCreateComments = (post) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:4001/posts/${post.id}/comments`, {
      content: comment,
    });
  };
  return { comment, setComment, handleCommentSubmit };
};
