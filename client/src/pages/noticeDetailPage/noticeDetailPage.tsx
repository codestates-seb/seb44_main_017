import { useParams } from "react-router-dom";
import * as S from "@/pages/noticeDetailPage/style";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { koreanDate } from "@/utils/koreanTime";

interface Data {
  boardId: number;
  content: string;
  createAt: string;
  modifyAt: string;
  title: string;
  view: number;
  writer: {
    adminId: number;
    name: string;
  };
}

function NoticeDetailPage() {
  const { boardId } = useParams();
  const [data, setData] = useState<Data>({
    boardId: 0,
    content: "",
    createAt: "",
    modifyAt: "",
    // preBoardId: null,
    // nextBoardId: 3,
    title: "",
    view: 0,
    writer: {
      adminId: 0,
      name: "",
    },
  });

  const getNotice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notify/${boardId}`);
      if (response.data.boardId) {
        const preNotice = Number(boardId) - 1;
        console.log(preNotice);
      }
      if (response.data.boardId) {
        const nextNotice = Number(boardId) + 1;
        console.log(nextNotice);
      }
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createDate = koreanDate(data.createAt);

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      {/* <S.Title>제목임</S.Title> */}
      <S.InfoBox>
        <S.Info>관리자: {data.writer.name}</S.Info>
        <S.Info>
          <S.ViewIcon />
          {data.view}
        </S.Info>
        <S.Info>등록일: {createDate}</S.Info>
      </S.InfoBox>
      <S.ContentBox>{data.content}</S.ContentBox>
      {/* <S.ContentBox>본문이다</S.ContentBox> */}
      <S.MoveBox style={{ borderBottom: "none" }}>
        <S.NoticeMove>이전글</S.NoticeMove>
        <S.NoticeMoveTitle>dddd</S.NoticeMoveTitle>
        <S.NoticeMoveDate>dd</S.NoticeMoveDate>
      </S.MoveBox>
      <S.MoveBox style={{ marginBottom: "16px" }}>
        <S.NoticeMove>다음글</S.NoticeMove>
        <S.NoticeMoveTitle>dd</S.NoticeMoveTitle>
        <S.NoticeMoveDate>날짜임</S.NoticeMoveDate>
      </S.MoveBox>
      <S.ListButton>목록으로</S.ListButton>
    </S.Container>
  );
}

export default NoticeDetailPage;
