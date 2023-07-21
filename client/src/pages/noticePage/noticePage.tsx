import axios from "axios";
import { getRoles } from "@/utils/token";
import { useEffect, useState } from "react";
import * as S from "@/pages/noticePage/style";
import { BASE_URL } from "@/constants/constants";
import SelectBox from "@/components/SelectBox/SelectBox";
import NotifyItem from "@/components/Item_notify/NotifyItem";
import CustomPagination from "@/components/Pagination/CustomPagination";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";

type ItemType = {
  title: string;
  content: string;
  createAt: string;
  view: number;
  admin: { adminId: number; name: string };
  boardId: number;
  modifyAt: string;
  isNew: boolean;
};

const sortOptions = ["최신순", "오래된순", "조회수순"];

export const NoticePage = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [value, setValue] = useState<string>("newest");
  const [size, setSize] = useState<number>(1);
  const [page, setPage] = useState<any>(1);
  const [isButton, setIsButton] = useState<boolean>(false);

  const getNotice = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/notify/board?page=${page}&size=${size}&sort=${value}`
      );
      const now = new Date();
      const yesterday = new Date(now.setDate(now.getDate() - 1));
      const updatedData = response.data.data.map((item: any) => ({
        ...item,
        isNew: new Date(item.createAt) > yesterday,
      }));
      setData(updatedData);
    } catch (e) {
      console.log(e);
    }
  };

  const noticeCount = () => {
    const width = window.innerWidth;
    let size = 0;
    if (width > 1023) {
      size = 8;
    } else if (width < 1023 && width > 767) {
      size = 4;
    } else if (width < 766) {
      size = 3;
    }
    setSize(size);
  };

  const roles = () => {
    let value: string | boolean | undefined = getRoles();
    if (value === "admin") {
      value = true;
    } else value = false;
    setIsButton(value);
  };

  useEffect(() => {
    noticeCount();
    getNotice();
    roles();

    const handleResize = () => {
      noticeCount();
      getNotice();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [page, value, size]);

  return (
    <div>
      <S.SubTitleBarContainer>
        <SubTitleBar
          title={"공지사항"}
          isButton={isButton}
          btnTitle={"공지하기"}
          btnLink={"/notice_register"}
        ></SubTitleBar>
      </S.SubTitleBarContainer>
      <S.Container>
        <S.SelectBar>
          <SelectBox
            usage={"정렬"}
            options={sortOptions}
            setOption={setValue}
          />
        </S.SelectBar>
        <S.NoticeContainer>
          {data.map((data) => (
            <S.NoticeBox>
              <NotifyItem
                boardId={data.boardId}
                title={data.title}
                contents={data.content}
                isNew={data.isNew}
                regDt={data.createAt}
                viewCount={data.view}
              />
            </S.NoticeBox>
          ))}
        </S.NoticeContainer>
        <S.PaginationBar>
          <CustomPagination pageCount={5} page={page} setPage={setPage} />
        </S.PaginationBar>
      </S.Container>
    </div>
  );
};
