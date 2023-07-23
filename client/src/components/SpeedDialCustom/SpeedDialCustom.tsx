import axios from "axios";
import * as S from "./style";
import { getToken } from "@/utils/token";
import { SpeedDialIcon } from "@mui/material";
import { BASE_URL } from "@/constants/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface ActionType {
  key: string;
  name: string;
  icon: JSX.Element;
}

function SpeedDialCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { boardId } = useParams();
  const { questionId } = useParams();
  console.log(location);

  const actions = [
    { key: "modify", name: "수정하기", icon: <S.ModifyIcon /> },
    { key: "delete", name: "삭제하기", icon: <S.DeleteIcon /> },
  ];
  const handleAction = (action: ActionType) => {
    const notice = location.pathname.includes("/notice/detail/");
    const question = location.pathname.includes("/questions/");
    console.log(notice);

    if (notice) {
      if (action.key === "modify") {
        navigate(`/notice/modify/${boardId}`);
      } else if (action.key === "delete") {
        confirm("정말 삭제하시겠어요?") ? deleteNotice() : "";
      }
    } else if (question) {
      if (action.key === "modify") {
        navigate(`/question/modify/${questionId}`);
      } else if (action.key === "delete") {
        confirm("정말 삭제하시겠어요?") ? deleteQuestion() : "";
      }
    }
  };

  const [authorization, refresh] = getToken();
  const deleteNotice = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/notify/${boardId}`, {
        headers: {
          Authorization: `${authorization}`,
          Refresh: `${refresh}`,
        },
      });
      if (response.status === 204) {
        alert("게시글이 삭제되었습니다.");
        navigate(`/notice`);
      }
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const deleteQuestion = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/questions/${questionId}`,
        {
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      );
      if (response.status === 204) {
        alert("게시글이 삭제되었습니다.");
        navigate("/questions");
      }
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <S.SpeedDialBox
      ariaLabel="SpeedDial"
      icon={
        <SpeedDialIcon
          sx={{ display: "flex", alignItems: "center" }}
          icon={<S.ModifyIcon />}
          openIcon={<S.CloseIcon />}
        />
      }
    >
      {actions.map((action) => (
        <S.SpeedDialActionBox
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleAction(action)}
        />
      ))}
    </S.SpeedDialBox>
  );
}

export default SpeedDialCustom;
