import styles from "./createComments.module.css";
import { useCreateComments } from "./useCreateComments";

export function CommentPost({ post }) {
  const { comment, setComment, error, handleCommentSubmit } =
    useCreateComments(post);

  return (
    <div className={styles.container}>
      <form>
        <input
          className={styles.input}
          type="text"
          name="comment"
          value={error || comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className={styles.button}
          onClick={handleCommentSubmit}
        >
          Add
        </button>
      </form>
    </div>
  );
}
