import CollectionForm from "../../components/Collection_form/CollectionForm";
import { useState } from "react";
import axios from "axios";

export interface ContentsProps {
  name: string;
  content: string;
  category: string;
}

const CollectionPage = () => {
  const initialValue = {
    name: "",
    content: "",
    category: "",
  };

  const [formCount, setFormCount] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [contents, setContents] = useState<ContentsProps[]>([initialValue]);

  const submitHandler = async () => {
    console.log("images = ", images);
    console.log("contents = ", contents);

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
      {Array(formCount)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <button onClick={() => setFormCount(formCount - 1)}>삭제</button>
            <CollectionForm
              images={images}
              setImages={setImages}
              contents={contents}
              setContents={setContents}
              index={index++}
            />
          </div>
        ))}
      <div>
        <button
          onClick={() => {
            setFormCount(formCount + 1);
            setContents([...contents, initialValue]);
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
