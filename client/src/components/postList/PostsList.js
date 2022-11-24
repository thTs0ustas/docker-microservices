import { Posts } from "../posts/Posts";
import styles from "./postList.module.css";

export function PostsList({ posts }) {
  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.title}>Posts</h1>
      <div className={styles.container}>
        {Object.entries(posts).map(([key, post]) => (
          <Posts key={key} post={post} />
        ))}
      </div>
    </div>
  );
}
