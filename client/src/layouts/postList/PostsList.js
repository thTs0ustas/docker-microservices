import { Posts } from "../../components";
import styles from "./postList.module.css";
import { useProvider } from "../../context/Provider";

export function PostsList() {
  const [state] = useProvider();
  const { data: { data: posts = {} } = {} } = state;
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
