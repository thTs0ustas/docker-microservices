import { useState } from "react";
import { CreatePosts, PostsList } from "./components";
import styles from "./app.module.css";

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <div className={styles.container}>
      <CreatePosts setPosts={setPosts} />
      <PostsList posts={posts} />
    </div>
  );
}

export default App;
