import { authFetcher } from ".";

interface CommentProps {
  id: string | undefined;
  commentId?: number;
  qPath: boolean;
}
interface ValueProps extends CommentProps {
  value: string;
}

export const updateComment = async (props: ValueProps) => {
  const { id, commentId, qPath, value } = props;
  const response = await authFetcher.patch(
    qPath
      ? `/questions/${id}/comments/${commentId}`
      : `/products/${id}/comments/${commentId}`,
    {
      content: value,
    }
  );

  return response;
};

export const deleteComment = async (props: CommentProps) => {
  const { id, commentId, qPath } = props;
  const response = await authFetcher.delete(
    qPath
      ? `/questions/${id}/comments/${commentId}`
      : `/products/${id}/comments/${commentId}`
  );

  return response;
};

export const createComment = async (props: ValueProps) => {
  const { id, qPath, value } = props;
  const response = await authFetcher.post(
    qPath ? `/questions/${id}/comments` : `/products/${id}/comments`,
    {
      content: value,
    }
  );

  return response;
};
