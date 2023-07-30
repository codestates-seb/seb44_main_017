import { authFetcher } from ".";

interface CommentProps {
  id: string | undefined;
  commentId?: number;
  qPath: boolean;
}
interface UpdateProps extends CommentProps {
  updateValue: string;
}

interface CreateProps extends CommentProps {
  commentValue: string;
}

export const updateComment = async (props: UpdateProps) => {
  const { id, commentId, qPath, updateValue } = props;
  const response = await authFetcher.patch(
    qPath
      ? `/questions/${id}/comments/${commentId}`
      : `/products/${id}/comments/${commentId}`,
    {
      content: updateValue,
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

export const createComment = async (props: CreateProps) => {
  const { id, qPath, commentValue } = props;
  const response = await authFetcher.post(
    qPath ? `/questions/${id}/comments` : `/products/${id}/comments`,
    {
      content: commentValue,
    }
  );

  return response;
};
