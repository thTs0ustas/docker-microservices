// import { Comments } from "../comments/Comments";
import { usePost } from "./usePost";
import styles from "./posts.module.css";
// eslint-disable-next-line react/prop-types
export function Posts({ post }) {
  // comments,
  const { comment, setComment, handleCommentSubmit } = usePost(post);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <div>
        <form>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" onClick={handleCommentSubmit}>
            Add Comment
          </button>
        </form>
        {/* <Comments comments={comments} /> */}
      </div>
    </div>
  );
}
