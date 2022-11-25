import { useCreatePosts } from "./useCreatePosts";
import styles from "./createPosts.module.css";

export function CreatePosts() {
  const { handleChange, handleSubmit, error, post } = useCreatePosts();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Post</h1>
      <form noValidate>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles.label} htmlFor="post">
            Title
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              name="post"
              id="post"
              value={post}
              onChange={handleChange}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        <div>
          <button
            className={styles.button}
            onClick={handleSubmit}
            type="submit"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
}
