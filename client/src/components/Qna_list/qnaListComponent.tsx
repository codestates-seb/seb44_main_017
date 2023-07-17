import SelectBox from "@/components/SelectBox/SelectBox";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import * as S from "./style";
import { Link } from "react-router-dom";
import ViewCount from "@/assets/icons/ViewCount";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { QnaTypes } from "@/types/shared";

interface QnaListComponentProps {
  data: QnaTypes[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  totalPage: number;
}

const QnaListComponent = ({
  data,
  page,
  setPage,
  setSortOption,
  totalPage,
}: QnaListComponentProps) => {
  const title = "무엇이 궁금한가요?";
  const options = ["최신순", "오래된순", "좋아요순", "조회수순"];
  const TITLE_MAX_LENGTH = 40;

  return (
    <>
      <SubTitleBar
        title={title}
        isButton={true}
        btnTitle={"질문하기"}
        btnLink={"/questions"}
      />
      <S.Section>
        <S.QnaContainer>
          <S.SortBox>
            <SelectBox
              usage={"정렬"}
              options={options}
              setOption={setSortOption}
            />
          </S.SortBox>
          <S.BoardContainer>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>조회수</th>
                <th>등록일</th>
                <th>작성자</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.questionId}>
                  <td>{item.questionId}</td>
                  <td title={item.title}>
                    <Link to={`/questions/${item.questionId}`}>
                      {item.title.length > TITLE_MAX_LENGTH
                        ? item.title.slice(0, TITLE_MAX_LENGTH).concat("...")
                        : item.title}
                    </Link>
                  </td>
                  <td>
                    <S.ViewBox>
                      <ViewCount />
                      <span>{item.view}</span>
                    </S.ViewBox>
                  </td>

                  <td>{item.createAt.slice(0, 10)}</td>
                  {item.writer ? <td>{item.writer.name}</td> : <td>작성자</td>}
                </tr>
              ))}
            </tbody>
          </S.BoardContainer>
        </S.QnaContainer>
        <S.PagenationBox>
          <CustomPagination
            pageCount={totalPage}
            page={page}
            setPage={setPage}
          />
        </S.PagenationBox>
      </S.Section>
    </>
  );
};

export default QnaListComponent;
