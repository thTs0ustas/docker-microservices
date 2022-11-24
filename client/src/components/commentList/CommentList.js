export function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.commentId}>{comment.content}</li>
      ))}
    </ul>
  );
}
