import { usePost } from "./usePost";
import styles from "./posts.module.css";
import { CommentList } from "../commentList/CommentList";
import { CommentPost } from "../comments/CreateComments";

export function Posts({ post }) {
  const { comments } = usePost(post);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <CommentPost post={post} />
      <CommentList comments={comments} />
    </div>
  );
}
