import { useState } from "react";
import styles from "./app.module.css";
import { CreatePosts, PostsList } from "./layouts";
import Provider from "./context/Provider";

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <Provider>
      <div className={styles.container}>
        <CreatePosts setPosts={setPosts} />
        <PostsList posts={posts} />
      </div>
    </Provider>
  );
}

export default App;
