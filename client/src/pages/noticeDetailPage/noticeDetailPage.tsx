import axios from "axios";
import { useEffect, useState } from "react";
import { koreanDate } from "@/utils/koreanTime";
import { BASE_URL } from "@/constants/constants";
import { getRoles, getToken } from "@/utils/token";
import * as S from "@/pages/noticeDetailPage/style";
import { useNavigate, useParams } from "react-router-dom";
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
      const response = await axios.get(`${BASE_URL}/notify/${boardId}`, {
        headers: authorization
          ? {
              Authorization: `${authorization}`,
              Refresh: `${refresh}`,
            }
          : {},
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [authorization, refresh] = getToken();
  const preNoticeCreateDate = koreanDate(preData.createAt);
  const getPreNotice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notify/${boardId}/pre`, {
        headers: authorization
          ? {
              Authorization: `${authorization}`,
              Refresh: `${refresh}`,
            }
          : {},
      });
      setPreData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const nextNoticeCreateDate = koreanDate(nextData.createAt);
  const getNextNotice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notify/${boardId}/next`, {
        headers: authorization
          ? {
              Authorization: `${authorization}`,
              Refresh: `${refresh}`,
            }
          : {},
      });
      setNextData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotice();
    getPreNotice();
    getNextNotice();
    roles === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  }, []);

  useEffect(() => {
    if (Object.keys(preData).length === 0) {
      setPreNoticeBox(true);
    } else {
      setPreNoticeBox(false);
    }
  }, [preData]);

  useEffect(() => {
    if (Object.keys(nextData).length === 0) {
      setNextNoticeBox(true);
    } else {
      setNextNoticeBox(false);
    }
  }, [nextData]);

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
