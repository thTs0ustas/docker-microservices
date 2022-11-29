export function CommentList({ comments }) {
  return (
    <ul>
      {comments?.map((comment) => {
        const content =
          comment?.status === "fulfilled"
            ? comment.content
            : comment.status.toUpperCase();
        return <li key={comment.id}>{content}</li>;
      })}
    </ul>
  );
}
