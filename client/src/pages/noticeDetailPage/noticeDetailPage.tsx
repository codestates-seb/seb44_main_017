import { useNavigate, useParams } from "react-router-dom";
import * as S from "@/pages/noticeDetailPage/style";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { koreanDate } from "@/utils/koreanTime";
import { getRoles } from "@/utils/token";
import SpeedDialCustom from "@/components/SpeedDialCustom/SpeedDialCustom";

interface Data {
  boardId: string;
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

interface PreData {
  boardId: string;
  title: string;
  createAt: string;
}

interface NextData {
  boardId: string;
  title: string;
  createAt: string;
}

function NoticeDetailPage() {
  const { boardId } = useParams<string>();
  const [data, setData] = useState<Data>({
    boardId: "",
    content: "",
    createAt: "",
    modifyAt: "",
    title: "",
    view: 0,
    writer: {
      adminId: 0,
      name: "",
    },
  });
  const [preData, setPreData] = useState<PreData>({
    boardId: "",
    title: "",
    createAt: "",
  });
  const [preNoticeBox, setPreNoticeBox] = useState<boolean>(false);

  const [nextData, setNextData] = useState<NextData>({
    boardId: "",
    title: "",
    createAt: "",
  });
  const [nextNoticeBox, setNextNoticeBox] = useState<boolean>(false);

  // 어드민 여부
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const roles = getRoles();

  const navigate = useNavigate();

  const createDate = koreanDate(data.createAt);
  const getNotice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notify/${boardId}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const preNoticeCreateDate = koreanDate(preData.createAt);
  const getPreNotice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notify/${boardId}/pre`);
      setPreData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const nextNoticeCreateDate = koreanDate(nextData.createAt);
  const getNextNotice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notify/${boardId}/next`);
      setNextData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotice();
    getPreNotice();
    getNextNotice();
    preData === null ? setPreNoticeBox(true) : setPreNoticeBox(false);
    nextData === null ? setNextNoticeBox(true) : setNextNoticeBox(false);
    roles === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  }, []);

  const handlePreNotice = () => {
    navigate(`/notice/detail/${preData.boardId}/`);
    window.location.reload();
  };

  const handleNextNotice = () => {
    navigate(`/notice/detail/${nextData.boardId}`);
    window.location.reload();
  };

  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.InfoBox>
        <S.Info>관리자: {data.writer.name}</S.Info>
        <S.Info>
          <S.ViewIcon />
          {data.view}
        </S.Info>
        <S.Info>등록일: {createDate}</S.Info>
      </S.InfoBox>
      <S.ContentBox>
        {data.content}
        <S.SpeedDialContainer>
          {isAdmin && <SpeedDialCustom />}
        </S.SpeedDialContainer>
      </S.ContentBox>
      {preNoticeBox ? (
        <S.NoneNotice style={{ borderBottom: "none" }}>
          등록된 게시글이 없습니다.
        </S.NoneNotice>
      ) : (
        <S.MoveBox style={{ borderBottom: "none" }} onClick={handlePreNotice}>
          <S.NoticeMove>이전글</S.NoticeMove>
          <S.NoticeMoveTitle>{preData.title}</S.NoticeMoveTitle>
          <S.NoticeMoveDate>{preNoticeCreateDate}</S.NoticeMoveDate>
        </S.MoveBox>
      )}
      {nextNoticeBox ? (
        <S.NoneNotice style={{ marginBottom: "16px" }}>
          등록된 게시글이 없습니다.
        </S.NoneNotice>
      ) : (
        <S.MoveBox style={{ marginBottom: "16px" }} onClick={handleNextNotice}>
          <S.NoticeMove>다음글</S.NoticeMove>
          <S.NoticeMoveTitle>{nextData.title}</S.NoticeMoveTitle>
          <S.NoticeMoveDate>{nextNoticeCreateDate}</S.NoticeMoveDate>
        </S.MoveBox>
      )}
      <S.ListButton onClick={() => navigate(-1)}>목록으로</S.ListButton>
    </S.Container>
  );
}

export default NoticeDetailPage;
