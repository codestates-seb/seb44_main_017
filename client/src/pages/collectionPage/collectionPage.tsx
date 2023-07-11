import CollectionForm from "../../components/Collection_form/CollectionForm";
import { useState } from "react";
import axios from "axios";
import * as S from "./style";

export interface ItemProps {
  name: string;
  content: string;
  category: string;
}

export interface ContentsProps {
  itemId: number;
  itemInfo: ItemProps;
  itemImage: File | any;
}

// TODO: 이미지 업로드하고 다시 업로드 버튼 누르면 기존 이미지 사라지는 버그 수정
const CollectionPage = () => {
  const initialValue = {
    itemId: 0,
    itemInfo: { name: "", content: "", category: "" },
    itemImage: undefined,
  };

  const [contents, setContents] = useState<ContentsProps[]>([initialValue]);
  const [itemNumber, setItemNumber] = useState(1);

  const deleteHandler = (id: number) => {
    confirm("정말 삭제하시겠습니까?");
    setContents(contents.filter(item => item.itemId !== id));
  };

  const submitHandler = async () => {
    /* 예외 처리 */
    for (let i = 0; i < contents.length; i++) {
      if (
        contents[i].itemInfo.name === "" ||
        contents[i].itemInfo.content === "" ||
        contents[i].itemInfo.category === ""
      ) {
        alert("필수 항목을 모두 작성해주세요.");
        return;
      } else {
        if (contents[i].itemImage === null) {
          alert("이미지를 등록해주세요.");
          return;
        }
      }
    }

    /* 요청 보낼 데이터 처리 */
    const formData = new FormData();
    const contentList = [];

    for (let i = 0; i < contents.length; i++) {
      contentList.push(contents[i].itemInfo);
      contents[i].itemImage && formData.append("files", contents[i].itemImage);
    }

    formData.append("productlist", JSON.stringify(contentList));

    const res = await axios.post(
      "https://faf9-221-148-162-66.ngrok-free.app/products/postlist",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": true,
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4xQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluMUBnbWFpbC5jb20iLCJpYXQiOjE2ODkwNDA1MDcsImV4cCI6MTY4OTA0MjMwN30.S0GFZcr2SaYCVaEDkhQIt27vEC65dz6bThYodfQFyPm3RhWxsVVlYtHDfvdjlPh2",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwiaWF0IjoxNjg5MDQwNTA3LCJleHAiOjE2ODkwNjU3MDd9.EJZ6Bl5TtibdXkikbLZlhZBeSBnreF63IH3TgujrOPp_sxsHw-BmhK89s1kgg83V",
        },
      }
    );
    console.log(res.data);
  };

  return (
    <S.Section>
      <S.PageTitle>
        <h1>수거 신청하기</h1>
        <h4>의류를 보내서 포인트도 얻고 친환경도 실천해보세요!</h4>
      </S.PageTitle>
      <S.ContentsBox>
        {contents.map((item, index) => (
          <div key={item.itemId}>
            <div>
              <div>상품 번호 : {index + 1}</div>
              <button
                onClick={() => {
                  deleteHandler(item.itemId);
                }}
              >
                삭제
              </button>
            </div>
            <CollectionForm
              contents={contents}
              setContents={setContents}
              itemNumber={item.itemId}
            />
          </div>
        ))}
      </S.ContentsBox>
      <div>
        <button
          onClick={() => {
            setContents([
              ...contents,
              {
                itemId: itemNumber,
                itemInfo: { name: "", content: "", category: "" },
                itemImage: undefined,
              },
            ]);
            setItemNumber(itemNumber + 1);
          }}
        >
          상품 추가
        </button>
      </div>
      <div>
        <div>TOTAL : {contents.length}개의 상품</div>
        <button onClick={() => submitHandler()}>보내기</button>
      </div>
    </S.Section>
  );
};

export default CollectionPage;
