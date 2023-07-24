import SelectBox from "@/components/SelectBox/SelectBox";
import * as S from "./style";
import { Link, useLocation } from "react-router-dom";
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
  const options = ["최신순", "오래된순", "조회수순"];
  const TITLE_MAX_LENGTH = 30;
  const location = useLocation();
  const qPath = location.pathname.startsWith("/mypage");

  return (
    <>
      <S.Section>
        <S.QnaContainer>
          {qPath ? (
            <S.PageTitle>
              <h2>내가 등록한 질문</h2>
              <SelectBox
                usage={"정렬"}
                options={options}
                setOption={setSortOption}
              />
            </S.PageTitle>
          ) : (
            <S.SortBox>
              <SelectBox
                usage={"정렬"}
                options={options}
                setOption={setSortOption}
              />
            </S.SortBox>
          )}
          <S.BoardContainer>
            {Array.isArray(data) && data.length < 1 ? (
              <S.NoneItemsBox>
                <div className="none_items">등록한 질문이 없습니다.</div>
              </S.NoneItemsBox>
            ) : (
              <>
                <colgroup>
                  <col className="qna_number" style={{ width: "10%" }} />
                  <col className="qna_title" style={{ width: "50%" }} />
                  <col className="qna_view" style={{ width: "10%" }} />
                  <col className="qna_created_at" style={{ width: "15%" }} />
                  <col className="qna_writer" style={{ width: "15%" }} />
                </colgroup>
                <S.TableHeader>
                  <tr>
                    <th className="qna_number">번호</th>
                    <th>제목</th>
                    <th className="qna_view">조회수</th>
                    <th className="qna_created_at">등록일</th>
                    <th>작성자</th>
                  </tr>
                </S.TableHeader>
                <S.TableBody>
                  {data.map(item => (
                    <tr key={item.questionId}>
                      <td className="qna_number">{item.questionId}</td>
                      <td title={item.title}>
                        <Link to={`/questions/${item.questionId}`}>
                          {item.title.length > TITLE_MAX_LENGTH
                            ? item.title
                                .slice(0, TITLE_MAX_LENGTH)
                                .concat("...")
                            : item.title}
                        </Link>
                      </td>
                      <td className="qna_view">
                        <S.ViewBox>
                          <ViewCount />
                          <span>{item.view}</span>
                        </S.ViewBox>
                      </td>

                      <td className="qna_created_at">
                        {item.createAt.slice(0, 10)}
                      </td>
                      {item.writer ? (
                        <td>{item.writer.name}</td>
                      ) : (
                        <td>작성자</td>
                      )}
                    </tr>
                  ))}
                </S.TableBody>
              </>
            )}
          </S.BoardContainer>
        </S.QnaContainer>
        <S.PaginationBox>
          <CustomPagination
            pageCount={totalPage}
            page={page}
            setPage={setPage}
          />
        </S.PaginationBox>
      </S.Section>
    </>
  );
};

export default QnaListComponent;
