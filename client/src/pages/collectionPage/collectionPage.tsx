import CollectionForm from "../../components/Collection_form/CollectionForm";
import { useState } from "react";
import axios from "axios";
import * as S from "./style";
import { BASE_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { getToken } from "@/utils/token";

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

  const navigate = useNavigate();

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
        if (contents[i].itemImage === undefined) {
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

    const [authorization, refresh] = getToken();

    const res = await axios.post(BASE_URL + "/products/postlist", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${authorization}`,
        Refresh: `${refresh}`,
      },
    });

    if (res.status === 200) {
      alert("정상적으로 요청되었습니다.");
      navigate("/");
    }
  };

  return (
    <S.Section>
      <S.PageTitle>
        <h1>수거 신청하기</h1>
        <h4>의류를 보내서 포인트도 얻고 친환경도 실천해보세요!</h4>
      </S.PageTitle>
      <S.ContentsContainer>
        {contents.map((item, index) => (
          <div key={item.itemId}>
            <S.ContentHeader>
              <div className="product_no">상품 번호 : {index + 1}</div>
              <S.DeleteBtn
                onClick={() => {
                  deleteHandler(item.itemId);
                }}
              >
                삭제
              </S.DeleteBtn>
            </S.ContentHeader>
            <CollectionForm
              contents={contents}
              setContents={setContents}
              itemNumber={item.itemId}
            />
          </div>
        ))}
      </S.ContentsContainer>
      <S.AddBtnBox>
        <S.AddFormBtn
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
        </S.AddFormBtn>
      </S.AddBtnBox>
      <S.SubmitBox>
        <div className="total_product">TOTAL : {contents.length}개의 물품</div>
        <S.SubmitBtn onClick={() => submitHandler()}>보내기</S.SubmitBtn>
      </S.SubmitBox>
    </S.Section>
  );
};

export default CollectionPage;
