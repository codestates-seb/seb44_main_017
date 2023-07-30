import { authFetcher } from ".";

interface CommentProps {
  id: string | undefined;
  commentId: number;
  qPath: boolean;
}
interface UpdateProps extends CommentProps {
  updateValue: string;
}

export const updateComment = async (
  props: UpdateProps
): Promise<{ data: any; status: number }> => {
  const { id, commentId, qPath, updateValue } = props;
  const { data, status } = await authFetcher.patch(
    qPath
      ? `/questions/${id}/comments/${commentId}`
      : `/products/${id}/comments/${commentId}`,
    {
      content: updateValue,
    }
  );

  return { data, status };
};

// export const deleteComment = (props: CommentProps) => {
//   const { id, commentId, qPath } = props;
//   fetcher.delete(
//     qPath
//       ? `/questions/${id}/comments/${commentId}`
//       : `/products/${id}/comments/${commentId}`,
//     {
//       headers: {
//         Authorization: authorization,
//         Refresh: refresh,
//       },
//     }
//   );
// };
