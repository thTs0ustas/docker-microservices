import { useEffect, useState } from "react";
import axios from "axios";

export const usePost = (post) => {
  const [comments, setComments] = useState([]);
  const [commentRefresh, setCommentRefresh] = useState(true);

  useEffect(() => {
    if (!commentRefresh) return;
    axios
      .get(`http://localhost:4001/posts/${post.id}/comments`)
      .then(({ data }) => setComments(data));
    setCommentRefresh(false);
  }, [commentRefresh]);

  return { comments };
};
