import CollectionForm from "../../components/Collection_form/CollectionForm";
import { useState } from "react";
import axios from "axios";

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
    console.log("contents = ", contents);

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

    const formData = new FormData();
    const contentList = [];

    for (let i = 0; i < contents.length; i++) {
      contentList.push(contents[i].itemInfo);
      contents[i].itemImage && formData.append("files", contents[i].itemImage);
    }

    formData.append("productlist", JSON.stringify(contentList));

    console.log(contentList);

    const res = await axios.post(
      "https://faf9-221-148-162-66.ngrok-free.app/products/postlist",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": true,
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4xQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluMUBnbWFpbC5jb20iLCJpYXQiOjE2ODkwMzY2NjMsImV4cCI6MTY4OTAzODQ2M30.cG42Ghg4RHVwqz0L1HFwcaOxBJbn_rke0NMa59Z_bc7ti--Z18WfWiJSU9_qgkDQ",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwiaWF0IjoxNjg5MDM2NjYzLCJleHAiOjE2ODkwNjE4NjN9.gWKfuHkl_sOVPX_2e0TRlyvA0pkKCxY6WJms61qiaUqYBauESiLwVYVJtJQmLEia",
        },
      }
    );
    console.log(res.data);
  };

  return (
    <section>
      <div>
        <h1>수거 신청하기</h1>
        <h4>의류를 보내서 포인트도 얻고 친환경도 실천해보세요!</h4>
      </div>
      {contents.map(item => (
        <div key={item.itemId}>
          <button
            onClick={() => {
              deleteHandler(item.itemId);
            }}
          >
            삭제
          </button>
          <CollectionForm
            contents={contents}
            setContents={setContents}
            itemNumber={item.itemId}
          />
        </div>
      ))}
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
        <button onClick={() => submitHandler()}>보내기</button>
      </div>
    </section>
  );
};

export default CollectionPage;
