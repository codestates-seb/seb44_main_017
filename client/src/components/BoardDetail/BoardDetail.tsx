import * as S from "./style";
import { getName } from "@/utils/token";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewCount from "@/assets/icons/ViewCount";
import SpeedDialCustom from "../SpeedDialCustom/SpeedDialCustom";

interface BoardDetailTypes {
  title: string | undefined;
  name?: string | undefined;
  viewCount: number | string | undefined;
  createdAt: string | undefined;
  content: string | undefined;
}

/**
 * @ title(제목), name(작성자), viewCount(조회수), createdAt(작성일), content(내용)
 */
const BoardDetail = ({
  title,
  name,
  viewCount,
  createdAt,
  content,
}: BoardDetailTypes) => {
  const navigate = useNavigate();
  const userName = getName();
  const [isWriter, setIsWriter] = useState<boolean>(false);

  useEffect(() => {
    setIsWriter(userName === name);
  }, [userName, name]);

  return (
    <S.Container>
      <S.HeaderBox>
        <h1 className="detail_title">{title}</h1>
        <div className="detail_info">
          <span className="detail_view">
            <ViewCount />
            <span>{viewCount}</span>
          </span>
          <span>
            <span className="detail_name">닉네임 : </span>
            <span>{name}</span>
          </span>
          <span>
            <span className="detail_name">등록일 : </span>
            <span>{createdAt}</span>
          </span>
        </div>
      </S.HeaderBox>
      <S.ContentBox>
        <div>{content}</div>
        <S.SpeedDialContainer>
          {isWriter && <SpeedDialCustom />}
        </S.SpeedDialContainer>
        <button className="back_btn" onClick={() => navigate(-1)}>
          목록으로
        </button>
      </S.ContentBox>
    </S.Container>
  );
};

export default BoardDetail;
