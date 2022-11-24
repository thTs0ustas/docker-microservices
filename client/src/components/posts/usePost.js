import { useEffect, useState } from "react";
import axios from "axios";

export const usePost = (post) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentRefresh, setCommentRefresh] = useState(true);

  useEffect(() => {
    if (!commentRefresh) return;
    axios
      // eslint-disable-next-line react/prop-types
      .get(`http://localhost:4001/posts/${post.id}/comments`)
      .then(({ data }) => setComments(data));
    setCommentRefresh(false);
  }, [commentRefresh]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      // eslint-disable-next-line react/prop-types
      .post(`http://localhost:4001/posts/${post.id}/comments`, {
        content: comment,
      })
      .then(() => setCommentRefresh(true));
  };
  return { comment, comments, setComment, handleCommentSubmit };
};
