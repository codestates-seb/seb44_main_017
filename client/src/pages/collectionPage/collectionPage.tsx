import CollectionForm from "../../components/Collection_form/CollectionForm";
import { useEffect, useState } from "react";
import axios from "axios";

export interface ItemProps {
  name: string;
  content: string;
  category: string;
}

export interface ContentsProps {
  itemId: number;
  itemInfo: ItemProps;
}

const CollectionPage = () => {
  const initialValue = {
    itemId: 0,
    itemInfo: { name: "", content: "", category: "" },
  };

  const [images, setImages] = useState<File[]>([]);
  const [contents, setContents] = useState<ContentsProps[]>([initialValue]);
  const [itemNumber, setItemNumber] = useState(1);

  const deleteHandler = (id: number) => {
    console.log(id);
    setContents(contents.filter(item => item.itemId !== id));
    // setImages(images.filter(item => item.itemId !== id));
  };

  const submitHandler = async () => {
    console.log("images = ", images);
    console.log("contents = ", contents);

    if (images.length < contents.length) {
      alert("이미지를 등록해주세요");
      return;
    }

    for (let i = 0; i < contents.length; i++) {
      if (
        contents[i].itemInfo.name === "" ||
        contents[i].itemInfo.content === "" ||
        contents[i].itemInfo.category === ""
      ) {
        alert("필수 항목을 모두 작성해주세요.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("productlist", JSON.stringify(contents));

    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }

    // const res = await axios.post(
    //   "https://e087-221-148-162-66.ngrok-free.app/products/postlist",
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "ngrok-skip-browser-warning": true,
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiaGdkQGdtYWlsLmNvbSIsInN1YiI6ImhnZEBnbWFpbC5jb20iLCJpYXQiOjE2ODg5NzUxODMsImV4cCI6MTY4ODk3Njk4M30.VAz5FzGZJhTR_nGfAIB-tZgRxuNyxt0xkKpT8ipNBfd_u2MPO5tqfPa3Ivzya-V5",
    //       Refresh:
    //         "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJoZ2RAZ21haWwuY29tIiwiaWF0IjoxNjg4OTc1MTgzLCJleHAiOjE2ODkwMDAzODN9.Kn6upYn2d2gIsK1XeQaQt12gG2l4X01q-OtH5Dmkx9uRjpCOfmskxx33lyJvwTKX",
    //     },
    //   }
    // );
    // console.log(res.data);
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
            images={images}
            setImages={setImages}
            contents={contents}
            setContents={setContents}
            itemIndex={item.itemId}
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
