module.exports = function processEvents(type, data, posts) {
  switch (type) {
    case "postCreated": {
      const { id, title } = data;
      // eslint-disable-next-line no-param-reassign
      posts[id] = {
        id,
        title,
        comments: [],
      };
      break;
    }
    case "commentCreated": {
      const { id, postId, content, status } = data;
      posts[postId].comments.push({
        id,
        content,
        status,
      });
      break;
    }
    case "commentUpdated": {
      const { id, status, postId } = data;
      const findComment = posts[postId].comments.find(
        ({ id: commentId }) => commentId === id
      );
      findComment.status = status;
      break;
    }
    default:
      break;
  }
};
