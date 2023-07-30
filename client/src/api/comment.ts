import { getToken } from "@/utils/token";
import { fetcher } from ".";

const [authorization, refresh] = getToken();

interface updateProps {
  id: string | undefined;
  commentId: number;
  qPath: boolean;
  updateValue: string;
}

export const update = (props: updateProps) => {
  const { id, commentId, qPath, updateValue } = props;
  fetcher.patch(
    qPath
      ? `/questions/${id}/comments/${commentId}`
      : `/products/${id}/comments/${commentId}`,
    {
      content: updateValue,
    },
    {
      headers: {
        Authorization: authorization,
        Refresh: refresh,
      },
    }
  );
};
