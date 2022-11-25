import styles from "./posts.module.css";
import { CommentPost } from "../comments/CreateComments";
import { CommentList } from "../commentList/CommentList";

export function Posts({ post }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <CommentPost post={post} />
      <CommentList comments={post.comments} />
    </div>
  );
}
